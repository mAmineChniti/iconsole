import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          {/* Add your dashboard content here */}
        </main>
      </div>
    </div>
  );
}
