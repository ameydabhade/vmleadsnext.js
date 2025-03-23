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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const settings = [
  { name: "Enable Notifications", description: "Receive email and push notifications.", id: "notifications" },
  { name: "Dark Mode", description: "Use dark theme for better visibility at night.", id: "dark-mode" },
  { name: "Auto Updates", description: "Automatically install new updates.", id: "auto-updates" },
  { name: "Two-Factor Authentication", description: "Enhance security with 2FA.", id: "2fa" },
  { name: "Profile Visibility", description: "Control who can see your profile.", id: "profile-visibility" },
];

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-white shadow-sm">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>General</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-col gap-6 p-6">
          {/* Profile Settings */}
          <Card className="border rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Update your display name</p>
                <Input placeholder="Enter your name" className="mt-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Change your email address</p>
                <Input type="email" placeholder="Enter your email" className="mt-2" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* General Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settings.map((setting) => (
              <Card key={setting.id} className="border rounded-lg shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{setting.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">{setting.description}</p>
                  <Switch id={setting.id} />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Language Preference */}
          <Card className="border rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Language Preference</CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;