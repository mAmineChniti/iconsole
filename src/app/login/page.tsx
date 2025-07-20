import { type Metadata } from "next";
import { Suspense } from "react";

import Login from "@/components/Login";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const LoginSkeleton = () => (
  <div className="flex h-screen items-center justify-center px-4 py-8 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary/10 via-background to-gradient-secondary/10" />
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-gradient-primary/20 to-gradient-secondary/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-gradient-accent/20 to-gradient-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

    <Card className="w-full max-w-md relative z-10 bg-gradient-to-br from-card/90 via-background/95 to-card/90 border border-border/50 shadow-2xl shadow-primary/10 backdrop-blur-xl">
      <CardHeader className="text-center space-y-4 pb-8">
        <div className="mx-auto">
          <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-4" />
        </div>
        <CardTitle>
          <Skeleton className="h-8 w-3/4 mx-auto" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-5 w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 w-full">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-primary rounded-full" />
              Region
            </Label>
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded" />
              Username
            </Label>
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded" />
              Password
            </Label>
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export const metadata: Metadata = {
  title: "IConsole | Login",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <Login />
    </Suspense>
  );
}
