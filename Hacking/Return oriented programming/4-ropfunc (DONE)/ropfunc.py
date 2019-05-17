from pwn import *

# gdb-peda pattc + patto
buf_offset = 140 #TODO: double-check offset
payload = "A" * buf_offset

# nm ./ropfunc |  grep call_1
call1 = TODO
# Used to pass the check in call_1
param_call1 = TODO
# ropsearch gadget to clean previous param from stack
pop_ret = TODO

# nm ./ropfunc |  grep call_2
call2 = TODO
# Params used to pass the checks in call_2
p1_call2 = TODO
p2_call2 = TODO
# nm ./ropfunc |  grep call_exit 
cexit = TODO

# TODO: build ROP chain payload

print payload
