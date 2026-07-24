import Link from "next/link";

type Props = { searchParams: Promise<{ campaign_id?: string }> };

export default async function BookingFallbackPage({ searchParams }: Props) {
  const { campaign_id: campaignId } = await searchParams;
  return (
    <main className="booking-fallback">
      <p className="section-code">Demo booking</p>
      <h1>Your campaign brief is ready.</h1>
      <p>
        Configure <code>RID_SCHEDULING_URL</code> to continue directly into the
        production calendar with campaign ID <strong>{campaignId}</strong>.
      </p>
      <Link className="button button-dark" href="/">
        Return to Ring On Demand
      </Link>
    </main>
  );
}
