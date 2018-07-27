// push constant 10
@10
D=A
@SP
A=M
M=D
@SP
M=M+1


// pop local 0
// Address of destination
@0
D=A
@LCL
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
M=D


// push constant 21
@21
D=A
@SP
A=M
M=D
@SP
M=M+1


// push constant 22
@22
D=A
@SP
A=M
M=D
@SP
M=M+1


// pop argument 2
// Address of destination
@2
D=A
@ARG
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
M=D


// pop argument 1
// Address of destination
@1
D=A
@ARG
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
M=D


// push constant 36
@36
D=A
@SP
A=M
M=D
@SP
M=M+1


// pop this 6
// Address of destination
@6
D=A
@THIS
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
M=D


// push constant 42
@42
D=A
@SP
A=M
M=D
@SP
M=M+1


// push constant 45
@45
D=A
@SP
A=M
M=D
@SP
M=M+1


// pop that 5
// Address of destination
@5
D=A
@THAT
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
M=D


// pop that 2
// Address of destination
@2
D=A
@THAT
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
M=D


// push constant 510
@510
D=A
@SP
A=M
M=D
@SP
M=M+1


// pop temp 6
// Address of destination
@6
D=A
@R5
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
M=D


// push local 0
@0
D=A
@LCL
A=A+D

D=M
@SP
A=M
M=D
@SP
M=M+1


// push that 5
@5
D=A
@THAT
A=A+D

D=M
@SP
A=M
M=D
@SP
M=M+1


// add
@SP
A=M
D=M
@SP
M=M-1
A=M
D=M+D // the operation
M=D


// push argument 1
@1
D=A
@ARG
A=A+D

D=M
@SP
A=M
M=D
@SP
M=M+1


// sub
@SP
A=M
D=M
@SP
M=M-1
A=M
D=M-D // the operation
M=D


// push this 6
@6
D=A
@THIS
A=A+D

D=M
@SP
A=M
M=D
@SP
M=M+1


// push this 6
@6
D=A
@THIS
A=A+D

D=M
@SP
A=M
M=D
@SP
M=M+1


// add
@SP
A=M
D=M
@SP
M=M-1
A=M
D=M+D // the operation
M=D


// sub
@SP
A=M
D=M
@SP
M=M-1
A=M
D=M-D // the operation
M=D


// push temp 6
@6
D=A
@R5
A=A+D

D=M
@SP
A=M
M=D
@SP
M=M+1


// add
@SP
A=M
D=M
@SP
M=M-1
A=M
D=M+D // the operation
M=D

