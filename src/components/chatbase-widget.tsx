"use client";

import { useEffect } from "react";

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

    // Avoid double-injecting (route changes, fast refresh).
    if (document.getElementById(chatbotId)) {
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
    script.id = chatbotId;
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);
  }, []);

  return null;
}
