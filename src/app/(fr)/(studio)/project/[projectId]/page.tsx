import ProjectDetail from "@/views/ProjectDetail";
import { WEB_CASES } from "@/components/studio/work";

// Every project page is built at deploy time; an unknown id still renders the "project not found" view.
export function generateStaticParams() {
  return WEB_CASES.map((c) => ({ projectId: c.id }));
}

export default function Page() {
  return <ProjectDetail />;
}
