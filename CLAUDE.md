# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm seed         # Reset data/db.json with seed data (destructive)
```

No test suite is configured.

## Architecture

**Agentic PM** is a Next.js 16 project management app (App Router, TypeScript, Tailwind v4).

### Data layer

The app uses a flat JSON file (`data/db.json`) as its database — no external DB. `lib/db.ts` provides synchronous CRUD helpers (`readDb`/`writeDb` on every call). All API routes call these helpers directly.

### API routes (`app/api/`)

| Route | Methods |
|---|---|
| `/api/projects` | GET, POST |
| `/api/projects/[id]` | GET, PATCH, DELETE |
| `/api/tasks` | GET (filters: projectId, status, priority), POST |
| `/api/tasks/[id]` | GET, PATCH, DELETE |
| `/api/tasks/reorder` | PATCH — bulk update status + order for drag-and-drop |
| `/api/team` | GET |
| `/api/labels` | GET |
| `/api/dashboard/[projectId]` | GET — aggregated stats |

### Frontend structure

- **`app/projects/[projectId]/`** — per-project views: `board/`, `backlog/`, `dashboard/`
- **`components/board/`** — Kanban with `@dnd-kit`. `KanbanBoard` manages drag state and calls `/api/tasks/reorder` on drop.
- **`components/tasks/`** — `TaskModal` (view/edit), `BacklogTable` + `BacklogFilters`
- **`components/dashboard/`** — Recharts-based charts (status, priority, workload)
- **`components/layout/`** — `Sidebar`, `Header`, `ProjectTabs`
- **`components/ui/`** — Radix UI primitives (Button, Badge, Card, Dialog, Select, Table, DropdownMenu)

### Key conventions

- `types/index.ts` — single source of truth for all types (`Task`, `Project`, `TeamMember`, `Label`, `Status`, `Priority`)
- `lib/constants.ts` — `STATUS_CONFIG`, `PRIORITY_CONFIG`, `STATUSES`, `PRIORITIES`, `CHART_COLORS`
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- Board pages are server components that fetch data and pass it to client components as props
- Task `order` field (integer) controls sort order within each status column
