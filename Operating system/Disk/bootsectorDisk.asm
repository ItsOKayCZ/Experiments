; Load "dh" sectors from drive "dl" into ES:BX
diskLoad:
	pusha

	; Pushing the the stack our parameter
	; because we need space
	push dx

	mov ah, 0x02	; ah <- int 0x13 function. 0x02 = "read"
	mov al, dh	; al <- number of sectors to read (0x01 .. 0x80)
	mov cl, 0x02	; cl <- sector (0x01 .. 0x11)
			; 0x01 is our boot sector, 0x02 is the first "available" sector
	mov ch, 0x00	; ch <- cylinder (0x0 .. 0x3ff, upper 2 bits in "cl")
	; dl <- drive number. Our caller sets it as a parameter and gets it from BIOS
	; (0 = floppy, 1 = floppy2, 0x80 = hdd, 0x81 = hdd2)
	mov dh, 0x00	; dh <- head number (0x0, 0xf)

	; [es:bx] <- pointer to buffer where the data will stored
	; caller sets it up for us, and it is actually the standard location for int 0x13
	int 0x13	; BIOS interrupt
	jc diskError	; if error (stored in the carry bit)

	pop dx
	cmp al, dh	; BIOS also sets "al" to the # of sectors read. Compare it.
	jne sectorsError
	popa
	ret

diskError:
	mov bx, DISKERROR
	call print
	call printNewline

	mov dh, ah	; ah = error code, dl = disk drive the dropped the error
	call printHex
	jmp diskLoop

sectorsError:
	mov bx, SECTORSERROR
	call print

diskLoop:
	jmp $

SECTORSERROR: db "Incorrect number of sectors read", 0x0
DISKERROR: db "Disk read error", 0x0
