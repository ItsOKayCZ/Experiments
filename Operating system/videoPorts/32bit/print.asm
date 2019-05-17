; 0xb8000 + 2 * (row * 80 + col)
[bits 32]

videoMemory equ 0xb8000
WHITE_ON_BLACK equ 0x0f ; The color

printPM:
	pusha	

	mov ebx, videoMemory

	jmp printPMLoop

printPMLoop:

	; EAX: (parameter)
	; EBX: Pointer the videoMemory

	; CH = Color
	; CL = Char (ASCII)

	mov ch, WHITE_ON_BLACK
	mov cl, [eax]

	cmp cl, 0x0
	je printPMEnd

	mov [ebx], cx

	add eax, 1
	add ebx, 2	

	jmp printPMLoop

printPMEnd:
	popa
	ret
