"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type IntercomIdentity = {
  id: string;
  name: string;
  email: string;
  createdAt: number | string | Date;
};

declare global {
  interface Window {
    RID_INTERCOM_USER?: IntercomIdentity;
    intercomSettings?: Record<string, unknown>;
    Intercom?: {
      (...args: unknown[]): void;
      q?: unknown[];
      c?: (args: IArguments) => void;
    };
  }
}

const APP_ID = "u4881rls";

function toUnixTimestamp(value: IntercomIdentity["createdAt"]) {
  if (typeof value === "number") {
    return value > 10_000_000_000 ? Math.floor(value / 1000) : Math.floor(value);
  }

  const timestamp = value instanceof Date ? value.getTime() : Date.parse(value);
  return Number.isFinite(timestamp) ? Math.floor(timestamp / 1000) : undefined;
}

export function IntercomChatbot() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.Intercom === "function") {
      window.Intercom("update", {
        ...window.intercomSettings,
        last_request_at: Math.floor(Date.now() / 1000),
      });
    }
  }, [pathname]);

  return (
    <>
      <Script id="rid-intercom-settings" strategy="afterInteractive">
        {`
          (function () {
            var user = window.RID_INTERCOM_USER;
            window.intercomSettings = {
              api_base: "https://api-iam.intercom.io",
              app_id: "${APP_ID}"
            };

            if (user && user.id && user.name && user.email && user.createdAt) {
              var createdAt = typeof user.createdAt === "number"
                ? user.createdAt
                : Date.parse(user.createdAt);

              window.intercomSettings.user_id = user.id;
              window.intercomSettings.name = user.name;
              window.intercomSettings.email = user.email;
              window.intercomSettings.created_at = createdAt > 10000000000
                ? Math.floor(createdAt / 1000)
                : Math.floor(createdAt);
            }
          })();
        `}
      </Script>
      <Script id="rid-intercom-loader" strategy="afterInteractive">
        {`
          (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${APP_ID}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
        `}
      </Script>
    </>
  );
}

export const normalizeIntercomCreatedAt = toUnixTimestamp;
