import { readFile } from 'fs';

const WINNING_MOVES: Record<string, string> = { X: `C`, Y: `A`, Z: `B` };
const DRAW_MOVES: Record<string, string> = { X: `A`, Y: `B`, Z: `C` };
const SCORE_MAP: Record<string, number> = { X: 1, Y: 2, Z: 3 };
const POINTS = { win: 6, draw: 3, loss: 0 };

readFile(`./src/two/resources/data.txt`, (error, data) => {
  if (error) throw error;

  let scoreTally = 0;

  data.toString().split(`\n`).forEach(line => {
    const [opponentMove, playerMove] = line.split(` `);

    scoreTally += SCORE_MAP[playerMove];

    if (DRAW_MOVES[playerMove] === opponentMove) {
      scoreTally += POINTS.draw;
    } else if (WINNING_MOVES[playerMove] === opponentMove) {
      scoreTally += POINTS.win;
    } else {
      scoreTally += POINTS.loss;
    }
  });

  console.log(scoreTally);
});
