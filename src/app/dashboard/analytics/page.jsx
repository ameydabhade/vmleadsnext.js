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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { PaymentMethodBarChart } from "@/components/charts/payment-method-chart";
import { PaymentStatusPieChart } from "@/components/charts/payment-status-chart";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    date: "2025-02-15",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    date: "2025-02-18",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    date: "2025-02-20",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    date: "2025-02-22",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    date: "2025-02-25",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
    date: "2025-02-27",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
    date: "2025-03-01",
  },
];

// Process data for charts
const processDataForCharts = () => {
  // Payment status distribution
  const statusDistribution = invoices.reduce((acc, invoice) => {
    const status = invoice.paymentStatus;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.keys(statusDistribution).map(status => ({
    name: status,
    value: statusDistribution[status]
  }));

  // Payment method distribution
  const methodDistribution = invoices.reduce((acc, invoice) => {
    const method = invoice.paymentMethod;
    const amount = parseFloat(invoice.totalAmount.replace('$', ''));
    acc[method] = (acc[method] || 0) + amount;
    return acc;
  }, {});

  const barChartData = Object.keys(methodDistribution).map(method => ({
    name: method,
    amount: methodDistribution[method]
  }));

  // Time series data
  const timeSeriesData = invoices.reduce((acc, invoice) => {
    const date = invoice.date;
    const amount = parseFloat(invoice.totalAmount.replace('$', ''));
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += amount;
    return acc;
  }, {});

  const lineChartData = Object.keys(timeSeriesData)
    .sort((a, b) => new Date(a) - new Date(b))
    .map(date => ({
      date: date,
      amount: timeSeriesData[date]
    }));

  return { pieChartData, barChartData, lineChartData };
};

const { pieChartData, barChartData, lineChartData } = processDataForCharts();

function TableDemo() {
  return (
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
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
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
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 transition-all group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
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
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-center gap-3 mb-4">
            <Button variant="outline">Today</Button>
            <Button variant="outline">Yesterday</Button>
            <Button variant="outline">Last 7 Days</Button>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,500.00</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$350.00</div>
                <p className="text-xs text-muted-foreground">2 invoices pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unpaid Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$650.00</div>
                <p className="text-xs text-muted-foreground">2 invoices unpaid</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Line Chart */}
          <RevenueLineChart data={lineChartData} />
          
          {/* Invoice Table */}
          <div className="overflow-auto rounded-xl border bg-card">
            <TableDemo />
          </div>
          
          {/* Payment Method and Status Charts */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <PaymentMethodBarChart data={barChartData} />
            <PaymentStatusPieChart data={pieChartData} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}