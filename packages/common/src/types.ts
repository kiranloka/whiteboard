const { z } = require("zod");

const CreateUserSchema = z.object({
  email: z.string().email().min(3).max(20).trim(),
  password: z.string().min(4, "Must be at least 4 characters long"),
  name: z.string().min(3).max(20),
});

const SigninSchema = z.object({
  email: z.string().email().min(3).max(20).trim(),
  password: z.string().min(4, "Must be at least 4 characters long"),
});

const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});

module.exports = {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
};
