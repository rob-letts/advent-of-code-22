import { getData } from "../helpers/get-data";

// Constants and Types
const CD_COMMAND = `$ cd `;
const DIR_COMMAND = `dir `;
const BACK_COMMAND = `$ cd ..`;
const MAX_SIZE = 100000;
type Directory = { subDir: string[], size: number };

// Setup
const data = getData(`./src/seven/resources/data.txt`);
const directories: { [key: string]: Directory } = {};
let currentPath = ``;
let spaceSavedOnDelete = 0;

// Process Data
data.forEach(line => {
  if (isChangeDirectory(line)) {
    const directory = line.replace(CD_COMMAND, ``);
    currentPath = formatPath(currentPath, directory);
    directories[currentPath] = { subDir: [], size: 0 };
  }

  if (isBackNavigation(line)) {
    currentPath = getPreviousDir(currentPath);
  }

  if (isFile(line)) {
    directories[currentPath].size += getFileSize(line);
  }

  if (isSubDirectory(line)) {
    const directory = getSubDirectoryPath(line);
    directories[currentPath].subDir.push(directory);
  }
});

// Output
calculateSizeOfDirectory(`/`);
console.log(spaceSavedOnDelete);

// Helper Functions
function calculateSizeOfDirectory (path: string): number {
  const directory = directories[path];

  const currentDirectorySize = directory.size + directory.subDir
    .map(subDir => calculateSizeOfDirectory(subDir))
    .reduce((a, b) => a + b, 0);

  if (currentDirectorySize <= MAX_SIZE) {
    spaceSavedOnDelete += currentDirectorySize;
  }

  return currentDirectorySize;
}

function getPreviousDir (currentPath: string): string {
  const previousDir = currentPath.split(`/`).slice(0, -1).join(`/`);
  return previousDir === `` ? `/` : previousDir;
}

function formatPath (currentPath: string, directory: string): string {
  if (!currentPath) {
    return `/`;
  }
  return currentPath === `/` ? `/${directory}` : `${currentPath}/${directory}`;
}

function isChangeDirectory (line: string): boolean {
  return line.startsWith(CD_COMMAND) && !line.includes(BACK_COMMAND);
}

function isBackNavigation (line: string) {
  return line.startsWith(BACK_COMMAND);
}

function isFile (line: string): boolean {
  return !isNaN(Number(line.charAt(0)));
}

function getFileSize (line: string): number {
  return Number(line.split(` `)[0]);
}

function isSubDirectory (line: string): boolean {
  return line.startsWith(DIR_COMMAND);
}

function getSubDirectoryPath (line: string): string {
  return currentPath === `/`
    ? `/${line.replace(DIR_COMMAND, ``)}`
    : `${currentPath}/${line.replace(DIR_COMMAND, ``)}`;
}