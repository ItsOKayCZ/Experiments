var field = document.getElementsByTagName("td");
field = Array.prototype.slice.call(field);
var countOfFields = field.length;
var size = Math.sqrt(countOfFields);
var activeFieldSecond = document.getElementsByClassName("active")[0];
var activeField = document.getElementsByClassName("active")[1];
var appleField = document.getElementsByClassName("apple")[0];
var nextMove = "right";
var position = field.indexOf(activeField);
var positionSecond = field.indexOf(activeFieldSecond);
var applePosition = field.indexOf(appleField);
var gameOver = true;
var time;
var change = 1;

function applePlacement() { // Jablko
  appleField.classList.remove("apple");
  applePosition = Math.floor(Math.random() * (90 - 0 + 1)) + 0;
  appleField = field[applePosition];
  appleField.classList.add("apple");
}

function checkSecond(movement) { // Kontrola hada
  switch (movement) {
    case "up":
      return !((positionSecond - size) < (size - size));
    case "down":
      return !((positionSecond + size) >= countOfFields);
    case "left":
      return !((positionSecond % size) == 0);
    case "right":
      return !((positionSecond % size) == (size - 1));
  }
}

function check(movement) { // Kontrola hada
  switch (movement) {
    case "up":
      return !((position - size) < (size - size));
    case "down":
      return !((position + size) >= countOfFields);
    case "left":
      return !((position % size) == 0);
    case "right":
      return !((position % size) == (size - 1));
  }
}

//time = setInterval(action, 1000, nextMove); // Casovej limit na pohyb hada

function action(movement) {
  if (gameOver) {
    if (checkSecond(movement)) {
      if (check(movement)) {
        switch (movement) {
          case "up":
            nextMove = "up";
            positionSecond = position - size;
            position = position - size;
            break;
          case "down":
            nextMove = "down";
            positionSecond = position + size;
            position = position + size;
            break;
          case "left":
            nextMove = "left";
            positionSecond = position - 1;
            position = position - 1;
            break;
          case "right":
            nextMove = "right";
            positionSecond = position + 1;
            position = position + 1;
            break;
        }
        if (positionSecond == applePosition || position == applePosition) {
          applePlacement();
        }
        if (change == 0) {
          activeField.classList.remove("active");
          activeField = field[position];
          activeField.classList.add("active");
          change = 1;
        } else if (change == 1) {
          activeFieldSecond.classList.remove("active");
          activeFieldSecond = field[positionSecond];
          activeFieldSecond.classList.add("active");
          change = 0;
        }
        clearInterval(time);
        time = setInterval(action, 1000, nextMove);
      } else {
        gameOver = false;
        alert("Game over!");
      }
    } else {
      gameOver = false;
      alert("Game over!");
    }
  }
}

document.onkeydown = checkKey;

function checkKey(e) {
  if (e.keyCode == '38') {
    action("up");
  } else if (e.keyCode == '40') {
    action("down");
  } else if (e.keyCode == '37') {
    action("left");
  } else if (e.keyCode == '39') {
    action("right");
  }

}
