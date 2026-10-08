import React from "react";
import { RevenueBarChart } from "../dashboard/RevenueBarChart";
import { UserGrowthAreaChart } from "../dashboard/UserGrowthAreaChart";
import { TrafficPieChart } from "../dashboard/TrafficPieChart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import {
  mockMonthlyRevenue,
  mockGrowthData,
  mockTrafficSources,
} from "../../data/mockData";

export function AnalyticsView() {
  const kpiStats = [
    { label: "Conversion Rate", value: "3.24%", change: "+0.8%", positive: true },
    { label: "Bounce Rate", value: "34.1%", change: "-2.4%", positive: true },
    { label: "Avg Session Duration", value: "4m 32s", change: "+14s", positive: true },
    { label: "Cost Per Acquisition", value: "$18.50", change: "-$3.20", positive: true },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Analytics KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {stat.change} vs previous period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueBarChart data={mockMonthlyRevenue} />
        <TrafficPieChart data={mockTrafficSources} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <UserGrowthAreaChart data={mockGrowthData} />
      </div>
    </div>
  );
}
