import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import bcrypt from "bcrypt";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  CreateRoomSchema,
  SignInSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
interface AuthenticatedRequest extends Request {
  userId?: string;
}

app.post(
  "/room",
  middleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "Incorrect inputs",
      });
      return;
    }
    const userId = req.userId;
    try {
      const room = await prismaClient.room.create({
        data: {
          slug: parsedData.data.name,
          adminId: userId,
        },
      });
      res.status(200).json({
        message: "Room created",
        roomId: room.id,
      });
    } catch (e) {
      res.status(411).json({
        message: "Room already exists with this name!",
      });
    }
  }
);

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.userName,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });
    res.json({
      userId: user.userId,
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists with this username",
    });
  }
});

app.get("/chats/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);
    const chats = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 50,
    });

    res.json({
      chats,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      messages: [],
    });
  }
});

app.post("/signin", async (req, res) => {
  const data = SignInSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  const user = await prismaClient.user.findFirst({
    where: {
      email: data.data.userName,
      password: data.data.password,
    },
  });
  if (!user) {
    res.json({
      message: "Not authorized!",
    });
    return;
  }
  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  );

  res.json({ token });
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });

  res.json({
    room,
  });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
