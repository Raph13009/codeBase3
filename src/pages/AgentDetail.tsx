import { useParams } from "react-router-dom";
import MetaTags from "@/components/seo/MetaTags";
import { CaseStudy } from "@/components/studio/CaseStudy";
import { CaseMissing } from "@/components/studio/CaseMissing";
import { findCase } from "@/components/studio/work";

/** /agent/:id — case study of an AI agent or automation. */
const AgentDetail = () => {
  const { id } = useParams();
  const agent = findCase("agent", id);

  if (!agent) return <CaseMissing kind="agent" />;

  return (
    <>
      <MetaTags
        title={`${agent.metaTitle} | BoostAI Consulting`}
        description={agent.intro}
        keywords={`${agent.tags.join(", ")}, agent IA, automatisation, BoostAI`}
        image={agent.cover?.src ?? "/android-chrome-512x512.png"}
      />
      <main id="contenu" tabIndex={-1}>
        <CaseStudy item={agent} />
      </main>
    </>
  );
};

export default AgentDetail;
