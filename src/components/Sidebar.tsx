"use client";
import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";
import { BarChart3, HardDrive, LogOut, Server } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
  const Logout = async () => {
    await deleteCookie("user", { path: "/" });
    router.push("/login");
  };
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-card/90 via-background/95 to-card/90 border-r border-border/50 flex flex-col py-6 px-4 gap-4 backdrop-blur-xl shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-b from-chart-1/5 via-transparent to-chart-2/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="font-bold text-2xl mb-8 select-none bg-gradient-to-r from-chart-1 via-primary to-chart-2 bg-clip-text text-transparent drop-shadow-sm">
          IConsole
        </div>

        <nav className="flex flex-col gap-3 flex-1">
          <Link href="/dashboard/overview">
            <Button
              variant="ghost"
              className="justify-start gap-3 cursor-pointer h-12 w-full hover:bg-gradient-to-r hover:from-chart-1/10 hover:to-chart-2/10 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-chart-1/20 text-left hover:translate-x-1"
            >
              <BarChart3 className="h-5 w-5 text-chart-1 drop-shadow-sm" />
              <span className="font-medium">Dashboard</span>
            </Button>
          </Link>

          <Link href="/dashboard/servers">
            <Button
              variant="ghost"
              className="justify-start gap-3 cursor-pointer h-12 w-full hover:bg-gradient-to-r hover:from-chart-1/10 hover:to-chart-2/10 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-chart-1/20 text-left hover:translate-x-1"
            >
              <Server className="h-5 w-5 text-chart-2 drop-shadow-sm" />
              <span className="font-medium">Servers</span>
            </Button>
          </Link>

          <Link href="/dashboard/images">
            <Button
              variant="ghost"
              className="justify-start gap-3 cursor-pointer h-12 w-full hover:bg-gradient-to-r hover:from-chart-1/10 hover:to-chart-2/10 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-chart-1/20 text-left hover:translate-x-1"
            >
              <HardDrive className="h-5 w-5 text-chart-3 drop-shadow-sm" />
              <span className="font-medium">Images</span>
            </Button>
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-border/30">
          <Button
            variant="ghost"
            className="justify-start gap-3 cursor-pointer h-12 w-full hover:bg-gradient-to-r hover:from-destructive/10 hover:to-red-500/10 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-destructive/20 text-left hover:translate-x-1"
            onClick={Logout}
          >
            <LogOut className="h-5 w-5 text-destructive drop-shadow-sm" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
