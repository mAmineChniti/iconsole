"use client";

import { HardDrive, Plus, Search, Server, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { InfraService } from "@/lib/requests";
import type { ResourcesResponse } from "@/types/ResponseInterfaces";

interface ImportImageForm {
  imageUrl: string;
  imageName: string;
  visibility: "private" | "public";
}

export function Images() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importForm, setImportForm] = useState<ImportImageForm>({
    imageUrl: "",
    imageName: "",
    visibility: "private",
  });

  const {
    data: images = [],
    isLoading: loading,
    error,
    refetch: fetchImages,
  } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const data: ResourcesResponse = await InfraService.listResources();
      return data.images || [];
    },
  });

  const importMutation = useMutation({
    mutationFn: async (formData: ImportImageForm) => {
      return await InfraService.importImageFromUrl(
        formData.imageUrl,
        formData.imageName,
        formData.visibility,
      );
    },
    onSuccess: () => {
      setImportForm({
        imageUrl: "",
        imageName: "",
        visibility: "private",
      });
      setIsImportDialogOpen(false);
      void queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (err) => {
      console.error("Error importing image:", err);
    },
  });

  const getImageIcon = (imageName: string) => {
    const name = imageName.toLowerCase();

    const baseLogoUrl =
      "https://raw.githubusercontent.com/lutgaru/linux-distro-logos/master";

    const distroLogos: Record<string, { filename: string; alt: string }> = {
      ubuntu: {
        filename: "ubuntu.png",
        alt: "Ubuntu",
      },
      kubuntu: {
        filename: "kubuntu.png",
        alt: "Kubuntu",
      },
      xubuntu: {
        filename: "xubuntu.png",
        alt: "Xubuntu",
      },
      lubuntu: {
        filename: "lubuntu.png",
        alt: "Lubuntu",
      },
      edubuntu: {
        filename: "edubuntu.png",
        alt: "Edubuntu",
      },
      ubuntustudio: {
        filename: "ubuntustudio.png",
        alt: "Ubuntu Studio",
      },
      mythbuntu: {
        filename: "mythbuntu.png",
        alt: "Mythbuntu",
      },
      centos: {
        filename: "centos.png",
        alt: "CentOS",
      },
      rhel: {
        filename: "redhat.png",
        alt: "Red Hat Enterprise Linux",
      },
      redhat: {
        filename: "redhat.png",
        alt: "Red Hat",
      },
      fedora: {
        filename: "fedora.png",
        alt: "Fedora",
      },
      scientific: {
        filename: "scientific.png",
        alt: "Scientific Linux",
      },
      debian: {
        filename: "debian.png",
        alt: "Debian",
      },
      mint: {
        filename: "mint.png",
        alt: "Linux Mint",
      },
      arch: {
        filename: "arch.png",
        alt: "Arch Linux",
      },
      manjaro: {
        filename: "manjaro.png",
        alt: "Manjaro",
      },
      antergos: {
        filename: "arch.png",
        alt: "Antergos",
      },
      opensuse: {
        filename: "suse.png",
        alt: "openSUSE",
      },
      suse: {
        filename: "suse.png",
        alt: "SUSE",
      },
      slackware: {
        filename: "slackware.png",
        alt: "Slackware",
      },
      alpine: {
        filename: "alpine.png",
        alt: "Alpine Linux",
      },
      gentoo: {
        filename: "gentoo.png",
        alt: "Gentoo",
      },
      mageia: {
        filename: "mageia.png",
        alt: "Mageia",
      },
      mandriva: {
        filename: "mandriva.png",
        alt: "Mandriva",
      },
      pclinuxos: {
        filename: "pclinuxos.png",
        alt: "PCLinuxOS",
      },
      puppy: {
        filename: "puppy.png",
        alt: "Puppy Linux",
      },
      sabayon: {
        filename: "sabayon.png",
        alt: "Sabayon",
      },
      elementary: {
        filename: "elementary.png",
        alt: "elementary OS",
      },
      zorin: {
        filename: "zorin.png",
        alt: "Zorin OS",
      },
      kali: {
        filename: "backtrack.png",
        alt: "Kali Linux",
      },
      windows: {
        filename: "",
        alt: "Windows",
      },
    };

    let matchedDistro = undefined;
    for (const [key, distroInfo] of Object.entries(distroLogos)) {
      if (name.includes(key)) {
        matchedDistro = { ...distroInfo, key };
        break;
      }
    }

    if (matchedDistro) {
      if (matchedDistro.key === "windows") {
        return (
          <div className="flex-shrink-0">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/32px-Windows_logo_-_2012.svg.png"
              alt={matchedDistro.alt}
              width={32}
              height={32}
              className="w-8 h-8"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <Server className="h-8 w-8 text-gray-600 dark:text-gray-400 hidden" />
          </div>
        );
      }

      return (
        <div className="flex-shrink-0">
          <Image
            src={`${baseLogoUrl}/${matchedDistro.filename}`}
            alt={matchedDistro.alt}
            width={32}
            height={32}
            className="w-8 h-8"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <Server className="h-8 w-8 text-gray-600 dark:text-gray-400 hidden" />
        </div>
      );
    }

    return (
      <div className="flex-shrink-0">
        <Server className="h-8 w-8 text-gray-600 dark:text-gray-400" />
      </div>
    );
  };

  const handleImportImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importForm.imageUrl || !importForm.imageName) return;

    importMutation.mutate(importForm);
  };

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalItems = filteredImages.length;
  const visibleData = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < totalItems;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Reset pagination when search term changes
  useEffect(() => {
    setVisibleCount(6);
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-border/50">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Images</h2>
            <p className="text-muted-foreground">
              Manage system images and virtual machine templates
            </p>
          </div>
          <Button
            className="cursor-pointer"
            onClick={() => fetchImages()}
            variant="outline"
          >
            Retry
          </Button>
        </div>

        <Card className="border-destructive">
          <CardContent className="p-6">
            <p className="text-destructive">{error?.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {totalItems} image{totalItems !== 1 ? "s" : ""} total
          {totalItems > 0 && (
            <>
              {" • "}
              Showing {Math.min(visibleCount, totalItems)} of {totalItems}
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              Import Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-border/50 left-[calc(50%+8rem)] translate-x-[-50%]">
            <DialogHeader>
              <DialogTitle>Import Image from URL</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleImportImage} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.qcow2"
                  value={importForm.imageUrl}
                  onChange={(e) =>
                    setImportForm({ ...importForm, imageUrl: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageName">Image Name</Label>
                <Input
                  id="imageName"
                  placeholder="My Custom Image"
                  value={importForm.imageName}
                  onChange={(e) =>
                    setImportForm({ ...importForm, imageName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select
                  value={importForm.visibility}
                  onValueChange={(value: "private" | "public") =>
                    setImportForm({ ...importForm, visibility: value })
                  }
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setIsImportDialogOpen(false)}
                  disabled={importMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="outline"
                  disabled={importMutation.isPending}
                  className="gap-2 cursor-pointer"
                >
                  {importMutation.isPending ? (
                    <>
                      <Upload className="h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Import Image
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {filteredImages.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <HardDrive className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {searchTerm ? (
              <p className="text-muted-foreground">
                No images found matching &ldquo;{searchTerm}&rdquo;.
              </p>
            ) : (
              <p className="text-muted-foreground">
                No images found. Import your first image to get started.
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleData.map((image) => (
            <Card
              key={image.id}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-border/50 cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  {getImageIcon(image.name)}
                  <CardTitle className="text-lg font-semibold text-foreground truncate">
                    {image.name}
                  </CardTitle>
                </div>
                <p className="text-xs text-muted-foreground font-mono truncate mt-2 bg-muted/20 px-2 py-1 rounded-md">
                  ID: {image.id}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Button
          onClick={handleShowMore}
          variant="outline"
          disabled={!hasMore}
          className={`transition-all duration-200 px-6 py-2 ${
            hasMore
              ? "hover:bg-accent hover:text-accent-foreground hover:scale-105"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          {hasMore
            ? `Show More (${Math.min(6, totalItems - visibleCount)} more)`
            : "All images loaded"}
        </Button>
      </div>
    </div>
  );
}
