import { type Metadata } from "next";

import { Instances } from "@/components/Instances";
import { Sidebar } from "@/components/Sidebar";

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
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent select-none">
              Instances
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor your virtual machine instances
            </p>
          </div>
          <Instances />
        </div>
      </main>
    </div>
  );
}
