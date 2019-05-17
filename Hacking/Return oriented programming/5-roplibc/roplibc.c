#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

// recv and execute from gbuf
char gbuf[128];

void vuln()
{
    char buf[64];
    read(0, buf, 128);
}

int main(int argc, char **argv)
{
    vuln();
    return 0;
}
