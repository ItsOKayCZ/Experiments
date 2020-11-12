gdtStart:
	dd 0x0
	dd 0x0

gdtCode:
	dw 0xffff	; Length
	dw 0x0		; Base
	db 0x0		; Base
	db 10011010b	; Flags
	db 11001111b	; Flags + length
	db 0x0		; Base

gdtData:
	dw 0xffff
	dw 0x0
	db 0x0
	db 10010010b
	db 11001111b
	db 0x0

gdtEnd:

gdtDescriptor:
	dw gdtEnd - gdtStart - 1 ; size, always one less of its true size
	dd gdtStart

CODE_SEG equ gdtCode - gdtStart
DATA_SEG equ gdtData - gdtStart
