import Overview from "@/components/Overview";
import { Sidebar } from "@/components/Sidebar";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "IConsole | Overview",
};

export default function OverviewPage() {
  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex-1 flex flex-col backdrop-blur-sm">
        <main className="flex-1 p-8 overflow-y-auto relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-chart-1 to-chart-2 bg-clip-text text-transparent drop-shadow-md">
                Infrastructure Dashboard
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Real-time system monitoring and analytics
              </p>
            </div>
            <Overview />
          </div>
        </main>
      </div>
    </div>
  );
}
