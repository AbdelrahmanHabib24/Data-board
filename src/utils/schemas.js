import { z } from "zod";

// Users schema
export const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  city: z
    .string()
    .min(3, "City must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "City can only contain letters "),
});

// Posts schema
export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .regex(/^[A-Za-z0-9\s]+$/, "Title can only contain letters, numbers"),
  body: z
    .string()
    .min(5, "Body must be at least 5 characters")
    .regex(/^[A-Za-z0-9\s.,!?]+$/, "Body contains invalid characters"),
  userId: z
    .number({ invalid_type_error: "User ID must be a number" })
    .min(1, "User ID must be greater than 0"),
});

// login schema
export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});