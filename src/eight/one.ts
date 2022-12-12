import { getData } from "../helpers/get-data";

// setup
const data: string[] = getData(`./src/eight/resources/data.txt`);
const grid: string[][] = data.map(row => row.split(``));
const GRID_WIDTH = grid.at(0)?.length ?? 0;
const GRID_HEIGHT = grid.length;
let totalVisibleTrees = 0;

// Calculate total visible trees
grid.forEach((row, rowIndex) => {
  row.forEach((tree, columnIndex) => {
    const treeHeight = Number(tree);

    if (isTreeVisible(treeHeight, rowIndex, columnIndex)) {
      totalVisibleTrees++;
    }
  });
});

// Output
console.log(totalVisibleTrees);

// Helper Functions
function isTreeVisible (treeHeight: number, rowIndex: number, columnIndex: number): boolean {
  return  (
    isTreeOnPerimeter(rowIndex, columnIndex)
    || isVisibleHorizontally(treeHeight, rowIndex, columnIndex)
    || isVisibleVertically(treeHeight, columnIndex, rowIndex)
  );
}

function isTreeOnPerimeter (rowIndex: number, columnIndex: number): boolean {
  return (
    rowIndex === 0
    || columnIndex === 0
    || rowIndex === GRID_HEIGHT - 1
    || columnIndex === GRID_WIDTH - 1
  );
}

function isVisibleHorizontally (treeHeight: number, rowIndex: number, columnIndex: number): boolean {
  const currentRow = grid[rowIndex];
  const treesToLeft = currentRow.slice(0, columnIndex);
  const treesToRight = currentRow.slice(columnIndex + 1);

  return (
    treesToLeft.every(tree => Number(tree) < treeHeight)
    || treesToRight.every(tree => Number(tree) < treeHeight)
  );
}

function isVisibleVertically (treeHeight: number, columnIndex: number, rowIndex: number): boolean {
  const currentColumn = grid.map(row => row[columnIndex]);
  const treesAbove = currentColumn.slice(0, rowIndex);
  const treesBelow = currentColumn.slice(rowIndex + 1);

  return (
    treesAbove.every(tree => Number(tree) < treeHeight)
    || treesBelow.every(tree => Number(tree) < treeHeight)
  );
}
