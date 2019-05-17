#!/usr/bin/env python
import sys
import re

if(len(sys.argv) != 2):
    print "Usage: %s <64-bit address>" % (sys.argv[0])
    exit()

bytes = sys.argv[1]

bytes = re.findall("..", bytes)

bytes = bytes[::-1]
onlyBytes = "".join(bytes)
reprBytes = "".join(bytes).decode("hex")
bytes = "\\x" + "\\x".join(bytes)
print "Representation address: %s" % reprBytes
print "Converted address: %s" % bytes
print "Only bytes: %s" % onlyBytes
