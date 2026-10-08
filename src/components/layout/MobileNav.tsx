import React from "react";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  FileText,
  Bell,
  Settings,
  X,
  Sparkles,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { DashboardView } from "../../types";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  notificationCount?: number;
}

export function MobileNav({
  open,
  onClose,
  currentView,
  onViewChange,
  notificationCount = 2,
}: MobileNavProps) {
  if (!open) return null;

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

  const handleSelect = (view: DashboardView) => {
    onViewChange(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-card p-6 shadow-2xl border-r flex flex-col justify-between animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-bold text-base">Acme Cloud</span>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={cn(
                    "flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("mr-3 h-4 w-4", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant={isActive ? "secondary" : "default"} className="ml-auto text-[10px]">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile */}
        <div className="pt-4 border-t flex items-center space-x-3">
          <Avatar
            fallback="RR"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Rishu Rana</p>
            <p className="text-xs text-muted-foreground truncate">rishu@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
