import { getData } from "../helpers/get-data";


const instructions: string[] = getData(`./src/ten/resources/data.txt`);

type CommandParams = { command: string, cycles: number };
const cycleCommands: { [key: string]: CommandParams } = {
  addx: { command: `addx`, cycles: 2 },
  noop: { command: `noop`, cycles: 1 }
};

type CycleData = { currentCycle: number, xRegister: number, terminalWidth: number };
const cycleData: CycleData = {
  currentCycle: 0,
  xRegister: 1,
  terminalWidth: 40
};

const spritePrintTerminal: string[] = [];

instructions.forEach(instruction => {
  const [command, value] = extractInstructionParameters(instruction);

  for (let i = 0; i < cycleCommands[command].cycles; i++) {
    if (shouldDrawSprite()) {
      spritePrintTerminal.push(`#`);
    } else {
      spritePrintTerminal.push(`.`);
    }

    cycleData.currentCycle++;

    if (isSecondPhaseOfAddCycle(command, i)) {
      cycleData.xRegister += value;

      if (cycleData.xRegister >= 40) {
        throw new Error(`oh no! this data seems to be broken`);
      }
    }
  }
});

// Output
console.log(spritePrintTerminal.join(``));

/*
###. . #..# . .##. . .##. . .##. . ###. . #..# . ####.
#..# . #..# . #..# . #..# . #..# . #..# . #..# . ...#.
###. . #..# . #... . #..# . #... . ###. . #..# . ..#..
#..# . #..# . #... . #### . #... . #..# . #..# . .#...
#..# . #..# . #..# . #..# . #..# . #..# . #..# . #....
###. . .##. . .##. . #..# . .##. . ###. . .##. . ####.
B U C A C B U Z
*/

function getSpriteIndexes (xRegister: number): [number, number, number] {
  return [xRegister - 1, xRegister, xRegister + 1];
}

function shouldDrawSprite (): boolean {
  return getSpriteIndexes(cycleData.xRegister)
    .includes(cycleData.currentCycle % cycleData.terminalWidth);
}

function isSecondPhaseOfAddCycle (command: string, index: number) {
  const isAddCommand = command === cycleCommands.addx.command;
  const isSecondPhase = index === cycleCommands.addx.cycles - 1;
  return isAddCommand && isSecondPhase;
}

function extractInstructionParameters (instruction: string): [string, number] {
  const [command, value] = instruction.split(` `);
  return [command, Number(value)];
}