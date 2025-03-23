import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const leads = [
  { id: 1, name: "John Doe", number: "9876543210", project: "Project A", assignedTo: "Agent X", status: "Interested", city: "New York", budget: "$5,000 - $10,000", nextCall: "2025-03-22" },
  { id: 2, name: "Jane Smith", number: "8765432109", project: "Project B", assignedTo: "Agent Y", status: "Follow-up", city: "Los Angeles", budget: "$10,000 - $20,000", nextCall: "2025-03-25" },
  { id: 3, name: "Alice Johnson", number: "7654321098", project: "Project C", assignedTo: "Agent Z", status: "Not Interested", city: "Chicago", budget: "$2,000 - $5,000", nextCall: "2025-03-30" },
];

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Lead Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-col gap-4 p-4">
          <div className="rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Customer Number</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Lead Status</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Budget Range</TableHead>
                  <TableHead>Next Call Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length > 0 ? (
                  leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>{lead.number}</TableCell>
                      <TableCell>{lead.project}</TableCell>
                      <TableCell>{lead.assignedTo}</TableCell>
                      <TableCell>{lead.status}</TableCell>
                      <TableCell>{lead.city}</TableCell>
                      <TableCell>{lead.budget}</TableCell>
                      <TableCell>{lead.nextCall}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">No lead data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;
