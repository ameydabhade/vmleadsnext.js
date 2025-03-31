"use client"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Plus, Search, Filter, Mail, User, Clock } from "lucide-react";

const initialLeads = [
  { id: 1, name: "John Smith", email: "john.smith@example.com", status: "New", date: "2025-03-30" },
  { id: 2, name: "Sarah Johnson", email: "sarah.j@techcorp.io", status: "Contacted", date: "2025-03-28" },
  { id: 3, name: "Michael Brown", email: "m.brown@globex.net", status: "Qualified", date: "2025-03-25" },
  { id: 4, name: "Emily Davis", email: "emily.davis@startup.co", status: "New", date: "2025-03-29" },
  { id: 5, name: "Robert Wilson", email: "rwilson@industry.com", status: "Converted", date: "2025-03-22" },
  { id: 6, name: "Jennifer Lee", email: "jennifer@smallbiz.org", status: "Not Interested", date: "2025-03-26" },
  { id: 7, name: "David Martinez", email: "d.martinez@enterprise.net", status: "Contacted", date: "2025-03-27" },
  { id: 8, name: "Lisa Thompson", email: "lisa.t@consultant.biz", status: "Qualified", date: "2025-03-24" },
  { id: 9, name: "Kevin Zhang", email: "k.zhang@techstart.io", status: "Converted", date: "2025-03-21" },
];

function LeadsTable({ leads }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">New</Badge>;
      case "Contacted":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Contacted</Badge>;
      case "Qualified":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Qualified</Badge>;
      case "Converted":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Converted</Badge>;
      case "Not Interested":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Not Interested</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableCaption>List of all leads in the system.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id}>
            <TableCell className="font-medium">{lead.name}</TableCell>
            <TableCell>{lead.email}</TableCell>
            <TableCell>{getStatusBadge(lead.status)}</TableCell>
            <TableCell>{lead.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const AddLeadDialog = ({ onAddLead, open, setOpen }) => {
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    status: "New",
    date: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (field, value) => {
    setNewLead({
      ...newLead,
      [field]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique ID for new lead
    const newId = Math.max(...initialLeads.map(l => l.id)) + 1;
    
    onAddLead({
      ...newLead,
      id: newId
    });
    
    // Reset form
    setNewLead({
      name: "",
      email: "",
      status: "New",
      date: new Date().toISOString().split('T')[0]
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>
            Enter the lead's information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newLead.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newLead.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={newLead.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                  <SelectItem value="Not Interested">Not Interested</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newLead.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const LeadMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Leads
          </CardTitle>
          <User className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground">
            +9 this month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            New Contacts
          </CardTitle>
          <Mail className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15</div>
          <p className="text-xs text-muted-foreground">
            Last 7 days
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Response Time
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8 hours</div>
          <p className="text-xs text-muted-foreground">
            -2h from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const Page = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddLead = (newLead) => {
    setLeads([newLead, ...leads]);
  };

  // Calculate counts for different statuses
  const newLeadsCount = leads.filter(lead => lead.status === "New").length;
  const convertedLeadsCount = leads.filter(lead => lead.status === "Converted").length;
  const totalLeads = leads.length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeadsCount / totalLeads) * 100) : 0;

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
                  <BreadcrumbPage>Lead Tracking</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-semibold">Lead Tracking</h1>
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search leads..."
                  className="w-full pl-8"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Lead
              </Button>
            </div>
          </div>
          
          <LeadMetrics />
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{newLeadsCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Converted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{convertedLeadsCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{conversionRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalLeads - convertedLeadsCount}</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Leads</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="converted">Converted</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="overflow-auto rounded-xl border bg-card">
                <LeadsTable leads={leads} />
              </div>
            </TabsContent>
            <TabsContent value="new" className="mt-4">
              <div className="overflow-auto rounded-xl border bg-card">
                <LeadsTable leads={leads.filter(lead => lead.status === "New")} />
              </div>
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <div className="overflow-auto rounded-xl border bg-card">
                <LeadsTable leads={leads.filter(lead => lead.status === "Contacted" || lead.status === "Qualified")} />
              </div>
            </TabsContent>
            <TabsContent value="converted" className="mt-4">
              <div className="overflow-auto rounded-xl border bg-card">
                <LeadsTable leads={leads.filter(lead => lead.status === "Converted")} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
      <AddLeadDialog 
        onAddLead={handleAddLead} 
        open={dialogOpen} 
        setOpen={setDialogOpen} 
      />
    </SidebarProvider>
  );
};

export default Page;