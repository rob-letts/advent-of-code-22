import { getData } from "../helpers/get-data";

// Constants and Types
const CD_COMMAND = `$ cd `;
const DIR_COMMAND = `dir `;
const BACK_COMMAND = `$ cd ..`;
type Directory = { subDir: string[], size: number, totalSize: number };

// Setup
const data = getData(`./src/seven/resources/data.txt`);
const directories: { [key: string]: Directory } = {};
let currentPath = ``;

// Process Data
data.forEach(line => {
  if (isChangeDirectory(line)) {
    const directory = line.replace(CD_COMMAND, ``);
    currentPath = formatPath(currentPath, directory);
    directories[currentPath] = { subDir: [], size: 0, totalSize: 0 };
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
const currentUnusedSpace = 70000000 - directories[`/`].totalSize;
const FREE_SPACE_NEEDED = 30000000 - currentUnusedSpace;
let sizeOfDirectoryToBeDeleted = Number.POSITIVE_INFINITY;


Object.values(directories).forEach(directory => {
  if (directory.totalSize > FREE_SPACE_NEEDED) {
    sizeOfDirectoryToBeDeleted = Math.min(sizeOfDirectoryToBeDeleted, directory.totalSize);
  }
});

console.log(sizeOfDirectoryToBeDeleted);


// Helper Functions
function calculateSizeOfDirectory (path: string): number {
  const directory = directories[path];

  const currentDirectorySize = directory.size + directory.subDir
    .map(subDir => calculateSizeOfDirectory(subDir))
    .reduce((a, b) => a + b, 0);

  directories[path].totalSize = currentDirectorySize;

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