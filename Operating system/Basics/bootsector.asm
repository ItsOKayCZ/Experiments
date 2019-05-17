[org 0x7c00]
mov ah, 0x0e

; Attempt 1
; Fails
; Tries the print the memory address (pointer)
mov al, "1"
int 0x10
mov al, theSecret
int 0x10

; Attempt 2
; Prints the memory address of theSecret but the BIOS places our bootsector binary at address 0x7c00
mov al, "2"
int 0x10
mov al, [theSecret]
int 0x10

; Attempt 3
; Correct
; Add the 0x7c00 address diffrence
mov al, "3"
int 0x10
mov bx, theSecret
add bx, 0x7c00
mov al, [bx]
int 0x10

; Attempt 4
mov al, "4"
int 0x10
mov al, [0x7c2d]
int 0x10

jmp $

theSecret:
	db "X"


times 510-($-$$) db 0
dw 0xaa55
