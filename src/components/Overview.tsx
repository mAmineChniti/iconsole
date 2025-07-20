"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InfraService } from "@/lib/requests";
import type { DashboardOverviewResponse } from "@/types/ResponseInterfaces";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  Cpu,
  Database,
  FolderDot,
  HardDrive,
  MemoryStick,
  Network,
  Server,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Overview() {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<DashboardOverviewResponse>({
    queryKey: ["dashboard-overview"],
    queryFn: () => InfraService.getOverview(),
    refetchInterval: 30000,
    staleTime: 25000,
  });
  const router = useRouter();

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-12 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card
                key={i}
                className="bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50"
              >
                <CardHeader>
                  <div className="flex flex-row items-center justify-between space-y-0">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="w-full h-2 rounded-full" />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j}>
                        <Skeleton className="h-4 w-8 mb-1 mx-auto" />
                        <Skeleton className="h-3 w-12 mx-auto" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-36" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-2 w-2 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-12 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-36" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-12 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-28" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-8 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Card className="w-full border-destructive bg-gradient-to-br from-destructive/10 to-background/80 shadow-lg shadow-destructive/10">
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
            <div className="text-lg font-semibold text-destructive">
              Error loading data
            </div>
            <div className="text-sm text-muted-foreground text-center">
              {error.message}
            </div>
            <Button
              variant="destructive"
              onClick={() => router.refresh()}
              className="mt-2 cursor-pointer"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Card className="max-w-md w-full bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="flex flex-col items-center gap-6 py-12 px-8">
              <div className="relative">
                <Database className="h-20 w-20 text-muted-foreground/30 mb-2" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-full blur-sm"></div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-xl font-semibold text-foreground">
                  No Dashboard Data Available
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                  Dashboard metrics are not available at the moment. Please
                  check your OpenStack connection and try again.
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="text-xs text-muted-foreground/70 text-center">
                Waiting for data connection...
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Database className="h-5 w-5" />
          Platform Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Compute Nodes
              </CardTitle>
              <Server className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                {data.platform_info.nodes}
              </div>
              <p className="text-xs text-muted-foreground">Active nodes</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Active Projects
              </CardTitle>
              <FolderDot className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                {data.platform_info.projects}
              </div>
              <p className="text-xs text-muted-foreground">Total projects</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                {data.platform_info.users}
              </div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                System Errors
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500 group-hover:text-amber-400 transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 group-hover:scale-105 transition-transform">
                {data.platform_info.hypervisor_errors.length}
              </div>
              <p className="text-xs text-muted-foreground">Hypervisor errors</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Resource Utilization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
            <CardHeader>
              <div className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                  CPU Resources
                </CardTitle>
                <Cpu className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Usage</span>
                <span className="text-sm font-medium text-foreground">
                  {data.resources.cpu.usage_percent.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500/80 to-blue-600/80"
                  style={{ width: `${data.resources.cpu.usage_percent}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {data.resources.cpu.used}
                  </div>
                  <div className="text-xs text-muted-foreground">Used</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {data.resources.cpu.unused}
                  </div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {data.resources.cpu.total}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Cores
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
            <CardHeader>
              <div className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                  Memory Resources
                </CardTitle>
                <MemoryStick className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Usage</span>
                <span className="text-sm font-medium text-foreground">
                  {data.resources.ram.usage_percent.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500/80 to-emerald-600/80"
                  style={{ width: `${data.resources.ram.usage_percent}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {(data.resources.ram.used / 1024).toFixed(1)} GB
                  </div>
                  <div className="text-xs text-muted-foreground">Used</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {(data.resources.ram.unused / 1024).toFixed(1)} GB
                  </div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {(data.resources.ram.total / 1024).toFixed(1)} GB
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Memory
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Server className="h-5 w-5" />
          Instance Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Active Instances
              </CardTitle>
              <div className="h-2 w-2 bg-emerald-500 rounded-full group-hover:bg-emerald-400 transition-colors"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                {data.resources.instances.ACTIVE}
              </div>
              <p className="text-xs text-muted-foreground">Running normally</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Stopped Instances
              </CardTitle>
              <div className="h-2 w-2 bg-slate-400 rounded-full group-hover:bg-slate-300 transition-colors"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                {data.resources.instances.SHUTOFF}
              </div>
              <p className="text-xs text-muted-foreground">Powered off</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Error Instances
              </CardTitle>
              <div className="h-2 w-2 bg-red-500 rounded-full group-hover:bg-red-400 transition-colors"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 group-hover:scale-105 transition-transform">
                {data.resources.instances.ERROR}
              </div>
              <p className="text-xs text-muted-foreground">Failed instances</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Other States
              </CardTitle>
              <div className="h-2 w-2 bg-amber-500 rounded-full group-hover:bg-amber-400 transition-colors"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                {data.resources.instances.OTHERS}
              </div>
              <p className="text-xs text-muted-foreground">Building, etc.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Volume Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Available Volumes
                </CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                  {data.resources.volumes.available}
                </div>
                <p className="text-xs text-muted-foreground">Ready to use</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  In-Use Volumes
                </CardTitle>
                <Database className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                  {data.resources.volumes["in-use"]}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently attached
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Network className="h-5 w-5" />
            Service Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Compute Services
                </CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                  {data.compute_services.filter((s) => s.state === "up").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  of {data.compute_services.length} online
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 ease-out bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border/50 cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Network Services
                </CardTitle>
                <Network className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                  {data.network_services.filter((s) => s.alive).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  of {data.network_services.length} responding
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
