diskLoad:
	pusha
	
	push dx

	mov ah, 0x02
	mov al, dh
	mov cl, 0x02
	mov ch, 0x00

	mov dh, 0x00
	
	int 0x13
	jc diskError

	pop dx
	cmp al, dh
	jne sectorsError
	popa
	ret

diskError:
	call printNewline
	mov dx, DISK_ERROR
	call print
	call printNewline

	mov dh, ah
	call printHex
	jmp diskLoop

sectorsError:
	mov dx, SECTORS_ERROR
	call print

diskLoop:
	jmp $

DISK_ERROR: db "Disk read error", 0x0
SECTORS_ERROR: db "Incorrect number of sectors read", 0x0
