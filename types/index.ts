export type Status = "todo" | "in_progress" | "in_review" | "done";
export type Priority = "low" | "medium" | "high" | "critical";
export type Role = "pm" | "frontend" | "backend" | "design" | "fullstack";

export interface Project {
  id: string;
  name: string;
  description: string;
  key: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assigneeId: string | null;
  labels: string[];
  storyPoints: number | null;
  dueDate: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface DashboardStats {
  totalTasks: number;
  byStatus: Record<Status, number>;
  byPriority: Record<Priority, number>;
  byAssignee: { name: string; count: number }[];
  totalStoryPoints: number;
  completedStoryPoints: number;
  overdueTasks: number;
}

export interface Database {
  projects: Project[];
  tasks: Task[];
  teamMembers: TeamMember[];
  labels: Label[];
}
