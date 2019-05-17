CFLAGS = -m32 -Wall -Wextra -Wno-unused-function -Wno-unused-variable -fno-stack-protector -g -O0
LDFLAGS = -m32

all: ropfunc

.PHONY: clean

ropfunc: ropfunc.c

clean:
	rm -f ropfunc
	rm -f *.o
