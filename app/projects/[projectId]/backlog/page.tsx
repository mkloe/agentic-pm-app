import { getTasks, getTeamMembers, getLabels } from "@/lib/db";
import { BacklogTable } from "@/components/tasks/BacklogTable";

export default async function BacklogPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const tasks = getTasks({ projectId });
  const members = getTeamMembers();
  const labels = getLabels();

  return (
    <div className="p-6">
      <BacklogTable initialTasks={tasks} members={members} labels={labels} />
    </div>
  );
}
