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
import { Plus, Search, Users, DollarSign, Calendar, Filter } from "lucide-react";

const initialCustomers = [
  { id: 1, name: "Acme Corporation", number: "ACME001", project: "Website Redesign", assignedTo: "Sarah Miller", leadStatus: "Qualified", city: "New York", budgetRange: "$50K-$100K", nextCallDate: "2025-04-05" },
  { id: 2, name: "TechSolutions Inc.", number: "TECH002", project: "Mobile App Development", assignedTo: "James Wilson", leadStatus: "Negotiation", city: "San Francisco", budgetRange: "$100K-$250K", nextCallDate: "2025-04-02" },
  { id: 3, name: "Global Retail Group", number: "GLOB003", project: "E-commerce Integration", assignedTo: "Sarah Miller", leadStatus: "Proposal", city: "Chicago", budgetRange: "$25K-$50K", nextCallDate: "2025-04-07" },
  { id: 4, name: "Pinnacle Financial", number: "PINN004", project: "Security Audit", assignedTo: "Michael Chen", leadStatus: "Closed", city: "Boston", budgetRange: "$10K-$25K", nextCallDate: "2025-04-15" },
  { id: 5, name: "Healthcare Partners", number: "HEAL005", project: "Patient Portal", assignedTo: "David Rodriguez", leadStatus: "Qualified", city: "Miami", budgetRange: "$50K-$100K", nextCallDate: "2025-04-03" },
  { id: 6, name: "Emerald Education", number: "EMER006", project: "Learning Management System", assignedTo: "James Wilson", leadStatus: "Discovery", city: "Seattle", budgetRange: "$25K-$50K", nextCallDate: "2025-04-08" },
  { id: 7, name: "Velocity Logistics", number: "VELO007", project: "Fleet Tracking System", assignedTo: "Michael Chen", leadStatus: "Negotiation", city: "Denver", budgetRange: "$100K-$250K", nextCallDate: "2025-04-04" },
];

function CustomersTable({ customers }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Discovery":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Discovery</Badge>;
      case "Qualified":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Qualified</Badge>;
      case "Proposal":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Proposal</Badge>;
      case "Negotiation":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Negotiation</Badge>;
      case "Closed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Closed</Badge>;
      case "Lost":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Lost</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getBudgetBadge = (budget) => {
    if (budget.includes("$10K")) {
      return <Badge className="bg-green-100 text-green-800">{budget}</Badge>;
    } else if (budget.includes("$25K")) {
      return <Badge className="bg-blue-100 text-blue-800">{budget}</Badge>;
    } else if (budget.includes("$50K")) {
      return <Badge className="bg-purple-100 text-purple-800">{budget}</Badge>;
    } else if (budget.includes("$100K")) {
      return <Badge className="bg-orange-100 text-orange-800">{budget}</Badge>;
    } else {
      return <Badge>{budget}</Badge>;
    }
  };

  return (
    <Table>
      <TableCaption>Customer project status report.</TableCaption>
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
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">{customer.name}</TableCell>
            <TableCell>{customer.number}</TableCell>
            <TableCell>{customer.project}</TableCell>
            <TableCell>{customer.assignedTo}</TableCell>
            <TableCell>{getStatusBadge(customer.leadStatus)}</TableCell>
            <TableCell>{customer.city}</TableCell>
            <TableCell>{getBudgetBadge(customer.budgetRange)}</TableCell>
            <TableCell>{customer.nextCallDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const AddCustomerDialog = ({ onAddCustomer, open, setOpen }) => {
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    number: "",
    project: "",
    assignedTo: "",
    leadStatus: "Discovery",
    city: "",
    budgetRange: "$25K-$50K",
    nextCallDate: ""
  });

  const handleInputChange = (field, value) => {
    setNewCustomer({
      ...newCustomer,
      [field]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique ID for new customer
    const newId = Math.max(...initialCustomers.map(c => c.id)) + 1;
    
    onAddCustomer({
      ...newCustomer,
      id: newId
    });
    
    // Reset form
    setNewCustomer({
      name: "",
      number: "",
      project: "",
      assignedTo: "",
      leadStatus: "Discovery",
      city: "",
      budgetRange: "$25K-$50K",
      nextCallDate: ""
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Customer Project</DialogTitle>
          <DialogDescription>
            Enter the details for the new customer project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Customer Name
              </Label>
              <Input
                id="name"
                value={newCustomer.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Customer Number
              </Label>
              <Input
                id="number"
                value={newCustomer.number}
                onChange={(e) => handleInputChange("number", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project" className="text-right">
                Project
              </Label>
              <Input
                id="project"
                value={newCustomer.project}
                onChange={(e) => handleInputChange("project", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignedTo" className="text-right">
                Assigned To
              </Label>
              <Select
                value={newCustomer.assignedTo}
                onValueChange={(value) => handleInputChange("assignedTo", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sarah Miller">Sarah Miller</SelectItem>
                  <SelectItem value="James Wilson">James Wilson</SelectItem>
                  <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                  <SelectItem value="David Rodriguez">David Rodriguez</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="leadStatus" className="text-right">
                Lead Status
              </Label>
              <Select
                value={newCustomer.leadStatus}
                onValueChange={(value) => handleInputChange("leadStatus", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Discovery">Discovery</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input
                id="city"
                value={newCustomer.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="budgetRange" className="text-right">
                Budget Range
              </Label>
              <Select
                value={newCustomer.budgetRange}
                onValueChange={(value) => handleInputChange("budgetRange", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$10K-$25K">$10K-$25K</SelectItem>
                  <SelectItem value="$25K-$50K">$25K-$50K</SelectItem>
                  <SelectItem value="$50K-$100K">$50K-$100K</SelectItem>
                  <SelectItem value="$100K-$250K">$100K-$250K</SelectItem>
                  <SelectItem value="$250K+">$250K+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nextCallDate" className="text-right">
                Next Call Date
              </Label>
              <Input
                id="nextCallDate"
                type="date"
                value={newCustomer.nextCallDate}
                onChange={(e) => handleInputChange("nextCallDate", e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const StatusMetrics = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Projects
          </CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18</div>
          <p className="text-xs text-muted-foreground">
            +3 since last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Pipeline Value
          </CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1.2M</div>
          <p className="text-xs text-muted-foreground">
            +$250K from last quarter
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Upcoming Calls
          </CardTitle>
          <Calendar className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            Next 7 days
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const Page = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
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
                  <BreadcrumbPage>Customer Projects</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-semibold">Customer Status Report</h1>
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search customers..."
                  className="w-full pl-8"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </div>
          </div>
          
          <StatusMetrics />
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="active">Active Deals</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="overflow-auto rounded-xl border bg-card">
                <CustomersTable customers={customers} />
              </div>
            </TabsContent>
            <TabsContent value="active" className="mt-4">
              <div className="overflow-auto rounded-xl border bg-card">
                <CustomersTable customers={customers.filter(c => c.leadStatus !== "Closed" && c.leadStatus !== "Lost")} />
              </div>
            </TabsContent>
            <TabsContent value="closed" className="mt-4">
              <div className="overflow-auto rounded-xl border bg-card">
                <CustomersTable customers={customers.filter(c => c.leadStatus === "Closed" || c.leadStatus === "Lost")} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
      <AddCustomerDialog 
        onAddCustomer={handleAddCustomer} 
        open={dialogOpen} 
        setOpen={setDialogOpen} 
      />
    </SidebarProvider>
  );
};

export default Page;