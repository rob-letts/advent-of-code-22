import { readFile } from 'fs';

readFile(`./src/three/resources/data.txt`, (error, data) => {
  if (error) throw error;
  const lines = data.toString().split(`\n`);

  const incorrectlyPackedItem: { [item: string]: number }  = {};

  for (const line of lines) {
    const halfLineLength = line.length / 2;
    const firstRucksack = line.slice(0, halfLineLength).split(``);
    const secondRucksack = line.slice(halfLineLength).split(``);

    for (const item of new Set(firstRucksack)) {
      const matchFound = secondRucksack.find(item2 => {
        return item === item2 && (
          incorrectlyPackedItem[item] = (incorrectlyPackedItem[item] || 0) + 1
        );
      });

      if (matchFound) {
        break;
      }
    }
  }

  console.log(getResult(incorrectlyPackedItem));
});

function getCharCode (char: string): number {
  const charCode = char.charCodeAt(0);
  return charCode >= 97 ? charCode - 96 : charCode - 38;
}

function getResult (incorrectlyPackedItem: { [item: string]: number }): number {
  let result = 0;
  for (const supply in incorrectlyPackedItem) {
    result += getCharCode(supply) * incorrectlyPackedItem[supply];
  }
  return result;
}