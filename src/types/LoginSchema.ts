import * as z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
  region: z.string().min(1, { message: "Region is required" }),
});
