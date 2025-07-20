"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfraService } from "@/lib/requests";
import type {
  ImageListResponse,
  ImageStatus,
} from "@/types/ResponseInterfaces";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Download, HardDrive, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const getStatusColor = (status: ImageStatus) => {
  switch (status) {
    case "active":
      return "text-green-500";
    case "queued":
      return "text-yellow-500";
    case "saving":
      return "text-blue-500";
    default:
      return "text-muted-foreground";
  }
};

const getStatusBg = (status: ImageStatus) => {
  switch (status) {
    case "active":
      return "border-l-4 border-l-green-500/50 hover:border-l-green-500 bg-gradient-to-br from-card via-background/90 to-green-500/5 backdrop-blur-sm shadow-lg shadow-green-500/10";
    case "queued":
      return "border-l-4 border-l-yellow-500/50 hover:border-l-yellow-500 bg-gradient-to-br from-card via-background/90 to-yellow-500/5 backdrop-blur-sm shadow-lg shadow-yellow-500/10";
    case "saving":
      return "border-l-4 border-l-blue-500/50 hover:border-l-blue-500 bg-gradient-to-br from-card via-background/90 to-blue-500/5 backdrop-blur-sm shadow-lg shadow-blue-500/10";
    default:
      return "border-l-4 border-l-muted/50 hover:border-l-muted bg-gradient-to-br from-card via-background/90 to-muted/5 backdrop-blur-sm shadow-lg shadow-primary/10";
  }
};

export default function Images() {
  const {
    data: images,
    isLoading: loading,
    error,
  } = useQuery<ImageListResponse>({
    queryKey: ["images"],
    queryFn: () => InfraService.listImages(),
    refetchInterval: 30000,
    staleTime: 25000,
  });
  const router = useRouter();

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
              Error loading images
            </div>
            <div className="text-sm text-muted-foreground text-center max-w-md">
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

  if (!images || images.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Card className="w-full bg-gradient-to-br from-card via-background/90 to-muted/30 backdrop-blur-sm shadow-lg shadow-primary/10">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <HardDrive className="h-16 w-16 text-muted-foreground/50 mb-2" />
            <div className="text-xl font-semibold text-foreground">
              No images found
            </div>
            <div className="text-sm text-muted-foreground text-center max-w-md">
              Your image library is empty. Images will appear here once they are
              uploaded to your OpenStack environment.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <Card
          key={image.id}
          className={`hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-border ${getStatusBg(image.status)}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                <span className="truncate">{image.name}</span>
              </span>
              <span
                className={`text-sm font-medium ${getStatusColor(image.status)}`}
              >
                {image.status.toUpperCase()}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                ID: {image.id}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 cursor-pointer"
                  title="Download Image"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 cursor-pointer text-destructive hover:text-destructive"
                  title="Delete Image"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
