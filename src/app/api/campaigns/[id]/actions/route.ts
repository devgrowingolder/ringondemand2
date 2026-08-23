import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createCampaignAction,
  getCampaign,
} from "@/lib/campaign/repository";
import { campaignActionSchema } from "@/lib/campaign/schema";
import { deliverCampaignHandoff } from "@/lib/campaign/webhook";

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Context) {
  try {
    const { id } = await params;
    const input = campaignActionSchema.parse(await request.json());
    const campaign = await getCampaign(id);
    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found." }, { status: 404 });
    }

    const action = await createCampaignAction(id, input);
    let handoffStatus: string | undefined;

    if (input.action === "request_pricing" && !action.alreadyProcessed) {
      const handoff = await deliverCampaignHandoff({
        campaign,
        eventId: action.eventId,
        idempotencyKey: input.idempotencyKey,
      });
      handoffStatus = handoff.status;
    }

    return NextResponse.json({ ...action, handoffStatus });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "The action request is invalid." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "The action could not run.",
      },
      { status: 500 },
    );
  }
}
