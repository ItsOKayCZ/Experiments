print:
	jmp printStart

printStart:
	mov al, [bx]
	cmp al, 0x00
	je printEnd

	mov ah, 0x0e
	int 0x10

	add bx, 1
	jmp printStart

printEnd:
	ret

printNewline:
	mov ah, 0x0e

	mov al, 0x0a
	int 0x10

	mov al, 0x0d
	int 0x10

	ret
