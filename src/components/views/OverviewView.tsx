import React, { useState } from "react";
import { MetricCard } from "../dashboard/MetricCard";
import { RevenueBarChart } from "../dashboard/RevenueBarChart";
import { UserGrowthAreaChart } from "../dashboard/UserGrowthAreaChart";
import { TrafficPieChart } from "../dashboard/TrafficPieChart";
import { TransactionsTable } from "../dashboard/TransactionsTable";
import { DateRangeSelector } from "../dashboard/DateRangeSelector";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  mockMetrics,
  mockMonthlyRevenue,
  mockGrowthData,
  mockTrafficSources,
  mockTransactions,
} from "../../data/mockData";

interface OverviewViewProps {
  onTriggerToast: (
    title: string,
    description: string,
    type?: "default" | "success" | "warning" | "destructive"
  ) => void;
}

export function OverviewView({ onTriggerToast }: OverviewViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleRefresh = () => {
    onTriggerToast("Data Refreshed", "Dashboard metrics have been synced with live data.", "success");
  };

  const handleDownload = () => {
    onTriggerToast("Export Started", "Generating PDF & CSV performance report...", "success");
  };

  const handleDateChange = (range: string) => {
    onTriggerToast("Date Filter Applied", `Filtered analytics for: ${range}`, "default");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action & Date Range Filter Bar */}
      <DateRangeSelector
        onRefresh={handleRefresh}
        onDownloadReport={handleDownload}
        onDateRangeChange={handleDateChange}
      />

      {/* Tabs navigation menu */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between border-b pb-2">
          <TabsList className="bg-muted/80 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Performance</TabsTrigger>
            <TabsTrigger value="reports">Sales Reports</TabsTrigger>
            <TabsTrigger value="integrations" disabled>
              Integrations (Pro)
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content 1: Main Overview */}
        <TabsContent value="overview" className="space-y-6 mt-4">
          {/* Metric KPI Cards (4 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Charts Row: Revenue Bar Chart (2 cols) & Traffic Channels (1 col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RevenueBarChart data={mockMonthlyRevenue} />
            <TrafficPieChart data={mockTrafficSources} />
          </div>

          {/* Growth Area Chart (Full Width / 2 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserGrowthAreaChart data={mockGrowthData} />
            <div className="col-span-1 flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm">
              <div>
                <h3 className="font-semibold tracking-tight text-lg">Quick Performance Summary</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Key benchmarks and SLA targets achieved during current billing cycle.
                </p>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Monthly Revenue Target ($50,000)</span>
                      <span className="text-primary font-bold">90.4%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "90.4%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Server Uptime SLA (99.99%)</span>
                      <span className="text-emerald-600 font-bold">99.98%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: "99.98%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Customer Retention Rate (85%)</span>
                      <span className="text-purple-600 font-bold">88.2%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: "88.2%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>System status: Operational</span>
                <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5 animate-ping" />
                  All systems normal
                </span>
              </div>
            </div>
          </div>

          {/* Transactions Data Table */}
          <TransactionsTable
            transactions={mockTransactions}
            onTriggerToast={onTriggerToast}
          />
        </TabsContent>

        {/* Tab Content 2: Performance */}
        <TabsContent value="analytics" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserGrowthAreaChart data={mockGrowthData} />
            <RevenueBarChart data={mockMonthlyRevenue} />
          </div>
        </TabsContent>

        {/* Tab Content 3: Reports */}
        <TabsContent value="reports" className="mt-4">
          <TransactionsTable
            transactions={mockTransactions}
            onTriggerToast={onTriggerToast}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
