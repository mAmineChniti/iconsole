import { type Metadata } from "next";

import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "IConsole | Images",
  description: "Manage your system images and templates",
};

export default function ImagesPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen">
        <div className="container mx-auto p-6 max-w-7xl space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent select-none">
              Images
            </h1>
            <p className="text-muted-foreground">
              Manage system images and virtual machine templates
            </p>
          </div>

          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No images found. Upload your first image to get started.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
