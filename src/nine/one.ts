import { getData } from "../helpers/get-data";

// setup
const instructions: string[] = getData(`./src/nine/resources/data.txt`);
const visitedByTail = new Set();
const rope = { headX: 0, headY: 0, tailX: 0, tailY: 0 };

// Calculations
instructions.forEach(instruction => {
  const [direction, distance] = getInstruction(instruction);

  for (let i = 0; i < distance; i++) {
    moveRopeHead(direction);
    moveRopeTail(rope.headX - rope.tailX, rope.headY - rope.tailY);
    visitedByTail.add(`${rope.tailX},${rope.tailY}`);
  }
});

// Output
console.log(visitedByTail.size);

// Helper Functions
function getInstruction (instruction: string): [string, number] {
  return [instruction[0], Number(instruction.split(` `).at(1))];
}

function moveRopeHead (direction: string): void {
  if (![`U`, `D`, `L`, `R`].includes(direction)) throw new Error(`Invalid direction`);
  direction === `U` && rope.headY++;
  direction === `D` && rope.headY--;
  direction === `R` && rope.headX++;
  direction === `L` && rope.headX--;
}

function moveRopeTail (xDiff: number, yDiff: number): void {
  const isTwoCellsAway = Math.abs(xDiff) === 2 || Math.abs(yDiff) === 2;
  if (!isTwoCellsAway) return;

  if (xDiff !== 0) {
    xDiff > 0 ? rope.tailX++ : rope.tailX--;
  }

  if (yDiff !== 0) {
    yDiff > 0 ? rope.tailY++ : rope.tailY--;
  }
}