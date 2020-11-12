[bits 16]
switchToPM:
	cli	; 1. disable interrupts
	lgdt [gdtDescriptor]	; 2. load the GDT descriptor
	
	mov eax, cr0
	or eax, 0x1	; 3. set 32-bit mode bit in cr0
	mov cr0, eax
	jmp CODE_SEG:initPM	; 4. far jump by using a different segment

[bits 32]
initPM:
	mov ax, DATA_SEG	; 5. update the segment registers
	mov ds, ax
	mov ss, ax
	mov es, ax
	mov fs, ax
	mov gs, ax

	mov ebp, 0x90000	; 6. update the stack right at the top of the free space
	mov esp, ebp

	call beginPM	; 7. Call a well-know label with useful code
