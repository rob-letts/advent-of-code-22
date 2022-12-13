import { getData } from "../helpers/get-data";

// Setup
const instructions: string[] = getData(`./src/ten/resources/data.txt`);

// Types and data structures
type CommandParams = { command: string, cycles: number };
const cycleCommands: { [key: string]: CommandParams } = {
  addx: { command: `addx`, cycles: 2 },
  noop: { command: `noop`, cycles: 1 }
};

type CycleData = { currentCycle: number, xRegister: number, firstReadOutIndex: number, readOutInterval: number, readOutTotal: number };
const cycleData: CycleData = {
  currentCycle: 0,
  xRegister: 1,
  firstReadOutIndex: 20,
  readOutInterval: 40,
  readOutTotal: 0
};

// Computation
instructions.forEach(instruction => {
  const [command, value] = extractInstructionParameters(instruction);

  for (let i = 0; i < cycleCommands[command].cycles; i++) {
    cycleData.currentCycle++;

    if (shouldReportRegisterValue(cycleData.currentCycle)) {
      cycleData.readOutTotal += (cycleData.xRegister * cycleData.currentCycle);
    }

    if (isSecondPhaseOfAddCycle(command, i)) {
      cycleData.xRegister += value;
    }
  }
});

// Output
console.log(cycleData.readOutTotal);

// Helper functions
function isSecondPhaseOfAddCycle (command: string, index: number) {
  const isAddCommand = command === cycleCommands.addx.command;
  const isSecondPhase = index === cycleCommands.addx.cycles - 1;
  return isAddCommand && isSecondPhase;
}

function extractInstructionParameters (instruction: string): [string, number] {
  const [command, value] = instruction.split(` `);
  return [command, Number(value)];
}

function shouldReportRegisterValue (currentCycleIndex: number): boolean {
  const isFirstReport = cycleData.firstReadOutIndex === currentCycleIndex;
  const isSubsequentReport = ((currentCycleIndex - 20) % 40) === 0;
  return isFirstReport || isSubsequentReport;
}