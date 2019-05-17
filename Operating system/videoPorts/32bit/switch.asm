[bits 16]
switchToPM:
	cli ; disable interrupts

	lgdt [gdtDescriptor] ; Load the GDT descriptor
	
	mov eax, cr0 ; Set 32bit mode in cr0
	or eax, 0x1
	mov cr0, eax

	jmp CODE_SEG:initPM ; Far jump by using a different segment

[bits 32]
initPM:
	mov ax, DATA_SEG ; update the segment registers
	mov ds, ax
	mov ss, ax
	mov es, ax
	mov fs, ax
	mov gs, ax
	
	mov ebp, 0x90000 ; update the stack right at the top of the free space
	mov esp, ebp

	call beginPM ; Call a well-known label with useful code
