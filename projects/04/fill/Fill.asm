// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Screen The Hack computer includes a black-and-white screen organized
// as 256 rows of 512 pixels per row. The screen’s contents are represented
// by an 8K memory map that starts at RAM address 16384 (0x4000). Each row
// in the physical screen, starting at the screen’s top left corner, is
// represented in the RAM by 32 consecu- tive 16-bit words. Thus the pixel at
// row r from the top and column c from the left is mapped on the c%16 bit
// (counting from LSB to MSB) of the word located at RAM[16384 þ r   32 þ c=16].
// To write or read a pixel of the physical screen, one reads or writes the
// corresponding bit in the RAM-resident memory map (1 1⁄4 black, 0 1⁄4 white).

// Keyboard The Hack computer interfaces with the physical keyboard via a single-word
// memory map located in RAM address 24576 (0x6000). Whenever a key is pressed on the
// physical keyboard, its 16-bit ASCII code appears in RAM[24576]. When no key is
// pressed, the code 0 appears in this location. In addition to the usual ASCII codes,
// the Hack keyboard recognizes the keys shown in figure 4.6.


// Init vars
@SCREEN
D=A
@8192
D=A // SCREEN + 8192
@screenSize
M=D

(CHECK_KEYBOARD_LOOP)
  @i
  M=0
  @KBD
  D=M
  // if (D != 0) turn screen black
  @BLACKEN_SCREEN
  D;JNE
  // else if (D == 0) screen is write
  @CLEAR_SCREEN
  0;JMP // goto CLEAR_SCREEN
  // else
  @CHECK_KEYBOARD_LOOP
  0;JMP

(BLACKEN_SCREEN)
  @i 
  D = M 
  @screenSize
  D=D-M
  @CHECK_KEYBOARD_LOOP
  D;JGE // if (i-8192) >= 0 goto main loop

  @SCREEN
  D=A  
  @i 
  A=D+M
  M=-1

  @i // i++
  M=M+1

  @BLACKEN_SCREEN
  0;JMP // Loop


(CLEAR_SCREEN)
  @i 
  D = M 
  @screenSize
  D=D-M
  @CHECK_KEYBOARD_LOOP
  D;JGE // if (i-8192) >= 0 goto main loop

  @SCREEN
  D=A  
  @i 
  A=D+M
  M=0

  @i // i++
  M=M+1

  @CLEAR_SCREEN
  0;JMP // Loop