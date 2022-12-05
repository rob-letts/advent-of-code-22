import { readFileSync } from 'fs';

const data = getData(`./src/three/resources/data.txt`);

let tally = 0;

while (data.length) {
  const [firstLine, secondLine, thirdLine] = data.splice(0, 3);

  const commonItem = firstLine.split(``).find(item => {
    return secondLine.includes(item) && thirdLine.includes(item);
  });

  if (commonItem) {
    tally += getCharCode(commonItem);
  }
}

console.log(tally);

function getCharCode (char: string): number {
  const charCode = char.charCodeAt(0);
  return charCode >= 97 ? charCode - 96 : charCode - 38;
}

function getData (path: string) {
  const data = readFileSync(path, `utf-8`);
  return data.toString().trim().split(`\n`);
}