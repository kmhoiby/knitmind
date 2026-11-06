"use client";

import { usePatternGrid } from "@/hooks/usePatternGrid";
import PatternToolbar from "@/components/PatternToolbar";

export default function PatternGrid() {
  // Destructure everything we need from our custom hook
  const {
    rows,
    cols,
    grid,
    activeColor,
    setActiveColor,
    isMouseDown,
    setIsMouseDown,
    cellSize,
    setCellSize,
    handleResize,
    paintCell,
    exportToJson,
    importFromJson,
    clearGrid,
  } = usePatternGrid();

  return (
    <div
      className="flex flex-col gap-4 select-none p-6"
      // onMouseUp ensures drawing stops as soon as the user releases the mouse button anywhere on screen
      onMouseUp={() => setIsMouseDown(false)}
    >
      {/* Render the toolbar at the top and pass down required functions */}
      <PatternToolbar
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        rows={rows}
        cols={cols}
        handleResize={handleResize}
        cellSize={cellSize}
        setCellSize={setCellSize}
        exportToJson={exportToJson}
        importFromJson={importFromJson}
        clearGrid={clearGrid}
      />

      {/* THE PATTERN GRID (DRAWING CANVAS) */}
      <div className="overflow-auto border border-gray-300 p-2 bg-white rounded-xl shadow-sm inline-block">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, // Dynamically set number of columns
            gap: "1px",
            backgroundColor: "#e5e7eb", // Color of grid lines between cells
          }}
        >
          {/*
            Loop through the 2D array (grid).
            First loop iterates through each row (rowIndex), inner loop iterates through each cell in that row (colIndex).
          */}
          {grid.map((row, rowIndex) =>
            row.map((cellColor, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`} // Unique key required by React for list rendering
                // Triggered when user presses the mouse button down on a cell:
                onMouseDown={() => {
                  setIsMouseDown(true);
                  paintCell(rowIndex, colIndex);
                }}
                // Triggered when the mouse enters a cell while the mouse button is held down (drag-to-paint):
                onMouseEnter={() => {
                  if (isMouseDown) {
                    paintCell(rowIndex, colIndex);
                  }
                }}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: cellColor, // Color stored in this specific cell
                  cursor: "crosshair",
                }}
                className="transition-opacity hover:opacity-80"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}