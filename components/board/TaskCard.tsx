"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PRIORITY_CONFIG } from "@/lib/constants";
import { cn, formatDate, getInitials, isOverdue } from "@/lib/utils";
import type { Task, TeamMember, Label } from "@/types";

interface TaskCardProps {
  task: Task;
  members: TeamMember[];
  labels: Label[];
  onClick: () => void;
}

export function TaskCard({ task, members, labels, onClick }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const assignee = members.find((m) => m.id === task.assigneeId);
  const taskLabels = labels.filter((l) => task.labels.includes(l.id));
  const priorityCfg = PRIORITY_CONFIG[task.priority];
  const overdue = isOverdue(task.dueDate) && task.status !== "done";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={cn(
        "cursor-grab rounded-lg border border-zinc-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing",
        isDragging && "opacity-50 shadow-lg"
      )}
    >
      {taskLabels.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {taskLabels.map((label) => (
            <span
              key={label.id}
              className="inline-block rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
              style={{ backgroundColor: label.color }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm font-medium text-zinc-900">{task.title}</p>

      <div className="mt-2 flex items-center justify-between">
        <Badge
          variant="secondary"
          className={cn("text-[10px]", priorityCfg.color, priorityCfg.bgColor)}
        >
          {priorityCfg.label}
        </Badge>

        {task.storyPoints && (
          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600">
            {task.storyPoints} SP
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          {task.dueDate && (
            <span
              className={cn(
                "flex items-center gap-0.5",
                overdue && "text-red-600 font-medium"
              )}
            >
              <Calendar className="h-3 w-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>

        {assignee && (
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-medium text-zinc-700"
            title={assignee.name}
          >
            {getInitials(assignee.name)}
          </div>
        )}
      </div>
    </div>
  );
}
