"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";

type ChatbaseFn = ((...args: unknown[]) => unknown) & { q?: unknown[] };

declare global {
  interface Window {
    chatbase?: ChatbaseFn;
  }
}

/**
 * Embeds the Chatbase chat bubble using the official loader pattern.
 *
 * The chatbot id is read from NEXT_PUBLIC_CHATBASE_ID. When that variable is
 * empty (e.g. local dev without the secret), nothing is injected and the site
 * renders normally — set the id in .env.local (and in Vercel) to enable it.
 */
export default function ChatbaseWidget() {
  useEffect(() => {
    const chatbotId = process.env.NEXT_PUBLIC_CHATBASE_ID;
    if (!chatbotId) {
      return;
    }
    // chatbotId is narrowed to string here; capture it so the nested inject()
    // closure keeps the non-undefined type.
    const resolvedId = chatbotId;

    function inject() {
      // Avoid double-injecting (route changes, fast refresh, repeated events).
      if (document.getElementById(resolvedId)) {
        return;
      }

      // Queue shim so chatbase(...) calls before the script loads are buffered.
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        const stub: ChatbaseFn = (...args: unknown[]) => {
          if (!stub.q) {
            stub.q = [];
          }
          stub.q.push(args);
        };
        window.chatbase = new Proxy(stub, {
          get(target, prop: string) {
            if (prop === "q") {
              return target.q;
            }
            return (...args: unknown[]) => target(prop, ...args);
          },
        });
      }

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = resolvedId;
      script.setAttribute("domain", "www.chatbase.co");
      document.body.appendChild(script);
    }

    // Defer the bubble until the visitor has dealt with the cookie banner, so
    // the (very high z-index) bubble never overlaps the fixed consent bar on
    // mobile. Returning visitors who already chose get it immediately; if
    // storage is blocked we don't withhold the bubble.
    let consented = true;
    try {
      consented = Boolean(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    } catch {
      consented = true;
    }

    if (consented) {
      inject();
      return;
    }

    function onConsent() {
      inject();
    }
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return null;
}
