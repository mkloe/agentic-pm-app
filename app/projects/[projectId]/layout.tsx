import { getProject } from "@/lib/db";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { ProjectTabs } from "@/components/layout/ProjectTabs";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProject(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <Header title={project.name} description={project.description} />
      <ProjectTabs projectId={projectId} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
