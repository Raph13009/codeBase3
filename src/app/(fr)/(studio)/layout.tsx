import type { ReactNode } from "react";
import StudioLayout from "@/components/studio/StudioLayout";

/** Header, footer, smooth scroll and cursor shared by the studio pages (the <Route element={<StudioLayout />}> group). */
export default function StudioGroupLayout({ children }: { children: ReactNode }) {
  return <StudioLayout>{children}</StudioLayout>;
}
