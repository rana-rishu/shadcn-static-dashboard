import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Copy,
  Download,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Transaction } from "../../types";
import { formatCurrency } from "../../lib/utils";

interface TransactionsTableProps {
  transactions: Transaction[];
  onTriggerToast?: (title: string, description: string, type?: "success" | "warning" | "destructive") => void;
}

type SortField = "customerName" | "amount" | "status" | "date";
type SortOrder = "asc" | "desc";

export function TransactionsTable({ transactions, onTriggerToast }: TransactionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch =
          tx.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortField === "amount") {
          comparison = a.amount - b.amount;
        } else if (sortField === "date") {
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
          comparison = String(a[sortField]).localeCompare(String(b[sortField]));
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });
  }, [transactions, searchTerm, statusFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, currentPage, pageSize]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    onTriggerToast?.("Copied to clipboard", `Transaction ID ${text} copied.`, "success");
  };

  const renderStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle className="h-3 w-3" /> Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="warning" className="gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" /> Failed
          </Badge>
        );
      case "refunded":
        return (
          <Badge variant="secondary" className="gap-1">
            <RotateCcw className="h-3 w-3" /> Refunded
          </Badge>
        );
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Showing {filteredTransactions.length} customer purchases and billing activities
            </CardDescription>
          </div>

          {/* Controls: Search & Filter */}
          <div className="flex items-center space-x-2">
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 h-9 text-xs"
              />
            </div>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                  <Filter className="h-3.5 w-3.5" />
                  <span>{statusFilter === "all" ? "Status: All" : `Status: ${statusFilter}`}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="right">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("paid")}>Paid</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("failed")}>Failed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("refunded")}>Refunded</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Table Component */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("customerName")}
                  className="flex items-center space-x-1 font-medium hover:text-foreground"
                >
                  <span>Customer</span>
                  {sortField === "customerName" ? (
                    sortOrder === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/60" />
                  )}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center space-x-1 font-medium hover:text-foreground"
                >
                  <span>Status</span>
                  {sortField === "status" ? (
                    sortOrder === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/60" />
                  )}
                </button>
              </TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("date")}
                  className="flex items-center space-x-1 font-medium hover:text-foreground"
                >
                  <span>Date</span>
                  {sortField === "date" ? (
                    sortOrder === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/60" />
                  )}
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button
                  onClick={() => handleSort("amount")}
                  className="flex items-center space-x-1 font-medium ml-auto hover:text-foreground"
                >
                  <span>Amount</span>
                  {sortField === "amount" ? (
                    sortOrder === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/60" />
                  )}
                </button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No transactions match your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-xs font-semibold text-primary">
                    {tx.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar
                        fallback={tx.customerName.slice(0, 2).toUpperCase()}
                        src={tx.avatarUrl}
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-xs sm:text-sm">{tx.customerName}</span>
                        <span className="text-[11px] text-muted-foreground">{tx.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{renderStatusBadge(tx.status)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {tx.paymentMethod}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{tx.date}</TableCell>
                  <TableCell className="text-right font-semibold text-xs sm:text-sm">
                    {formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="right">
                        <DropdownMenuItem onClick={() => setSelectedTx(tx)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyToClipboard(tx.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Copy ID</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            onTriggerToast?.("Receipt Generated", `Receipt for ${tx.id} downloaded.`, "success")
                          }
                        >
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download Receipt</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t text-xs text-muted-foreground">
          <div>
            Showing <span className="font-medium text-foreground">{(currentPage - 1) * pageSize + 1}</span> to{" "}
            <span className="font-medium text-foreground">
              {Math.min(currentPage * pageSize, filteredTransactions.length)}
            </span>{" "}
            of <span className="font-medium text-foreground">{filteredTransactions.length}</span> results
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 px-2.5"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 p-0 text-xs"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 px-2.5"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Transaction Details Modal Dialog */}
      <Dialog open={!!selectedTx} onOpenChange={(open) => !open && setSelectedTx(null)}>
        {selectedTx && (
          <div>
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>
                Detailed overview of invoice reference {selectedTx.id}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-3 text-sm divide-y">
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono font-semibold">{selectedTx.id}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-medium">{selectedTx.customerName}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Email:</span>
                <span>{selectedTx.email}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-bold text-base text-primary">
                  {formatCurrency(selectedTx.amount)}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Status:</span>
                <span>{renderStatusBadge(selectedTx.status)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Payment Method:</span>
                <span>{selectedTx.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-muted-foreground">Date:</span>
                <span>{selectedTx.date}</span>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setSelectedTx(null)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  copyToClipboard(selectedTx.id);
                  setSelectedTx(null);
                }}
              >
                Copy Reference
              </Button>
            </DialogFooter>
          </div>
        )}
      </Dialog>
    </Card>
  );
}
