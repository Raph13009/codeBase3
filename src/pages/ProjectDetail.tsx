import { useParams } from "react-router-dom";
import MetaTags from "@/components/seo/MetaTags";
import { CaseStudy } from "@/components/studio/CaseStudy";
import { CaseMissing } from "@/components/studio/CaseMissing";
import { findCase } from "@/components/studio/work";

/** /project/:projectId — case study of a web project. */
const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = findCase("web", projectId);

  if (!project) return <CaseMissing kind="projet" />;

  return (
    <>
      <MetaTags
        title={`${project.metaTitle} | BoostAI Consulting`}
        description={project.intro}
        keywords={`${project.tags.join(", ")}, projet, développement, BoostAI`}
        image={project.cover?.src ?? "/android-chrome-512x512.png"}
      />
      <main id="contenu" tabIndex={-1}>
        <CaseStudy item={project} />
      </main>
    </>
  );
};

export default ProjectDetail;
