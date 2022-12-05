import { readFile } from 'fs';

readFile(``, (error, data) => {
  if (error) throw error;

  const lines = data.toString().split(`\n`);
});
