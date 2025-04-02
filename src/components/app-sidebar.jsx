"use client";

import * as React from "react";
import { SquareTerminal, Bot, Settings2, LifeBuoy, LogOut } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Amey",
    email: "ameydabhade4@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Analytics", url: "/dashboard/analytics" },
        { title: "Leads", url: "/dashboard/leads" },
        { title: "Calls", url: "/dashboard/calls" },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        { title: "Lead Report", url: "/reports/leadreport" },
        { title: "Status Report", url: "/reports/statusreport" },
        { title: "Client Report", url: "/reports/clientreport" },
        { title: "Employee Report", url: "/reports/Employeereport" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      isActive: true,
      items: [
        { title: "General", url: "/settings/General" },
        { title: "Billing", url: "/settings/Billing" },
        { title: "Limits", url: "/settings/Limits" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible {...props}>
      <SidebarHeader className="flex justify-center items-center">
        <a
          className="text-[#2D2CB8] font-bold text-2xl"
          href="/dashboard/analytics"
          data-discover="true"
        >
          VMLEADS
        </a>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <SidebarFooter className="m-2">
          <div className="mt-4 flex flex-col gap-2">
            <a
              href="/support"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faTicket} />
              Support
            </a>
            <a
              href="/logout"
              className="flex items-center gap-2 text-red-600 hover:text-red-800 "
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Logout
            </a>
          </div>
        </SidebarFooter>
      </SidebarContent>
      <NavUser user={data.user} />
      <SidebarRail />
    </Sidebar>
  );
}
