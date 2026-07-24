import { NextResponse } from "next/server";
import { z } from "zod";
import { createCampaignSchema } from "@/lib/campaign/schema";
import { createCampaign } from "@/lib/campaign/repository";
import { sanitizeCampaignBrief } from "@/lib/campaign/parser";

export async function POST(request: Request) {
  try {
    const input = createCampaignSchema.parse(await request.json());
    const { sanitizedBrief } = sanitizeCampaignBrief(input.rawBrief);
    const campaign = await createCampaign({
      ...input,
      rawBrief: sanitizedBrief,
    });

    return NextResponse.json(
      { id: campaign.id, status: campaign.status },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Review the campaign and contact fields.",
          fields: error.issues.map((issue) => issue.path.join(".")),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The campaign could not be saved.",
      },
      { status: 500 },
    );
  }
}
