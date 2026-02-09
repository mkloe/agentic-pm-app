import { NextRequest, NextResponse } from "next/server";
import { getTasks, getTeamMembers } from "@/lib/db";
import type { DashboardStats, Status, Priority } from "@/types";

type RouteContext = { params: Promise<{ projectId: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { projectId } = await context.params;
  const tasks = getTasks({ projectId });
  const members = getTeamMembers();

  const byStatus: Record<Status, number> = {
    todo: 0,
    in_progress: 0,
    in_review: 0,
    done: 0,
  };
  const byPriority: Record<Priority, number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };

  let totalStoryPoints = 0;
  let completedStoryPoints = 0;
  let overdueTasks = 0;
  const assigneeCounts: Record<string, number> = {};

  for (const task of tasks) {
    byStatus[task.status]++;
    byPriority[task.priority]++;

    if (task.storyPoints) {
      totalStoryPoints += task.storyPoints;
      if (task.status === "done") {
        completedStoryPoints += task.storyPoints;
      }
    }

    if (
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "done"
    ) {
      overdueTasks++;
    }

    if (task.assigneeId) {
      assigneeCounts[task.assigneeId] =
        (assigneeCounts[task.assigneeId] || 0) + 1;
    }
  }

  const byAssignee = Object.entries(assigneeCounts).map(([id, count]) => {
    const member = members.find((m) => m.id === id);
    return { name: member?.name || "Unassigned", count };
  });

  const stats: DashboardStats = {
    totalTasks: tasks.length,
    byStatus,
    byPriority,
    byAssignee,
    totalStoryPoints,
    completedStoryPoints,
    overdueTasks,
  };

  return NextResponse.json(stats);
}
