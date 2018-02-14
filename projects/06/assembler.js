/** Program Flow
 * node assembler.js ****.asm
 * 
*/

// IMPORTS
const fs = require('fs');

// const asmFile = './add/Add.asm'; //TODO
const asmFile = process.argv[2]; //TODO

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
  'D|X': '010101'
};

const JUMP_TABLE ={
  'JGT': '001',
  'JEQ': '010',
  'JGE': '011',
  'JLT': '100',
  'JNE': '101',
  'JLE': '110',
  'JMP': '111'
};

const assemble = (asmFile, symbols) => {
  const comp = compString => {
    // console.log('compString', compString);
    // If compString contains an 'A': a = 0
    const key = removeSpaces(compString.replace('A','X').replace('M','X'));
    return `${COMP_TABLE[key]}`;
    // const a = Number(!compString.includes('A')).toString();
    // const key = removeSpaces(compString.replace('A','X').replace('M','X'));
    // return `${a}${COMP_TABLE[key]}`;
  };
  
  const dest = destString => {
    const m = Number(destString.includes('M'));
    const a = Number(destString.includes('A'));
    const d = Number(destString.includes('D'));
    return `${a}${d}${m}`;
  };
  
  const jump = jumpString => {
    // console.log('jumpString', jumpString);
    if (!jumpString) return '000';
    return JUMP_TABLE[jumpString];
  };

  // first we define functions
  const aInstruction = instruction => {
    // code could be a decimal number or variable/symbole
    const value = symbols[instruction];
    // console.log('A instruction', instruction, value);
    return (value >= 0 ? decToBin(value) : decToBin(instruction));
    // if (value) {
    //   return value;
    // }
    // return decToBin(instruction);
  };
  
  const cInstruction = instruction => {
    // console.log('C instruction', instruction);
    //dest=comp;jump
    const doesJump = instruction.includes(';J');
    // console.log('we jump', doesJump);
    const doesCompute = instruction.includes('=');
    const compEnd = (doesJump ? instruction.indexOf(';') : instruction.length);

    let dst='000';
    let cmp;
    let jmp='000';
    let a='0';

    if (doesCompute) {
      const eIndex = instruction.indexOf('=');

      dst = dest(instruction.slice(0, eIndex));
      cmp = comp(instruction.slice(eIndex + 1, compEnd));
      if (instruction.slice(eIndex + 1, compEnd).includes('A')) {
        a = 0;
      } else if (instruction.slice(eIndex + 1, compEnd).includes('M')) {
        a = 1;
      }
      // a = Number(!instruction.slice(eIndex + 1, compEnd).includes('A')).toString();
      // a = Number(!instruction.slice(eIndex + 1, compEnd).includes('A')).toString();
      // console.log('a bit',a) 
      
    } else {
      //D;JMP
      cmp = comp(instruction.slice(0, compEnd));
      a='0';
      // console.log('instruction: ', instruction);
      // console.log(instruction.slice(0, compEnd),'comp code: ', cmp);
    }

    if(doesJump) {
      jmp = jump(instruction.slice(compEnd + 1), instruction.length);
    }
    // C-instruction: 111a c1c2c3c4 c5c6d1d2 d3j1j2j3
    return `111${a}${cmp}${dst}${jmp}`;
  };

  const parse = line => {
    // console.log(line);
    if (line.startsWith('@')) return aInstruction(line.slice(1, line.length + 1));
    else if (!line.startsWith('(')) return cInstruction(line);
  };

  // time to assemble
  let compiled = '';
  for (let line of asmFile) {
    const compLine = parse(line);
    try {
      if (compLine.includes('undefined')) {
        console.log(line,compLine);
      }
    } catch (error) {
      console.log(error.message);
    }
    if (compLine !== undefined) compiled += `${compLine}\n`;
  }
  return compiled;
};

const writeToFile = hackProgram => {
  // console.log(hackProgram);
  const filename = asmFile.slice(0, asmFile.length-3) + 'hack';
  fs.writeFileSync(filename, hackProgram, 'utf8');
};

const initialization = asmFile => {
  const labelSymbols = firstPass(asmFile, INIT_SYMBOL_TABLET);
  const symbols = secondPass(asmFile, labelSymbols);
  const hackProgram = assemble(asmFile, symbols);
  writeToFile(hackProgram);
};

const firstPass = (asmFile, symbolTable) => {
  // extract label symbols
  const extractLabel = statement => {
    const start = statement.indexOf('(');
    const end = statement.indexOf(')');
    if ( start >= 0 && end > 0) {
      return statement.slice(start + 1, end);
    } else if (start === end) return null;
  };

  // for (let statement of asmFile) {
  let realLineNumber = 0;
  for (let statement of asmFile) {
    //(LOOP) we must extract LOOP
    let label = extractLabel(statement);
    if (label) {
      symbolTable[label] = realLineNumber;
      // symbolTable[label] = realLineNumber + 1;
    } else {
      realLineNumber++;
    }
  }
  // for (let lineNum = 0; lineNum < asmFile.length ; lineNum++) {
  //   //(LOOP) we must extract LOOP
  //   statement = asmFile[lineNum];
  //   let label = extractLabel(statement);
  //   if (label) {
  //     symbolTable[label] = realLineNumber + 1;
  //   } else if (label === -2) realLineNumber++;
  // }
  return symbolTable;
};

const secondPass = (asmFile, symbolTable) => {
  // extract varable symbols
  const extractVariable = statement => {
    const isAt = statement.startsWith('@');
    const literalNumber = statement.slice(1,statement.length) >= 0;
    if (isAt && !literalNumber) {
      const variable = statement.slice(1, statement.length);
      return variable;
    }
  };

  let ramCounter = 16;
  let statement;
  for (let lineNum = 0; lineNum < asmFile.length ; lineNum++) {
    statement = asmFile[lineNum];
    const variable = extractVariable(statement);
    symbolTable[variable];
    if (variable && symbolTable[variable] === undefined) {
      symbolTable[variable] = ramCounter++;
      // symbolTable[variable] = lineNum;
    }
  }
  return symbolTable;
};

const decToBin = dec =>{
  const pad = (s, size) => {    
    const padding = '0000000000000000';
    const amountOfPadding = size - s.toString().length;
    const slicedPadding = padding.slice(0,amountOfPadding);
    return `${slicedPadding}${s}`;
  };
  return pad(Number(dec).toString(2), 16);
};

const removeSpaces = string => {
  let newString = string.trim();
  while (newString.includes(' ')) {
    newString = newString.replace(' ', '');
  }
  return newString;
};

const parseFile = fileData => {
  // returns an array of each line of file
  let character;
  let line;
  const array = [];
  for (character of fileData) {
    if (character === '\n') {
      if (!line.startsWith('//') && line !== '\r' && !line.includes('undefined')) {
        line = line.replace('\r', '');
        const end = line.indexOf('//');
        if (end !== -1) line = line.slice(0, end);
        array.push(removeSpaces(line));
      }
      line = '';
    } else {
      line += character;
    }
  }
  // console.log(fileData)
  return array;
};

try {  
  const data = fs.readFileSync(asmFile, 'utf8');
  const instructions = parseFile(data);
  initialization(instructions);
} catch(e) {
  console.log('Error:', e.stack);
}