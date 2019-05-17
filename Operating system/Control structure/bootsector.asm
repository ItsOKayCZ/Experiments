[org 0x7c00]

; Printing the string
mov bx, helloString 
call print

call printNewline

mov bx, goodbyeString
call print

call printNewline

mov dx, 0xc0de
call printHex


jmp $

%include "bootsectorPrint.asm"
%include "bootsectorPrintHex.asm"



helloString:
	db "Hello world", 0x00

goodbyeString:
	db "Goodbye world", 0x00

times 510-($-$$) db 0
dw 0xaa55
