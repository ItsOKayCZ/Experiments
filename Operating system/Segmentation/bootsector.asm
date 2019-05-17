mov ah, 0x0e

mov al, [secret]
int 0x10

mov bx, 0x7c0
mov ds, bx
mov al, [secret]
int 0x10

mov al, [es:secret]
int 0x10

mov bx, 0x7c0
mov es, bx
mov al, [es:secret]
int 0x10

jmp $

secret:
	db "X", ; 0x0

times 510-($-$$) db 0
dw 0xaa55
