export type DashboardView = "overview" | "analytics" | "customers" | "reports" | "notifications" | "settings";

export interface MetricData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  iconName: "DollarSign" | "Users" | "CreditCard" | "Activity" | "TrendingUp" | "ShoppingBag";
}

export interface Transaction {
  id: string;
  customerName: string;
  email: string;
  avatarUrl?: string;
  amount: number;
  status: "paid" | "pending" | "failed" | "refunded";
  date: string;
  paymentMethod: "Credit Card" | "PayPal" | "Stripe" | "Bank Transfer";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  spent: number;
  orders: number;
  status: "active" | "inactive" | "lead";
  lastActive: string;
  avatar: string;
}

export interface MonthlyRevenueData {
  month: string;
  total: number;
  subscriptions: number;
  directSales: number;
}

export interface GrowthDataPoint {
  date: string;
  visitors: number;
  pageViews: number;
  conversions: number;
}

export interface TrafficSourceData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface ToastNotification {
  id: string;
  title: string;
  description: string;
  type?: "default" | "success" | "warning" | "destructive";
}
