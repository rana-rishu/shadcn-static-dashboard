import React, { useState } from "react";
import { Search, Mail, Phone, MoreHorizontal, UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import { mockCustomers } from "../../data/mockData";
import { formatCurrency } from "../../lib/utils";

export function CustomersView({
  onTriggerToast,
}: {
  onTriggerToast: (
    title: string,
    description: string,
    type?: "default" | "success" | "warning" | "destructive"
  ) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Customer Directory</CardTitle>
              <CardDescription>
                Overview of verified account holders, lifetime spending, and activity logs
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-9 text-xs"
                />
              </div>
              <Button
                size="sm"
                className="h-9 gap-1 text-xs"
                onClick={() =>
                  onTriggerToast("New Customer", "Add customer modal opened.", "success")
                }
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Add Customer</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((cust) => (
                <TableRow key={cust.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar fallback={cust.avatar} size="sm" />
                      <div>
                        <p className="font-semibold text-xs sm:text-sm">{cust.name}</p>
                        <p className="text-xs text-muted-foreground">{cust.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cust.status === "active"
                          ? "success"
                          : cust.status === "lead"
                          ? "warning"
                          : "secondary"
                      }
                      className="capitalize"
                    >
                      {cust.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">{cust.orders} orders</TableCell>
                  <TableCell className="font-semibold text-xs text-primary">
                    {formatCurrency(cust.spent)}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {cust.lastActive}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
