import { z } from "zod";

export const CreateUserSchema = z.object({
  userName: z.string().min(3).max(25),
  password: z.string(),
  name: z.string().min(3).max(20),
});

export const SignInSchema = z.object({
  userName: z.string().min(3).max(25),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});
