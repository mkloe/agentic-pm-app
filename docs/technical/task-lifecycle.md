 # Task lifecycle and APIs

This diagram is based on `types/index.ts`, `lib/db.ts`, the task API routes under `app/api/tasks`, and the task UI flows in `components/board/KanbanBoard.tsx` and `components/tasks/TaskModal.tsx`.

```mermaid
flowchart LR
    START([User creates task in UI])

    START --> CREATE[Create task\nPOST /api/tasks]
    CREATE --> TODO[Status: todo]

    LIST[View tasks\nGET /api/tasks]
    DETAIL[View single task\nGET /api/tasks/:id]

    LIST --> TODO
    LIST --> INPROG
    LIST --> INREV
    LIST --> DONE

    TODO --> DETAIL
    INPROG --> DETAIL
    INREV --> DETAIL
    DONE --> DETAIL

    TODO -->|Start work\nPATCH /api/tasks/:id\nor PATCH /api/tasks/reorder| INPROG[Status: in_progress]
    INPROG -->|Send to review\nPATCH /api/tasks/:id\nor PATCH /api/tasks/reorder| INREV[Status: in_review]
    INREV -->|Mark done\nPATCH /api/tasks/:id\nor PATCH /api/tasks/reorder| DONE[Status: done]

    TODO -->|Skip straight to done\nPATCH /api/tasks/:id\nor PATCH /api/tasks/reorder| DONE
    INPROG -->|Skip review\nPATCH /api/tasks/:id\nor PATCH /api/tasks/reorder| DONE

    TODO -->|Delete task\nDELETE /api/tasks/:id| DELETED([Deleted])
    INPROG -->|Delete task\nDELETE /api/tasks/:id| DELETED
    INREV -->|Delete task\nDELETE /api/tasks/:id| DELETED
    DONE -->|Delete task\nDELETE /api/tasks/:id| DELETED
```

