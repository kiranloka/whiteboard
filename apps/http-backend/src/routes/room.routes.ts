const { CreateRoomSchema } = require("@repo/common/types");
const { prisma } = require("@repo/db/prisma");
import { Router as ExpressRouter } from "express";

const router: ExpressRouter = ExpressRouter();

router.post("/", async (req, res) => {
  const { error, data } = CreateRoomSchema.safeParse(req.body);
  if (error) {
    res.status(400).json({
      message: "Validation error",
    });
    return;
  }
  const userId = req.userId;
  try {
    const slug =
      data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.floor(Math.random() * 10000);

    const room = await prisma.room.create({
      data: {
        slug,
        adminId: userId,
      },
    });

    res.status(201).json({
      roomId: room.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prisma.room.findFirst({
    where: {
      slug,
    },
  });

  if (!room) {
    res.status(404).json({
      message: "Room not found",
    });
    return;
  }

  res.json({
    room,
  });
});

export default router;
