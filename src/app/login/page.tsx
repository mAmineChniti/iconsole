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
  <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>
          <Skeleton className="h-10 w-2/3 mx-auto" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-6 w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 w-full">
          <div className="space-y-2">
            <Label>Email</Label>
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Skeleton className="h-10 w-full rounded-md" />
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
