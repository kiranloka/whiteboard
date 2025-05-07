"use client";

import React, { useEffect, useRef, useState } from "react";
import { Game } from "@/draw/Game";

import { ToolBar } from "./ToolBar";

import { COLORS, Colors, LINE_WIDTH, lineWidth } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSelectedTool } from "@/store/store";

const Canvas = ({ roomId, socket }: { roomId: string; socket: WebSocket }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [game, setGame] = useState<Game>();

  const [color, setSelectedColor] = useState<Colors>(COLORS[0]);
  const [lineWidths, setLineWidth] = useState<LINE_WIDTH>(lineWidth[0]);

  const { selectedTool, setSelectedTool } = useSelectedTool();

  useEffect(() => {
    game?.setSelectedColor(color);
    game?.setSelectedTool(selectedTool);
    game?.setLineWidth(lineWidths);
  }, [color, selectedTool, lineWidths, game]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const g = new Game(canvas, roomId, socket);
    console.log(g);

    setGame(g);

    return () => {
      g.destroy();
    };
  }, [roomId, socket]);

  // if (!game) {
  //   return null;
  // }

  return (
    <div className=" min-h-screen flex flex-col items-center">
      <ToolBar
        color={color}
        setColor={setSelectedColor}
        lineWidth={lineWidths}
        setLineWidth={setLineWidth}
      />
      <canvas
        ref={canvasRef}
        className={cn(
          "block m-auto bg-[rgb(19,22,29)]",
          selectedTool === "move" ? "cursor-move" : " cursor-crosshair",
          selectedTool === "delete" ? "cursor-pointer" : ""
        )}
        onMouseUp={() => {
          if (selectedTool === "select" || selectedTool === "delete") {
            setSelectedTool("move");
          }
        }}
      />
    </div>
  );
};

export default Canvas;
