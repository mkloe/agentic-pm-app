"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "@/lib/constants";
import { cn, formatDate, getInitials, isOverdue } from "@/lib/utils";
import { BacklogFilters } from "./BacklogFilters";
import { TaskModal } from "./TaskModal";
import type { Task, TeamMember, Label } from "@/types";

interface BacklogTableProps {
  initialTasks: Task[];
  members: TeamMember[];
  labels: Label[];
}

export function BacklogTable({
  initialTasks,
  members,
  labels,
}: BacklogTableProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sortField, setSortField] = useState<string>("order");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let result = tasks;
    if (statusFilter !== "all")
      result = result.filter((t) => t.status === statusFilter);
    if (priorityFilter !== "all")
      result = result.filter((t) => t.priority === priorityFilter);
    if (assigneeFilter === "unassigned")
      result = result.filter((t) => !t.assigneeId);
    else if (assigneeFilter !== "all")
      result = result.filter((t) => t.assigneeId === assigneeFilter);

    return result.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortField === "title") return a.title.localeCompare(b.title) * dir;
      if (sortField === "priority") {
        const order = { critical: 0, high: 1, medium: 2, low: 3 };
        return (
          (order[a.priority] - order[b.priority]) * dir
        );
      }
      if (sortField === "storyPoints")
        return ((a.storyPoints || 0) - (b.storyPoints || 0)) * dir;
      return (a.order - b.order) * dir;
    });
  }, [tasks, statusFilter, priorityFilter, assigneeFilter, sortField, sortDir]);

  function handleSort(field: string) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  function handleTaskUpdate(updatedTask: Task) {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setSelectedTask(null);
  }

  const SortHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <TableHead
      className="cursor-pointer select-none hover:text-zinc-900"
      onClick={() => handleSort(field)}
    >
      <span className="flex items-center gap-1">
        {children}
        {sortField === field && (
          <span className="text-xs">{sortDir === "asc" ? "↑" : "↓"}</span>
        )}
      </span>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <BacklogFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        assigneeFilter={assigneeFilter}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onAssigneeChange={setAssigneeFilter}
        members={members}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <SortHeader field="title">Title</SortHeader>
            <TableHead>Status</TableHead>
            <SortHeader field="priority">Priority</SortHeader>
            <TableHead>Assignee</TableHead>
            <SortHeader field="storyPoints">SP</SortHeader>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((task) => {
            const assignee = members.find((m) => m.id === task.assigneeId);
            const statusCfg = STATUS_CONFIG[task.status];
            const priorityCfg = PRIORITY_CONFIG[task.priority];
            const overdue =
              isOverdue(task.dueDate) && task.status !== "done";

            return (
              <TableRow
                key={task.id}
                className="cursor-pointer"
                onClick={() => setSelectedTask(task)}
              >
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs",
                      statusCfg.color,
                      statusCfg.bgColor
                    )}
                  >
                    {statusCfg.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs",
                      priorityCfg.color,
                      priorityCfg.bgColor
                    )}
                  >
                    {priorityCfg.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {assignee ? (
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-medium">
                        {getInitials(assignee.name)}
                      </div>
                      <span className="text-sm">{assignee.name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-zinc-400">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {task.storyPoints || "—"}
                </TableCell>
                <TableCell>
                  <span className={cn(overdue && "text-red-600 font-medium")}>
                    {task.dueDate ? formatDate(task.dueDate) : "—"}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-zinc-400 py-8">
                No tasks match the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          members={members}
          labels={labels}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
}
