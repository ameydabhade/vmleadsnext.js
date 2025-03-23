// src/app/dashboard/analytics/page.jsx
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { PaymentMethodBarChart } from "@/components/charts/payment-method-chart";
import { PaymentStatusPieChart } from "@/components/charts/payment-status-chart";

const invoices = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card", date: "2025-02-15" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal", date: "2025-02-18" },
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer", date: "2025-02-20" },
  { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card", date: "2025-02-22" },
  { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal", date: "2025-02-25" },
  { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer", date: "2025-02-27" },
  { invoice: "INV007", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card", date: "2025-03-01" },
];

const processDataForCharts = () => {
  const statusDistribution = {};
  const methodDistribution = {};
  const timeSeriesData = {};

  invoices.forEach(({ paymentStatus, paymentMethod, totalAmount, date }) => {
    const amount = parseFloat(totalAmount.replace("$", ""));
    statusDistribution[paymentStatus] = (statusDistribution[paymentStatus] || 0) + 1;
    methodDistribution[paymentMethod] = (methodDistribution[paymentMethod] || 0) + amount;
    timeSeriesData[date] = (timeSeriesData[date] || 0) + amount;
  });

  return {
    pieChartData: Object.entries(statusDistribution).map(([name, value]) => ({ name, value })),
    barChartData: Object.entries(methodDistribution).map(([name, amount]) => ({ name, amount })),
    lineChartData: Object.entries(timeSeriesData)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, amount]) => ({ date, amount })),
  };
};

const { pieChartData, barChartData, lineChartData } = processDataForCharts();

const SummaryCard = ({ title, amount, description }) => (
  <Card>
    <CardHeader className="flex justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{amount}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const FilterButtons = () => (
  <div className="flex justify-center gap-3 mb-4">
    {["Today", "Yesterday", "Last 7 Days"].map((label) => (
      <Button key={label} variant="outline">{label}</Button>
    ))}
  </div>
);

const TableDemo = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map(({ invoice, paymentStatus, paymentMethod, totalAmount }) => (
        <TableRow key={invoice}>
          <TableCell className="font-medium">{invoice}</TableCell>
          <TableCell>{paymentStatus}</TableCell>
          <TableCell>{paymentMethod}</TableCell>
          <TableCell className="text-right">{totalAmount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell className="text-right">$2,500.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
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
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <FilterButtons />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <PaymentMethodBarChart data={barChartData} />
            <PaymentStatusPieChart data={pieChartData} />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
            <SummaryCard title="Total Revenue" amount="$2,500.00" description="+20.1% from last month" />
            <SummaryCard title="Pending Payments" amount="$350.00" description="2 invoices pending" />
            <SummaryCard title="Unpaid Invoices" amount="$650.00" description="2 invoices unpaid" />
          </div>

          <div className="overflow-auto rounded-xl border bg-card">
            <TableDemo />
          </div>

          <RevenueLineChart data={lineChartData} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}