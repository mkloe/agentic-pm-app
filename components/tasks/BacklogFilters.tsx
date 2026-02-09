"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUSES, PRIORITIES, STATUS_CONFIG, PRIORITY_CONFIG } from "@/lib/constants";
import type { TeamMember } from "@/types";

interface BacklogFiltersProps {
  statusFilter: string;
  priorityFilter: string;
  assigneeFilter: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onAssigneeChange: (value: string) => void;
  members: TeamMember[];
}

export function BacklogFilters({
  statusFilter,
  priorityFilter,
  assigneeFilter,
  onStatusChange,
  onPriorityChange,
  onAssigneeChange,
  members,
}: BacklogFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {STATUS_CONFIG[s].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={priorityFilter} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="All Priorities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          {PRIORITIES.map((p) => (
            <SelectItem key={p} value={p}>
              {PRIORITY_CONFIG[p].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={assigneeFilter} onValueChange={onAssigneeChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Assignees" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Assignees</SelectItem>
          <SelectItem value="unassigned">Unassigned</SelectItem>
          {members.map((m) => (
            <SelectItem key={m.id} value={m.id}>
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
