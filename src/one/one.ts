import { readFile } from 'fs';


readFile(`./src/one/resources/data.txt`, (error, data) => {
  if (error) throw error;

  let [current, max] = [0, 0];

  data.toString().split(`\n`).forEach(item => {
    if (!item) {
      max = Math.max(max, current);
      current = 0;
    }
    current += Number(item);
  });

  console.log(max);
});
