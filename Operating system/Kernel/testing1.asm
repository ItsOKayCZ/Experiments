[org 0x7c00]
mov bp, 0x9000
mov sp, bp

mov dx, MSG_REAL_MODE
call print

call switchToPM
jmp $

%include "16bitPrint.asm"
%include "32bit/print.asm"
%include "32bit/GDT.asm"
%include "32bit/switch.asm"

[bits 32]
beginPM:
	mov eax, MSG_PROT_MODE
	call printPM

	jmp $

MSG_REAL_MODE:
	db "Mode: 16bit", 0x0
MSG_PROT_MODE:
	db "Mode: 32bit", 0x0

times 510-($-$$) db 0x0
dw 0xaa55
