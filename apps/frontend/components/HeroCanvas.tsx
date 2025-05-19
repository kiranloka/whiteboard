
"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Pencil, Square, Circle, Type, ImageIcon, Eraser } from "lucide-react"

interface HeroCanvasProps {
  isLoaded: boolean
}

interface Doodle {
  type: string
  x: number
  y: number
  size?: number
  color: string
  rotation?: number
  text?: string
  delay: number
}

export function HeroCanvas({ isLoaded }: HeroCanvasProps) {
  const controls = useAnimation()
  const [doodles, setDoodles] = useState<Doodle[]>([])
  const [activeTool, setActiveTool] = useState("pencil")
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 })

  // Generate random doodles
  useEffect(() => {
    if (isLoaded) {
      const newDoodles: Doodle[] = [
        { type: "square", x: 20, y: 30, size: 60, color: "#7c3aed", rotation: 15, delay: 0.5 },
        { type: "circle", x: 70, y: 60, size: 40, color: "#ec4899", delay: 0.7 },
        { type: "text", x: 30, y: 70, color: "#0ea5e9", text: "Hello!", delay: 0.9 },
        { type: "square", x: 65, y: 25, size: 30, color: "#f59e0b", rotation: -10, delay: 1.1 },
        { type: "circle", x: 25, y: 50, size: 25, color: "#10b981", delay: 1.3 },
        { type: "text", x: 60, y: 40, color: "#ef4444", text: "Draw!", delay: 1.5 },
      ]

      setDoodles(newDoodles)
      controls.start({ opacity: 1 })

      // Animate cursor
      const interval = setInterval(() => {
        setCursorPosition({
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isLoaded, controls])

  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-1 p-1 bg-background/90 backdrop-blur-sm rounded-lg border shadow-sm"
      >
        {[
          { icon: <Pencil className="h-4 w-4" />, tool: "pencil" },
          { icon: <Square className="h-4 w-4" />, tool: "square" },
          { icon: <Circle className="h-4 w-4" />, tool: "circle" },
          { icon: <Type className="h-4 w-4" />, tool: "text" },
          { icon: <ImageIcon className="h-4 w-4" />, tool: "image" },
          { icon: <Eraser className="h-4 w-4" />, tool: "eraser" },
        ].map((item, i) => (
          <motion.button
            key={item.tool}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
            className={`p-2 rounded-md ${activeTool === item.tool ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            onClick={() => setActiveTool(item.tool)}
          >
            {item.icon}
          </motion.button>
        ))}
      </motion.div>

      {/* Canvas content */}
      <motion.div initial={{ opacity: 0 }} animate={controls} className="w-full h-full">
        {/* Grid background */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Doodles */}
        {doodles.map((doodle, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
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
            }}
          >
            {doodle.type === "square" && (
              <div
                style={{
                  width: doodle.size,
                  height: doodle.size,
                  backgroundColor: doodle.color,
                  opacity: 0.7,
                  borderRadius: "4px",
                }}
              />
            )}
            {doodle.type === "circle" && (
              <div
                style={{
                  width: doodle.size,
                  height: doodle.size,
                  backgroundColor: doodle.color,
                  opacity: 0.7,
                  borderRadius: "50%",
                }}
              />
            )}
            {doodle.type === "text" && (
              <div
                style={{
                  color: doodle.color,
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                {doodle.text}
              </div>
            )}
          </motion.div>
        ))}

        {/* Animated cursor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: `${cursorPosition.x}%`,
            y: `${cursorPosition.y}%`,
          }}
          transition={{
            x: { type: "spring", stiffness: 100, damping: 15 },
            y: { type: "spring", stiffness: 100, damping: 15 },
            opacity: { duration: 0.3 },
          }}
          className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L20 20" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 4L4 20" stroke="black" strokeWidth="2" strokeLinecap="round" />
            {activeTool === "pencil" && <circle cx="12" cy="12" r="8" fill="rgba(0,0,0,0.1)" />}
            {activeTool === "square" && <rect x="6" y="6" width="12" height="12" fill="rgba(0,0,0,0.1)" />}
            {activeTool === "circle" && <circle cx="12" cy="12" r="6" fill="rgba(0,0,0,0.1)" />}
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
