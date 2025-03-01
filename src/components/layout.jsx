"use client";

import { AppSidebar } from "@/components/app-sidebar"; // Import Sidebar

export default function Layout({ children }) {
  return (
    <div className="flex">
      <AppSidebar className="w-64" /> {/* Sidebar */}
      <main className="flex-1 p-4">{children}</main> {/* Main Content */}
    </div>
  );
}
