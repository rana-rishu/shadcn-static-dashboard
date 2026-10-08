import React from "react";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "../../lib/utils";
import { ToastNotification } from "../../types";

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 max-w-md w-full px-4 sm:px-0">
      {toasts.map((t) => {
        const iconMap = {
          success: <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />,
          destructive: <AlertCircle className="h-5 w-5 text-destructive shrink-0" />,
          warning: <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />,
          default: <Info className="h-5 w-5 text-primary shrink-0" />,
        };

        const borderMap = {
          success: "border-emerald-500/30 bg-card",
          destructive: "border-destructive/40 bg-card",
          warning: "border-amber-500/30 bg-card",
          default: "border-border bg-card",
        };

        const type = t.type || "default";

        return (
          <div
            key={t.id}
            className={cn(
              "flex items-start justify-between rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-bottom-5 duration-300",
              borderMap[type]
            )}
          >
            <div className="flex items-start space-x-3">
              {iconMap[type]}
              <div>
                <h4 className="text-sm font-semibold">{t.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="text-muted-foreground hover:text-foreground rounded p-0.5 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
