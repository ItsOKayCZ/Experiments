[org 0x7c00]

mov bp, 0x9000
mov sp, bp

mov bx, MSG_REAL_MODE
call print

call switchToPM

jmp $

%include "../Control Structure/bootsectorPrint.asm"
%include "32bitPrint.asm"
%include "32bitGDT.asm"
%include "32bitSwitch.asm"

[bits 32]
beginPM:	; After the switch
	mov ebx, MSG_PROT_MODE
	call printStringPM
	jmp $

MSG_REAL_MODE: db "Started in 16-bit real mode", 0x0
MSG_PROT_MODE: db "Loaded 32-bit protected mode", 0x0

times 510-($-$$) db 0x0
dw 0xaa55
