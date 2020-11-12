C_SOURCES = $(wildcard Kernel/*.c Drivers/*.c)
HEADERS = $(wildcard Kernel/*.h Drivers/*.h)

OBJ = $(C_SOURCES:.c=.o)

CFLAGS = -g

osImage.bin: Boot/bootsector.bin Kernel/kernel.bin 
	cat $^ > $@

Kernel/kernel.bin: Boot/kernelEntry.o $(OBJ)
	ld -m elf_i386 --oformat binary -Ttext 0x1000 -o $@ $^ --ignore-unresolved-symbol _GLOBAL_OFFSET_TABLE_

Kernel/kernel.elf: Boot/kernelEntry.o $(OBJ)
	ld -m elf_i386 -Ttext 0x1000 -o $@ $^

run: osImage.bin
	qemu-system-i386 -fda osImage.bin

debug: osImage.bin Kernel/kernel.elf
	qemu-system-i386 -s -fda osImage.bin &
	gdb -ex "target remote localhost:1234" -ex "symbol-file Kernel/kernel.elf"

%.o: %.c $(HEADERS)
	gcc $(CFLAGS) -ffreestanding -m32 -o $@ -c $<

%.o: %.asm
	nasm $< -f elf -o $@

%.bin: %.asm
	nasm $< -f bin -o $@

clean:
	rm -rf *.bin *.o osImage.bin *.elf
	rm -rf Kernel/*.o Boot/*.bin Drivers/*.o Boot/*.o
