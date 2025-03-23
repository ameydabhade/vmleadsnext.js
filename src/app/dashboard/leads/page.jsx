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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const leads = [
  { id: "LEAD001", customerName: "John Smith", phoneNumber: "(555) 123-4567", project: "Website Redesign", leadStatus: "Qualified", city: "New York", budget: 5000, nextCallDate: "2025-03-15" },
  { id: "LEAD002", customerName: "Sarah Johnson", phoneNumber: "(555) 234-5678", project: "Mobile App", leadStatus: "Prospecting", city: "San Francisco", budget: 10000, nextCallDate: "2025-03-10" },
  { id: "LEAD003", customerName: "Michael Brown", phoneNumber: "(555) 345-6789", project: "E-commerce Store", leadStatus: "Negotiation", city: "Chicago", budget: 7500, nextCallDate: "2025-03-12" },
  { id: "LEAD004", customerName: "Emily Davis", phoneNumber: "(555) 456-7890", project: "SEO Services", leadStatus: "Closed Won", city: "Los Angeles", budget: 3000, nextCallDate: "2025-03-20" },
  { id: "LEAD005", customerName: "Robert Wilson", phoneNumber: "(555) 567-8901", project: "Brand Identity", leadStatus: "Closed Won", city: "Boston", budget: 6500, nextCallDate: "2025-03-18" },
  { id: "LEAD006", customerName: "Jennifer Lee", phoneNumber: "(555) 678-9012", project: "Content Marketing", leadStatus: "Prospecting", city: "Seattle", budget: 4500, nextCallDate: "2025-03-09" },
  { id: "LEAD007", customerName: "David Miller", phoneNumber: "(555) 789-0123", project: "Social Media", leadStatus: "Negotiation", city: "Austin", budget: 2800, nextCallDate: "2025-03-11" },
];

const totalBudget = leads.reduce((sum, lead) => sum + lead.budget, 0);

function LeadsTable() {
  return (
    <Table>
      <TableCaption>A list of your active customer leads.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Lead Status</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead className="text-right">Next Call</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell className="font-medium">{lead.id}</TableCell>
            <TableCell>{lead.customerName}</TableCell>
            <TableCell>{lead.project}</TableCell>
            <TableCell>{lead.leadStatus}</TableCell>
            <TableCell>{lead.city}</TableCell>
            <TableCell>${lead.budget.toLocaleString()}</TableCell>
            <TableCell className="text-right">{lead.nextCallDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total Budget</TableCell>
          <TableCell className="text-right" colSpan={2}>${totalBudget.toLocaleString()}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
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
                  <BreadcrumbPage>Leads</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-2xl font-semibold">Leads Management</h1>
          <div className="flex justify-center gap-3 mb-4">
            <Button variant="outline">Today</Button>
            <Button variant="outline">Yesterday</Button>
            <Button variant="outline">Last 7 Days</Button>
            <Button variant="outline">This Month</Button>
          </div>
          <div className="overflow-auto rounded-xl border bg-card">
            <LeadsTable />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 md:min-h-[calc(50vh)]" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;