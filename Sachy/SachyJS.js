//html5canvastutorial
var time = [];
var timeInc = [];
var timeChange = true;
var timeChangePlaying = true;
var timeBlackPlaying;
var timeWhitePlaying;

var field;
var fieldArray;
var move = true;
var posPrevious;
var posField;
var posNextField;
var posClass;
var cl;
var direction;
var color = "white";
var rotated = false;
var pawnsTurn = true;
var rookTurn = true;
var kingTurn = true;
var promotion = false;
var promotionType;
var castling;
var takenFigureClass;

function checkSide(pos){ // Zkontroluje jestli na jedne strane je pesec

	var whiteSide = [];
	for(var i = 0; i <= 7; i++){

		whiteSide[i] = i;

	}

	var blackSide = [];
	var j = 56;
	for(var i = 0; i <= 7; i++){

		blackSide[i] = j;
		j++;

	}

	if(color == "white"){

		for(var i = 0; i <= 7; i++){

			if(whiteSide[i] == pos){

				return true;

			}

		}

	} else if(color == "black"){

		for(var i = 0; i <= 7; i++){

			if(blackSide[i] == pos){

				return true;

			}

		}

	}

	return false;

}

function checkPromotionType(){

	var promotionFigure = prompt("On what figure do you want to promote?\nChoices: knight, bishop, rook, queen\nWarning: case-sensetive");

	if(promotionFigure == "knight" || promotionFigure == "bishop" || promotionFigure == "rook" || promotionFigure == "queen"){

		return promotionFigure;

	} else {

		alert("Invalid type of figure!");
		return false;

	} // Kontroluje typ povyseni

}

function rotateChessBoard(){

	for(var i = 0; i <= field.length / 2 - 1; i++){

		var j = (field.length - 1) - i;

		cl = document.getElementsByTagName("td")[i].classList[0];
		posField = field[i];

		el = document.getElementsByTagName("td")[j].classList[0];
		posNextField = field[j];

		if(cl != undefined){

			posField.classList.remove(cl);
			posNextField.classList.add(cl);

		}

		if(el != undefined){

			posNextField.classList.remove(el);
			posField.classList.add(el);

		}

	}

	if(rotated){

		rotated = false;

	} else {

		rotated = true;

	} // Obrati sachovnici

}

function addTakenFiguresImg(cl){ // Pridava sebrane figurky na stranu sachvnici
	
	var takenFigure = document.createElement("img");
	takenFigure.src = cl + ".png";
	takenFigure.height = 75;
	
	if(color == "white"){

		document.getElementById("imgOfTakenFiguresWhite").appendChild(takenFigure);
		
	} else if(color == "black"){
		
		document.getElementById("imgOfTakenFiguresBlack").appendChild(takenFigure);
		
	}
	
}

function timeIncrement(){ // Nastavi casovej increment
	
	var addInc = confirm("Do you want to add a increment?");
	
	if(addInc){
		
		timeInc[0] = prompt("Enter an increment:\nLimit: 1-60");
		
		if(isNaN(timeInc[0]) || timeInc[0] != 0 || timeInc[0] <= 60){
			
			return true;
			
		} else {
			
			return false;
			
		}
		
	}
	
}

function timeInit(time){ // Zobrazi cas pro oba hrace

	if(!isNaN(time[0])){

		if(time[0] != -1){

			if(time[1] != -1){
		
			var timeWhite = document.getElementById("timeOutputWhite");
			var timeBlack = document.getElementById("timeOutputBlack");

			timeWhite.innerHTML = "<span class='timeSignWhite' id='timeOutputWhite'>" + time[0] + "</span>";
			timeBlack.innerHTML = "<span class='timeSignBlack' id='timeOutputBlack'>" + time[1] + "</span>";

			} else {
				
				alert("Black ran out of time!");
				clearInterval(timeBlackPlaying);
				playWhenOnLoad = false;
				
			}
			
		} else {
			
			alert("White ran out of time!");
			clearInterval(timeWhitePlaying);
			playWhenOnLoad = false;
			
		}
		
	}
	
}

function timeSet(){ // Nastavi cas pro oba hrace
	
	if(timeChangePlaying){
	 
		if(timeChange){
			
			time[0] = prompt("Enter the time:");
			
			time[0] = parseInt(time[0]);
			
			if(isNaN(time[0]) && time[0] > 0){
				
				var addInc = confirm("Do you want to add an increment?");
				
				if(addInc){
					
					timeInc[0] = prompt("Enter a increment:\nLimit: 1-60");
					
					timeInc[0] = parseInt(timeInc[0]);
					
					if(timeInc[0] != undefined && timeInc[0] <= 60 && timeInc[0] != 0){
						
						timeInc[1] = timeInc[0];
						
						time[1] = time[0];
						timeChange = false;
						
						timeInit(time);
						
					} else {
						
						alert("Enter a valid value!");
						
					}
					
				} else {
					
					time[1] = time
					
					timeChange = false;
					timeInit(time);
					
				}

			
			} else {
				
				alert("Enter a valid value!");
				
			}
			
		} else {
			
			var ChangeTime = confirm("Do you want to change the time?");
			
			if(ChangeTime){
				
				timeChange = true;
				timeSet();
				
			}
			
		}
		
	} else {
		
		alert("You cannot change the time when you are playing!");
		
	}
	
}

function init() { // Nacte pole (ocisluje tabulku)
	field = document.getElementsByTagName("td");
    fieldArray = Array.prototype.slice.call(field);
	playWhenOnLoad = true;
}

function pawnsByTwo(posPrevious){ // Kontroluje pesak o dva

	cl = document.getElementsByTagName("td")[posPrevious].classList[0];
	
	if(cl == "WP1" || cl == "BP1"){
		
		return false;
		
	} else {
		
		return true;
		
	}
	
}

function colorTaking(pos){ // Kontroluje jaka barva hraje bere jakou
	
	cl = document.getElementsByTagName("td")[pos].classList[0];
	
	if(color == "white"){
		
		if(cl == "WP" || cl == "WP1" || cl == "WK1" || cl == "WR1" || cl == "WR" || cl == "WN" || cl == "WB" || cl == "WQ" || cl == "WK"){
		
			return false;
		
		} else {
			
			return true;
			
		}
		
	} else {
		
		if(cl == "BP" || cl == "BK1" || cl == "BR1" || cl == "BP1" || cl == "BR" || cl == "BN" || cl == "BB" || cl == "BQ" || cl == "BK"){
			
			return false;
			
		} else {
			
			return true;
			
		}
		
	}
	
}

function colorMove(posPrevious){ // Kontroluje jaka barva hraje
	
	cl = document.getElementsByTagName("td")[posPrevious].classList[0];
	
	if(color == "white"){
		
		if(cl == "WP" || cl == "WP1" || cl == "WK1" || cl == "WR1" || cl == "WR" || cl == "WN" || cl == "WB" || cl == "WQ" || cl == "WK"){
			
			return true;
			
		} else {
			
			return false;
			
		}
		
	} else {
		
		if(cl == "BP" || cl == "BP1" || cl == "BR1" || cl == "BK1" || cl == "BR" || cl == "BN" || cl == "BB" || cl == "BQ" || cl == "BK"){
			
			return true;
			
		} else {
			
			return false;
			
		}
		
	}
	
}

function takingMoveWhileLimit(posPrevious, pos, direction, limit, i){ // Kontroluje ve smycce (omezeny)

	switch(direction){
		
		case "rightAndDown":
		
			for(var j = 0; j <= i; j++){
		
				posPrevious = posPrevious + limit;
				
				if(j == i - 1){
					
					if(posPrevious == pos){
						
						return true;
						
					} else {
						
						return false;
						
					}
					
				} else if(takingMove(posPrevious)){
					
					return false;
					
				}
				
			}
		
		case "leftAndUp":
		
			for(var j = 0;j <= i; j++){
		
				posPrevious = posPrevious - limit;
				
				if(j == i - 1){
					
					if(posPrevious == pos){
						
						return true;
						
					} else {
						
						return false;
						
					}
					
				} else if(takingMove(posPrevious)){
					
					return false;
					
				}
				
			}
	}
	
}

function takingMoveWhile(posPrevious, pos, direction, y, x){ // Kontroluje ve smycce
	
	switch(direction){
		
		case "rightUp":
		
			while(true){
				
				posPrevious = posPrevious - y + x;
				
				cl = document.getElementsByTagName("td")[posPrevious];
				if(cl == undefined) return false;
				cl = document.getElementsByTagName("td")[posPrevious].classList;
				
				if(posPrevious == pos){
					
					return true;
					
				} else if(takingMove(posPrevious)){
					
					return false;
					
				}
			}
		
		case "rightDown":
		
			while(true){
				
				posPrevious = posPrevious + y + x;
				
				cl = document.getElementsByTagName("td")[posPrevious];
				if(cl == undefined) return false;
				cl = document.getElementsByTagName("td")[posPrevious].classList;

				if(posPrevious == pos){
					
					return true;
					
				} else if(takingMove(posPrevious)){
					
					return false;
					
				}
				
			}
		
		case "leftUp":
		
			while(true){
				
				posPrevious = posPrevious - y - x;
				
				cl = document.getElementsByTagName("td")[posPrevious];
				if(cl == undefined) return false;
				cl = document.getElementsByTagName("td")[posPrevious].classList;

				if(posPrevious == pos){
					
					return true;
					
				} else if(takingMove(posPrevious)){
					
					return false;
					
				}
				
			}
		
		case "leftDown":
		
			while(true){
				
				posPrevious = posPrevious + y - x;
				
				cl = document.getElementsByTagName("td")[posPrevious];
				if(cl == undefined) return false;
				cl = document.getElementsByTagName("td")[posPrevious].classList;
				
				if(posPrevious == pos){
					
					return true;
					
				} else if(takingMove(posPrevious)){
					
					return false;
					
				}
				
			}
		
	}
	
}

function takingMove(posPrevious){ // Kontroluje moznosti pohybu

	cl = document.getElementsByTagName("td")[posPrevious];
	if(cl == undefined) return false;
	cl = document.getElementsByTagName("td")[posPrevious].classList;

	if(cl.length == 1){
		
		return true;
		
	} else {
		
		return false;
		
	}
	
}

function queens(posPrevious, pos){ // Kontroluje moznosti pohybu damy
	
	// Pohyb diagonalne
	
	if(takingMoveWhile(posPrevious, pos, "rightUp", 8, 1)){
		
		return true;
		
	}

	if(takingMoveWhile(posPrevious, pos, "rightDown", 8, 1)){
		
		return true;
		
	}
	
	if(takingMoveWhile(posPrevious, pos, "leftUp", 8, 1)){
		
		return true;
		
	}
	
	if(takingMoveWhile(posPrevious, pos, "leftDown", 8, 1)){
		
		return true;
		
	}
	
	// Pohyb vertikalne a horizontalne
	
	if(takingMoveWhile(posPrevious, pos, "rightUp", 8, 0)){
		
		return true;
		
	}

	if(takingMoveWhile(posPrevious, pos, "rightDown", 8, 0)){
		
		return true;
		
	}
	
	if(takingMoveWhile(posPrevious, pos, "leftUp", 0, 1)){
		
		return true;
		
	}
	
	if(takingMoveWhile(posPrevious, pos, "rightDown", 0, 1)){
		
		return true;
		
	}
	
	return false;
	
}

function kings(posPrevious, pos){ // Kontroluje moznosti pohybu krale
	
	posReset = posPrevious;
	posPrevious = posPrevious - 8;
	
	if(posPrevious == pos){
		
		kingTurn = false;
		return true;
		
	} else {
		
		posPrevious = posReset;
		posPrevious = posPrevious - 8 + 1;
		
		if(posPrevious == pos){
			
			kingTurn = false;
			return true;
			
		} else {
			
			posPrevious = posReset;
			posPrevious = posPrevious + 1;
			
			if(posPrevious == pos){
				
				kingTurn = false;
				return true;
				
			} else {
				
				posPrevious = posReset;
				posPrevious = posPrevious + 8 + 1;
				
				if(posPrevious == pos){
					
					kingTurn = false;
					return true;
					
				} else {
					
					posPrevious = posReset;
					posPrevious = posPrevious + 8;
					
					if(posPrevious == pos){
						
						kingTurn = false;
						return true;
						
					} else {
						
						posPrevious = posReset;
						posPrevious = posPrevious + 8 - 1;
						
						if(posPrevious == pos){
							
							kingTurn = false;
							return true;
							
						} else {
							
							posPrevious = posReset;
							posPrevious = posPrevious - 1;
							
							if(posPrevious == pos){
								
								kingTurn = false;
								return true;
								
							} else {
								
								posPrevious = posReset;
								posPrevious = posPrevious - 8 - 1;
								
								if(posPrevious == pos){
									
									kingTurn = false;
									return true;
									
								} else { // Kontroluje, jestli je mozna rosada
									
									posPrevious = posReset;
									
									if(takingMoveWhileLimit(posPrevious, pos, "rightAndDown", 1, 2)){ // Rosada doprava
										
										posPrevious = posPrevious + 3;
										if(takingMove(pos)) return false;
										cl = document.getElementsByTagName("td")[posPrevious].classList[0];
										
										if(color == "white"){
											
											if(cl == "WR"){
												
												posPrevious = posReset;
												cl = document.getElementsByTagName("td")[posPrevious].classList[0];
												
												if(cl == "WK"){
												
													castling = "right";
													
													return true;
													
												} else {
													
													return false;
													
												}
												
											} else {
												
												return false;
												
											}
											
										} else if(color == "black"){
											
											if(cl == "BR"){
												
												posPrevious = posReset;
												cl = document.getElementsByTagName("td")[posPrevious].classList[0];
												
												if(cl == "BK"){
												
													castling = "right";
													
													return true;
													
												} else {
													
													return false;
													
												}
												
											} else {
												
												return false;
												
											}
											
										}
										
									} else {
										
										posPrevious = posReset;
										
										if(takingMoveWhileLimit(posPrevious, pos, "leftAndUp", 1, 2)){ // Rosada doleva
										
											posPrevious = posPrevious - 4;
											if(takingMove(pos)) return false;
											cl = document.getElementsByTagName("td")[posPrevious].classList[0];
											
											if(color == "white"){
												
												if(cl == "WR"){
													
													posPrevious = posReset;
													cl = document.getElementsByTagName("td")[posPrevious].classList[0];
													
													if(cl == "WK"){
													
														castling = "left";
														
														return true;
														
													} else {
														
														return false
														
													}
													
												} else {
													
													return false;
													
												}
												
											} else if(color == "black"){
												
												if(cl == "BR"){
													
													posPrevious = posReset;
													cl = document.getElementsByTagName("td")[posPrevious].classList[0];
													
													if(cl == "WK"){
													
														castling = "left";
														
														return true;
														
													} else {
														
														return false;
														
													}
													
												} else {
													
													return false;
													
												}
												
											} else {
												
												return false;
												
											}
												
										} else {
											
											return false;
											
										}
										
									}
									
								}
								
							}
							
						}
						
					}
					
				}
				
			}
			
		}
		
	}
	
}

function rooks(posPrevious, pos){ // Kontroluje moznosti pohybu veze
	
	if(takingMoveWhile(posPrevious, pos, "rightUp", 8, 0)){
		
		rookTurn = false;
		return true;
		
	}

	if(takingMoveWhile(posPrevious, pos, "rightDown", 8, 0)){
		
		rookTurn = false;
		return true;
		
	}
	
	if(takingMoveWhile(posPrevious, pos, "leftUp", 0, 1)){
		
		rookTurn = false;
		return true;
		
	}
	
	if(takingMoveWhile(posPrevious, pos, "rightDown", 0, 1)){
		
		rookTurn = false;
		return true;
		
	} else {
		
		return false;
		
	}

}

function bishops(posPrevious, pos){ // Kontroluje moznosti pohybu strelce
	
	if(takingMoveWhile(posPrevious, pos, "rightUp", 8, 1)){
		
		return true;
		
	}

	if(takingMoveWhile(posPrevious, pos, "rightDown", 8, 1)){
		
		return true;
		
	}
	
	if(takingMoveWhile(posPrevious, pos, "leftUp", 8, 1)){
		
		return true;
		
	}
	
	if(takingMoveWhile(posPrevious, pos, "leftDown", 8, 1)){
		
		return true;
		
	}
	
	return false;
	
}

function knights(posPrevious, pos){ // Kontroluje moznosti pohybu koni

	var posReset = posPrevious;
	posPrevious = posPrevious - (8 * 2) + 1;
	
	if(posPrevious == pos){
		
		return true;
		
	} else {
		
		posPrevious = posReset;
		posPrevious = posPrevious - (8 * 2) - 1;
		
		if(posPrevious == pos){
			
			return true;
			
		} else {
			
			posPrevious = posReset;
			posPrevious = posPrevious + (1 * 2) - 8;
			
			if(posPrevious == pos){
				
				return true;
				
			} else {
				
				posPrevious = posReset;
				posPrevious = posPrevious + (1 * 2) + 8;
				
				if(posPrevious == pos){
					
					return true;
					
				} else {
					
					posPrevious = posReset;
					posPrevious = posPrevious + (2 * 8) + 1;
					
					if(posPrevious == pos){
						
						return true;
						
					} else {
						
						posPrevious = posReset;
						posPrevious = posPrevious + (2 * 8) - 1;
					
						if(posPrevious == pos){
							
							return true;
							
						} else {
							
							posPrevious = posReset;
							posPrevious = posPrevious - (1 * 2) - 8;
							
							if(posPrevious == pos){
								
								return true;
								
							} else {
								
								posPrevious = posReset;
								posPrevious = posPrevious - (1 * 2) + 8;
								
								if(posPrevious == pos){
									
									return true;
									
								} else {
									
									return false;
									
								}
								
							}
							
						}
						
					}
					
				}
				
			}
		}
		
	}
	
}

function pawnsBlack(posPrevious, pos){ // Kontroluje moznosti pohybu pesaku
	
	posReset = posPrevious;
	posPrevious += 8;
	
	if(posPrevious == pos){
		
		if(!takingMove(posPrevious)){
			
			if(!checkSide(pos)){

				pawnsTurn = false;
				
				return true;

			} else {

				promotion = true;

				return true;

			}
			
		}
		
	}
	
	posPrevious = posReset;
	posPrevious = posPrevious + 8 + 1;
	
	if(takingMove(posPrevious)){
		
		if(posPrevious == pos){
			
			if(!checkSide(pos)){

				pawnsTurn = false;
				
				return true;

			} else {

				promotion = true;

				return true;

			}
			
		}
		
	}
	
	posPrevious = posReset;
	posPrevious = posPrevious + 8 - 1;
	
	if(takingMove(posPrevious)){
		
		if(posPrevious == pos){

			if(!checkSide(pos)){
		
				pawnsTurn = false;
			
				return true;
		
			} else {

				promotion = true;

				return true;

			}

		}
		
	}

	posPrevious = posReset;
	posPrevious = posPrevious + (8 * 2);
	
	if(pawnsByTwo(posReset)){
		
		posPrevious = posReset;
		
		if(takingMoveWhileLimit(posPrevious, pos, "rightAndDown", 8, 2)){
			
			pawnsTurn = false;
			
			return true;
			
		} else {
			
			return false;
			
		}
		
	} else {
		
		return false;
		
	}
	
}

function pawnsWhite(posPrevious, pos){ // Kontroluje moznosti pohybu pesaku

	posReset = posPrevious;
	posPrevious -= 8;
	
	if(posPrevious == pos){
		
		if(!takingMove(posPrevious)){
			
			if(!checkSide(pos)){

				pawnsTurn = false;
				
				return true;

			} else {

				promotion = true;

				return true;

			}
			
		}
		
	}
	
	posPrevious = posReset;
	posPrevious = posPrevious - 8 + 1;
	
	if(takingMove(posPrevious)){
		
		if(posPrevious == pos){
			
			if(!checkSide(pos)){

				pawnsTurn = false;
				
				return true;

			} else {

				promotion = true;

				return true;

			}
			
		}
		
	}
	
	posPrevious = posReset;
	posPrevious = posPrevious - 8 - 1;
	
	if(takingMove(posPrevious)){
		
		if(posPrevious == pos){

			if(!checkSide(pos)){
		
				pawnsTurn = false;
			
				return true;
		
			} else {

				promotion = true;

				return true;

			}

		}
		
	}
	
	posPrevious = posReset;
	posPrevious = posPrevious - (8 * 2);
	
	if(pawnsByTwo(posReset)){
		
		posPrevious = posReset;
		
		if(takingMoveWhileLimit(posPrevious, pos, "leftAndUp", 8, 2)){
			
			pawnsTurn = false;
			
			return true;
			
		} else {
			
			return false;
			
		}
		
	} else {
		
		return false;
		
	}

}

function controlFigureMovement(posPrevious, pos, posClass){ // Kontroluje jestli neco nestoji v ceste
	
	switch(posClass){
		
		case "WP": // Bily pesak
			
			if(!rotated){

				if(pawnsWhite(posPrevious, pos)){
					
					return true;
					
				} else {
					
					return false;
					
				}
				
			} else {

				if(pawnsBlack(posPrevious, pos)){

					return true;

				} else {

					return false;

				}

			}

		case "WP1": // Bily pesak (byl posunut o 2)
			
			if(!rotated){

				if(pawnsWhite(posPrevious, pos)){
					
					return true;
					
				} else {
					
					return false;
					
				}
				
			} else {

				if(pawnsBlack(posPrevious, pos)){

					return true;

				} else {

					return false;

				}

			}
			
		case "BP": // Cerny pesak
			
			if(!rotated){

				if(pawnsBlack(posPrevious, pos)){
					
					return true;
					
				} else {
					
					return false;
					
				}
				
			} else {

				if(pawnsWhite(posPrevious, pos)){

					return true;

				} else {

					return false;

				}

			}

		case "BP1": // Cerny pesak (byl posunut o 2)
			
			if(!rotated){

				if(pawnsBlack(posPrevious, pos)){
					
					return true;
					
				} else {
					
					return false;
					
				}
				
			} else {

				if(pawnsWhite(posPrevious, pos)){

					return true;

				} else {

					return false;

				}

			}
			
		case "WR": // Bila vez
		
			if(rooks(posPrevious, pos)){
				
				return true;
				
			} else {
				
				return false;
				
			}

		case "WR1": // Bila vez (posunutej)

			if(rooks(posPrevious, pos)){

				return true;

			} else {

				return false;

			}
		
		case "BR": // Cerna vez
		
			if(rooks(posPrevious, pos)){
				
				return true;
				
			} else {
				
				return false;
				
			}

		case "BR1": // Cerna vez (posunutej)

			if(rooks(posPrevious, pos)){

				return true;

			} else {

				return false;

			}
		
		case "WN": // Bily kun
			
			if(knights(posPrevious, pos)){
				
				return true;
				
			} else {
				
				return false;
				
			}
		
		case "BN": // Cerny kun
			
			if(knights(posPrevious, pos)){
				
				return true;
				
			} else {
				
				return false;
				
			}
		
		case "WB": // Bily strelec
			
			if(bishops(posPrevious, pos)){
				
				return true;
				
			} else {
				
				return false;
				
			}
		
		case "BB": // Cerny strelec
		
			if(bishops(posPrevious, pos)){
				
				return true;
				
			} else {
				
				return false;
				
			}
		
		
		case "WK": // Bily kral
		
			if(kings(posPrevious, pos)){
				
				return true;
				
			} else {
				
				return false;
				
			}

		case "WK1": // Bily kral (posunutej)

			if(kings(posPrevious, pos)){

				return true;

			} else {

				return false;

			}

		case "BK": // Cerny kral
		
			if(kings(posPrevious, pos)){
				
				return true;
				
			} else {
				
				return false;
				
			}
		
		case "BK1": // Cerny kral (posunutej)

			if(kings(posPrevious, pos)){

				return true;

			} else {

				return false;

			}

		case "WQ": // Bila dama
		
			if(queens(posPrevious, pos)){
				
				return true;
				
			} else {
				
				return false;
				
			}
		
		case "BQ": // Cerna dama
			
			if(queens(posPrevious, pos)){
				
				return true;
				
			} else {
				
				return false;
				
			}
			
	}
	
}

function action(pos) { // Hlavni funkce,ktera ridi pohyb

	if(playWhenOnLoad){

		if(move){ // Zajistuje jestli si vybiras figurku nabo jestli posouvas
		
			if(takingMove(pos)){ // Kontroluje jestli tam je figurka
			
				move = false;
				posPrevious = pos;
				
			} else {
				
				alert("There isn't a figure here!");
				
			}

		} else {
			//debugger;
			move = true;
			
			posClass = document.getElementsByTagName("td")[posPrevious].classList[0];
			
			if(colorMove(posPrevious)){ // Kontroluje jaka barva hraje
			
				if(colorTaking(pos)){ // Kontroluje jaka barva bere jakou
			
					if(controlFigureMovement(posPrevious, pos, posClass)){ // Kontroluje jestli tam neni neco v ceste

						cl = document.getElementsByTagName("td")[pos].classList;
						
						if(cl.length == 1){ // Kontroluje jestli beru figurku
							
							takenFigureClass = document.getElementsByTagName("td")[pos].classList[0];
							
							if(promotion){

								promotionType = checkPromotionType();

								while(promotionType == false){

									promotionType = checkPromotionType();

								}

								if(color == "white"){

									if(promotionType == "knight"){
									
										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											//
										posNextField.classList.remove(cl);												// Zajistuje premisteni figurky											// Zajistuje premisteni figurky
										posNextField.classList.add("WN");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "bishop"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											//
										posNextField.classList.remove(cl);												// Zajistuje premisteni figurky										// Zajistuje premisteni figurky
										posNextField.classList.add("WB");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "rook"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											//
										posNextField.classList.remove(cl);												// Zajistuje premisteni figurky										// Zajistuje premisteni figurky
										posNextField.classList.add("WR1");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "queen"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											//
										posNextField.classList.remove(cl);												// Zajistuje premisteni figurky										// Zajistuje premisteni figurky
										posNextField.classList.add("WQ");												//
										fieldArray = Array.prototype.slice.call(field);									//

									}

								} else if(color == "black"){

									if(promotionType == "knight"){
									
										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											//
										posNextField.classList.remove(cl);												// Zajistuje premisteni figurky											// Zajistuje premisteni figurky
										posNextField.classList.add("BN");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "bishop"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											//
										posNextField.classList.remove(cl);												// Zajistuje premisteni figurky											// Zajistuje premisteni figurky
										posNextField.classList.add("BB");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "rook"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											//
										posNextField.classList.remove(cl);												// Zajistuje premisteni figurky											// Zajistuje premisteni figurky
										posNextField.classList.add("BR1");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "queen"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											//
										posNextField.classList.remove(cl);												// Zajistuje premisteni figurky										// Zajistuje premisteni figurky
										posNextField.classList.add("BQ");												//
										fieldArray = Array.prototype.slice.call(field);									//

									}

								}

							} else if(pawnsTurn && rookTurn && kingTurn){ // Normalni tah
								
								posField = field[posPrevious];													//
								posNextField = field[pos];														//
								posField.classList.remove(posClass);											//
								posNextField.classList.remove(cl);												// Zajistuje premisteni figurky
								posNextField.classList.add(posClass);											//
								fieldArray = Array.prototype.slice.call(field);									//
							
							} else if(posClass == "WP" || posClass == "BP"){ // Tah poprve pesakem
							
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("WP");										// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("WP1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("BP");										//
									posNextField.classList.remove(cl);										// Zajistuje premisteni figurky
									posNextField.classList.add("BP1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								}

							} else if(posClass == "WP1" || posClass == "BP1"){ // Tah pesakem
								
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("WP1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("BP1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								}
								
							} else if(posClass == "BR" || posClass == "WR"){ // Tah poprve vezi
								
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("WR");										// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("WR1");										//
									fieldArray = Array.prototype.slice.call(field);	                        //
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("BR");										// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("BR1");										//
									fieldArray = Array.prototype.slice.call(field);	
									
								}
								
							} else if(posClass == "BR1" || posClass == "WR1"){ // Tah vezi
								
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("WR1");										//
									fieldArray = Array.prototype.slice.call(field);	                        //
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("BR1");										//
									fieldArray = Array.prototype.slice.call(field);	                        //	
									
								}
								
							} else if(posClass == "BK" || posClass == "WK"){ // Tah poprve kralem
								
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("WK");										// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("WK1");										//
									fieldArray = Array.prototype.slice.call(field);	                        //	
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("BK");										// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("BK1");										//
									fieldArray = Array.prototype.slice.call(field);	// field.slice()                        //	
									
								}
								
							} else if(posClass == "BK1" || posClass == "WK1"){ // Tah kralem
								
								if(color == "white"){
								
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("WK1");										//
									fieldArray = Array.prototype.slice.call(field);	                        //	
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.remove(cl);										// 
									posNextField.classList.add("BK1");										//
									fieldArray = Array.prototype.slice.call(field);	                        //	
									
								}
								
							}
							
							addTakenFiguresImg(takenFigureClass); // Prida obrazek sebrane figurky
						
						} else {
							
							if(promotion){
								
								promotionType = checkPromotionType();

								while(promotionType == false){

									promotionType = checkPromotionType();

								}

								if(color == "white"){

									if(promotionType == "knight"){
									
										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											// Zajistuje premisteni figurky
										posNextField.classList.add("WN");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "bishop"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											// Zajistuje premisteni figurky
										posNextField.classList.add("WB");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "rook"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											// Zajistuje premisteni figurky
										posNextField.classList.add("WR1");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "queen"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											// Zajistuje premisteni figurky
										posNextField.classList.add("WQ");												//
										fieldArray = Array.prototype.slice.call(field);									//

									}

								} else if(color == "black"){

									if(promotionType == "knight"){
									
										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											// Zajistuje premisteni figurky
										posNextField.classList.add("BN");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "bishop"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											// Zajistuje premisteni figurky
										posNextField.classList.add("BB");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "rook"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											// Zajistuje premisteni figurky
										posNextField.classList.add("BR1");												//
										fieldArray = Array.prototype.slice.call(field);									//

									} else if(promotionType == "queen"){

										posField = field[posPrevious];													//
										posNextField = field[pos];														//
										posField.classList.remove(posClass);											// Zajistuje premisteni figurky
										posNextField.classList.add("BQ");												//
										fieldArray = Array.prototype.slice.call(field);									//

									}

								}

							} else if(castling == "right"){
								
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("WK");										//
									posNextField.classList.add("WK1");										//
									//																		   Zajistuje premisteni figurkz
									posField = field[pos + 1];												//
									posNextField = field[posPrevious + 1];									//
									posField.classList.remove("WR");										//
									posNextField.classList.add("WR1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("BK");										//
									posNextField.classList.add("BK1");										//
									//																		   Zajistuje premisteni figurkz
									posField = field[pos + 1];												//
									posNextField = field[posPrevious + 1];									//
									posField.classList.remove("WR");										//
									posNextField.classList.add("WR1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								}
							
							} else if(castling == "left"){
								
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("WK");										//
									posNextField.classList.add("WK1");										//
									//																		   Zajistuje premisteni figurkz
									posField = field[pos - 2];												//
									posNextField = field[posPrevious - 1];									//
									posField.classList.remove("WR");										//
									posNextField.classList.add("WR1");										//
									fieldArray = Array.prototype.slice.call(field);	
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("BK");										//
									posNextField.classList.add("BK1");										//
									//																		   Zajistuje premisteni figurkz
									posField = field[pos - 2];												//
									posNextField = field[posPrevious - 1];									//
									posField.classList.remove("WR");										//
									posNextField.classList.add("WR1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								}
							 
							} else if(pawnsTurn && rookTurn && kingTurn){ // Normalni tah
								
								posField = field[posPrevious];													//
								posNextField = field[pos];														//
								posField.classList.remove(posClass);											// Zajistuje premisteni figurky
								posNextField.classList.add(posClass);											//
								fieldArray = Array.prototype.slice.call(field);									//
								
							} else if(posClass == "WP" || posClass == "BP"){ // Tah poprve pesakem
								
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("WP");   										// Zajistuje premisteni figurky
									posNextField.classList.add("WP1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("BP");										// Zajistuje premisteni figurky
									posNextField.classList.add("BP1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								}
								
							} else if(posClass == "WP1" || posClass == "BP1"){ // Tah pesakem
								
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.add("WP1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.add("BP1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								}
								
							} else if(posClass == "WR" || posClass == "BR"){ // Tah poprve vezi
									
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("WR");										// Zajistuje premisteni figurky
									posNextField.classList.add("WR1");										//
									fieldArray = Array.prototype.slice.call(field);							//
								
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("BR");										// Zajistuje premisteni figurky
									posNextField.classList.add("BR1");										//
									fieldArray = Array.prototype.slice.call(field);							//
								
								}
								
							} else if(posClass == "WR1" || posClass == "BR1"){ // Tah vezi
								
								if(color == "white"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.add("WR1");										//
									fieldArray = Array.prototype.slice.call(field);							//
									
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.add("BR1");										//
									fieldArray = Array.prototype.slice.call(field);							//
								
								}
								
							} else if(posClass == "BK" || posClass == "WK"){ // Tah poprve kralem
								
								if(color == "white"){
								
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("WK");										// Zajistuje premisteni figurky
									posNextField.classList.add("WK1");										//
									fieldArray = Array.prototype.slice.call(field);							//
								
								} else if(color == "black"){
									
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove("BK");										// Zajistuje premisteni figurky
									posNextField.classList.add("BK1");										//
									fieldArray = Array.prototype.slice.call(field);							//
								
								}
								
							} else if(posClass == "BK1" || posClass == "WK1"){ // Tah kralem
								
								if(color == "white"){
								
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.add("WK1");										//
									fieldArray = Array.prototype.slice.call(field);							//
								
								} else if(color == "black"){
								
									posField = field[posPrevious];											//
									posNextField = field[pos];												//
									posField.classList.remove(posClass);									// Zajistuje premisteni figurky
									posNextField.classList.add("BK1");										//
									fieldArray = Array.prototype.slice.call(field);							//
								
								}
								
							}
							
						}
						
						if(color == "white"){ // Pricitani a odecitani casu pro bileho
							
							clearInterval(timeWhitePlaying);
							timeBlackPlaying = setInterval(function(){ time[1] -= 1; timeInit(time); }, 1000);
							
							if(timeInc[0] != undefined){
						
								if(!timeChangePlaying){
									
									time[0] += timeInc[0];
									
								}
								
							}
							color = "black"; // Changed
							
						} else if(color == "black"){ // Pricitani a odecitani casu pro cerneho
							
							clearInterval(timeBlackPlaying);
							timeWhitePlaying = setInterval(function(){ time[0] -= 1; timeInit(time); }, 1000);
							
							if(timeInc[1] != undefined){
							
								time[1] += timeInc[1];
							
							}
							color = "white";
							
						}
						
						pawnsTurn = true;
						rookTurn = true;
						kingTurn = true;
						promotion = false;
						timeChangePlaying = false;
					
					} else {
						
						alert("Invalid move!");
						
					}
				
				} else {
					
					alert("Invalid move!");
					
				}
				
			} else {
				
				alert("It's " + color + " move!");
				
			}

		}
		
	}
		
}