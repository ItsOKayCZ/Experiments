; Printing a string
; dx=bx: (Parameter) Pointer to string
; ax: Char of the string
print:
	pusha
	mov bx, dx	
	jmp printLoop

printLoop:
	mov al, [bx]
	cmp al, 0x0
	je printEnd

	mov ah, 0x0e
	int 0x10

	add bx, 1
	jmp printLoop

printEnd:
	popa
	ret

; Printing the new line
printNewline:
	pusha

	mov ah, 0x0e

	mov al, 0x0a
	int 0x10
	
	mov al, 0x0d
	int 0x10

	popa
	ret

; Print the hex value of the register DX
printHex:
        pusha
        mov cx, 0x0
        
        jmp printHexLoop

printHexLoop:
        cmp cx, 0x4
        je printHexEnd

        mov ax, dx
        and ax, 0x000f
        add al, 0x30
        cmp al, 0x39
        jle printHexStep2
        add al, 0x7

printHexStep2:
        mov bx, hexString + 5
        sub bx, cx
        mov [bx], al
        ror dx, 4

        add cx, 1
        jmp printHexLoop

printHexEnd:
        mov dx, hexString
        call print

        popa
        ret

hexString:
        db "0x0000", 0x0
