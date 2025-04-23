import { Tool } from "@/lib/types";
import { create } from "zustand";

interface storeProps {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void | undefined;
}
export const useSelectedTool = create<storeProps>((set) => ({
  selectedTool: "rectangle",
  setSelectedTool: (tool: Tool) => {
    set({
      selectedTool: tool,
    });
  },
}));
