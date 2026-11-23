"use client";

/**
 * Everything App.tsx wrapped around the routes in the Vite version: React Query, tooltips, toasts, the page
 * transitions, the scroll reset, the translations of the older components, plus the two behaviours main.tsx
 * installed on the document (smooth in-page anchors, hidden Botpress "powered by").
 */
import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Navbar from "@/components/layout/Navbar";
import { PageTransitionProvider } from "@/components/studio/PageTransition";
import i18n from "@/lib/i18n";

function useDocumentBehaviours() {
  useEffect(() => {
    // Smooth scrolling for in-page anchor links (main.tsx of the Vite version)
    const onAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (href && href !== "#" && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: offsetTop - 80, behavior: "smooth" });
        }
      }
    };
    const bind = () =>
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        if (!anchor.hasAttribute("data-smooth-scroll")) {
          anchor.setAttribute("data-smooth-scroll", "true");
          anchor.addEventListener("click", onAnchorClick);
        }
      });
    // Same as before: links already marked data-smooth-scroll by a component keep their own handler
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => anchor.addEventListener("click", onAnchorClick));
    const links = new MutationObserver(bind);
    links.observe(document.body, { childList: true, subtree: true });
    // Hide the Botpress "powered by" line
    const botpress = new MutationObserver(() => {
      document.querySelectorAll(".bpComposerPoweredBy").forEach((el) => el.setAttribute("data-hidden", "true"));
    });
    botpress.observe(document.documentElement, { childList: true, subtree: true });
    return () => {
      links.disconnect();
      botpress.disconnect();
    };
  }, []);
}

function Behaviours() {
  useScrollToTop();
  useDocumentBehaviours();
  useEffect(() => {
    // Translations of the older components; each page sets its own <html lang>
    i18n.changeLanguage("en");
  }, []);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Behaviours />
        <div className="min-h-screen bg-[#F8F9FB]">
          <Navbar />
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
