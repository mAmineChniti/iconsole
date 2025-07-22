"use client";

import { Cpu } from "lucide-react";
import { type useForm } from "react-hook-form";
import type { z } from "zod";

import { cn } from "@/lib/utils";
import type { ResourcesResponse } from "@/types/ResponseInterfaces";

import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { type flavorSchema } from "@/types/RequestSchemas";

type FlavorFormData = z.infer<typeof flavorSchema>;

export function FlavorStep({
  form,
  resources,
  isLoading,
}: {
  form: ReturnType<typeof useForm<FlavorFormData>>;
  resources: ResourcesResponse | undefined;
  isLoading: boolean;
}) {
  if (isLoading)
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-muted rounded-full">
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="flavor_id"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources?.flavors.map((flavor) => (
                  <Card
                    key={flavor.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md border-2",
                      field.value === flavor.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-border hover:border-border/80",
                    )}
                    onClick={() => field.onChange(flavor.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full min-w-[40px] flex justify-center">
                          <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold">{flavor.name}</h3>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="p-0.5 min-w-[40px] flex justify-center">
                            <Cpu className="h-4 w-4" />
                          </div>
                          <span>Flavor: {flavor.name}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
