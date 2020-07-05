import board from './board.mjs'
import players from './Players.mjs'
var initial_board;
var human;
var ai;
human=new players('O');
ai=new players('X');
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ]


const cells = document.querySelectorAll('.cell');
//call start game
startGame();
function startGame() {
    document.querySelector(".endgame").style.display = "none";
   
	let b= Array.from(Array(9).keys());
	initial_board=new board(b);
 
   
        console.log(human.getsvar());
    	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if (typeof initial_board.state[square.target.id] == 'number') {
		turn(square.target.id, human.svar);
		if (!checkTie(initial_board)) turn(initial_board.bestSpot(), ai.svar);
	}
}



function turn(squareId, player) {
	initial_board.state[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon =initial_board.winnercheck(player);
	if (gameWon) gameOver(gameWon)
}




function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == human.svar? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
    declareWinner(gameWon.player == human.svar ? "You win!" : "You lose.");
}
function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function checkTie(board) {
    if (board.emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}
/*function turnClick(square) {
	if (typeof initial_board.state[square.target.id] == 'number') {
		turn(square.target.id, human.svar)
		if (!initial_board.checkWin( human.svar) && !checkTie()) turn(bestSpot(),ai.svar);
	}
}///////////////jjjj

function turn(squareId, player) {
	initial_board.state[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon =initial_board.winnercheck();
	if (gameWon) gameOver(gameWon)
}

function gameOver(gameWon, Player) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == Player.getsvar() ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == human.getsvar() ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}


function checkTie(board) {
	if (board.emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}*/
