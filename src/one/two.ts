import { readFile } from 'fs';


readFile(`./src/one/resources/data.txt`, (error, data) => {
  if (error) throw error;

  let [current, maxOne, maxTwo, maxThree] = [0, 0, 0, 0];

  data.toString().split(`\n`).forEach(item => {
    if (!item) {
      if (current > maxOne) {
        [maxThree, maxTwo, maxOne] = [maxTwo, maxOne, current];
      }
      else if (current > maxTwo) {
        [maxThree, maxTwo] = [maxTwo, current];
      }
      else if (current > maxThree) {
        maxThree = current;
      }

      current = 0;
    }

    current += Number(item);
  });

  console.log(maxOne + maxTwo + maxThree);
});