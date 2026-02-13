# Modules Overview

## Kanban Board
- **Files**: `components/board/KanbanBoard.tsx`, `KanbanColumn.tsx`, `TaskCard.tsx`
- **Functionality**: 4-column board (Backlog, To Do, In Progress, Done). Drag-and-drop via @dnd-kit. Reorder persisted via `/api/tasks/reorder`.
- **User flow**: User opens project → Board tab → drags task between columns → status updates automatically.

## Backlog / Table View
- **Files**: `components/tasks/BacklogTable.tsx`, `BacklogFilters.tsx`
- **Functionality**: Full task list with filtering by status, priority, and assignee. Click row to open task detail modal.
- **Filters**: Status dropdown, priority dropdown, assignee dropdown. All client-side filtering.

## Task Management
- **Files**: `components/tasks/TaskModal.tsx`, `/api/tasks/`
- **Functionality**: Create, view, edit tasks. Fields: title, description, status, priority, assignee, labels, story points, due date.
- **Statuses**: Backlog → To Do → In Progress → Done
- **Priorities**: Low, Medium, High, Urgent

## Dashboard / Analytics
- **Files**: `components/dashboard/DashboardView.tsx`, `StatsCards.tsx`, `StatusChart.tsx`, `PriorityChart.tsx`, `WorkloadChart.tsx`
- **Functionality**: Aggregated project stats. 4 stat cards (total tasks, completed, in progress, overdue). 3 bar charts (by status, by priority, by team member).
- **Data source**: `/api/dashboard/[projectId]` aggregates from tasks.

## Project Management
- **Files**: `components/projects/ProjectCard.tsx`, `CreateProjectModal.tsx`
- **Functionality**: Create projects with name, key, description. Project cards show task count summary.

## Team
- **Files**: `components/team/MemberCard.tsx`
- **Functionality**: Display team members with role, task count, and total story points assigned.
