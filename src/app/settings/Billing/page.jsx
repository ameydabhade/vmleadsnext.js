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
import { Button } from "@/components/ui/button";

const billingPlans = [
  { name: "Gold", price: "₹799/month", features: ["Unlimited Users", "200GB Storage", "24/7 Support"], color: "bg-yellow-500" },
  { name: "Silver", price: "₹599/month", features: ["20 Users", "50GB Storage", "Priority Support"], color: "bg-gray-400" },
  { name: "Bronze", price: "₹399/month", features: ["5 Users", "10GB Storage", "Email Support"], color: "bg-orange-600" },
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
                <BreadcrumbLink href="#">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Billing</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-col gap-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {billingPlans.map((plan, index) => (
              <Card key={index} className={`shadow-md border p-4 ${plan.color} text-white`}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold">{plan.price}</p>
                  <ul className="mt-2 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mt-1">• {feature}</li>
                    ))}
                  </ul>
                  <Button className="mt-4 w-full bg-white text-black hover:bg-gray-200">Choose Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Page;