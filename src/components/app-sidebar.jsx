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
        { title: "Analytics", url: "analytics" },
        { title: "Leads", url: "leads" },
        { title: "Calls", url: "calls" },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: Bot,
      items: [
        { title: "Lead Report", url: "leadreport" },
        { title: "Status Report", url: "statusreport" },
        { title: "Client Report", url: "clientreport" },
        { title: "Employee Report", url: "Employeereport" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "General" },
        { title: "Billing", url: "Billing" },
        { title: "Limits", url: "Limits" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible {...props}>
      <SidebarHeader className="flex justify-center items-center">
        <a
          className="text-[#2D2CB8] font-bold text-3xl"
          href="/"
          data-discover="true"
        >
          Vigomerge
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
