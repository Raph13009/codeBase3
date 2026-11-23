import Admin from "@/views/Admin";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin | BoostAI Consulting", robots: { index: false, follow: false } };

export default function Page() {
  return <Admin />;
}
