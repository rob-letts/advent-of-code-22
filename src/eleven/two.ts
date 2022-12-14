import { getData } from "../helpers/get-data";

// Constants
const NUMBER_OF_ROUNDS = 10000;

// Types
type Monkey = {
  name: string,
  operation: string,
  isDivisibleBy: string,
  targetIfTrue: string,
  targetIfFalse: string,
  items: number[],
  inspectionCount: number
}

// Setup
const monkeyDetails: string[] = getData(`./src/eleven/resources/data.txt`);
const monkeys: Monkey[] = getMonkeys(monkeyDetails);

const superModulo = monkeys.reduce((previous, current) => previous * Number(current.isDivisibleBy), 1);

// Computation
for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
  monkeys.forEach(monkey => {
    monkey.items.forEach(item => {
      monkey.inspectionCount++;

      const itemWorryLevel = Math.floor(eval(monkey.operation.replaceAll(`old`, String(item))));

      const targetMonkeyName = itemWorryLevel % Number(monkey.isDivisibleBy) === 0
        ? monkey.targetIfTrue
        : monkey.targetIfFalse;

      monkeys
        .find(targetMonkey => targetMonkey.name === targetMonkeyName)
        ?.items.push(itemWorryLevel % superModulo);
    });

    monkey.items = [];
  });
}

monkeys.forEach(item => {
  console.log(item.name, item.inspectionCount);
});

// Output
const mostActiveMonkeys = monkeys.sort((a, b) => b.inspectionCount - a.inspectionCount).slice(0, 2);
const monkeyBusiness = mostActiveMonkeys[0].inspectionCount * mostActiveMonkeys[1].inspectionCount;
console.log(monkeyBusiness);

// Helper Functions
function getMonkeys (monkeyDetails: string[]): Monkey[] {
  const monkeys = [];
  const instructions = {
    newMonkey: `Monkey`,
    startingItems: `Starting items:`,
    operation: `Operation: new = `,
    isDivisibleBy: `Test: divisible by `,
    targetIfTrue: `If true: throw to monkey `,
    targetIfFalse: `If false: throw to monkey `
  };

  while (monkeyDetails.length) {
    const emptyLineIndex = monkeyDetails.indexOf(``);
    const splitPoint = emptyLineIndex === -1 ? monkeyDetails.length : emptyLineIndex + 1;
    const monkey = monkeyDetails.splice(0, splitPoint);
    const [name, startingItems, operation, test, targetIfTrue, targetIfFalse] = monkey;

    monkeys.push({
      name: name.replace(instructions.newMonkey, ``).replaceAll(`:`, ``).trim(),
      items: startingItems.replace(instructions.startingItems, ``).trim().split(`, `).map(item => Number(item)),
      operation: operation.replace(instructions.operation, ``).trim(),
      isDivisibleBy: test.replace(instructions.isDivisibleBy, ``).trim(),
      targetIfTrue: targetIfTrue.replace(instructions.targetIfTrue, ``).trim(),
      targetIfFalse: targetIfFalse.replace(instructions.targetIfFalse, ``).trim(),
      inspectionCount: 0
    });
  }

  return monkeys;
}