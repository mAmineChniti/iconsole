import { type Metadata } from "next";

import { Images } from "@/components/Images";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "IConsole | Images",
  description: "Manage your system images and templates",
};

export default function ImagesPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen">
        <div className="w-full p-4 sm:p-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent select-none">
              Images
            </h1>
            <p className="text-muted-foreground">
              Manage system images and virtual machine templates
            </p>
          </div>
          <Images />
        </div>
      </main>
    </div>
  );
}
