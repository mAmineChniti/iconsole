"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorCardProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function ErrorCard({
  title = "An error occurred",
  message = "Something went wrong. Please try again.",
  onRetry,
  isRetrying = false,
}: ErrorCardProps) {
  return (
    <div className="space-y-6 px-2 sm:px-4 lg:px-6 max-w-none">
      <Card className="border-destructive bg-destructive/5 backdrop-blur-sm w-full">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-destructive">
                {title}
              </h3>
              <p className="text-base text-muted-foreground max-w-md">
                {message}
              </p>
            </div>
            {onRetry && (
              <Button
                onClick={onRetry}
                disabled={isRetrying}
                className="mt-4 cursor-pointer"
                variant="outline"
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
