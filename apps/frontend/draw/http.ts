import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { Shape } from "./Game";

interface Message {
  message: string;
}

export async function getExistingShapes(roomId: string): Promise<Shape[]> {
  try {
    const res = await axios.get(`${HTTP_BACKEND}/api/v1/chats/${roomId}`);
    const messages = res.data.messages;

    if (!Array.isArray(messages)) {
      console.warn(`No valid messages found for room ${roomId}`);
      return [];
    }

    const shapes: Shape[] = messages
      .filter((x: Message) => {
        try {
          JSON.parse(x.message);
          return true;
        } catch {
          return false;
        }
      })
      .map((x: Message) => {
        const messageData = JSON.parse(x.message);
        return messageData.shape;
      });

    return shapes;
  } catch (error) {
    console.error(`Error fetching shapes for room ${roomId}:`, error);
    return [];
  }
}
