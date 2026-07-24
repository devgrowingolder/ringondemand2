export type FunnelEventName =
  | "campaign_start"
  | "campaign_parse"
  | "campaign_fallback"
  | "campaign_step_complete"
  | "campaign_summary_edit"
  | "campaign_submission"
  | "pricing_request"
  | "booking_start"
  | "booking_completion"
  | "handoff_success"
  | "handoff_failure";

export type FunnelEvent = {
  name: FunnelEventName;
  campaignId?: string;
  step?: string;
  deliveryModel?: string;
  vertical?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackFunnelEvent(event: FunnelEvent) {
  if (typeof window === "undefined") return;

  const safeEvent = {
    event: event.name,
    campaign_id: event.campaignId,
    campaign_step: event.step,
    delivery_model: event.deliveryModel,
    vertical: event.vertical,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(safeEvent);
}
