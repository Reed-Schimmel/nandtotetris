// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.
// function mult(R1,R2) {
//   i = 0
//   sum = 0
//   while (i =< R1) {
//    sum = sum + R0
//    i++
//   }
// }

// Define our variables
  @i
  M=1 // i = 0
  @R2
  M=0 // sum = 0
(LOOP)
  @i
  D=M
  @R1
  D=D-M // D=i-R1
  @END
  D;JGT // If (i-R1)>0 goto END
  @R0
  D=M // D=R0
  @R2
  M=M+D // sum += R0
  @i
  M=M+1 // i++
  @LOOP
  0;JMP
(END)
  @END
  0;JMP

  // TEST SHOW THIS THING WORKS!!!