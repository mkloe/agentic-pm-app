"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Kanban, List, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectTabsProps {
  projectId: string;
}

export function ProjectTabs({ projectId }: ProjectTabsProps) {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Board",
      href: `/projects/${projectId}/board`,
      icon: Kanban,
    },
    {
      name: "Backlog",
      href: `/projects/${projectId}/backlog`,
      icon: List,
    },
    {
      name: "Dashboard",
      href: `/projects/${projectId}/dashboard`,
      icon: BarChart3,
    },
  ];

  return (
    <div className="border-b border-zinc-200 px-6">
      <nav className="flex gap-4">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex items-center gap-1.5 border-b-2 px-1 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-zinc-900 text-zinc-900"
                  : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
