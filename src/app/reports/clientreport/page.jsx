"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, subDays } from "date-fns";

const clients = [
  { id: 1, name: "ABC Corp", number: "9876543210", contact: "John Doe", email: "john@abc.com", city: "New York", projects: 3, lastInteraction: "2025-03-18" },
  { id: 2, name: "XYZ Ltd", number: "8765432109", contact: "Jane Smith", email: "jane@xyz.com", city: "Los Angeles", projects: 5, lastInteraction: "2025-03-16" },
  { id: 3, name: "LMN Inc", number: "7654321098", contact: "Alice Johnson", email: "alice@lmn.com", city: "Chicago", projects: 2, lastInteraction: "2025-03-20" },
];

const Page = () => {
  const [filter, setFilter] = useState("Today");
  const [customDate, setCustomDate] = useState(new Date());

  const today = format(new Date(), "yyyy-MM-dd");
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
  const customFormatted = format(customDate, "yyyy-MM-dd");

  const getFilteredClients = () => {
    return clients.filter(client => {
      if (filter === "Today") return client.lastInteraction === today;
      if (filter === "Yesterday") return client.lastInteraction === yesterday;
      if (filter === "Custom") return client.lastInteraction === customFormatted;
      return true;
    });
  };

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
                <BreadcrumbPage>Client Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex gap-2">
            <Button onClick={() => setFilter("Today")}>Today</Button>
            <Button onClick={() => setFilter("Yesterday")}>Yesterday</Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button onClick={() => setFilter("Custom")}>
                  Custom Range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <Calendar selected={customDate} onSelect={setCustomDate} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Client Number</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Last Interaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredClients().length > 0 ? (
                  getFilteredClients().map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.number}</TableCell>
                      <TableCell>{client.contact}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.city}</TableCell>
                      <TableCell>{client.projects}</TableCell>
                      <TableCell>{client.lastInteraction}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-500">No client data available</TableCell>
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