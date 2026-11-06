import { useState, useEffect } from "react";

// Define the color palette as a constant.
// Every object have a name and a hex-color code.
export const PALETTE =[
    { name: "Navy Blue", color: "#203A5E" },
  { name: "Crown Flower Blue", color: "#6495ED" },
  { name: "Sky blue", color: "#5DB7FF" },
  { name: "Clear Aqua", color: "#00D4D8" },
  { name: "Turquoise", color: "#40E0D0" },
  { name: "Petrol Blue", color: "#2A7F8E" },
  { name: "Deep royal blue", color: "#4169E1" },

  { name: "Forest Green", color: "#355E3B" },
  { name: "Spruce Green", color: "#2E4D35" },
  { name: "Sea Green", color: "#2E8B8B" },
  { name: "Jade Green", color: "#00A86B" },
  { name: "Dark Teal", color: "#0B525B" },

  { name: "Clear Red", color: "#E63946" },
  { name: "Poppy Red", color: "#F94144" },
  { name: "Raspberry Red", color: "#C9184A" },
  { name: "Cranberry Red", color: "#7A263A" },
  { name: "Burgundy", color: "#61282B" },

  { name: "Coral Pink", color: "#FF7F6A" },
  { name: "Watermelon Pink", color: "#FF6F91" },
  { name: "Fresh Rose", color: "#E96A92" },
  { name: "Raspberry Pink", color: "#D7265A"},

  { name: "Periwinkle", color: "#8FA2FF" },
  { name: "Clear Lavender", color: "#B497FF" },
  { name: "Blue Purple", color: "#7B68EE" },
  { name: "Dark Plum", color: "#6A3D5A" },

  { name: "Cream White", color: "#F8F3E8" },
  { name: "Ivory", color: "#FFF8E7" },
  { name: "White", color: "#ffffff" },
  { name: "Ice Gray", color: "#DCE6F2" },
  { name: "Black", color: "#111827" },
  { name: "Deep Red", color: "#b91c1c" },
  { name: "Brown", color: "#5C4033"}
    ]

/// Custom React hook that encapsulates all state and logic for the pattern grid.
export function usePatternGrid() {
  // useState hooks to manage grid dimensions, active color, mouse status, and zoom level.
  const [rows, setRows] = useState<number>(30);
  const [cols, setCols] = useState<number>(30);
  const [activeColor, setActiveColor] = useState<string>(PALETTE[1].color);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false); // Tracks if left mouse button is held down (drag-to-paint)
  const [cellSize, setCellSize] = useState<number>(20); // Zoom / pixel size per cell

  // Initialize the grid state (2D array).
  // First, check if a saved grid exists in the browser's localStorage.
  const [grid, setGrid] = useState<string[][]>(() => {
    if (typeof window !== "undefined") {
      const savedGrid = localStorage.getItem("knitmind_current_grid");
      if (savedGrid) {
        try {
          // JSON.parse converts the saved string back into a JavaScript array
          const parsed = JSON.parse(savedGrid);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch (e) {
          console.error("Failed to load grid from localStorage", e);
        }
      }
    }
    // Default initial fallback: 30x30 grid filled with white cells ("#ffffff")
    return Array(30)
      .fill(null)
      .map(() => Array(30).fill("#ffffff"));
  });

  // useEffect automatically runs whenever the 'grid' state changes.
  // This provides real-time autosaving to the browser's local storage!
  useEffect(() => {
    // JSON.stringify converts the 2D array into a string since localStorage only stores strings
    localStorage.setItem("knitmind_current_grid", JSON.stringify(grid));
  }, [grid]);

  // Function to resize the grid dimensions (e.g., from 30x30 to 40x40)
  const handleResize = (newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
    // Reset the grid with the new dimensions filled with white cells
    setGrid(
      Array(newRows)
        .fill(null)
        .map(() => Array(newCols).fill("#ffffff"))
    );
  };

  // Function to paint a specific cell based on row and column index
  const paintCell = (row: number, col: number) => {
    // We use .map() to create a new copy of the grid (crucial for React state immutability)
    const newGrid = grid.map((r, rIdx) =>
      rIdx === row
        ? r.map((cell, cIdx) => (cIdx === col ? activeColor : cell))
        : r
    );
    setGrid(newGrid);
  };

  // Function to export the pattern as a downloadable JSON file
  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(grid));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "knitmind_pattern.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove(); // Clean up the temporary link element
  };

  // Function to open/import a previously saved JSON file from the computer
  const importFromJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        try {
          const parsedGrid = JSON.parse(e.target?.result as string);
          if (Array.isArray(parsedGrid) && Array.isArray(parsedGrid[0])) {
            setRows(parsedGrid.length);
            setCols(parsedGrid[0].length);
            setGrid(parsedGrid); // Update state with the imported pattern
          } else {
            alert("Invalid pattern file format.");
          }
        } catch (error) {
          alert("Could not parse JSON file.");
        }
      };
    }
  };

  // Function to clear/reset the grid and wipe localStorage (privacy control)
  const clearGrid = () => {
      if (confirm("Are you sure you want to delete the pattern and clear the storage?")) {
          localStorage.removeItem("knitmind_current_grid");
          setGrid(
              Array(rows)
              .fill(null)
              .map(() => Array(cols).fill("#ffffff"))
          );
      }
  };

  // Return variables and functions so components can consume them
  return {
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
  };
}