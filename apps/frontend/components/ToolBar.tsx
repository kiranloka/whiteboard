"use client";

import React, { JSX, useRef, useState } from "react";
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
import { AnimatePresence, motion } from "framer-motion";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className="relative flex items-center gap-2 bg-gray-700 text-white 
        shadow-[0_0_12px_rgba(59,130,246,0.3)] border-2 border-amber-500 
        rounded-2xl px-4 py-2"
      >
        {/* Tool Buttons */}
        <div className="flex gap-2">
          {tools.map(({ tool, icon }) => (
            <Button
              key={tool}
              variant="ghost"
              className={cn(
                "border-2 border-transparent rounded-lg hover:border-gray-400",
                selectedTool === tool &&
                  "bg-gray-500 text-white border-gray-500"
              )}
              size="icon"
              onClick={() => setSelectedTool(tool)}
            >
              {icon}
            </Button>
          ))}
        </div>

        {/* Dropdown Button */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            className="border-2 border-transparent rounded-lg hover:border-gray-400"
            size="icon"
            onClick={() => setShowColorPanel((prev) => !prev)}
          >
            <ChevronDown size={16} />
          </Button>

          {/* Color Panel Dropdown */}
          <AnimatePresence>
            {showColorPanel && (
              <motion.div
                className="absolute right-0 mt-2 z-50"
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <ColorPanel
                  selectedColor={color}
                  setSelectedColor={setColor}
                  lineWidths={lineWidth}
                  setLineWidths={setLineWidth}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
