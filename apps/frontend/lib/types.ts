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

export type lineWidth = 1 | 2 | 4 | 5 | 10;

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
