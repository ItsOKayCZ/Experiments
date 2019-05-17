; ax: Working register
; bx: hexOut variable
; cx: Index
; dx: Argument (Parameter)

printHex:
	mov cx, 0
	jmp printHexLoop

printHexLoop:
	cmp cx, 4
	je printHexEnd
	
	mov ax, dx	; Moving to register
	and ax, 0x000f	; Getting the last byte
	add al, 0x30	; Getting the number ascii
	cmp al, 0x39
	jle printHexStep2	; Is a number
	add al, 0x7	; Add 7 to make a letter

printHexStep2:
	; Get the pointer the the last byte of the string
	mov bx, hexOut + 5
	sub bx, cx	

	; Moving the byte to the variable
	mov [bx], al

	ror dx, 4
	
	add cx, 1
	jmp printHexLoop

printHexEnd:
	mov bx, hexOut
	call print

	ret

hexOut:
	db "0x0000", 0x0	
