"use client";

import { StatsCards } from "./StatsCards";
import { StatusChart } from "./StatusChart";
import { PriorityChart } from "./PriorityChart";
import { WorkloadChart } from "./WorkloadChart";
import type { DashboardStats } from "@/types";

interface DashboardViewProps {
  stats: DashboardStats;
}

export function DashboardView({ stats }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      <div className="grid gap-6 lg:grid-cols-2">
        <StatusChart stats={stats} />
        <PriorityChart stats={stats} />
      </div>
      <WorkloadChart stats={stats} />
    </div>
  );
}
