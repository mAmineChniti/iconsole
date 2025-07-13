"use client";
import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next";
import { Home, LogOut, Settings } from "lucide-react";

const Logout = () => {
  void deleteCookie("user", { path: "/" });
  window.location.href = "/login";
};

export function Navbar() {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-card border-b">
      <div className="font-bold text-lg select-none">IConsole</div>
      <div className="flex gap-2">
        <Button variant="ghost" className="cursor-pointer">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <Button variant="ghost" className="cursor-pointer">
          <Settings className="w-4 h-4" /> Settings
        </Button>
        <Button
          variant="outline"
          onClick={Logout}
          type="button"
          className="cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>
    </nav>
  );
}
