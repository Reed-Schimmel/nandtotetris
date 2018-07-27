/**
 * Proposed design:
 * - Parser: parses each VM command into its lexical elements
 * - CodeWriter: writes the assembly code that implements the parsed command
 * - Main: drives the process
 * 
 * Main (VMTranslator)
 *  Input: fileName.vm
 *  Outut: fileName.asm
 * 
 * Main Logic:
 * - Constructs a parser to handle the input file
 * - Constructs a CodeWriter to handle the output file
 * - Marches through the input file, parsing each line and generating code from it 
 * 
 * node VMTranslator.js input.vm output.asm
 */

const fs = require('fs');

const INPUT_FILE = process.argv[2];
const FILE_NAME = 'hello'//INPUT_FILE //TODO PROCESS
const OUTPUT_FILE = process.argv[3];

const MATH_BOOL_COMMANDS = new Set([
  'add',
  'sub',
  'neg',
  'eq',
  'gt',
  'lt',
  'and',
  'or',
  'not',
]);

// const STACKS = {
//   SP: 0,
//   LCL: 1,
//   stack: 256, // to 2047
//   static: 16, // to 255
// }

const SEGMENTS = { //TODO temp
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
  // pointer: 'R3',
  // temp: 'R5'
}

const pushToStack = words => {
  const idx = words.pop();
  const segment = words.pop();

  let baseAddress = SEGMENTS[segment];
  let data = `@${idx}
D=A
@${baseAddress}
A=A+D
\nD=M\n`;

  switch (segment) {
  case 'static':
    baseAddress = `${FILE_NAME}.idx`
    data = `@${baseAddress}\nD=M\n`
    break;

  case 'constant':
    data = `@${idx}\nD=A\n`;    
    break;
    
  default:
    break;
  }

  const toStack = '@SP\nA=M\nM=D\n@SP\nM=M+1';

  return data + toStack;

  // `// push constant 2
  // @2
  // D=A
  // @SP
  // A=M
  // M=D
  // @SP
  // M=M+1
  // `

  // for file XXX.vm
  //push static 3
  //@XXX.3
  //D=M
  //{push D to stack}
};

const popFromStack = words => { // TODO static segment and this in general
  const idx = words.pop();
  const segment = words.pop();

  // We will never pop to constant
  if (segment === 'constant') return '';

  const baseAddress = SEGMENTS[segment];

  return(`// Address of destination
@${idx}
D=A
@${baseAddress}
D=A+D
@R5
M=D
// pop data
@SP
A=M
D=M
M=M-1 
//Data to RAM
@R5
A=M
M=D`
  );

  // pop local 0
  // @SP
  // A=M
  // D=M
  // @LCL
  // A = A + 0
  // M = D
  // @SP
  // M=M-1
  // `// push constant 2
  // @2
  // D=A
  // @SP
  // A=M
  // M=D
  // @SP
  // M=M+1
  // `
};

const writeToFile = (path, assemblyCode) => fs.writeFileSync(path, assemblyCode);

const translateCommand = command => {
  const words = command.split(' ');
  // console.log(words)
  // check words[0] for 'push', 'pop', or math/logic commands

  if (words[0] === 'push') {
    return pushToStack(words.slice(1));
  } else if (words[0] === 'pop') {
    return popFromStack(words.slice(1));
  } else if (MATH_BOOL_COMMANDS.has(words[0])) {
    let operation;
    switch (words[0]) { // true is '-1' and false is '0'
    case 'add':
      operation = 'D=M+D';        
      break;

    case 'sub':
      operation = 'D=M-D';        
      break;
  
    case 'neg':
      operation = 'D=M-D';        
      break;
  
    case 'eq':
      operation = 'D=M-D';        
      break;
  
    case 'gt':
      operation = 'D=M-D';        
      break;
  
    case 'lt':
      operation = 'D=M-D';        
      break;
  
    case 'and':
      operation = 'D=M-D';        
      break;
  
    case 'or':
      operation = 'D=M-D';        
      break;
  
    case 'not':
      operation = 'D=M-D';        
      break;
  
    default:
      break;
    }

    return `@SP
M=M-1
A=M
D=M
@SP
M=M-1
A=M
${operation} // the operation
M=D
@SP
M=M+1`;
  } else {

  }

  return 'hi';
}

const createAssemblyCode = statements => { // returns a string;
  const output = [];
  statements.forEach(statement => {
    output.push('// ' + statement); // this adds the comment
    output.push(translateCommand(statement))
    output.push('\r\n'); // new line
  });

  return output.join('\r\n');
}

const parseInputFile = inputFile => fs.readFileSync(inputFile)
  .toString().trim().split('\r\n')
  .filter(command => !command.startsWith('//')).slice(1);

const main = () => {
  // first we take the input file written in vm code
  // and parse it into single statements
  const vmStatements = parseInputFile(INPUT_FILE)
  // console.log(vmStatements);
  
  // Now we take those statements and for each statement we
  // create the assembly statements
  const assemblyStatements = createAssemblyCode(vmStatements);
  // console.log(assemblyStatements)
  // Finally we write the assembly code to file.
  writeToFile(OUTPUT_FILE, assemblyStatements);
}

main();
