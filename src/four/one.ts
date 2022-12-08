import { readFileSync } from 'fs';

function getData (path: string) {
  const data = readFileSync(path, `utf-8`);
  return data.toString().trim().split(`\n`);
}

const data = getData(`./src/four/resources/data.txt`);

const overlaps = data.map(line => line.split(/,|-/).map(nums => Number(nums))).filter(pairs => {
  const [startOne, endOne, startTwo, endTwo] = pairs;
  return startOne <= startTwo && endTwo <= endOne || startTwo <= startOne && endOne <= endTwo;
});

console.log(overlaps.length);