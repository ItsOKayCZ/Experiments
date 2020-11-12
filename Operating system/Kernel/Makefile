all: run clean
.PHONY: kernel.o kernelEntry.o kernel.bin bootsector.bin osImage.bin

kernel.o: kernel.c
	gcc -m32 -ffreestanding -c $< -o $@

kernelEntry.o: kernelEntry.asm
	nasm $< -f elf32 -o $@

kernel.bin: kernelEntry.o kernel.o
	ld -m elf_i386 -o $@ -Ttext 0x1000 --oformat binary $^ --ignore-unresolved-symbol _GLOBAL_OFFSET_TABLE_

bootsector.bin: bootsector.asm
	nasm $< -f bin -o $@

osImage.bin: bootsector.bin kernel.bin
	cat $^ > $@

run: osImage.bin
	qemu-system-i386 -fda $<

clean:
	rm *.o *.bin
