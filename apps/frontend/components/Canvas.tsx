import { useEffect, useRef, useState } from "react";

import { Game } from "@/draw/Game";

import { ToolBar } from "./ToolBar";
export type Tool = "circle" | "rectangle" | "pencil";

export function Canvas({
  roomId,
  socket,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();

  useEffect(() => {}, [game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <ToolBar></ToolBar>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </div>
  );
}
