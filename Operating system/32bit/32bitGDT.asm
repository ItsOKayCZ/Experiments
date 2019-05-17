gdtStart:	; The mandatory null descriptor
	dd 0x0	; "dd" means define double word (4 bytes = 0x00000000)
	dd 0x0

gdtCode:	; The code segment descriptor
	
	; base=0x0, limit=0xffffff,
	; 1 flag: (present)1 (privilege)00 (descriptor type)1 -> 1001b
	; type flag: (code)1 (conforming)0 (readable)1 (accessed)0 -> 1010b
	; 2 flag: (granularity)1 (32-bit default)1 (64-bit seg)0 (AVL)0 -> 1100b

	dw 0xffff	; Limit (bits 0-15)
	dw 0x0		; Base (bits 0-15)
	db 0x0		; Base (bits 16-23)
	db 10011010b	; 1 flag, type flag
	db 11001111b	; 2 flag, Limit (bits 16-19)
	db 0x0		; Base (bits 24-31)

gdtData:	; The data segment descriptor
	; Same as code segment except for the type flag
	; type flag: (code)0 (expand down)0 (writable)1 (accessed)0 -> 0010b

	dw 0xffff	; Limit (bits 0-15)
	dw 0x0		; Base (bits 0-15)
	db 0x0		; Base (bits 16-23)
	db 10010010b	; 1 flag, type flag
	db 11001111b	; 2 flag, Limit (bits 16-19)
	db 0x0		; Base (bits 24-31)

gdtEnd:	; The reason for putting a label at the end of the
	; GDT is so we can have the assembler calculate
	; the size of the GDT for the GDT descriptor

; GDT descriptor
gdtDescriptor:
	dw gdtEnd - gdtStart - 1	; Size of our GDT, always less one
					; of the true size
	dd gdtStart			; Start address of our GDT

CODE_SEG equ gdtCode - gdtStart
DATA_SEG equ gdtData - gdtStart
