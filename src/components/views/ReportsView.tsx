import React from "react";
import { Download, FileSpreadsheet, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export function ReportsView({
  onTriggerToast,
}: {
  onTriggerToast: (
    title: string,
    description: string,
    type?: "default" | "success" | "warning" | "destructive"
  ) => void;
}) {
  const reports = [
    {
      title: "Monthly Financial Statement (March 2026)",
      desc: "Complete reconciliation of revenues, Stripe payout fees, and refunds.",
      format: "PDF & CSV",
      size: "2.4 MB",
    },
    {
      title: "Tax & Compliance Audit Log (Q1 2026)",
      desc: "Detailed VAT/GST tax records breakdown by country and region.",
      format: "XLSX",
      size: "1.8 MB",
    },
    {
      title: "User Acquisition & Funnel Analytics Report",
      desc: "Breakdown of organic vs paid ad conversion metrics across channels.",
      format: "PDF",
      size: "4.1 MB",
    },
    {
      title: "Security & Access Audit Trail",
      desc: "IP login history, 2FA enforcement, and admin privilege access logs.",
      format: "JSON / CSV",
      size: "950 KB",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <Card>
        <CardHeader>
          <CardTitle>Exportable Financial & Audit Reports</CardTitle>
          <CardDescription>
            Download structured accounting summaries and system activity reports
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {reports.map((r, i) => (
            <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{r.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                  <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-muted-foreground">
                    <span className="font-medium bg-muted px-2 py-0.5 rounded">{r.format}</span>
                    <span>{r.size}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 self-start sm:self-center"
                onClick={() =>
                  onTriggerToast("Download Started", `Downloading ${r.title}...`, "success")
                }
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
