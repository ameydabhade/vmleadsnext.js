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
  import { Textarea } from "@/components/ui/textarea";
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
  import { Plus, Search, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";
  
  const initialTickets = [
    { id: "TKT001", customerName: "John Smith", subject: "Website issues after launch", priority: "High", status: "Open", created: "2025-03-28", lastUpdated: "2025-03-30" },
    { id: "TKT002", customerName: "Sarah Johnson", subject: "Mobile app crashes on startup", priority: "Critical", status: "In Progress", created: "2025-03-27", lastUpdated: "2025-03-30" },
    { id: "TKT003", customerName: "Michael Brown", subject: "Payment processing failed", priority: "Medium", status: "Open", created: "2025-03-29", lastUpdated: "2025-03-29" },
    { id: "TKT004", customerName: "Emily Davis", subject: "SEO report questions", priority: "Low", status: "Resolved", created: "2025-03-25", lastUpdated: "2025-03-28" },
    { id: "TKT005", customerName: "Robert Wilson", subject: "Logo design feedback", priority: "Medium", status: "Closed", created: "2025-03-22", lastUpdated: "2025-03-26" },
    { id: "TKT006", customerName: "Jennifer Lee", subject: "Blog post formatting issues", priority: "Low", status: "In Progress", created: "2025-03-26", lastUpdated: "2025-03-29" },
  ];
  
  const knowledgeBaseArticles = [
    { id: 1, title: "Getting Started Guide", category: "General", views: 1245 },
    { id: 2, title: "Troubleshooting Common Issues", category: "Technical", views: 982 },
    { id: 3, title: "Payment Processing FAQ", category: "Billing", views: 765 },
    { id: 4, title: "Account Security Best Practices", category: "Security", views: 632 },
    { id: 5, title: "Mobile App User Guide", category: "Product", views: 543 },
  ];
  
  function TicketsTable({ tickets }) {
    const getStatusBadge = (status) => {
      switch (status) {
        case "Open":
          return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Open</Badge>;
        case "In Progress":
          return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>;
        case "Resolved":
          return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
        case "Closed":
          return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Closed</Badge>;
        default:
          return <Badge variant="outline">{status}</Badge>;
      }
    };
  
    const getPriorityBadge = (priority) => {
      switch (priority) {
        case "Critical":
          return <Badge className="bg-red-500">{priority}</Badge>;
        case "High":
          return <Badge className="bg-orange-600">{priority}</Badge>;
        case "Medium":
          return <Badge className="bg-yellow-500">{priority}</Badge>;
        case "Low":
          return <Badge className="bg-green-200">{priority}</Badge>;
        default:
          return <Badge>{priority}</Badge>;
      }
    };
  
    return (
      <Table>
        <TableCaption>A list of support tickets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.customerName}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
              <TableCell>{getStatusBadge(ticket.status)}</TableCell>
              <TableCell>{ticket.created}</TableCell>
              <TableCell className="text-right">{ticket.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  
  const AddTicketDialog = ({ onAddTicket, open, setOpen }) => {
    const [newTicket, setNewTicket] = useState({
      customerName: "",
      subject: "",
      description: "",
      priority: "Medium",
      status: "Open",
    });
  
    const handleInputChange = (field, value) => {
      setNewTicket({
        ...newTicket,
        [field]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Generate a new ID (simple implementation)
      const newId = `TKT${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
      const today = new Date().toISOString().split('T')[0];
      
      onAddTicket({
        ...newTicket,
        id: newId,
        created: today,
        lastUpdated: today
      });
      
      // Reset form
      setNewTicket({
        customerName: "",
        subject: "",
        description: "",
        priority: "Medium",
        status: "Open",
      });
      
      setOpen(false);
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>
              Enter the details for the new support ticket.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerName" className="text-right">
                  Customer
                </Label>
                <Input
                  id="customerName"
                  value={newTicket.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={newTicket.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="col-span-3"
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => handleInputChange("priority", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Ticket</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
  const SupportMetrics = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Tickets
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 since yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 hours</div>
            <p className="text-xs text-muted-foreground">
              -0.5 hours from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resolution Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +3% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const KnowledgeBase = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base</CardTitle>
          <CardDescription>Popular help articles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {knowledgeBaseArticles.map(article => (
              <div key={article.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-medium">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.category}</p>
                </div>
                <div className="text-sm text-muted-foreground">{article.views} views</div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Articles</Button>
        </CardFooter>
      </Card>
    );
  };
  
  const Page = () => {
    const [tickets, setTickets] = useState(initialTickets);
    const [dialogOpen, setDialogOpen] = useState(false);
  
    const handleAddTicket = (newTicket) => {
      setTickets([newTicket, ...tickets]);
    };
  
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
                    <BreadcrumbPage>Support</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-2xl font-semibold">Customer Support</h1>
              <div className="flex w-full md:w-auto gap-2">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tickets..."
                    className="w-full pl-8"
                  />
                </div>
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Ticket
                </Button>
              </div>
            </div>
            
            <SupportMetrics />
            
            <Tabs defaultValue="active" className="w-full">
              <TabsList>
                <TabsTrigger value="active">Active Tickets</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="mt-4">
                <div className="overflow-auto rounded-xl border bg-card">
                  <TicketsTable tickets={tickets.filter(t => t.status !== "Resolved" && t.status !== "Closed")} />
                </div>
              </TabsContent>
              <TabsContent value="resolved" className="mt-4">
                <div className="overflow-auto rounded-xl border bg-card">
                  <TicketsTable tickets={tickets.filter(t => t.status === "Resolved" || t.status === "Closed")} />
                </div>
              </TabsContent>
              <TabsContent value="knowledge" className="mt-4">
                <KnowledgeBase />
              </TabsContent>
            </Tabs>
            
            <div className="min-h-[30vh] flex-1 rounded-xl bg-muted/50 md:min-h-[calc(30vh)]" />
          </div>
        </SidebarInset>
        <AddTicketDialog 
          onAddTicket={handleAddTicket} 
          open={dialogOpen} 
          setOpen={setDialogOpen} 
        />
      </SidebarProvider>
    );
  };
  
  export default Page;