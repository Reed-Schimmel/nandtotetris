const argv = require('yargs').argv;

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('Plunder more riffiwobbles!');
} else {
  console.log('Retreat from the xupptumblers!');
}

const INIT_SYMBOL_TABLET = {
  'R0': 0,
  'R1': 1,
  'R2': 2,
  'R3': 3,
  'R4': 4,
  'R5': 5,
  'R6': 6,
  'R7': 7,
  'R8': 8,
  'R9': 9,
  'R10':10,
  'R11':11,
  'R12':12,
  'R13':13,
  'R14':14,
  'R15':15,
  'SCREEN': 16384,
  'KBD': 24576,
  'SP': 0,
  'LCL': 1,
  'ARG': 2,
  'THIS': 3,
  'THAT': 4
};

const COMP_TABLE ={
  '0': '101010',
  '1': '111111',
  '-1': '111010',
  'D': '001100',
  'X': '110000',
  '!D': '001101',
  '!X': '110001',
  '-D': '001111',
  '-X': '110011',
  'D+1': '011111',
  'X+1': '110111',
  'D-1': '001110',
  'X-1': '110010',
  'D+X': '000010',
  'D-X': '010011',
  'X-D': '000111',
  'D&X': '000000',
  'D|A': '010101'
};

// const DEST_TABLE ={};
//
const JUMP_TABLE ={
  'JGT': '001',
  'JEQ': '010',
  'JGE': '011',
  'JLT': '100',
  'JNE': '101',
  'JLE': '110',
  'JMP': '111'
};

const comp = compString => {
  // I do not think there is never a null case
  // if (compString.includes('A'))
  const a = Number(compString.includes('A')).toString();
  const key = compString.replace('A','X').replace('M','X');
  return `${a}${COMP_TABLE[key]}`;
};

const dest = destString => {
  const m = Number(destString.includes('M'));
  const a = Number(destString.includes('A'));
  const d = Number(destString.includes('D'));
  return `${a}${d}${m}`;
};

const jump = jumpString => {
  if (!jumpString) return '000';
  return JUMP_TABLE[jumpString];
};

const aInstruction = code => {

};

const cInstruction = code => {

};

const parse = code => {
  if (code.startsWith('@')) aInstruction(code);
  else cInstruction(code);
};

const initialization = asmFile => {

};

const firstPass = (asmFile, symbolTable) => {
  // extract label symbols
  return symbolTable;
};

const secondPass = (asmFile, symbolTable) => {
  // extract varable symbols
  return symbolTable;
};

const decToBin = dec => Number(dec.toString(2));

const removeSpaces = string => {

};