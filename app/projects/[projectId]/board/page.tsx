import { getTasks, getTeamMembers, getLabels } from "@/lib/db";
import { KanbanBoard } from "@/components/board/KanbanBoard";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const tasks = getTasks({ projectId });
  const members = getTeamMembers();
  const labels = getLabels();

  return (
    <KanbanBoard
      initialTasks={tasks}
      members={members}
      labels={labels}
      projectId={projectId}
    />
  );
}
