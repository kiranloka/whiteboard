import React from "react";
import { useSelectedTool } from "@/store/store";
import { Button } from "./ui/Button";
import {
  Circle,
  Move,
  MoveRight,
  Pencil,
  Square,
  SquareDashed,
  Trash2,
} from "lucide-react";
// import { lineWidth } from "@/lib/types";

// interface ToolBarProps {
//   color: string;
//   setColor(color: string): void | undefined;
//   lineWidth: lineWidth;
//   setLineWidth(linewidth: lineWidth): void;
// }

export const ToolBar = () => {
  const { selectedTool, setSelectedTool } = useSelectedTool();
  return (
    <div className="flex shadow-lg border-amber-50 border-2 mt-4 fixed ">
      <div>
        <Button
          variant={selectedTool === "rectangle" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("circle")}
        >
          <Circle size={4} />
        </Button>
        <Button
          variant={selectedTool === "move" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("move")}
        >
          <Move size={4} />
        </Button>{" "}
        <Button
          variant={selectedTool === "line" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("line")}
        >
          <MoveRight size={4} />
        </Button>{" "}
        <Button
          variant={selectedTool === "rectangle" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("rectangle")}
        >
          <Square size={4} />
        </Button>{" "}
        <Button
          variant={selectedTool === "select" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("select")}
        >
          <SquareDashed size={4} />
        </Button>{" "}
        <Button
          variant={selectedTool === "pencil" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("pencil")}
        >
          <Pencil size={4} />
        </Button>{" "}
        <Button
          variant={selectedTool === "delete" ? "default" : "ghost"}
          size={"icon"}
          onClick={() => setSelectedTool("delete")}
        >
          <Trash2 size={4} />
        </Button>
        {/* <ColorPanel
          selectedColor={color}
          setSelectedColor={setColor}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
        /> */}
      </div>
    </div>
  );
};
