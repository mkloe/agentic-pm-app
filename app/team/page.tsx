import { getTeamMembers, getTasks } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { MemberCard } from "@/components/team/MemberCard";

export default function TeamPage() {
  const members = getTeamMembers();
  const tasks = getTasks();

  return (
    <div>
      <Header title="Team" description="Your team members and their workload" />
      <div className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => {
            const memberTasks = tasks.filter(
              (t) => t.assigneeId === member.id
            );
            const storyPoints = memberTasks.reduce(
              (sum, t) => sum + (t.storyPoints || 0),
              0
            );
            return (
              <MemberCard
                key={member.id}
                member={member}
                taskCount={memberTasks.length}
                storyPoints={storyPoints}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
