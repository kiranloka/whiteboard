import { lineWidth, COLORS, LINE_WIDTH, Colors } from "@/lib/types";

interface colorPanelProps {
  selectedColor: Colors;
  setSelectedColor: (color: Colors) => void;
  lineWidths: LINE_WIDTH;
  setLineWidths: (value: LINE_WIDTH) => void;
}
export const ColorPanel: React.FC<colorPanelProps> = ({
  selectedColor,
  setSelectedColor,
  lineWidths,
  setLineWidths,
}) => {
  return (
    <div className=" bg-background rounded-md w-fit pb-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Colors</h3>
        <div className="flex gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition duration-200 ${
                selectedColor === color
                  ? "ring-2 ring-offset-2 ring-gray-400"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Line Width</h3>
        <div className="flex gap-2">
          {lineWidth.map((width) => (
            <button
              key={width}
              onClick={() => setLineWidths(width)}
              className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                lineWidths === width
                  ? "bg-gray-200 border-gray-600"
                  : "border-gray-300"
              }`}
            >
              <div
                className="rounded-full bg-black"
                style={{ width: `${width}px`, height: `${width}px` }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
