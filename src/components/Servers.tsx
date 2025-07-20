"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfraService } from "@/lib/requests";
import type {
  InstanceStatus,
  NovaActionResponse,
  NovaServersResponse,
} from "@/types/ResponseInterfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Loader2,
  Play,
  RotateCcw,
  Server as ServerIcon,
  Square,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const getStatusColor = (status: InstanceStatus) => {
  switch (status) {
    case "ACTIVE":
      return "text-green-500";
    case "SHUTOFF":
      return "text-yellow-500";
    case "ERROR":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

const getStatusBg = (status: InstanceStatus) => {
  switch (status) {
    case "ACTIVE":
      return "border-l-4 border-l-green-500/50 hover:border-l-green-500 bg-gradient-to-br from-card via-background/90 to-green-500/5 backdrop-blur-sm shadow-lg shadow-green-500/10";
    case "SHUTOFF":
      return "border-l-4 border-l-yellow-500/50 hover:border-l-yellow-500 bg-gradient-to-br from-card via-background/90 to-yellow-500/5 backdrop-blur-sm shadow-lg shadow-yellow-500/10";
    case "ERROR":
      return "border-l-4 border-l-destructive/50 hover:border-l-destructive bg-gradient-to-br from-card via-background/90 to-destructive/5 backdrop-blur-sm shadow-lg shadow-destructive/10";
    default:
      return "border-l-4 border-l-muted/50 hover:border-l-muted bg-gradient-to-br from-card via-background/90 to-muted/5 backdrop-blur-sm shadow-lg shadow-primary/10";
  }
};

export default function Servers() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: servers,
    isLoading: loading,
    error,
  } = useQuery<NovaServersResponse>({
    queryKey: ["servers"],
    queryFn: () => InfraService.listServers(),
    refetchInterval: 30000,
    staleTime: 25000,
  });

  const startMutation = useMutation<NovaActionResponse, Error, string>({
    mutationFn: (serverId: string) => InfraService.startServer(serverId),
    onSuccess: (data) => {
      toast.success(data.message || "Server started successfully");
      void queryClient.invalidateQueries({ queryKey: ["servers"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to start server: ${error.message}`);
    },
  });

  const stopMutation = useMutation<NovaActionResponse, Error, string>({
    mutationFn: (serverId: string) => InfraService.stopServer(serverId),
    onSuccess: (data) => {
      toast.success(data.message || "Server stopped successfully");
      void queryClient.invalidateQueries({ queryKey: ["servers"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to stop server: ${error.message}`);
    },
  });

  const rebootMutation = useMutation<NovaActionResponse, Error, string>({
    mutationFn: (serverId: string) => InfraService.rebootServer(serverId),
    onSuccess: (data) => {
      toast.success(data.message || "Server rebooted successfully");
      void queryClient.invalidateQueries({ queryKey: ["servers"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to reboot server: ${error.message}`);
    },
  });

  const deleteMutation = useMutation<NovaActionResponse, Error, string>({
    mutationFn: (serverId: string) => InfraService.deleteServer(serverId),
    onSuccess: (data) => {
      toast.success(data.message || "Server deleted successfully");
      void queryClient.invalidateQueries({ queryKey: ["servers"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete server: ${error.message}`);
    },
  });

  const handleStartServer = (serverId: string) => {
    startMutation.mutate(serverId);
  };

  const handleStopServer = (serverId: string) => {
    stopMutation.mutate(serverId);
  };

  const handleRebootServer = (serverId: string) => {
    rebootMutation.mutate(serverId);
  };

  const handleDeleteServer = (serverId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this server? This action cannot be undone.",
      )
    ) {
      deleteMutation.mutate(serverId);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="animate-pulse hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-l-muted/50 hover:border-l-muted bg-gradient-to-br from-card via-background/90 to-muted/5 backdrop-blur-sm border border-border shadow-lg shadow-primary/10"
          >
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-muted rounded w-16"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-muted rounded"></div>
                  <div className="h-8 w-8 bg-muted rounded"></div>
                  <div className="h-8 w-8 bg-muted rounded"></div>
                  <div className="h-8 w-8 bg-muted rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
              Error loading servers
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

  if (!servers || servers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Card className="w-full bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm shadow-lg shadow-primary/10">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <ServerIcon className="h-16 w-16 text-muted-foreground/50 mb-2" />
            <div className="text-xl font-semibold text-foreground">
              No servers found
            </div>
            <div className="text-sm text-muted-foreground text-center max-w-md">
              Your server list is empty. Servers will appear here once they are
              created in your OpenStack environment.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servers.map((server) => (
        <Card
          key={server.id}
          className={`hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-border ${getStatusBg(server.status)}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ServerIcon className="h-5 w-5" />
                {server.name}
              </span>
              <span
                className={`text-sm font-medium ${getStatusColor(server.status)}`}
              >
                {server.status.toUpperCase()}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                ID: {server.id}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 cursor-pointer"
                  onClick={() => handleStartServer(server.id)}
                  disabled={startMutation.isPending}
                >
                  {startMutation.isPending &&
                  startMutation.variables === server.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 cursor-pointer"
                  onClick={() => handleStopServer(server.id)}
                  disabled={stopMutation.isPending}
                >
                  {stopMutation.isPending &&
                  stopMutation.variables === server.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 cursor-pointer"
                  onClick={() => handleRebootServer(server.id)}
                  disabled={rebootMutation.isPending}
                >
                  {rebootMutation.isPending &&
                  rebootMutation.variables === server.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RotateCcw className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 cursor-pointer text-destructive hover:text-destructive"
                  onClick={() => handleDeleteServer(server.id)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending &&
                  deleteMutation.variables === server.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
