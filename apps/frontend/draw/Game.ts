import { getExistingShapes } from "./http";
import { Tool, Shape } from "@/lib/types";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private lineWidth: number;
  private currentPath: { x: number; y: number }[];

  private zoomScale: number;
  private selectedShapeIndex: number | null;
  private isDragging: boolean;

  private deleteShapeIndex: number | null;
  private shapesToBeDeleted: Shape[];
  private selectedTool: Tool = "circle";

  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.selectedTool = "rectangle";
    this.socket = socket;
    this.lineWidth = 1;
    this.currentPath = [];
    this.zoomScale = 1;
    this.selectedShapeIndex = null;
    this.isDragging = false;
    this.deleteShapeIndex = null;
    this.shapesToBeDeleted = [];
    this.clicked = false;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setSelectedTool(tool: "circle" | "pencil" | "rectangle") {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    console.log(this.existingShapes);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type == "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }
  distanceToLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    px: number,
    py: number
  ): number {
    const numerator = (y2 - y1) * px + (x2 - x1) * py + x2 * y1 - y2 * x1;
    const denominator = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    return numerator / denominator;
  }
  isShapeClicked(shape: Shape, mouseX: number, mouseY: number): boolean {
    switch (shape.type) {
      case "rectangle":
        return (
          mouseX >= shape.startX &&
          mouseX <= shape.endX &&
          mouseY >= shape.startY &&
          mouseY <= shape.endY
        );
      case "circle":
        const radius =
          Math.pow(shape.endX - shape.startX, 2) +
          Math.pow(shape.endY - shape.startY, 2);
        const distance =
          Math.pow(mouseX - shape.startX, 2) +
          Math.pow(mouseY - shape.startY, 2);
        return distance <= radius;
      case "line":
        const distanceToLine = this.distanceToLine(
          shape.startX,
          shape.startY,
          shape.endX,
          shape.endY,
          mouseX,
          mouseY
        );
        return distanceToLine <= shape.lineWidth;

      case "text":
        const textWidth = this.ctx.measureText(shape.value!).width;
        const textHeight = 20;
        return (
          mouseX >= shape.startX &&
          mouseX <= shape.startX + textWidth &&
          mouseY >= shape.startY - textHeight &&
          mouseY <= shape.startY
        );

      default:
        return false;
    }
  }
  startDrawing(e: MouseEvent) {
    const { offSetX, offSetY } = e;

    if (this.selectedTool === "delete") {
      for (let i = this.existingShapes.length - 1; i >= 0; i++) {
        if (this.isShapeClicked(this.existingShapes[i], offSetX, offSetY)) {
          this.deleteShapeIndex = i;
          break;
        }
      }
      if (this.deleteShapeIndex !== null && this.deleteShapeIndex >= 0) {
        this.socket.send(
          JSON.stringify({
            type: "delete_shape",
            deleteIndex: this.deleteShapeIndex,
            roomId: this.roomId,
          })
        );
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.map((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "rgba(255, 255, 255)";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        console.log(shape);
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };
  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    const selectedTool = this.selectedTool;
    let shape: Shape | null = null;
    if (selectedTool === "rectangle") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        height,
        width,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: this.startX + radius,
        centerY: this.startY + radius,
      };
    }

    if (!shape) {
      return;
    }

    this.existingShapes.push(shape);

    const frontendMessage = this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      })
    );
    console.log(frontendMessage);
  };
  mouseMoveHandler = (e: MouseEvent) => {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.clearCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255)";
      const selectedTool = this.selectedTool;
      console.log(selectedTool);
      if (selectedTool === "rectangle") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
