import React, { useState } from "react";
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { mockNotifications } from "../../data/mockData";

export function NotificationsView({
  onTriggerToast,
}: {
  onTriggerToast: (
    title: string,
    description: string,
    type?: "default" | "success" | "warning" | "destructive"
  ) => void;
}) {
  const [notifs, setNotifs] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
    onTriggerToast("Marked as Read", "All notifications marked as read.", "success");
  };

  const clearAll = () => {
    setNotifs([]);
    onTriggerToast("Cleared", "All notifications removed.", "success");
  };

  return (
    <div className="space-y-6 pb-12">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>System Notifications & Alerts</CardTitle>
              <CardDescription>
                Track transactional events, billing milestones, and security updates
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={markAllRead} className="gap-1.5 text-xs">
                <CheckCheck className="h-3.5 w-3.5" />
                <span>Mark all as read</span>
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll} className="gap-1.5 text-xs text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear all</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="divide-y">
          {notifs.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No new notifications.</p>
            </div>
          ) : (
            notifs.map((n) => (
              <div
                key={n.id}
                className={`py-4 flex items-start justify-between gap-4 first:pt-0 last:pb-0 ${
                  n.unread ? "font-medium" : "opacity-80"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm">{n.title}</h4>
                      {n.unread && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.description}</p>
                    <span className="text-[11px] text-muted-foreground mt-1 block">{n.time}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
