"use client";

import { useState } from "react";
import Script from "next/script";

/** Botpress webchat: the configuration file runs only once inject.js is in (it calls window.botpress). */
export function BotpressScripts() {
  const [injected, setInjected] = useState(false);
  return (
    <>
      <Script
        id="botpress-inject"
        src="https://cdn.botpress.cloud/webchat/v2.3/inject.js"
        strategy="afterInteractive"
        onLoad={() => setInjected(true)}
      />
      {injected ? (
        <Script id="botpress-config" src="https://files.bpcontent.cloud/2025/03/21/09/20250321092854-A091UPQL.js" />
      ) : null}
    </>
  );
}
