# API Reference

All endpoints return JSON. Base URL: `http://localhost:3000`.

---

## Projects

### List Projects

```
GET /api/projects
```

**Response** `200 OK`

```json
[
  {
    "id": "proj-1",
    "name": "Agentic PM App",
    "description": "A modern project management tool...",
    "key": "PM",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "updatedAt": "2025-01-20T14:30:00.000Z"
  }
]
```

### Create Project

```
POST /api/projects
Content-Type: application/json
```

**Body** (required fields: `name`, `key`)

```json
{
  "name": "My Project",
  "description": "Optional description",
  "key": "MP"
}
```

**Response** `201 Created` — returns the created project with generated `id`, `createdAt`, `updatedAt`.

**Error** `400` — if `name` or `key` is missing.

### Get Project

```
GET /api/projects/:id
```

**Response** `200 OK` — single project object.

**Error** `404` — `{ "error": "Project not found" }`

### Update Project

```
PATCH /api/projects/:id
Content-Type: application/json
```

**Body** — partial project fields (e.g., `name`, `description`, `key`).

**Response** `200 OK` — updated project. `updatedAt` is set automatically.

**Error** `404` — project not found.

### Delete Project

```
DELETE /api/projects/:id
```

Cascading: also deletes all tasks belonging to this project.

**Response** `200 OK` — `{ "success": true }`

**Error** `404` — project not found.

---

## Tasks

### List Tasks

```
GET /api/tasks
```

**Query Parameters** (all optional)

| Param | Type | Description |
|-------|------|-------------|
| `projectId` | string | Filter by project |
| `status` | string | Filter by status (`todo`, `in_progress`, `in_review`, `done`) |
| `priority` | string | Filter by priority (`low`, `medium`, `high`, `critical`) |

**Response** `200 OK` — array of tasks, sorted by `order` ascending.

### Create Task

```
POST /api/tasks
Content-Type: application/json
```

**Body** (required fields: `projectId`, `title`)

```json
{
  "projectId": "proj-1",
  "title": "New task",
  "description": "",
  "status": "todo",
  "priority": "medium",
  "assigneeId": null,
  "labels": [],
  "storyPoints": null,
  "dueDate": null,
  "order": 0
}
```

All fields except `projectId` and `title` have defaults.

**Response** `201 Created` — created task with generated `id`, `createdAt`, `updatedAt`.

**Error** `400` — if `projectId` or `title` is missing.

### Get Task

```
GET /api/tasks/:id
```

**Response** `200 OK` — single task object.

**Error** `404` — `{ "error": "Task not found" }`

### Update Task

```
PATCH /api/tasks/:id
Content-Type: application/json
```

**Body** — partial task fields.

```json
{
  "status": "in_progress",
  "priority": "high"
}
```

**Response** `200 OK` — updated task. `updatedAt` is set automatically.

**Error** `404` — task not found.

### Delete Task

```
DELETE /api/tasks/:id
```

**Response** `200 OK` — `{ "success": true }`

**Error** `404` — task not found.

### Reorder Tasks (Bulk)

```
PATCH /api/tasks/reorder
Content-Type: application/json
```

Used by the Kanban board for drag-and-drop. Updates status and order for multiple tasks at once.

**Body**

```json
{
  "updates": [
    { "id": "task-1", "status": "in_progress", "order": 0 },
    { "id": "task-2", "status": "in_progress", "order": 1 }
  ]
}
```

**Response** `200 OK` — `{ "success": true }`

**Error** `400` — if `updates` is not an array.

---

## Team

### List Team Members

```
GET /api/team
```

**Response** `200 OK`

```json
[
  {
    "id": "user-1",
    "name": "Sarah Chen",
    "email": "sarah@agenticpm.com",
    "avatar": "",
    "role": "pm"
  }
]
```

---

## Labels

### List Labels

```
GET /api/labels
```

**Response** `200 OK`

```json
[
  { "id": "label-1", "name": "Bug", "color": "#ef4444" },
  { "id": "label-2", "name": "Feature", "color": "#3b82f6" }
]
```

---

## Dashboard

### Get Dashboard Stats

```
GET /api/dashboard/:projectId
```

Computes aggregate statistics for the given project.

**Response** `200 OK`

```json
{
  "totalTasks": 18,
  "byStatus": {
    "todo": 8,
    "in_progress": 3,
    "in_review": 2,
    "done": 5
  },
  "byPriority": {
    "low": 3,
    "medium": 7,
    "high": 5,
    "critical": 3
  },
  "byAssignee": [
    { "name": "Sarah Chen", "count": 1 },
    { "name": "Marcus Johnson", "count": 4 }
  ],
  "totalStoryPoints": 117,
  "completedStoryPoints": 26,
  "overdueTasks": 3
}
```

Overdue logic: `dueDate < now AND status !== "done"`.
