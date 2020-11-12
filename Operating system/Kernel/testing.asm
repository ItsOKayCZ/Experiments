[org 0x7c00]

mov bp, 0x8000
mov sp, bp

push dx

; Printing the strings
mov dx, helloString
call print
call printNewline

mov dx, goodbyeString
call print

call printNewline

mov dx, 0xc0de
call printHex
call printNewline

; Loading the disk
mov bx, 0x9000
pop dx
mov dh, 0x2
call diskLoad

mov dx, [0x9000]
call printHex
call printNewline

mov dx, [0x9000 + 512]
call printHex
call printNewline
call printNewline

jmp $

%include "16bitPrint.asm"
%include "disk.asm"

helloString:
	db "Hello world", 0x0

goodbyeString:
	db "Goodbye", 0x0

times 510-($-$$) db 0x0
dw 0xaa55


; Size of sector = 512 bytes
; Sector 2
times 512 db 0xda
; Sector 3
times 256 dw 0xface
