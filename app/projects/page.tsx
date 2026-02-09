import { getProjects, getTasks } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";

export default function ProjectsPage() {
  const projects = getProjects();
  const tasks = getTasks();

  return (
    <div>
      <Header
        title="Projects"
        description="Manage your team's projects"
        actions={<CreateProjectModal />}
      />
      <div className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              taskCount={tasks.filter((t) => t.projectId === project.id).length}
            />
          ))}
          {projects.length === 0 && (
            <p className="col-span-full text-center text-sm text-zinc-500">
              No projects yet. Create your first one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
