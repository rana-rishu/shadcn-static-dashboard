import React from "react";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  TrendingUp,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MetricData } from "../../types";
import { cn } from "../../lib/utils";

const iconComponents = {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  TrendingUp,
  ShoppingBag,
};

export function MetricCard({ metric }: { metric: MetricData }) {
  const Icon = iconComponents[metric.iconName] || DollarSign;

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </CardTitle>
        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{metric.value}</div>
        <div className="flex items-center space-x-1.5 mt-1.5 text-xs text-muted-foreground">
          <span
            className={cn(
              "inline-flex items-center font-semibold rounded px-1 py-0.5",
              metric.isPositive
                ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400"
                : "text-rose-600 bg-rose-500/10 dark:text-rose-400"
            )}
          >
            {metric.isPositive ? (
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-0.5" />
            )}
            {metric.change}
          </span>
          <span className="truncate">{metric.period}</span>
        </div>
      </CardContent>
    </Card>
  );
}
