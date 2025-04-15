import { Router, Router as ExpressRouter } from "express";
import userRouter from "./user.routes";
import roomRouter from "./room.routes";
import chatRouter from "./chat.routes";

import { middleware } from "../middleware";

const router: ExpressRouter = Router();

router.use("/user", userRouter);
router.use("/room", middleware, roomRouter);
router.use("/chats", chatRouter);

export default router;
