"use client";

import { PALETTE } from "@/hooks/usePatternGrid";

// TypeScript Interface: Defines the required props (properties) for this component.
interface PatternToolbarProps {
  activeColor: string;
  setActiveColor: (color: string) => void;
  rows: number;
  cols: number;
  handleResize: (rows: number, cols: number) => void;
  cellSize: number;
  setCellSize: (size: number) => void;
  exportToJson: () => void;
  importFromJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearGrid: () => void;
}

export default function PatternToolbar({
  activeColor,
  setActiveColor,
  rows,
  cols,
  handleResize,
  cellSize,
  setCellSize,
  exportToJson,
  importFromJson,
  clearGrid,
}: PatternToolbarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
      <div className="flex flex-wrap gap-4 items-center">

        {/* Color Palette Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Color:</span>
          <div className="flex gap-1.5">
            {PALETTE.map((item) => (
              <button
                key={item.color}
                onClick={() => setActiveColor(item.color)} // Changes active paint color on click
                title={item.name}
                style={{ backgroundColor: item.color }}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  activeColor === item.color
                    ? "scale-110 border-blue-600 shadow-md" // Highlights currently selected color
                    : "border-gray-300 hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dropdown menu to change grid size */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Size:</span>
          <select
            value={`${rows}x${cols}`}
            onChange={(e) => {
              const [r, c] = e.target.value.split("x").map(Number);
              handleResize(r, c); // Resizes grid dimensions
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          >
            <option value="20x20">20 x 20</option>
            <option value="30x30">30 x 30</option>
            <option value="40x40">40 x 40</option>
          </select>
        </div>

        {/* Dropdown menu for Zoom / cell size */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Zoom:</span>
          <select
            value={cellSize}
            onChange={(e) => setCellSize(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          >
            <option value="15">Small (15px)</option>
            <option value="20">Normal (20px)</option>
            <option value="30">Large (30px)</option>
          </select>
        </div>
      </div>

      {/* Buttons for JSON file export, import and clearing operations */}
      <div className="flex items-center gap-2 border-l pl-4 border-gray-300">
        <button
          onClick={exportToJson}
          className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded hover:bg-gray-700 transition-colors"
        >
          Download JSON
        </button>

        <button
          onClick={clearGrid}
          className="bg-red-50 text-red-600 border border-red-200 text-sm px-3 py-1.5 rounded hover:bg-red-100 transition-colors"
        >
          Reset
        </button>

        {/* Hidden file input attached to a styled label button */}
        <label className="bg-white border border-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded cursor-pointer hover:bg-gray-50 transition-colors">
          Open file
          <input
            type="file"
            accept=".json"
            onChange={importFromJson}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}