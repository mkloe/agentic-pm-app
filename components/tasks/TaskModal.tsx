"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { STATUSES, PRIORITIES, STATUS_CONFIG, PRIORITY_CONFIG } from "@/lib/constants";
import { cn, formatDate, getInitials, isOverdue } from "@/lib/utils";
import type { Task, TeamMember, Label, Status, Priority } from "@/types";

interface TaskModalProps {
  task: Task;
  members: TeamMember[];
  labels: Label[];
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

export function TaskModal({
  task,
  members,
  labels,
  onClose,
  onUpdate,
}: TaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<Status>(task.status);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [assigneeId, setAssigneeId] = useState<string>(
    task.assigneeId || "unassigned"
  );
  const [storyPoints, setStoryPoints] = useState<string>(
    task.storyPoints?.toString() || ""
  );
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.split("T")[0] : ""
  );
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        status,
        priority,
        assigneeId: assigneeId === "unassigned" ? null : assigneeId,
        storyPoints: storyPoints ? parseInt(storyPoints) : null,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      }),
    });
    const updated = await res.json();
    setSaving(false);
    onUpdate(updated);
  }

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Edit Task</DialogTitle>
          <DialogDescription className="sr-only">
            Modify task details and save changes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg font-semibold border-0 border-b border-transparent focus:border-zinc-300 focus:outline-none bg-transparent pb-1"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Add a description..."
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Status
              </label>
              <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_CONFIG[s].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Priority
              </label>
              <Select
                value={priority}
                onValueChange={(v) => setPriority(v as Priority)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {PRIORITY_CONFIG[p].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Assignee
              </label>
              <Select value={assigneeId} onValueChange={setAssigneeId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Story Points
              </label>
              <input
                type="number"
                value={storyPoints}
                onChange={(e) => setStoryPoints(e.target.value)}
                min={0}
                max={100}
                className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>
          </div>

          {task.labels.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Labels
              </label>
              <div className="flex flex-wrap gap-1">
                {labels
                  .filter((l) => task.labels.includes(l.id))
                  .map((label) => (
                    <span
                      key={label.id}
                      className="rounded px-2 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: label.color }}
                    >
                      {label.name}
                    </span>
                  ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-zinc-100">
            <span className="text-xs text-zinc-400">
              Created {formatDate(task.createdAt)}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving || !title}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
