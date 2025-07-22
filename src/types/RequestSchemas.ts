import { z } from "zod";

export const flavorSchema = z.object({
  flavor_id: z.string().min(1, "Please select a flavor"),
});

export const imageSchema = z.object({
  image_id: z.string().min(1, "Please select an image"),
});

export const networkSchema = z.object({
  network_id: z.string().min(1, "Please select a network"),
  key_name: z.string().min(1, "Please select a key pair"),
  security_group: z.string().min(1, "Please select a security group"),
});

export const vmDetailsSchema = z.object({
  name: z.string().min(1, "VM name is required").max(50, "Name too long"),
  admin_username: z
    .string()
    .min(1, "Admin username is required")
    .max(30, "Username too long"),
  admin_password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password too long"),
});

export const importVMSchema = z.object({
  vm_name: z.string().min(1, "VM name is required"),
  description: z.string().optional(),
  min_disk: z.number().min(1).optional(),
  min_ram: z.number().min(1).optional(),
  is_public: z.boolean(),
  flavor_id: z.string().min(1, "Please select a flavor"),
  network_id: z.string().min(1, "Please select a network"),
  key_name: z.string().min(1, "Please select a key pair"),
  security_group: z.string().min(1, "Please select a security group"),
  admin_password: z.string().min(8, "Password must be at least 8 characters"),
});
