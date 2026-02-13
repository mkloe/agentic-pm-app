# Data Models

All types are defined in `types/index.ts`.

## Enums

### Status

```typescript
type Status = "todo" | "in_progress" | "in_review" | "done";
```

| Value | Display Label | Color |
|-------|--------------|-------|
| `todo` | To Do | Gray |
| `in_progress` | In Progress | Blue |
| `in_review` | In Review | Purple |
| `done` | Done | Green |

### Priority

```typescript
type Priority = "low" | "medium" | "high" | "critical";
```

| Value | Display Label | Color |
|-------|--------------|-------|
| `low` | Low | Gray |
| `medium` | Medium | Yellow |
| `high` | High | Orange |
| `critical` | Critical | Red |

### Role

```typescript
type Role = "pm" | "frontend" | "backend" | "design" | "fullstack";
```

| Value | Display Label |
|-------|--------------|
| `pm` | Product Manager |
| `frontend` | Frontend Engineer |
| `backend` | Backend Engineer |
| `design` | Designer |
| `fullstack` | Full-Stack Engineer |

## Entities

### Project

```typescript
interface Project {
  id: string;            // UUID, auto-generated
  name: string;          // Project name
  description: string;   // Project description
  key: string;           // Short abbreviation (e.g., "PM")
  createdAt: string;     // ISO 8601 timestamp
  updatedAt: string;     // ISO 8601 timestamp
}
```

### Task

```typescript
interface Task {
  id: string;                 // UUID, auto-generated
  projectId: string;          // FK to Project.id
  title: string;              // Task title (required)
  description: string;        // Task description
  status: Status;             // Current status
  priority: Priority;         // Priority level
  assigneeId: string | null;  // FK to TeamMember.id (nullable)
  labels: string[];           // Array of Label.id references
  storyPoints: number | null; // Estimation points (nullable)
  dueDate: string | null;     // ISO 8601 date (nullable)
  order: number;              // Sort order within a column
  createdAt: string;          // ISO 8601 timestamp
  updatedAt: string;          // ISO 8601 timestamp
}
```

### TeamMember

```typescript
interface TeamMember {
  id: string;       // Prefixed ID (e.g., "user-1")
  name: string;     // Full name
  email: string;    // Email address
  avatar: string;   // Avatar URL (currently empty)
  role: Role;       // Team role
}
```

### Label

```typescript
interface Label {
  id: string;       // Prefixed ID (e.g., "label-1")
  name: string;     // Label name (e.g., "Bug", "Feature")
  color: string;    // Hex color (e.g., "#ef4444")
}
```

### DashboardStats

Computed on the fly by the dashboard API endpoint. Not stored in the database.

```typescript
interface DashboardStats {
  totalTasks: number;                          // Total task count
  byStatus: Record<Status, number>;            // Count per status
  byPriority: Record<Priority, number>;        // Count per priority
  byAssignee: { name: string; count: number }[]; // Count per assignee
  totalStoryPoints: number;                    // Sum of all story points
  completedStoryPoints: number;                // Story points in "done"
  overdueTasks: number;                        // Past-due, not done
}
```

## Database Schema

The full database is stored as a single JSON file (`data/db.json`):

```typescript
interface Database {
  projects: Project[];
  tasks: Task[];
  teamMembers: TeamMember[];
  labels: Label[];
}
```

## Entity Relationships

```
Project 1───* Task *───1 TeamMember (via assigneeId, nullable)
                  *───* Label (via labels[] array)
```

- Deleting a **Project** cascading-deletes all its **Tasks**
- **TeamMember** and **Label** are standalone entities (no cascading deletes)
- A Task can have zero or more Labels, and zero or one Assignee
