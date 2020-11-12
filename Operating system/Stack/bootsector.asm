mov ah, 0x0e ; tty mode

mov bp, 0x8000
mov sp, bp

; Yes
push "o"
push "l"
push "l"
push "e"
push "H"

pop bx
mov al, bl
int 0x10

pop bx
mov al, bl
int 0x10

pop bx
mov al, bl
int 0x10

pop bx
mov al, bl
int 0x10

pop bx
mov al, bl
int 0x10

jmp $
times 510-($-$$) db 0
dw 0xaa55
