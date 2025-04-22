const { SigninSchema, CreateUserSchema } = require("@repo/common/types");
import { Router as ExpressRouter } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "@repo/db";

const JWT_SECRET = require("@repo/config/config").JWT_SECRET;

const router: ExpressRouter = ExpressRouter();

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
});

router.post("/signup", async (req, res) => {
  const { error, data } = CreateUserSchema.safeParse(req.body);
  if (error) {
    console.log(error.flatten());
    res.status(400).json({
      message: "Validation Error",
    });
    return;
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (existingUser) {
      res.status(400).json({
        message: "user already exists",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      userId: user.id,
    });
  } catch (e) {
    console.log("Error:", e);
    res.status(500).json({
      error: `${e}`,
      message: "Internal server error",
    });
  }
});

router.post("/signin", async (req, res) => {
  const { error, data } = SigninSchema.safeParse(req.body);
  if (error) {
    res.status(400).json({
      message: "Validation error",
    });
    return;
  }
  const isUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!isUser) {
    res.status(400).json({
      message: "User does not exist",
    });
    return;
  }

  const verified = await bcrypt.compare(data.password, isUser.password);

  if (!verified) {
    res.status(400).json({
      message: "Invalid credentials",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: isUser.id,
    },
    JWT_SECRET
  );

  res.status(200).json({
    token,
  });
});

export default router;
