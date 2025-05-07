import React, { JSX, useState } from "react";
import { useSelectedTool } from "@/store/store";
import { Button } from "./ui/Button";
import {
  Circle,
  Move,
  MoveRight,
  Pencil,
  ChevronDown,
  Square,
  SquareDashed,
  Trash2,
} from "lucide-react";
import { Colors, LINE_WIDTH, Tool } from "@/lib/types";
import { ColorPanel } from "./ColorPanel";
import { cn } from "@/lib/utils";

interface ToolBarProps {
  color: Colors;
  setColor: (color: Colors) => void;
  lineWidth: LINE_WIDTH;
  setLineWidth: (width: LINE_WIDTH) => void;
}
const tools: { tool: Tool; icon: JSX.Element }[] = [
  { tool: "circle", icon: <Circle size={16} /> },
  { tool: "move", icon: <Move size={16} /> },
  { tool: "line", icon: <MoveRight size={16} /> },
  { tool: "rectangle", icon: <Square size={16} /> },
  { tool: "select", icon: <SquareDashed size={16} /> },
  { tool: "pencil", icon: <Pencil size={16} /> },
  { tool: "delete", icon: <Trash2 size={16} /> },
];

export const ToolBar: React.FC<ToolBarProps> = ({
  color,
  setColor,
  lineWidth,
  setLineWidth,
}) => {
  const { selectedTool, setSelectedTool } = useSelectedTool();
  const [showColorPanel, setShowColorPanel] = useState(false);

  return (
    <div
      className="flex bg-gray-700 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]
        border-2 border-amber-500 mt-4 fixed rounded-2xl p-2 gap-2"
    >
      <div className="flex gap-2">
        {tools.map(({ tool, icon }) => (
          <Button
            key={tool}
            variant="ghost"
            className={cn(
              "border-2 border-transparent rounded-lg hover:border-gray-400",
              selectedTool === tool && "bg-gray-500 text-white border-gray-500"
            )}
            size="icon"
            onClick={() => setSelectedTool(tool)}
          >
            {icon}
          </Button>
        ))}

        <Button
          variant="ghost"
          className="border-2 border-transparent rounded-lg hover:border-gray-400"
          onClick={() => setShowColorPanel((prev) => !prev)}
          size="icon"
        >
          <ChevronDown size={16} />
        </Button>
      </div>

      {showColorPanel && (
        <div className="ml-4">
          <ColorPanel
            selectedColor={color}
            setSelectedColor={setColor}
            lineWidths={lineWidth}
            setLineWidths={setLineWidth}
          />
        </div>
      )}
    </div>
  );
};
