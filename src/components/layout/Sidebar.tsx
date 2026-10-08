import React from "react";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  Bell,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { DashboardView } from "../../types";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface SidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  notificationCount?: number;
}

export function Sidebar({
  currentView,
  onViewChange,
  collapsed,
  onToggleCollapse,
  notificationCount = 2,
}: SidebarProps) {
  const navItems = [
    { id: "overview" as DashboardView, label: "Overview", icon: LayoutDashboard },
    { id: "analytics" as DashboardView, label: "Analytics", icon: BarChart3 },
    { id: "customers" as DashboardView, label: "Customers", icon: Users },
    { id: "reports" as DashboardView, label: "Reports", icon: FileText },
    {
      id: "notifications" as DashboardView,
      label: "Notifications",
      icon: Bell,
      badge: notificationCount > 0 ? notificationCount : undefined,
    },
    { id: "settings" as DashboardView, label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r bg-card transition-all duration-300 h-screen sticky top-0 z-30 select-none",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col transition-opacity duration-200">
              <span className="font-bold text-sm tracking-tight">Acme Cloud</span>
              <span className="text-[11px] text-muted-foreground">Enterprise Dashboard</span>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className={cn("px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", collapsed && "text-center")}>
          {collapsed ? "•••" : "Main Menu"}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "group relative flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("h-4 w-4 shrink-0", !collapsed && "mr-3", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
              {!collapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <Badge
                  variant={isActive ? "secondary" : "default"}
                  className={cn("ml-auto text-[10px] h-5 px-1.5 py-0 font-bold", isActive && "bg-white/20 text-white")}
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* User Profile Footer */}
      <div className="border-t p-3 bg-muted/20">
        <div
          className={cn(
            "flex items-center rounded-lg p-2 transition-colors hover:bg-muted/60",
            collapsed ? "justify-center" : "space-x-3"
          )}
        >
          <Avatar
            fallback="RR"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            size="sm"
          />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate leading-tight">Rishu Rana</p>
              <p className="text-[11px] text-muted-foreground truncate">rishu@example.com</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => onViewChange("settings")}
              className="text-muted-foreground hover:text-foreground p-1"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
