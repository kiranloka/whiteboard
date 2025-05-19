import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PORT, JWT_SECRET } from "@repo/config/config";

const wss = new WebSocketServer({ port: PORT | 8080 });
console.log(`Websocket server started at port ${PORT}`);

import { prisma } from "@repo/db";
interface User {
  ws: WebSocket;
  rooms: number[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (e) {
    return null;
  }
  return null;
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
      console.log("user pushed connection established!");
      const rooms = users.flatMap((user) => {
        return user.rooms;
      });
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x! === parsedData.room);
    }

    console.log("message received");
    console.log(parsedData);

    if (parsedData.type === "chat") {
      const roomId = Number(parsedData.roomId);
      const message = parsedData.message;

      const createdChat = await prisma.chat.create({
        data: {
          roomId,
          message,
          userId,
        },
      });
      console.log("successfully added to prisma", {
        id: createdChat.id,
        roomId,
        message,
        userId,
      });
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
    }

    if (parsedData.type == "move_shape") {
      const roomId = Number(parsedData.roomId);
      const { shape, shapeIndex } = parsedData;

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "move_shape",
              roomId,
              shape,
              shapeIndex,
            })
          );
        }
      });
    }

    if (parsedData.type == "delete_shape") {
      const { deleteIndex, roomId } = parsedData;

      users.forEach((user) => {
        if (user.rooms.includes(Number(roomId))) {
          user.ws.send(
            JSON.stringify({
              type: "delete_shape",
              deleteIndex,
              roomId,
            })
          );
        }
      });
    }

    if (parsedData.type == "delete_shape_by_id") {
      const roomId = Number(parsedData.roomId);
      const { shapeId } = parsedData;

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "delete_shape_by_id",
              roomId,
              shapeId,
            })
          );
        }
      });
    }
  });
});
