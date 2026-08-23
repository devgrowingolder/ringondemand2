import Link from "next/link";

type Props = { searchParams: Promise<{ campaign_id?: string }> };

export default async function BookingFallbackPage({ searchParams }: Props) {
  const { campaign_id: campaignId } = await searchParams;
  return (
    <main className="booking-fallback">
      <p className="section-code">Demo booking</p>
      <h1>Your campaign details are ready.</h1>
      <p>
        Online scheduling is temporarily unavailable. Email
        {" "}<a href={`mailto:hello@ringondemand.com?subject=${encodeURIComponent(`Schedule campaign ${campaignId ?? ""}`)}`}>hello@ringondemand.com</a>
        {" "}and include campaign reference <strong>{campaignId ?? "from your confirmation"}</strong>.
      </p>
      <div className="campaign-success-actions">
        <a className="button button-dark" href={`mailto:hello@ringondemand.com?subject=${encodeURIComponent(`Schedule campaign ${campaignId ?? ""}`)}`}>
          Email the team
        </a>
        <Link className="button button-outline" href="/build-campaign?intent=demo">
          Return to my campaign details
        </Link>
      </div>
    </main>
  );
}
