import { createClient } from "redis";
const redis = createClient();

async function initRedis() {
  await redis.connect();
  console.log("Redis connected");
}

initRedis();

interface User {
  ws: WebSocket;
  rooms: number[];
}

const users: User[] = [];

function handleMessage(ws: WebSocket, data: string) {
  const parsedData = JSON.parse(data);

  if (parsedData.type === "chat") {
    const roomId = Number(parsedData.roomId);
    const message = parsedData.message;
    const userId = parsedData.userId;

    redis.xAdd("chat_messages", "*", {
      roomId: roomId.toString(),
      message,
      userId,
    });

    console.log("chat pushed to Redis");

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
}
