import { redirect } from "next/navigation";

const buyerLoginUrl = "https://ring-on-demand.proaxis.ai/cx/buyer/login";

export default function LoginPage() {
  redirect(buyerLoginUrl);
}
