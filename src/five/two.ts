import { readFileSync } from 'fs';
import assert from 'node:assert/strict';

// Extract Data
const data = getData(`./src/five/resources/data.txt`);
const indexOfEmptyLine = data.findIndex(item => item === ``);
const dataSet = data.slice(0, indexOfEmptyLine - 1);
const instructions = data.slice(indexOfEmptyLine + 1);

// Arrange Data
const stacks: Array<Array<string>> = [];

dataSet.forEach(line => {
  [...line].forEach((char, index) => {
    if (isLetter(char)) {
      const currentStack = getStackNumberFromIndex(index);

      if (stacks[currentStack]) {
        stacks[currentStack].push(char);
      } else {
        stacks[currentStack] = [char];
      }
    }
  });
});

// Solve
instructions.forEach(line => {
  const instruction = extractInstruction(line);
  const poppedItems = stacks[instruction.target].splice(0, instruction.count);
  stacks[instruction.destination] = [...poppedItems, ...stacks[instruction.destination]];
});

const result = stacks.map(stack => stack[0]).join(``);
console.log(result);

// Helper Functions
function extractInstruction (line: string) {
  const [count, target, destination] = line
    .replaceAll(`move `, ``).replaceAll(`from `, ``).replaceAll(`to `, ``)
    .split(` `)
    .map(item => Number(item));

  return {
    count,
    target: target - 1,
    destination: destination - 1
  };
}

function isLetter (char: string) {
  return char.match(/[a-z]/i);
}

function getData (path: string) {
  const data = readFileSync(path, `utf-8`);
  return data.toString().split(`\n`);
}

function getStackNumberFromIndex (index: number) {
  return Math.floor(index / 4);
}

// Unit Tests
assert.strictEqual(getStackNumberFromIndex(1), 0);
assert.strictEqual(getStackNumberFromIndex(5), 1);
assert.strictEqual(getStackNumberFromIndex(9), 2);
assert.strictEqual(getStackNumberFromIndex(13), 3);