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
import { STATUS_CONFIG, CHART_COLORS } from "@/lib/constants";
import type { DashboardStats, Status } from "@/types";

interface StatusChartProps {
  stats: DashboardStats;
}

export function StatusChart({ stats }: StatusChartProps) {
  const data = (Object.entries(stats.byStatus) as [Status, number][]).map(
    ([status, count]) => ({
      name: STATUS_CONFIG[status].label,
      value: count,
      status,
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tasks by Status</CardTitle>
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
                  key={entry.status}
                  fill={CHART_COLORS[entry.status]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
