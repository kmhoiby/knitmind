
"use client";

/*
React-hook lets ua save data that changes.
When a state changes, React redraws the component.
*/
import { useState } from "react";
export default function PatternGrid() {
    /*
    Decides the size of the grid.
    This can later come from the user settings.
    */
    const rows = 30;
    const cols = 30;

    /*
    Crates a 30x30-array.
    false = white mask
    true = colored mask
    This is our pattern.
    */
    const [grid, setGrid] = useState(() =>
        Array(rows)
            .fill(null)
            .map(() => Array(cols).fill(false))
    );

    /*
    Gets called when the user clicks on a cell.
    If the cell is white it becomes blue, and opposite.
    */
    const toggleCell = (row: number, col: number) => {

        /*
        Creates a copy of the grid.
        React does not like that we change the state directly, therefore we always save a copy first.
        */
        const newGrid = grid.map((r, rIdx) =>
            rIdex === row ? r.map((cell, cIdx) => (cIdx === col ? !cell : cell)) : r);
        /*
        Update the state.
        */
        setGrid(newGrid);
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 20px)`,
                gap: "1px",
            }}
        >
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => toggleCell(rowIndex, colIndex)}
                    style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: cell ? "#1e40af" : "#ffffff",
                        boarder: "1px solid #d1d5db",
                        cursor: "pointer"
                        }}
                    />
                ))
            )}
        </div>
    );
}