"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { STATUS_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TaskCard } from "./TaskCard";
import type { Task, TeamMember, Label, Status } from "@/types";

interface KanbanColumnProps {
  status: Status;
  tasks: Task[];
  members: TeamMember[];
  labels: Label[];
  onTaskClick: (task: Task) => void;
}

export function KanbanColumn({
  status,
  tasks,
  members,
  labels,
  onTaskClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex w-72 flex-shrink-0 flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              config.color,
              config.bgColor
            )}
          >
            {config.label}
          </span>
          <span className="text-xs text-zinc-400">{tasks.length}</span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 space-y-2 rounded-lg bg-zinc-50 p-2 transition-colors",
          isOver && "bg-zinc-100 ring-2 ring-zinc-300"
        )}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              members={members}
              labels={labels}
              onClick={() => onTaskClick(task)}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
