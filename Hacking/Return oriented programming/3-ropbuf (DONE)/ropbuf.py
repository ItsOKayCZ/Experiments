from pwn import *

# gdb-peda pattc + patto
buf_offset = TODO

# gdb-peda$ ropsearch <your_gadget>
rop_addr = TODO

payload = asm(shellcraft.i386.linux.sh())
payload += TODO

# TODO start process
