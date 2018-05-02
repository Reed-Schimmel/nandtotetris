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

const STACKS = {
  SP: 0,
  LCL: 1,
  stack: 256, // to 2047
  static: 16, // to 255
}

const writeToFile = (path, assemblyCode) => fs.writeFileSync(path, assemblyCode);

translateCommand = command => {
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