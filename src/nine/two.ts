import { getData } from "../helpers/get-data";

// setup
const instructions: string[] = getData(`./src/nine/resources/data.txt`);
const visitedByTail = new Set();

type Knot = { X: number, Y: number };
const TOTAL_KNOTS = 9;

const rope: { head: Knot, knots: Knot[] } = {
  head: { X: 0, Y: 0 },
  knots: [...Array(TOTAL_KNOTS).keys()].map(() => ({ X: 0, Y: 0 }))
};

// Calculations
instructions.forEach(instruction => {
  const [direction, distance] = getInstruction(instruction);

  for (let i = 0; i < distance; i++) {
    moveRopeHead(direction);

    rope.knots.forEach((currentKnot, index) => {
      const prevKnot = rope.knots[index - 1] ?? rope.head;
      moveRopeKnot(currentKnot, prevKnot);
    });

    visitedByTail.add(`${rope.knots.at(-1)?.X},${rope.knots.at(-1)?.Y}`);
  }
});

// // Output
console.log(visitedByTail.size);

// // Helper Functions
function getInstruction (instruction: string): [string, number] {
  return [instruction[0], Number(instruction.split(` `).at(1))];
}

function moveRopeHead (direction: string): void {
  if (![`U`, `D`, `L`, `R`].includes(direction)) throw new Error(`Invalid direction`);

  direction === `U` && rope.head.Y++;
  direction === `D` && rope.head.Y--;
  direction === `R` && rope.head.X++;
  direction === `L` && rope.head.X--;
}

function moveRopeKnot (currentKnot: Knot, prevKnot: Knot): void {
  const xDiff = prevKnot.X - currentKnot.X;
  const yDiff = prevKnot.Y - currentKnot.Y;

  const isTwoCellsAway = Math.abs(xDiff) === 2 || Math.abs(yDiff) === 2;
  if (!isTwoCellsAway) return;

  if (xDiff !== 0) {
    xDiff > 0 ? currentKnot.X++ : currentKnot.X--;
  }

  if (yDiff !== 0) {
    yDiff > 0 ? currentKnot.Y++ : currentKnot.Y--;
  }
}