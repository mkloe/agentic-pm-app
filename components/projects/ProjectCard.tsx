import Link from "next/link";
import { FolderKanban } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Project } from "@/types";
import { formatDate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  taskCount: number;
}

export function ProjectCard({ project, taskCount }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}/board`}>
      <Card className="transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-xs font-bold text-white">
              {project.key}
            </div>
            <CardTitle className="text-base">{project.name}</CardTitle>
          </div>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-1">
              <FolderKanban className="h-3.5 w-3.5" />
              <span>{taskCount} tasks</span>
            </div>
            <span>Updated {formatDate(project.updatedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
