#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int secret(){
  printf("\nThis it the secret!\n");
  exit(0);
}

int main(int argc, char *argv[]){

  if(argc < 2){
    printf("Usage: %s <overflow>\n", argv[0]);
    exit(1);
  }

  char buffer[100];

  strcpy(buffer, argv[1]);

  printf("Hello %s!\n", buffer);

  return 0;
}
