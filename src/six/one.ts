import { readFileSync } from 'fs';

const path = `./src/six/resources/data.txt`;
const data = readFileSync(path, `utf-8`).toString().split(``);

const length = 4;
const offset = (length * -1) + 1;

const res = length + data.slice(0, offset).findIndex((_, index) => {
  const dataSlice = data.slice(index, index + length);
  return dataSlice.length === new Set(dataSlice).size;
});

console.log(res);