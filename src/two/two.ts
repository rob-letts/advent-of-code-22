import { readFile } from 'fs';

const POINTS_MAP: Record<string, number> = { X: 0, Y: 3, Z: 6 };
const SCORE_MAP: Record<string, number> = { A: 1, B: 2, C: 3 };
const STRATEGY_MAP: Record<string, Record<string, string>> = {
  A: { X: `C`, Y: `A`, Z: `B` },
  B: { X: `A`, Y: `B`, Z: `C` },
  C: { X: `B`, Y: `C`, Z: `A` }
};

readFile(`./src/two/resources/data.txt`, (error, data) => {
  if (error) throw error;

  let scoreTally = 0;

  data.toString().split(`\n`).forEach(line => {
    const [opponentMove, turnOutcome] = line.split(` `);
    const playerMove = STRATEGY_MAP[opponentMove][turnOutcome];

    scoreTally += POINTS_MAP[turnOutcome];
    scoreTally += SCORE_MAP[playerMove];
  });

  console.log(scoreTally);
});
