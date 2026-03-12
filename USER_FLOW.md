# Agentic PM — Main User Flow

```mermaid
flowchart TD
    A([Open App]) --> B[Projects List\n/ home page]

    B --> C{Has projects?}
    C -- No --> D[Click 'New Project']
    C -- Yes --> G

    D --> E[Fill in Name, Key, Description]
    E --> F[Create Project]
    F --> B

    B --> G[Select a Project]
    G --> H[Project View\n3 tabs: Board / Backlog / Dashboard]

    H --> TAB1[Board Tab]
    H --> TAB2[Backlog Tab]
    H --> TAB3[Dashboard Tab]

    %% Board flow
    TAB1 --> K[Kanban Board\nTodo / In Progress / In Review / Done]
    K --> K1[Drag task card\nto another column]
    K1 --> K2[Status + order saved\nvia PATCH /api/tasks/reorder]
    K --> K3[Click task card]
    K3 --> M

    %% Backlog flow
    TAB2 --> L[Backlog Table\nall tasks in a flat list]
    L --> L1[Filter by Status /\nPriority / Assignee]
    L --> L2[Sort by Title /\nPriority / Story Points]
    L --> L3[Click a row]
    L3 --> M

    %% Task Modal
    M[Task Modal\nview & edit task]
    M --> M1[Edit Title / Description]
    M --> M2[Change Status / Priority]
    M --> M3[Set Assignee]
    M --> M4[Set Story Points / Due Date]
    M1 & M2 & M3 & M4 --> M5[Save]
    M5 --> M6[PATCH /api/tasks/:id\ntask updated in-place]
    M6 --> K
    M6 --> L

    %% Dashboard flow
    TAB3 --> N[Dashboard\naggregated stats for the project]
    N --> N1[Stats Cards\ntotal / done / in-progress / overdue]
    N --> N2[Status Chart\ntask distribution by status]
    N --> N3[Priority Chart\ntask distribution by priority]
    N --> N4[Workload Chart\ntasks per team member]
```

## Key interactions at a glance

| Where | What the user does | Result |
|---|---|---|
| Projects list | Create project | New project added, redirected back to list |
| Board | Drag task card | Status & order persisted immediately |
| Board / Backlog | Click task | Task Modal opens for editing |
| Task Modal | Edit fields & Save | Task updated via API, view refreshed in-place |
| Backlog | Filter / Sort | Client-side filtering, no extra API call |
| Dashboard | View only | Aggregated stats loaded from `/api/dashboard/:projectId` |
