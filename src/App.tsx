import React, { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { MobileNav } from "./components/layout/MobileNav";
import { OverviewView } from "./components/views/OverviewView";
import { AnalyticsView } from "./components/views/AnalyticsView";
import { CustomersView } from "./components/views/CustomersView";
import { ReportsView } from "./components/views/ReportsView";
import { NotificationsView } from "./components/views/NotificationsView";
import { SettingsView } from "./components/views/SettingsView";
import { ToastContainer } from "./components/ui/toast";
import { DashboardView, ToastNotification } from "./types";
import { ThemeProvider } from "./context/ThemeContext";

function DashboardContent() {
  const [currentView, setCurrentView] = useState<DashboardView>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (
    title: string,
    description: string,
    type: "default" | "success" | "warning" | "destructive" = "default"
  ) => {
    const id = Date.now().toString();
    const newToast: ToastNotification = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "overview":
        return <OverviewView onTriggerToast={showToast} />;
      case "analytics":
        return <AnalyticsView />;
      case "customers":
        return <CustomersView onTriggerToast={showToast} />;
      case "reports":
        return <ReportsView onTriggerToast={showToast} />;
      case "notifications":
        return <NotificationsView onTriggerToast={showToast} />;
      case "settings":
        return <SettingsView onTriggerToast={showToast} />;
      default:
        return <OverviewView onTriggerToast={showToast} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      {/* Fixed Sidebar for desktop */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Responsive Mobile Drawer */}
      <MobileNav
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content Area (Independent scroll) */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header
          currentView={currentView}
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onViewChange={setCurrentView}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {renderCurrentView()}
          </div>
        </main>
      </div>

      {/* Toast Alert Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}
