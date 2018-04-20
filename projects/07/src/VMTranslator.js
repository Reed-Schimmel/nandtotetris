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
 */