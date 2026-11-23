import StudioLayout from "@/components/studio/StudioLayout";
import NotFound from "@/views/NotFound";
import { SiteDocument } from "./document";

/**
 * Any address that matches no route: the studio's 404 page inside the studio shell, with a 404 status. The site has
 * two root layouts (French site, English agentic commerce page), so Next.js needs this file rather than one
 * app/not-found.tsx (next.config.ts: experimental.globalNotFound).
 */
export default function GlobalNotFound() {
  return (
    <SiteDocument lang="fr">
      <StudioLayout>
        <NotFound />
      </StudioLayout>
    </SiteDocument>
  );
}
