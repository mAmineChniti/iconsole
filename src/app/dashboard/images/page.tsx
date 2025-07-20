import Images from "@/components/Images";
import { Sidebar } from "@/components/Sidebar";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "IConsole | Images",
};

export default function ImagesPage() {
  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex-1 flex flex-col backdrop-blur-sm">
        <main className="flex-1 p-8 overflow-y-auto relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gradient-primary via-gradient-secondary to-gradient-accent bg-clip-text text-transparent drop-shadow-md">
                Image Management
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Manage and deploy your OpenStack images
              </p>
            </div>
            <Images />
          </div>
        </main>
      </div>
    </div>
  );
}
