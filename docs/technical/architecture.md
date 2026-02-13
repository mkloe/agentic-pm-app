# Architecture

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| Component Library | shadcn/ui (Radix UI primitives) | - |
| Drag & Drop | @dnd-kit | 6.3.1 |
| Charts | Recharts | 3.7.0 |
| Icons | Lucide React | 0.563.0 |
| Fonts | Geist Sans & Geist Mono | - |
| Database | Local JSON file (`data/db.json`) | - |

## Project Structure

```
agentic-pm-app/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (sidebar + main area)
│   ├── page.tsx                      # / → redirects to /projects
│   ├── globals.css                   # Tailwind + CSS custom properties
│   ├── api/                          # REST API route handlers
│   │   ├── projects/
│   │   │   ├── route.ts              # GET (list), POST (create)
│   │   │   └── [id]/route.ts         # GET, PATCH, DELETE
│   │   ├── tasks/
│   │   │   ├── route.ts              # GET (list + filters), POST (create)
│   │   │   ├── [id]/route.ts         # GET, PATCH, DELETE
│   │   │   └── reorder/route.ts      # PATCH (bulk reorder)
│   │   ├── dashboard/
│   │   │   └── [projectId]/route.ts  # GET (computed stats)
│   │   ├── team/route.ts             # GET (list members)
│   │   └── labels/route.ts           # GET (list labels)
│   ├── projects/
│   │   ├── page.tsx                  # Projects list page
│   │   └── [projectId]/
│   │       ├── layout.tsx            # Project shell (header + tabs)
│   │       ├── board/page.tsx        # Kanban board
│   │       ├── backlog/page.tsx      # Table view with filters
│   │       └── dashboard/page.tsx    # Analytics dashboard
│   └── team/page.tsx                 # Team members page
├── components/
│   ├── ui/                           # shadcn/ui base components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── select.tsx
│   │   └── table.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx               # Main navigation sidebar
│   │   ├── Header.tsx                # Page header with actions
│   │   └── ProjectTabs.tsx           # Board / Backlog / Dashboard tabs
│   ├── board/
│   │   ├── KanbanBoard.tsx           # DnD container + state
│   │   ├── KanbanColumn.tsx          # Status column
│   │   └── TaskCard.tsx              # Draggable card
│   ├── tasks/
│   │   ├── TaskModal.tsx             # Task edit dialog
│   │   ├── BacklogTable.tsx          # Sortable table
│   │   └── BacklogFilters.tsx        # Filter controls
│   ├── dashboard/
│   │   ├── DashboardView.tsx         # Container
│   │   ├── StatsCards.tsx            # Metric cards
│   │   ├── StatusChart.tsx           # Bar chart by status
│   │   ├── PriorityChart.tsx         # Bar chart by priority
│   │   └── WorkloadChart.tsx         # Horizontal bar chart by assignee
│   ├── projects/
│   │   ├── ProjectCard.tsx           # Project list card
│   │   └── CreateProjectModal.tsx    # New project dialog
│   └── team/
│       └── MemberCard.tsx            # Team member card
├── lib/
│   ├── db.ts                         # Database CRUD operations
│   ├── constants.ts                  # Status/priority/role config
│   └── utils.ts                      # Utility functions
├── types/
│   └── index.ts                      # TypeScript interfaces
├── scripts/
│   └── seed.ts                       # Database seeder
├── data/
│   └── db.json                       # JSON database (generated)
└── package.json
```

## Page Routing

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `app/page.tsx` | Redirects to `/projects` |
| `/projects` | `app/projects/page.tsx` | Project list with create button |
| `/projects/[id]/board` | `app/projects/[projectId]/board/page.tsx` | Kanban board |
| `/projects/[id]/backlog` | `app/projects/[projectId]/backlog/page.tsx` | Filterable table view |
| `/projects/[id]/dashboard` | `app/projects/[projectId]/dashboard/page.tsx` | Analytics charts |
| `/team` | `app/team/page.tsx` | Team member cards |

## Data Flow

```
┌──────────────────────────────────────────────────────────┐
│                    Browser (Client)                       │
│                                                           │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────┐  │
│  │ Server       │    │ Client       │    │ Client      │  │
│  │ Components   │───>│ Components   │───>│ fetch()     │  │
│  │ (initial     │    │ (interactiv- │    │ mutations   │  │
│  │  data load)  │    │  ity, state) │    │             │  │
│  └─────────────┘    └──────────────┘    └──────┬──────┘  │
│                                                 │         │
└─────────────────────────────────────────────────┼─────────┘
                                                  │
                                                  ▼
┌──────────────────────────────────────────────────────────┐
│                  Next.js API Routes                       │
│                  /api/projects, /api/tasks, etc.          │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                  lib/db.ts                                │
│                  Synchronous fs read/write                │
└──────────────────────────┬───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                  data/db.json                             │
│                  JSON file database                       │
└──────────────────────────────────────────────────────────┘
```

1. **Server Components** fetch data directly via `lib/db.ts` at render time
2. Data is passed as props to **Client Components** for interactivity
3. User actions trigger `fetch()` calls to **API Routes**
4. API Routes use `lib/db.ts` to read/write `data/db.json`
5. Client calls `router.refresh()` to re-render Server Components with fresh data

## State Management

- **No global state library** (no Redux, Zustand, Context)
- Server Components handle initial data fetching
- Client Components use `useState` for local UI state (modals, forms, filters)
- Kanban board uses **optimistic updates**: local state updates immediately, API call fires in background
- Backlog uses URL-based filtering via query parameters

## Authentication

None. This is a demo/learning application with no auth layer.

## External Integrations

None. The app is fully self-contained with local JSON storage.
