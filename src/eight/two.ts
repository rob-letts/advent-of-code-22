import { getData } from "../helpers/get-data";

// setup
const data: string[] = getData(`./src/eight/resources/data.txt`);
const grid: string[][] = data.map(row => row.split(``));
let highestScenicScore = 0;

// Calculate total visible trees
grid.forEach((row, rowIndex) => {
  row.forEach((tree, columnIndex) => {
    const treeHeight = Number(tree);

    highestScenicScore = Math.max(
      highestScenicScore,
      getScenicScore(treeHeight, rowIndex, columnIndex)
    );
  });
});

// Output
console.log(highestScenicScore);

// Helper Functions
function getScenicScore (treeHeight: number, rowIndex: number, columnIndex: number): number {
  const currentRow = grid[rowIndex];
  const currentColumn = grid.map(row => row[columnIndex]);
  const treesToLeft = currentRow.slice(0, columnIndex).reverse();
  const treesToRight = currentRow.slice(columnIndex + 1);
  const treesAbove = currentColumn.slice(0, rowIndex).reverse();
  const treesBelow = currentColumn.slice(rowIndex + 1);

  return [treesToLeft, treesToRight, treesAbove, treesBelow]
    .map(trees => getScenicScoreInSingleDirection(trees, treeHeight))
    .filter(score => score > 0)
    .reduce((total, score) => total * score, 1);
}

function getScenicScoreInSingleDirection (trees: string[], currentTreeHeight: number): number {
  let index = 0;

  trees.find(tree => {
    if (Number(tree) < currentTreeHeight) {
      index++;
      return false;
    }
    return true;
  });

  return index < trees.length ? index + 1 : index;
}