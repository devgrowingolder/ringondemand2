"use client";

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
    const user = window.RID_INTERCOM_USER;
    const settings: Record<string, unknown> = {
      api_base: "https://api-iam.intercom.io",
      app_id: APP_ID,
    };

    if (user?.id && user.name && user.email && user.createdAt) {
      settings.user_id = user.id;
      settings.name = user.name;
      settings.email = user.email;
      settings.created_at = toUnixTimestamp(user.createdAt);
    }

    window.intercomSettings = settings;

    if (typeof window.Intercom === "function") {
      window.Intercom("reattach_activator");
      window.Intercom("update", settings);
      return;
    }

    const queuedIntercom = ((...args: unknown[]) => {
      queuedIntercom.q?.push(args);
    }) as NonNullable<Window["Intercom"]>;
    queuedIntercom.q = [];
    window.Intercom = queuedIntercom;

    const loadIntercom = () => {
      if (document.querySelector("script[data-rid-intercom]")) return;

      const script = document.createElement("script");
      script.async = true;
      script.dataset.ridIntercom = "true";
      script.src = `https://widget.intercom.io/widget/${APP_ID}`;
      document.head.appendChild(script);
    };

    if (document.readyState === "complete") {
      loadIntercom();
      return;
    }

    window.addEventListener("load", loadIntercom, { once: true });
    return () => window.removeEventListener("load", loadIntercom);
  }, []);

  useEffect(() => {
    if (typeof window.Intercom === "function") {
      window.Intercom("update", {
        ...window.intercomSettings,
        last_request_at: Math.floor(Date.now() / 1000),
      });
    }
  }, [pathname]);

  return null;
}

export const normalizeIntercomCreatedAt = toUnixTimestamp;
