SYS_WRITE equ 1
SYS_EXIT equ 60
STD_OUTPUT equ 1

section .text
global _start

_start:
jmp short MainCode
	msg: db `Shellcode: "Hello world!"\n`
	msglen equ $-msg

MainCode:
	mov rax, SYS_WRITE
	mov rbx, STD_OUTPUT
	lea rcx, [rel msg]
	mov rdx, msglen
	syscall

	mov rax, SYS_EXIT
	mov rbx, 0
	syscall
