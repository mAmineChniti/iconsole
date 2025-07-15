"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfraService } from "@/lib/requests";
import type { DashboardOverviewResponse } from "@/types/ResponseInterfaces";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  Cpu,
  Database,
  HardDrive,
  MemoryStick,
  Network,
  Server,
  Users,
} from "lucide-react";

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

  if (loading) {
    const borderColors = [
      "border-l-chart-1/50 hover:border-l-chart-1",
      "border-l-chart-2/50 hover:border-l-chart-2",
      "border-l-chart-3/50 hover:border-l-chart-3",
      "border-l-chart-4/50 hover:border-l-chart-4",
      "border-l-chart-5/50 hover:border-l-chart-5",
      "border-l-green-500/50 hover:border-l-green-500",
      "border-l-yellow-500/50 hover:border-l-yellow-500",
      "border-l-destructive/50 hover:border-l-destructive",
      "border-l-blue-500/50 hover:border-l-blue-500",
      "border-l-purple-500/50 hover:border-l-purple-500",
      "border-l-chart-1/50 hover:border-l-chart-1",
      "border-l-chart-2/50 hover:border-l-chart-2",
      "border-l-destructive/50 hover:border-l-destructive",
      "border-l-chart-3/50 hover:border-l-chart-3",
      "border-l-chart-4/50 hover:border-l-chart-4",
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        {Array.from({ length: 15 }).map((_, i) => (
          <Card
            key={i}
            className={`h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 ${borderColors[i]} bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10 animate-pulse`}
          >
            <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-8 w-8 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              </div>
              <div className="h-3 bg-muted rounded w-24"></div>
              {(i === 3 || i === 4) && (
                <div className="mt-3">
                  <div className="h-2.5 bg-muted/50 rounded-full w-full shadow-inner">
                    <div className="h-2.5 bg-muted rounded-full w-3/4"></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span>Error loading dashboard data: {error.message}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return undefined;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-chart-1/50 hover:border-l-chart-1 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Nodes
          </CardTitle>
          <Server className="h-8 w-8 text-chart-1 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-chart-1 drop-shadow-md">
              {data.platform_info.nodes}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Compute nodes
          </p>
        </CardContent>
      </Card>

      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-chart-2/50 hover:border-l-chart-2 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Projects
          </CardTitle>
          <Database className="h-8 w-8 text-chart-2 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-chart-2 drop-shadow-md">
              {data.platform_info.projects}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Active projects
          </p>
        </CardContent>
      </Card>

      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-chart-3/50 hover:border-l-chart-3 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Users
          </CardTitle>
          <Users className="h-8 w-8 text-chart-3 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold  flex items-center justify-center">
            <span className="text-chart-3 drop-shadow-md">
              {data.platform_info.users}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Total users
          </p>
        </CardContent>
      </Card>

      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-chart-4/50 hover:border-l-chart-4 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            CPU Usage
          </CardTitle>
          <Cpu className="h-8 w-8 text-chart-4 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <span className="text-chart-4 drop-shadow-md">
              {data.resources.cpu.usage_percent.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {data.resources.cpu.used} / {data.resources.cpu.total} cores
          </p>
          <div className="mt-3 w-full bg-muted/50 rounded-full h-2.5 shadow-inner">
            <div
              className="h-2.5 rounded-full transition-all duration-500 bg-gradient-to-r from-chart-4 to-primary shadow-lg shadow-chart-4/50"
              style={{ width: `${data.resources.cpu.usage_percent}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-chart-5/50 hover:border-l-chart-5 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            RAM Usage
          </CardTitle>
          <MemoryStick className="h-8 w-8 text-chart-5 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <span className="text-chart-5 drop-shadow-md">
              {data.resources.ram.usage_percent.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {(data.resources.ram.used / 1024).toFixed(1)} /{" "}
            {(data.resources.ram.total / 1024).toFixed(1)} GB
          </p>
          <div className="mt-3 w-full bg-muted/50 rounded-full h-2.5 shadow-inner">
            <div
              className="h-2.5 rounded-full transition-all duration-500 bg-gradient-to-r from-chart-5 to-primary shadow-lg shadow-chart-5/50"
              style={{ width: `${data.resources.ram.usage_percent}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-green-500/50 hover:border-l-green-500 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Active Instances
          </CardTitle>
          <Activity className="h-8 w-8 text-green-500 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-green-500 drop-shadow-md">
              {data.resources.instances.ACTIVE}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            of {data.resources.instances.total} total
          </p>
        </CardContent>
      </Card>

      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-yellow-500/50 hover:border-l-yellow-500 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Shutoff Instances
          </CardTitle>
          <Server className="h-8 w-8 text-yellow-500 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-yellow-500 drop-shadow-md">
              {data.resources.instances.SHUTOFF}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Stopped instances
          </p>
        </CardContent>
      </Card>

      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-destructive/50 hover:border-l-destructive bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Error Instances
          </CardTitle>
          <AlertTriangle className="h-8 w-8 text-destructive drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold  flex items-center justify-center">
            <span className="text-destructive drop-shadow-md">
              {data.resources.instances.ERROR}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Failed instances
          </p>
        </CardContent>
      </Card>

      {/* Available Volumes */}
      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-blue-500/50 hover:border-l-blue-500 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Available Volumes
          </CardTitle>
          <HardDrive className="h-8 w-8 text-blue-500 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-blue-500 drop-shadow-md">
              {data.resources.volumes.available}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            of {data.resources.volumes.total} total
          </p>
        </CardContent>
      </Card>

      {/* In-Use Volumes */}
      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-purple-500/50 hover:border-l-purple-500 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            In-Use Volumes
          </CardTitle>
          <Database className="h-8 w-8 text-purple-500 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-purple-500 drop-shadow-md">
              {data.resources.volumes["in-use"]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Active volumes
          </p>
        </CardContent>
      </Card>

      {/* Compute Services */}
      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-chart-1/50 hover:border-l-chart-1 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Compute Services
          </CardTitle>
          <Cpu className="h-8 w-8 text-chart-1 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-chart-1 drop-shadow-md">
              {data.compute_services.filter((s) => s.state === "up").length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            of {data.compute_services.length} up
          </p>
        </CardContent>
      </Card>

      {/* Network Services */}
      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-chart-2/50 hover:border-l-chart-2 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Network Services
          </CardTitle>
          <Network className="h-8 w-8 text-chart-2 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-chart-2 drop-shadow-md">
              {data.network_services.filter((s) => s.alive).length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            of {data.network_services.length} alive
          </p>
        </CardContent>
      </Card>

      {/* Hypervisor Errors */}
      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-destructive/50 hover:border-l-destructive bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Hypervisor Errors
          </CardTitle>
          <AlertTriangle className="h-8 w-8 text-destructive drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-destructive drop-shadow-md">
              {data.platform_info.hypervisor_errors.length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            System errors
          </p>
        </CardContent>
      </Card>

      {/* Unused RAM */}
      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-chart-3/50 hover:border-l-chart-3 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Available RAM
          </CardTitle>
          <MemoryStick className="h-8 w-8 text-chart-3 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-chart-3 drop-shadow-md">
              {(data.resources.ram.unused / 1024).toFixed(1)} GB
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Free memory
          </p>
        </CardContent>
      </Card>

      {/* Unused CPU */}
      <Card className="h-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-chart-4/50 hover:border-l-chart-4 bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm border border-border shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col items-center justify-center space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Available CPU
          </CardTitle>
          <Cpu className="h-8 w-8 text-chart-4 drop-shadow-lg" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center justify-center">
            <span className="text-chart-4 drop-shadow-md">
              {data.resources.cpu.unused}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Free cores
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
