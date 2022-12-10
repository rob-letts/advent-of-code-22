import { readFileSync } from 'fs';

export function getData (path: string) {
  const data = readFileSync(path, `utf-8`);
  return data.toString().split(`\n`);
}