[org 0x7c00]

mov bp, 0x8000
mov sp, bp

mov bx, 0x9000
mov dh, 2
call diskLoad

mov dx, [0x9000]
call printHex

call printNewline

mov dx, [0x9000 + 512]
call printHex

; End of code
jmp $

; File includes
%include "../Control Structure/bootsectorPrint.asm"
%include "../Control Structure/bootsectorPrintHex.asm"
%include "bootsectorDisk.asm"

; Padding
times 510-($-$$) db 0
; Magic number
dw 0xaa55

; Sector 1
times 256 dw 0xc0de
times 256 dw 0xface
