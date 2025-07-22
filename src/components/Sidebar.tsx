"use client";

import { deleteCookie, getCookie } from "cookies-next";
import {
  HardDrive,
  LayoutGrid,
  LogOut,
  Moon,
  Server,
  Shield,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
  {
    title: "Overview",
    icon: LayoutGrid,
    href: "/dashboard/overview",
  },
  {
    title: "Instances",
    icon: Server,
    href: "/dashboard/instances",
  },
  {
    title: "Images",
    icon: HardDrive,
    href: "/dashboard/images",
  },
];

const getCurrentUser = ():
  | {
      username: string;
      region: string;
      loginTime: string;
    }
  | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const userCookie = getCookie("user");
    if (userCookie) {
      return JSON.parse(userCookie as string) as {
        username: string;
        region: string;
        loginTime: string;
      };
    }
  } catch {
    return undefined;
  }
  return undefined;
};

export function Sidebar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await deleteCookie("user");
    router.push("/login");
  };

  const user = getCurrentUser();

  return (
    <div className="sticky top-0 flex flex-col h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700">
      <div className="flex items-center p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent select-none">
            IConsole
          </span>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start h-10 px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                <span className="text-sm font-medium">{item.title}</span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 space-y-2">
        {mounted && user && (
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white text-sm font-medium">
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {user.username}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user.region}
              </p>
            </div>
          </div>
        )}

        <Separator />

        <Button
          variant="ghost"
          className="w-full h-10 justify-start px-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-4 w-4 mr-3" />
          ) : (
            <Moon className="h-4 w-4 mr-3" />
          )}
          <span className="text-sm font-medium">
            {mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </Button>

        <Button
          variant="ghost"
          className="w-full h-10 justify-start px-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          <span className="text-sm font-medium">Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
