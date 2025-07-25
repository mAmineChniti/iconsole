"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Shield,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { setCookie } from "cookies-next";

import { env } from "@/env";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/types/LoginSchema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      region: "RegionOne",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const envUsername = env.NEXT_PUBLIC_LOGIN_USERNAME;
      const envPassword = env.NEXT_PUBLIC_LOGIN_PASSWORD;

      if (data.username !== envUsername || data.password !== envPassword) {
        form.setError("root", {
          type: "manual",
          message: "Invalid username or password. Please try again.",
        });
        return;
      }

      await setCookie(
        "user",
        JSON.stringify({
          username: data.username,
          region: data.region,
          loginTime: new Date().toISOString(),
        }),
        {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        },
      );

      router.push("/dashboard/overview");
    } catch {
      form.setError("root", {
        type: "manual",
        message: "An error occurred during login. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome to IConsole
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Secure access to your infrastructure management portal
            </p>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">
              Sign in to continue
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Region
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="!h-12 w-full rounded-xl border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 cursor-pointer">
                            <SelectValue placeholder="Select a region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="RegionOne">RegionOne</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Username
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter your username"
                            className={cn(
                              "h-12 pl-10 pr-4 text-sm transition-all duration-200",
                              "border-slate-200 dark:border-slate-600 rounded-xl",
                              "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                              "bg-white dark:bg-slate-700",
                              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                            )}
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className={cn(
                              "h-12 pl-10 pr-12 text-sm transition-all duration-200",
                              "border-slate-200 dark:border-slate-600 rounded-xl",
                              "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                              "bg-white dark:bg-slate-700",
                              "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                            )}
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-slate-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-slate-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root && (
                  <div className="flex items-center gap-3 p-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {form.formState.errors.root.message}
                  </div>
                )}

                <Button
                  type="submit"
                  className={cn(
                    "w-full h-12 text-sm font-medium transition-all duration-200 rounded-xl cursor-pointer",
                    "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
                    "text-white shadow-lg",
                    "focus:ring-4 focus:ring-blue-500/20 focus:ring-offset-2",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign in securely
                  </div>
                </Button>
              </form>
            </Form>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-600">
              <p className="text-xs text-center text-slate-500 dark:text-slate-400 leading-relaxed">
                Protected by enterprise-grade security.
                <br />
                By signing in, you agree to our terms of service and privacy
                policy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
