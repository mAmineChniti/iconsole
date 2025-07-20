"use client";

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
import { env } from "@/env";
import { loginSchema } from "@/types/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { LogIn, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function Login() {
  const router = useRouter();
  const form = useForm<z.output<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      region: "regionone",
    },
  });

  const onSubmit: Parameters<typeof form.handleSubmit>[0] = async (data) => {
    const { username, password } = data;
    const allowedUsername: string = env.NEXT_PUBLIC_LOGIN_USERNAME ?? "";
    const allowedPassword: string = env.NEXT_PUBLIC_LOGIN_PASSWORD ?? "";

    if (username === allowedUsername && password === allowedPassword) {
      await setCookie("user", JSON.stringify({ username, password }), {
        path: "/",
      });
      router.push("/dashboard");
    } else {
      toast.error("Invalid username or password.");
      form.reset();
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-primary/10 via-background to-gradient-secondary/10" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-gradient-primary/20 to-gradient-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-gradient-accent/20 to-gradient-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <Card className="w-full max-w-md relative z-10 bg-gradient-to-br from-card/90 via-background/95 to-card/90 border border-border/50 shadow-2xl shadow-primary/10 backdrop-blur-xl hover:scale-105 transition-all duration-500">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gradient-primary to-gradient-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-gradient-primary/30">
            <Shield className="h-8 w-8 text-primary-foreground drop-shadow-sm" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gradient-primary via-gradient-secondary to-gradient-accent bg-clip-text text-transparent">
            Welcome to IConsole
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Sign in to access your infrastructure dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <FormField
                name="region"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-primary rounded-full" />
                      Region
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full !h-12 bg-gradient-to-r from-card/50 to-background/50 border-border/50 focus:bg-card focus:ring-2 focus:ring-gradient-primary/50 transition-all duration-300 hover:border-gradient-primary/30 backdrop-blur-sm cursor-pointer">
                          <SelectValue placeholder="Select a region" />
                        </SelectTrigger>
                        <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
                          <SelectItem
                            value="regionone"
                            className="hover:bg-gradient-primary/10"
                          >
                            RegionOne
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-gradient-secondary" />
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        className="h-12 bg-gradient-to-r from-card/50 to-background/50 border-border/50 focus:bg-card focus:ring-2 focus:ring-gradient-secondary/50 transition-all duration-300 hover:border-gradient-secondary/30 backdrop-blur-sm"
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gradient-accent" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        className="h-12 bg-gradient-to-r from-card/50 to-background/50 border-border/50 focus:bg-card focus:ring-2 focus:ring-gradient-accent/50 transition-all duration-300 hover:border-gradient-accent/30 backdrop-blur-sm"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base bg-gradient-to-r from-gradient-primary to-gradient-secondary hover:from-gradient-primary/90 hover:to-gradient-secondary/90 shadow-lg shadow-gradient-primary/30 hover:shadow-xl hover:shadow-gradient-primary/40 hover:scale-105 transition-all duration-300 border-0 text-primary-foreground font-semibold cursor-pointer"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In to Dashboard
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
