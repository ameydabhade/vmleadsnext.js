
"use client"
// src/app/dashboard/analytics/page.jsx
import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { PaymentMethodBarChart } from "@/components/charts/payment-method-chart";
import { PaymentStatusPieChart } from "@/components/charts/payment-status-chart";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, DownloadIcon, RefreshCw } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const invoices = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card", date: "2025-02-15", customer: "Alex Johnson" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal", date: "2025-02-18", customer: "Maria Garcia" },
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer", date: "2025-02-20", customer: "Sam Wilson" },
  { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card", date: "2025-02-22", customer: "Taylor Swift" },
  { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal", date: "2025-02-25", customer: "James Brown" },
  { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer", date: "2025-02-27", customer: "Emma Davis" },
  { invoice: "INV007", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card", date: "2025-03-01", customer: "Chris Lee" },
];

const processDataForCharts = () => {
  const statusDistribution = {};
  const methodDistribution = {};
  const timeSeriesData = {};

  let totalPaid = 0;
  let totalPending = 0;
  let totalUnpaid = 0;
  let totalRevenue = 0;

  invoices.forEach(({ paymentStatus, paymentMethod, totalAmount, date }) => {
    const amount = parseFloat(totalAmount.replace("$", ""));
    statusDistribution[paymentStatus] = (statusDistribution[paymentStatus] || 0) + 1;
    methodDistribution[paymentMethod] = (methodDistribution[paymentMethod] || 0) + amount;
    timeSeriesData[date] = (timeSeriesData[date] || 0) + amount;
    
    totalRevenue += amount;
    if (paymentStatus === "Paid") totalPaid += amount;
    if (paymentStatus === "Pending") totalPending += amount;
    if (paymentStatus === "Unpaid") totalUnpaid += amount;
  });

  // Calculate trends (example: let's assume prior month data)
  const prevMonthRevenue = 2080; // simulate previous month data
  const revenueTrend = ((totalRevenue - prevMonthRevenue) / prevMonthRevenue * 100).toFixed(1);

  return {
    pieChartData: Object.entries(statusDistribution).map(([name, value]) => ({ name, value })),
    barChartData: Object.entries(methodDistribution).map(([name, amount]) => ({ name, amount })),
    lineChartData: Object.entries(timeSeriesData)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, amount]) => ({ date, amount })),
    summaryData: {
      totalRevenue: totalRevenue.toFixed(2),
      totalPaid: totalPaid.toFixed(2),
      totalPending: totalPending.toFixed(2),
      totalUnpaid: totalUnpaid.toFixed(2),
      revenueTrend,
      pendingCount: invoices.filter(i => i.paymentStatus === "Pending").length,
      unpaidCount: invoices.filter(i => i.paymentStatus === "Unpaid").length,
      collectionRate: ((totalPaid / totalRevenue) * 100).toFixed(1)
    }
  };
};

const { pieChartData, barChartData, lineChartData, summaryData } = processDataForCharts();

const SummaryCard = ({ title, amount, description, trend, icon }) => {
  const isPositive = !trend || parseFloat(trend) >= 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${amount}</div>
        <div className="flex items-center mt-1">
          {trend && (
            <Badge variant={isPositive ? "outline" : "destructive"} className="mr-2">
              {isPositive ? "+" : ""}{trend}%
            </Badge>
          )}
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const StatusBadge = ({ status }) => {
  const variants = {
    Paid: "success",
    Pending: "warning",
    Unpaid: "destructive"
  };
  
  return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
};

const CustomerCell = ({ name }) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-muted">{initials}</AvatarFallback>
      </Avatar>
      <span>{name}</span>
    </div>
  );
};

const TableDemo = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Invoice</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map(({ invoice, paymentStatus, paymentMethod, totalAmount, date, customer }) => (
        <TableRow key={invoice}>
          <TableCell className="font-medium">{invoice}</TableCell>
          <TableCell><CustomerCell name={customer} /></TableCell>
          <TableCell><StatusBadge status={paymentStatus} /></TableCell>
          <TableCell>{paymentMethod}</TableCell>
          <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
          <TableCell className="text-right font-medium">{totalAmount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={5}>Total</TableCell>
        <TableCell className="text-right">${summaryData.totalRevenue}</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);

const CollectionProgressCard = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-medium">Payment Collection</CardTitle>
      <CardDescription>Current collection rate</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="font-medium">{data.collectionRate}%</div>
          <div className="text-xs text-muted-foreground">Goal: 95%</div>
        </div>
        <Progress value={data.collectionRate} className="h-2" />
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div className="font-medium">${data.totalPaid}</div>
            <div className="text-muted-foreground">Collected</div>
          </div>
          <div>
            <div className="font-medium">${data.totalPending}</div>
            <div className="text-muted-foreground">Pending</div>
          </div>
          <div>
            <div className="font-medium">${data.totalUnpaid}</div>
            <div className="text-muted-foreground">Unpaid</div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Page() {
  const [dateRange, setDateRange] = useState("7days");
  
  const refreshData = () => {
    // Simulate data refresh functionality
    console.log("Refreshing data...");
  };
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={refreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <SummaryCard 
                  title="Total Revenue" 
                  amount={summaryData.totalRevenue} 
                  description={`vs. previous period`} 
                  trend={summaryData.revenueTrend}
                />
                <SummaryCard 
                  title="Paid Invoices" 
                  amount={summaryData.totalPaid} 
                  description={`${invoices.filter(i => i.paymentStatus === "Paid").length} invoices`} 
                />
                <SummaryCard 
                  title="Pending Payments" 
                  amount={summaryData.totalPending} 
                  description={`${summaryData.pendingCount} invoices pending`} 
                />
                <SummaryCard 
                  title="Unpaid Invoices" 
                  amount={summaryData.totalUnpaid} 
                  description={`${summaryData.unpaidCount} invoices unpaid`} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Daily revenue for the selected period</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <RevenueLineChart data={lineChartData} />
                  </CardContent>
                </Card>
                <CollectionProgressCard data={summaryData} />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Revenue by payment method</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <PaymentMethodBarChart data={barChartData} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Status</CardTitle>
                    <CardDescription>Distribution of invoice statuses</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <PaymentStatusPieChart data={pieChartData} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="invoices" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Invoices</CardTitle>
                  <CardDescription>A list of recent invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto rounded-xl border bg-card">
                    <TableDemo />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="customers" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Analytics</CardTitle>
                  <CardDescription>Customer data will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">Customer analytics will be shown here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}