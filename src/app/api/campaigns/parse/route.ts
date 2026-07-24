import { NextResponse } from "next/server";
import { z } from "zod";
import {
  BriefValidationError,
  parseCampaignBrief,
} from "@/lib/campaign/parser";

const requestSchema = z.object({
  brief: z.string().max(2_500),
});

export async function POST(request: Request) {
  try {
    const body = requestSchema.parse(await request.json());
    const parsed = parseCampaignBrief(body.brief);
    return NextResponse.json(parsed);
  } catch (error) {
    if (error instanceof BriefValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Enter a valid campaign brief." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "The brief could not be structured. Continue manually." },
      { status: 500 },
    );
  }
}
