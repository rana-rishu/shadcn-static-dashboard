import React, { useState } from "react";
import { Calendar, Download, RefreshCw, ChevronDown, Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

interface DateRangeSelectorProps {
  onRefresh?: () => void;
  onDownloadReport?: () => void;
  onDateRangeChange?: (range: string) => void;
}

export function DateRangeSelector({
  onRefresh,
  onDownloadReport,
  onDateRangeChange,
}: DateRangeSelectorProps) {
  const [selectedRange, setSelectedRange] = useState("Jan 01, 2026 - Dec 31, 2026");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const ranges = [
    "Today",
    "Last 7 Days",
    "Last 30 Days",
    "This Quarter (Q1 2026)",
    "Jan 01, 2026 - Dec 31, 2026",
  ];

  const handleSelectRange = (range: string) => {
    setSelectedRange(range);
    onDateRangeChange?.(range);
  };

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Date Range Picker Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-normal">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium text-foreground">{selectedRange}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="left" className="w-64">
          <DropdownMenuLabel>Select Date Range</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ranges.map((r) => (
            <DropdownMenuItem
              key={r}
              onClick={() => handleSelectRange(r)}
              className="flex items-center justify-between"
            >
              <span>{r}</span>
              {selectedRange === r && <Check className="h-3.5 w-3.5 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefreshClick}
          className="h-9 gap-1.5 text-xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
          <span>Refresh</span>
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={onDownloadReport}
          className="h-9 gap-1.5 text-xs shadow-sm"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download Report</span>
        </Button>
      </div>
    </div>
  );
}
