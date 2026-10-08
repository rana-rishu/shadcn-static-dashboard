import React, { useState } from "react";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  CheckCheck,
  User,
  CreditCard,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { mockNotifications } from "../../data/mockData";
import { DashboardView } from "../../types";

interface HeaderProps {
  currentView: DashboardView;
  onOpenMobileNav: () => void;
  onViewChange: (view: DashboardView) => void;
  onSearch?: (query: string) => void;
}

export function Header({ currentView, onOpenMobileNav, onViewChange, onSearch }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const viewTitles: Record<DashboardView, { title: string; subtitle: string }> = {
    overview: { title: "Dashboard Overview", subtitle: "Real-time metrics, analytics & recent transactions" },
    analytics: { title: "Performance Analytics", subtitle: "Deep-dive traffic channels and conversion rates" },
    customers: { title: "Customers & Accounts", subtitle: "Manage user profiles and customer lifetime value" },
    reports: { title: "Financial & Sales Reports", subtitle: "Generate, export and filter detailed audit logs" },
    notifications: { title: "System Notifications", subtitle: "Alerts, webhook logs, and automated notifications" },
    settings: { title: "System Settings", subtitle: "Customize your workspace preferences and security" },
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 md:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left section: Mobile trigger & Page Titles */}
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onOpenMobileNav}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-bold tracking-tight capitalize">
            {viewTitles[currentView]?.title || "Dashboard"}
          </h1>
          <p className="hidden sm:block text-xs text-muted-foreground">
            {viewTitles[currentView]?.subtitle}
          </p>
        </div>
      </div>

      {/* Right section: Search bar, Notifications, Theme toggle, User profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Search Bar */}
        <div className="relative hidden lg:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search dashboard... (⌘K)"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 h-9 bg-muted/30 focus:bg-background"
          />
        </div>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="relative inline-flex items-center justify-center h-9 w-9 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="right" className="w-80 p-0">
            <div className="flex items-center justify-between p-3 border-b">
              <div>
                <p className="text-sm font-semibold">Notifications</p>
                <p className="text-xs text-muted-foreground">{unreadCount} unread alerts</p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center text-xs text-primary hover:underline"
                >
                  <CheckCheck className="h-3.5 w-3.5 mr-1" />
                  Mark read
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto divide-y">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 text-xs transition-colors hover:bg-muted/50 cursor-pointer ${
                    n.unread ? "bg-primary/5" : ""
                  }`}
                  onClick={() => onViewChange("notifications")}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span>{n.title}</span>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-muted-foreground mt-1 line-clamp-2">{n.description}</p>
                </div>
              ))}
            </div>
            <div className="p-2 border-t text-center">
              <button
                onClick={() => onViewChange("notifications")}
                className="text-xs text-primary font-medium hover:underline"
              >
                View all notifications
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          className="h-9 w-9"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4 transition-all text-slate-700" />
          ) : (
            <Sun className="h-4 w-4 transition-all text-amber-400" />
          )}
        </Button>

        {/* User Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center space-x-2 cursor-pointer p-0.5 rounded-full hover:ring-2 hover:ring-primary/40 transition-all">
              <Avatar
                fallback="RR"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                size="sm"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="right" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">Rishu Rana</p>
                <p className="text-xs leading-none text-muted-foreground">rishu@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onViewChange("overview")}>
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard Home</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewChange("reports")}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing & Invoices</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewChange("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              destructive
              onClick={() => alert("Logged out successfully")}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
