"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  Square,
  Circle,
  Type,
  ImageIcon,
  Eraser,
  Sparkles,
} from "lucide-react";

type Doodle = {
  type: string;
  x: number;
  y: number;
  size?: number;
  color: string;
  rotation?: number;
  text?: string;
  delay: number;
  id: string;
};

export function HeroCanvas({ isLoaded }: { isLoaded: boolean }) {
  const [doodles, setDoodles] = useState<Doodle[]>([]);
  const [activeTool, setActiveTool] = useState("pencil");
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });

  // Generate random doodles with infinite loop
  useEffect(() => {
    if (!isLoaded) return;

    const generateDoodle = (id: string): Doodle => {
      const types = ["square", "circle", "text"];
      const type = types[Math.floor(Math.random() * types.length)];
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 80;
      const delay = 0.2 + Math.random() * 1.3;
      const size = 20 + Math.random() * 60;
      const rotation = Math.random() * 30 - 15;
      const text =
        type === "text"
          ? ["Hello!", "Draw!", "Create!", "Doodle!"][
              Math.floor(Math.random() * 4)
            ]
          : undefined;

      return { type, x, y, size, color, rotation, text, delay, id };
    };

    // Initial doodles
    const initialDoodles = Array.from({ length: 8 }).map((_, i) =>
      generateDoodle(`doodle-${i}`)
    );
    setDoodles(initialDoodles);

    // Add new doodles at intervals
    const interval = setInterval(() => {
      const newId = `doodle-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      setDoodles((prev) => [...prev.slice(-14), generateDoodle(newId)]);
    }, 2000);

    // Animate cursor
    const cursorInterval = setInterval(() => {
      setCursorPosition({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [isLoaded]);

  // Toolbar buttons
  const tools = [
    { icon: <Pencil className="h-4 w-4" />, tool: "pencil" },
    { icon: <Square className="h-4 w-4" />, tool: "square" },
    { icon: <Circle className="h-4 w-4" />, tool: "circle" },
    { icon: <Type className="h-4 w-4" />, tool: "text" },
    { icon: <ImageIcon className="h-4 w-4" />, tool: "image" },
    { icon: <Eraser className="h-4 w-4" />, tool: "eraser" },
    { icon: <Sparkles className="h-4 w-4" />, tool: "sparkles" },
  ];

  return (
    <div className="relative w-full h-full bg-white rounded-xl overflow-hidden group">
      {/* Grid background */}
      <svg width="100%" height="100%" className="absolute inset-0">
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth="0.5"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Optional: Sparkles background effect (Aceternity-style) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-blue-100/20"></div>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-1 p-2 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg"
      >
        {tools.map((item, i) => (
          <motion.button
            key={item.tool}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg ${
              activeTool === item.tool
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTool(item.tool)}
          >
            {item.icon}
          </motion.button>
        ))}
      </motion.div>

      {/* Canvas content */}
      <div className="relative w-full h-full">
        {/* Doodles */}
        {doodles.map((doodle) => (
          <motion.div
            key={doodle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: doodle.delay,
            }}
            style={{
              position: "absolute",
              left: `${doodle.x}%`,
              top: `${doodle.y}%`,
              transform: doodle.rotation
                ? `translate(-50%, -50%) rotate(${doodle.rotation}deg)`
                : "translate(-50%, -50%)",
              color: doodle.color,
              zIndex: 10,
            }}
          >
            {doodle.type === "square" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: doodle.delay + 0.2 }}
                className="rounded-md"
                style={{
                  width: doodle.size,
                  height: doodle.size,
                  backgroundColor: doodle.color,
                }}
              />
            )}
            {doodle.type === "circle" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: doodle.delay + 0.2 }}
                className="rounded-full"
                style={{
                  width: doodle.size,
                  height: doodle.size,
                  backgroundColor: doodle.color,
                }}
              />
            )}
            {doodle.type === "text" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: doodle.delay + 0.2 }}
                className="font-bold text-2xl"
                style={{ color: doodle.color }}
              >
                {doodle.text}
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Animated cursor */}
        <motion.div
          animate={{
            x: `${cursorPosition.x}%`,
            y: `${cursorPosition.y}%`,
          }}
          transition={{
            x: { type: "spring", stiffness: 100, damping: 15 },
            y: { type: "spring", stiffness: 100, damping: 15 },
          }}
          className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L20 20"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 4L4 20"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {activeTool === "pencil" && (
              <circle cx="12" cy="12" r="8" fill="rgba(0,0,0,0.1)" />
            )}
            {activeTool === "square" && (
              <rect x="6" y="6" width="12" height="12" fill="rgba(0,0,0,0.1)" />
            )}
            {activeTool === "circle" && (
              <circle cx="12" cy="12" r="6" fill="rgba(0,0,0,0.1)" />
            )}
            {activeTool === "sparkles" && (
              <>
                <circle cx="12" cy="12" r="4" fill="rgba(255,215,0,0.2)" />
                <circle cx="12" cy="8" r="2" fill="rgba(255,215,0,0.2)" />
                <circle cx="16" cy="12" r="2" fill="rgba(255,215,0,0.2)" />
              </>
            )}
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
