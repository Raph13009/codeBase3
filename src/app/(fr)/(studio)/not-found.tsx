import NotFound from "@/views/NotFound";

/** Unknown address inside the studio shell (the <Route path="*"> of the Vite version), now with a real 404 status. */
export default function StudioNotFound() {
  return <NotFound />;
}
