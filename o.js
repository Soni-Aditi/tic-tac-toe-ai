import board from './board.mjs'
import Players from './players.mjs'
var initial_board;
var human;
var ai;

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
	document.querySelector('.endgame').style.display = "none";
	document.querySelector('.endgame .text').innerText ="";
	document.querySelector('.selectSym').style.display = "block";
	for (let i = 0; i < cells.length; i++) {
	  cells[i].innerText = '';
	  cells[i].style.removeProperty('background-color');
	}
  }
function symo(){
	
	human=new Players('O');
	ai=new Players('X');
	
	let origBoard = Array.from(Array(9).keys());
	initial_board=new board(origBoard);
	for (let i = 0; i < cells.length; i++) {
	  cells[i].addEventListener('click', turnClick, false);
	}
	
	  turn(bestSpot(),ai.svar);
	
	document.querySelector('.selectSym').style.display = "none";
  }
  document.getElementById("so").addEventListener('click', symo);

  function symx(){
	
	human=new Players('X');
	ai=new Players('O');
	
	let origBoard = Array.from(Array(9).keys());
	initial_board=new board(origBoard);
	for (let i = 0; i < cells.length; i++) {
	  cells[i].addEventListener('click', turnClick, false);
	}
	
	  
	
	document.querySelector('.selectSym').style.display = "none";
  }
  document.getElementById("sx").addEventListener('click', symx);

/*function startGame() {
    document.querySelector(".endgame").style.display = "none";
   
	let b= Array.from(Array(9).keys());
	initial_board=new board(b);
 
   
        
    	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}*/
document.getElementById("Replay").addEventListener('click', startGame);
//document.querySelector('').
function turnClick(square) {
	if (typeof initial_board.state[square.target.id] == 'number') {
		turn(square.target.id, human.svar);
		if (!initial_board.checkWin(human.svar) &&!checkTie(initial_board)) turn(bestSpot(), ai.svar);
	}
}
////////////////MIGHT DELETE LATER

function bestSpot() {
	return minimax(initial_board, ai.svar).index;
}
function minimax(initial_board, player) {
	var availSpots = initial_board.emptySquares();

	if (initial_board.checkWin( human.svar)) {
		return {score: -10};
	} else if (initial_board.checkWin( ai.svar)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = initial_board.state[availSpots[i]];
		initial_board.state[availSpots[i]] = player;

		if (player == ai.svar) {
			var result = minimax(initial_board, human.svar);
			move.score = result.score;
		} else {
			var result = minimax(initial_board, ai.svar);
			move.score = result.score;
		}

		initial_board.state[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === ai.svar) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}






function turn(squareId, player) {
	initial_board.state[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon =initial_board.checkWin(player);
	//comment
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
