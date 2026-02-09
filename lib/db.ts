import fs from "fs";
import path from "path";
import type { Database, Project, Task, TeamMember, Label } from "@/types";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

function readDb(): Database {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDb(db: Database): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

// Projects
export function getProjects(): Project[] {
  return readDb().projects;
}

export function getProject(id: string): Project | undefined {
  return readDb().projects.find((p) => p.id === id);
}

export function createProject(
  data: Omit<Project, "id" | "createdAt" | "updatedAt">
): Project {
  const db = readDb();
  const project: Project = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.projects.push(project);
  writeDb(db);
  return project;
}

export function updateProject(
  id: string,
  data: Partial<Omit<Project, "id" | "createdAt">>
): Project | null {
  const db = readDb();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  db.projects[idx] = {
    ...db.projects[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  writeDb(db);
  return db.projects[idx];
}

export function deleteProject(id: string): boolean {
  const db = readDb();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  db.projects.splice(idx, 1);
  db.tasks = db.tasks.filter((t) => t.projectId !== id);
  writeDb(db);
  return true;
}

// Tasks
export function getTasks(filters?: {
  projectId?: string;
  status?: string;
  priority?: string;
}): Task[] {
  let tasks = readDb().tasks;
  if (filters?.projectId) tasks = tasks.filter((t) => t.projectId === filters.projectId);
  if (filters?.status) tasks = tasks.filter((t) => t.status === filters.status);
  if (filters?.priority) tasks = tasks.filter((t) => t.priority === filters.priority);
  return tasks.sort((a, b) => a.order - b.order);
}

export function getTask(id: string): Task | undefined {
  return readDb().tasks.find((t) => t.id === id);
}

export function createTask(
  data: Omit<Task, "id" | "createdAt" | "updatedAt">
): Task {
  const db = readDb();
  const task: Task = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.tasks.push(task);
  writeDb(db);
  return task;
}

export function updateTask(
  id: string,
  data: Partial<Omit<Task, "id" | "createdAt">>
): Task | null {
  const db = readDb();
  const idx = db.tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  db.tasks[idx] = {
    ...db.tasks[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  writeDb(db);
  return db.tasks[idx];
}

export function deleteTask(id: string): boolean {
  const db = readDb();
  const idx = db.tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  db.tasks.splice(idx, 1);
  writeDb(db);
  return true;
}

export function reorderTasks(
  updates: { id: string; status: string; order: number }[]
): void {
  const db = readDb();
  for (const update of updates) {
    const idx = db.tasks.findIndex((t) => t.id === update.id);
    if (idx !== -1) {
      db.tasks[idx].status = update.status as Task["status"];
      db.tasks[idx].order = update.order;
      db.tasks[idx].updatedAt = new Date().toISOString();
    }
  }
  writeDb(db);
}

// Team Members
export function getTeamMembers(): TeamMember[] {
  return readDb().teamMembers;
}

// Labels
export function getLabels(): Label[] {
  return readDb().labels;
}
