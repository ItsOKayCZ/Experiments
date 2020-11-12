[bits 32]

videoMemory equ 0xb8000
whiteOnBlack equ 0x0f

printStringPM:
	pusha
	mov edx, videoMemory
	jmp printStringPMLoop

printStringPMLoop:
	mov al, [ebx]
	mov ah, whiteOnBlack

	cmp al, 0
	je printStringPMDone

	mov [edx], ax
	add ebx, 1
	add edx, 2

	jmp printStringPMLoop

printStringPMDone:
	popa
	ret
