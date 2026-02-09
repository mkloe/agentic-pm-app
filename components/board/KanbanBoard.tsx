"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { STATUSES } from "@/lib/constants";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";
import { TaskModal } from "@/components/tasks/TaskModal";
import type { Task, TeamMember, Label, Status } from "@/types";

interface KanbanBoardProps {
  initialTasks: Task[];
  members: TeamMember[];
  labels: Label[];
  projectId: string;
}

export function KanbanBoard({
  initialTasks,
  members,
  labels,
  projectId,
}: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const getTasksByStatus = useCallback(
    (status: Status) =>
      tasks.filter((t) => t.status === status).sort((a, b) => a.order - b.order),
    [tasks]
  );

  const activeTask = tasks.find((t) => t.id === activeId);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    // Determine target status: either the column itself or the column of the task we're hovering over
    let targetStatus: Status;
    if (STATUSES.includes(over.id as Status)) {
      targetStatus = over.id as Status;
    } else {
      const overTask = tasks.find((t) => t.id === over.id);
      if (!overTask) return;
      targetStatus = overTask.status;
    }

    if (activeTask.status !== targetStatus) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === active.id ? { ...t, status: targetStatus } : t
        )
      );
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const columnTasks = tasks
      .filter((t) => t.status === activeTask.status)
      .sort((a, b) => a.order - b.order);

    const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
    let newIndex = columnTasks.findIndex((t) => t.id === over.id);
    if (newIndex === -1) newIndex = columnTasks.length - 1;

    const reordered =
      oldIndex !== newIndex
        ? arrayMove(columnTasks, oldIndex, newIndex)
        : columnTasks;

    const updates = reordered.map((t, i) => ({
      id: t.id,
      status: activeTask.status,
      order: i,
    }));

    setTasks((prev) =>
      prev.map((t) => {
        const update = updates.find((u) => u.id === t.id);
        return update ? { ...t, order: update.order, status: update.status } : t;
      })
    );

    await fetch("/api/tasks/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });
  }

  function handleTaskUpdate(updatedTask: Task) {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setSelectedTask(null);
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto p-6">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={getTasksByStatus(status)}
              members={members}
              labels={labels}
              onTaskClick={setSelectedTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <TaskCard
              task={activeTask}
              members={members}
              labels={labels}
              onClick={() => {}}
            />
          )}
        </DragOverlay>
      </DndContext>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          members={members}
          labels={labels}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}
    </>
  );
}
