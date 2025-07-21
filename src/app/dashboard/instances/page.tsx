import { type Metadata } from "next";

import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "IConsole | Instances",
  description: "Manage your virtual machine instances",
};

export default function InstancesPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen">
        <div className="container mx-auto p-6 max-w-7xl space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Instances
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor your virtual machine instances
            </p>
          </div>

          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No instances found. Create your first instance to get started.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
