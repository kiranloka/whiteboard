export type Tool =
  | "rectangle"
  | "circle"
  | "pencil"
  | "line"
  | "draw"
  | "text"
  | "eraser"
  | "move"
  | "delete"
  | "select";

export const lineWidth = [2, 4, 6, 8, 10] as const;

export const COLORS = [
  "#FFFFFF",
  "#60A5FA",
  "#34D399",
  "#FBBF24",
  "#F87171",
] as const;

export type LINE_WIDTH = (typeof lineWidth)[number];
export type Colors = (typeof COLORS)[number];

export type Shape = {
  id: string;
  type: Tool;
  points?: { x: number; y: number }[];
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;

  lineWidth: number;
  value?: string;
};
