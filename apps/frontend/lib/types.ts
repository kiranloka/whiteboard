export type Tool = "rectangle" | "circle" | "pencil";

export type Shape = {
  id: string;
  type: Tool;
  points?: { x: number; y: number }[];
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};
