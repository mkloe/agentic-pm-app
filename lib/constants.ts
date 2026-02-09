import type { Status, Priority, Role } from "@/types";

export const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bgColor: string }
> = {
  todo: { label: "To Do", color: "text-gray-700", bgColor: "bg-gray-100" },
  in_progress: {
    label: "In Progress",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  in_review: {
    label: "In Review",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
  },
  done: { label: "Done", color: "text-green-700", bgColor: "bg-green-100" },
};

export const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; color: string; bgColor: string }
> = {
  low: { label: "Low", color: "text-gray-600", bgColor: "bg-gray-100" },
  medium: {
    label: "Medium",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
  },
  high: { label: "High", color: "text-orange-700", bgColor: "bg-orange-100" },
  critical: {
    label: "Critical",
    color: "text-red-700",
    bgColor: "bg-red-100",
  },
};

export const ROLE_LABELS: Record<Role, string> = {
  pm: "Product Manager",
  frontend: "Frontend Engineer",
  backend: "Backend Engineer",
  design: "Designer",
  fullstack: "Full-Stack Engineer",
};

export const STATUSES: Status[] = ["todo", "in_progress", "in_review", "done"];
export const PRIORITIES: Priority[] = ["low", "medium", "high", "critical"];

export const CHART_COLORS = {
  todo: "#9ca3af",
  in_progress: "#3b82f6",
  in_review: "#8b5cf6",
  done: "#22c55e",
  low: "#9ca3af",
  medium: "#eab308",
  high: "#f97316",
  critical: "#ef4444",
};
