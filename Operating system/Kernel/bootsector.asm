[org 0x7c00]
KERNEL_OFFSET equ 0x1000

mov [BOOT_DRIVE], dl

mov bp, 0x9000
mov sp, bp

mov dx, MSG_REAL_MODE
call print
call printNewline

call loadKernel
call switchToPM

jmp $

%include "16bitPrint.asm"
%include "disk.asm"
%include "32bit/print.asm"
%include "32bit/GDT.asm"
%include "32bit/switch.asm"

[bits 16]
loadKernel:
	mov dx, MSG_LOAD_KERNEL
	call print
	call printNewline

	mov bx, KERNEL_OFFSET
	mov dh, 2
	mov dl, [BOOT_DRIVE]
	call diskLoad
	ret

[bits 32]
beginPM:
	mov eax, MSG_PROT_MODE
	call printPM
	call KERNEL_OFFSET
	jmp $


MSG_REAL_MODE: db "Mode: 16bit", 0x0
MSG_PROT_MODE: db "Mode: 32bit", 0x0
MSG_LOAD_KERNEL: db "Loading kernel to memory", 0x0
BOOT_DRIVE: db 0x0

times 510-($-$$) db 0x0
dw 0xaa55
