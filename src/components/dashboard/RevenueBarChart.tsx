import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { MonthlyRevenueData } from "../../types";
import { formatCurrency } from "../../lib/utils";

interface RevenueBarChartProps {
  data: MonthlyRevenueData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-card p-3 shadow-md text-xs">
        <p className="font-semibold text-foreground mb-1">{label} Revenue</p>
        <p className="text-primary font-medium">
          Total: {formatCurrency(payload[0].payload.total)}
        </p>
        <p className="text-emerald-600 dark:text-emerald-400">
          Subscriptions: {formatCurrency(payload[0].payload.subscriptions)}
        </p>
        <p className="text-amber-600 dark:text-amber-400">
          Direct Sales: {formatCurrency(payload[0].payload.directSales)}
        </p>
      </div>
    );
  }
  return null;
};

export function RevenueBarChart({ data }: RevenueBarChartProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Monthly Revenue Overview</CardTitle>
            <CardDescription>
              Annual financial distribution across all recurring and direct streams
            </CardDescription>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs">
            <span className="inline-flex items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-primary mr-1.5" />
              Subscriptions
            </span>
            <span className="inline-flex items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 mr-1.5" />
              Direct Sales
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="subscriptions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="directSales" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
