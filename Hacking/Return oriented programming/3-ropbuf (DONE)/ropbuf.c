#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void vuln(char *input)
{
	char buf[64];
	strcpy(buf, input);
}

int main(int argc, char **argv)
{
	if(argc > 1)
        	vuln(argv[1]);
    	return 0;
}
