import AgentDetail from "@/views/AgentDetail";
import { AGENT_CASES } from "@/components/studio/work";

export function generateStaticParams() {
  return AGENT_CASES.map((c) => ({ id: c.id }));
}

export default function Page() {
  return <AgentDetail />;
}
