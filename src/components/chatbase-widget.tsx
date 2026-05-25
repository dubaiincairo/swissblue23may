"use client";

import Script from "next/script";

export function ChatbaseWidget() {
  const chatbotId = process.env.NEXT_PUBLIC_CHATBASE_ID;
  if (!chatbotId) return null;

  return (
    <Script id="chatbase-widget" strategy="afterInteractive">
      {`
        (function(){
          if (!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...args) => {
              if (!window.chatbase.q) window.chatbase.q = [];
              window.chatbase.q.push(args);
            };
            window.chatbase = new Proxy(window.chatbase, {
              get(target, prop) {
                if (prop === "q") return target.q;
                return (...args) => target(prop, ...args);
              },
            });
          }
          const onLoad = function () {
            const script = document.createElement("script");
            script.src = "https://www.chatbase.co/embed.min.js";
            script.id = ${JSON.stringify(chatbotId)};
            script.domain = "www.chatbase.co";
            document.body.appendChild(script);
          };
          if (document.readyState === "complete") onLoad();
          else window.addEventListener("load", onLoad);
        })();
      `}
    </Script>
  );
}
