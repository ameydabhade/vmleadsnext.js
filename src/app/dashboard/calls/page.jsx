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
import { Checkbox } from "@/components/ui/checkbox";

// Call data for the Calls page
const calls = [
  {
    id: "CALL001",
    caller: "John Smith",
    number: "(555) 123-4567",
    duration: "12:34",
    status: "Completed",
    date: "2025-03-07",
    time: "09:15 AM",
    notes: "Discussed website requirements"
  },
  {
    id: "CALL002",
    caller: "Sarah Johnson",
    number: "(555) 234-5678",
    duration: "05:21",
    status: "Completed",
    date: "2025-03-07",
    time: "10:30 AM",
    notes: "Reviewed app prototype"
  },
  {
    id: "CALL003",
    caller: "Michael Brown",
    number: "(555) 345-6789",
    duration: "08:47",
    status: "Completed",
    date: "2025-03-07",
    time: "01:45 PM",
    notes: "Discussed e-commerce options"
  },
  {
    id: "CALL004",
    caller: "Emily Davis",
    number: "(555) 456-7890",
    duration: "00:00",
    status: "Missed",
    date: "2025-03-07",
    time: "02:30 PM",
    notes: "No answer, left voicemail"
  },
  {
    id: "CALL005",
    caller: "Robert Wilson",
    number: "(555) 567-8901",
    duration: "15:36",
    status: "Completed",
    date: "2025-03-06",
    time: "11:20 AM",
    notes: "Finalized brand identity details"
  },
  {
    id: "CALL006",
    caller: "Jennifer Lee",
    number: "(555) 678-9012",
    duration: "03:45",
    status: "Completed",
    date: "2025-03-06",
    time: "03:15 PM",
    notes: "Brief intro call about content needs"
  },
  {
    id: "CALL007",
    caller: "David Miller",
    number: "(555) 789-0123",
    duration: "00:00",
    status: "Scheduled",
    date: "2025-03-10",
    time: "10:00 AM",
    notes: "Follow-up on social media proposal"
  },
];

function CallsTable() {
  return (
    <Table>
      <TableCaption>A log of recent and upcoming calls.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox id="select-all" />
          </TableHead>
          <TableHead>Caller</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calls.map((call) => (
          <TableRow key={call.id}>
            <TableCell>
              <Checkbox id={`select-${call.id}`} />
            </TableCell>
            <TableCell className="font-medium">{call.caller}</TableCell>
            <TableCell>{call.number}</TableCell>
            <TableCell>{call.duration}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                call.status === "Completed" ? "bg-green-100 text-green-800" :
                call.status === "Missed" ? "bg-red-100 text-red-800" :
                "bg-blue-100 text-blue-800"
              }`}>
                {call.status}
              </span>
            </TableCell>
            <TableCell>{call.date}</TableCell>
            <TableCell>{call.time}</TableCell>
            <TableCell className="text-right">{call.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Calls</TableCell>
          <TableCell colSpan={5} className="text-right">{calls.length} calls (5 completed, 1 missed, 1 scheduled)</TableCell>
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
                  <BreadcrumbPage>Calls</BreadcrumbPage>
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
          
          <div className="overflow-auto rounded-xl border bg-card">
            <CallsTable />
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="aspect-video rounded-xl bg-muted/50 p-4">
              <h3 className="text-lg font-medium mb-2">Call Duration Analytics</h3>
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Chart placeholder: Average call duration by day
              </div>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50 p-4">
              <h3 className="text-lg font-medium mb-2">Call Status Distribution</h3>
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Chart placeholder: Status breakdown (completed/missed/scheduled)
              </div>
            </div>
          </div>
          
          <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-4 md:min-h-[calc(50vh)]">
            <h3 className="text-lg font-medium mb-2">Call Timeline</h3>
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Timeline visualization placeholder: Shows call history and upcoming scheduled calls
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;