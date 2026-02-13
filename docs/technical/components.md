# Components

## Layout Components

### Sidebar (`components/layout/Sidebar.tsx`)

Persistent left-side navigation. Contains links to:
- **Projects** (`/projects`)
- **Team** (`/team`)

Rendered in the root layout (`app/layout.tsx`) and visible on every page.

### Header (`components/layout/Header.tsx`)

Page-level header displaying:
- Page title
- Optional description
- Optional action button (e.g., "New Project", "New Task")

### ProjectTabs (`components/layout/ProjectTabs.tsx`)

Tab navigation within a project, rendered in `app/projects/[projectId]/layout.tsx`. Three tabs:
- **Board** → `/projects/[id]/board`
- **Backlog** → `/projects/[id]/backlog`
- **Dashboard** → `/projects/[id]/dashboard`

## Board Components

### KanbanBoard (`components/board/KanbanBoard.tsx`)

Client Component. The main drag-and-drop container using `@dnd-kit`.

- Receives tasks, team members, and labels as props from the Server Component
- Manages local task state for optimistic updates
- Handles `DragEndEvent`: determines source/target columns, recomputes order values
- Calls `PATCH /api/tasks/reorder` in the background after each drag
- Renders four `KanbanColumn` components (one per status)

### KanbanColumn (`components/board/KanbanColumn.tsx`)

Renders a single status column with:
- Column header (status label + task count)
- Droppable zone using `useDroppable`
- List of `TaskCard` components sorted by `order`

### TaskCard (`components/board/TaskCard.tsx`)

Draggable task card using `useSortable`. Displays:
- Task title
- Priority badge (color-coded)
- Assignee initials avatar
- Story points (if set)
- Label badges

Clicking the card opens the `TaskModal`.

## Task Components

### TaskModal (`components/tasks/TaskModal.tsx`)

Client Component. Dialog for viewing and editing a task. Fields:
- Title (text input)
- Description (textarea)
- Status (select dropdown)
- Priority (select dropdown)
- Assignee (select dropdown, includes "Unassigned" option)
- Labels (multi-select)
- Story Points (number input)
- Due Date (date input)

Saves via `PATCH /api/tasks/:id`. Supports delete via `DELETE /api/tasks/:id`.

### BacklogTable (`components/tasks/BacklogTable.tsx`)

Client Component. Sortable data table displaying all tasks for a project. Columns:
- Title
- Status (badge)
- Priority (badge)
- Assignee (name or "-")
- Story Points
- Due Date (highlighted red if overdue)

Clicking column headers toggles ascending/descending sort. Clicking a row opens `TaskModal`.

### BacklogFilters (`components/tasks/BacklogFilters.tsx`)

Client Component. Filter bar with three dropdown selects:
- **Status** — filter by `todo`, `in_progress`, `in_review`, `done`
- **Priority** — filter by `low`, `medium`, `high`, `critical`
- **Assignee** — filter by team member

Filters update the task list in real time (client-side filtering).

## Dashboard Components

### DashboardView (`components/dashboard/DashboardView.tsx`)

Client Component. Fetches stats from `GET /api/dashboard/:projectId` and renders the child components.

### StatsCards (`components/dashboard/StatsCards.tsx`)

Four metric cards displayed at the top:
- Total Tasks
- Completed (count of done tasks)
- Story Points (completed / total)
- Overdue Tasks

### StatusChart (`components/dashboard/StatusChart.tsx`)

Vertical bar chart (Recharts `BarChart`) showing task count per status. Color-coded: gray (To Do), blue (In Progress), purple (In Review), green (Done).

### PriorityChart (`components/dashboard/PriorityChart.tsx`)

Vertical bar chart showing task count per priority. Color-coded: gray (Low), yellow (Medium), orange (High), red (Critical).

### WorkloadChart (`components/dashboard/WorkloadChart.tsx`)

Horizontal bar chart showing task count per assignee. Visualizes team workload distribution.

## Project Components

### ProjectCard (`components/projects/ProjectCard.tsx`)

Displays a project as a card with name, description, project key, and last-updated date. Links to the project's board view.

### CreateProjectModal (`components/projects/CreateProjectModal.tsx`)

Dialog for creating a new project. Fields:
- Name (required)
- Description
- Project Key (required, auto-generated from name as uppercase abbreviation)

Submits via `POST /api/projects`.

## Team Components

### MemberCard (`components/team/MemberCard.tsx`)

Displays a team member with:
- Initials avatar (generated from name)
- Name and email
- Role badge
- Current task count and story point total

## shadcn/ui Base Components (`components/ui/`)

Reusable primitives built on Radix UI:

| Component | Based On | Usage |
|-----------|----------|-------|
| `Badge` | custom | Status, priority, and label badges |
| `Button` | Radix Slot | All buttons (variants: default, destructive, outline, secondary, ghost, link; sizes: default, sm, lg, icon) |
| `Card` | custom | Project cards, stats cards, member cards |
| `Dialog` | Radix Dialog | Task modal, create project modal |
| `DropdownMenu` | Radix DropdownMenu | Context menus |
| `Select` | Radix Select | Filter dropdowns, form selects |
| `Table` | custom | Backlog table |

All styled with Tailwind CSS and `class-variance-authority` for variant management.
