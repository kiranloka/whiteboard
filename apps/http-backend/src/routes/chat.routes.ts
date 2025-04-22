const { prisma } = require("@repo/db");
import { Router as ExpressRouter } from "express";

const router: ExpressRouter = ExpressRouter();

router.get("/:roomId", async (req, res) => {
  try {
    const roomId = parseInt(req.params.roomId);
    const messages = await prisma.chat.findMany({
      where: {
        roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 1000,
    });

    res.json({
      messages,
    });

    // console.log({ messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
