// push constant 10
@10
D=A
@SP
A=M
M=D
@SP
M=M+1


// pop local 0
@SP
A=M
D=M
@LCL
A=A+0
M=D
@SP
M=M-1


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
@SP
A=M
D=M
@ARG
A=A+2
M=D
@SP
M=M-1


// pop argument 1
@SP
A=M
D=M
@ARG
A=A+1
M=D
@SP
M=M-1


// push constant 36
@36
D=A
@SP
A=M
M=D
@SP
M=M+1


// pop this 6
@SP
A=M
D=M
@THIS
A=A+6
M=D
@SP
M=M-1


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
@SP
A=M
D=M
@THAT
A=A+5
M=D
@SP
M=M-1


// pop that 2
@SP
A=M
D=M
@THAT
A=A+2
M=D
@SP
M=M-1


// push constant 510
@510
D=A
@SP
A=M
M=D
@SP
M=M+1


// pop temp 6
@SP
A=M
D=M
@R5
A=A+6
M=D
@SP
M=M-1


// push local 0
@LCL
A=A+0
D=M
@SP
A=M
M=D
@SP
M=M+1


// push that 5
@THAT
A=A+5
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
@ARG
A=A+1
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
@THIS
A=A+6
D=M
@SP
A=M
M=D
@SP
M=M+1


// push this 6
@THIS
A=A+6
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
@R5
A=A+6
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

