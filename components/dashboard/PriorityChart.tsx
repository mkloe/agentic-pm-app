"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PRIORITY_CONFIG, CHART_COLORS } from "@/lib/constants";
import type { DashboardStats, Priority } from "@/types";

interface PriorityChartProps {
  stats: DashboardStats;
}

export function PriorityChart({ stats }: PriorityChartProps) {
  const data = (
    Object.entries(stats.byPriority) as [Priority, number][]
  ).map(([priority, count]) => ({
    name: PRIORITY_CONFIG[priority].label,
    value: count,
    priority,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tasks by Priority</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.priority}
                  fill={CHART_COLORS[entry.priority]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
