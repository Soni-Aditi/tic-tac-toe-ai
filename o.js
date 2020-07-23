import board from './board.mjs'
import Players from './players.mjs'
var initial_board;
var human;
var ai;
var rdepth;
var maxdepth =-1;
var human_choice;
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




//event handler cells
const cells = document.querySelectorAll('.cell');
//call start game
startGame();
/////timer
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 7;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;



//event handler :timer
document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;
function time_up(){
	document.getElementById("s_move").style.display="none";
	for (var i = 0; i < cells.length; i++) {
		cells[i].style.backgroundColor = "green";
		cells[i].removeEventListener('click', turnClick, false);
	}
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = "GAME OVER";
}
function resetTimer(){
	
	timePassed=0;
	 timeLeft = TIME_LIMIT;
	timerInterval = null;
	remainingPathColor = COLOR_CODES.info.color;
}
function stopTimer()
{
	clearInterval(timerInterval);
	resetTimer();
	document.getElementById("app").style.display="none";
}
function onTimesUp() {
	clearInterval(timerInterval);
	resetTimer();
	time_up();
}

function startTimer() {
	document.getElementById("s_move").style.display = "none";
	document.getElementById("app").style.display="block";
	
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
	timeLeft = TIME_LIMIT - timePassed;
	if (timeLeft <= 0) {
		onTimesUp();
	  }
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);


  }, 1000);
}
//second conversion
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
//
function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
	//MAIN  FUNCtion of the game
  function startGame() {
	document.getElementById("s_move").style.display="none";

	document.querySelector('.endgame').style.display = "none";
	document.querySelector('.endgame .text').innerText ="";
	document.querySelector('.selectSym').style.display = "block";
	for (let i = 0; i < cells.length; i++) {
	  cells[i].innerText = '';
	  cells[i].style.removeProperty('background-color');
	}
  }


  function gameOver(gameWon) {
	document.getElementById("s_move").style.display="none";
	clearInterval(timerInterval);
	resetTimer();
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == human.svar? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	
    declareWinner(gameWon.player == human.svar ? "You win!" : "You lose.");
}
//if user selects O
function symo(){
	
	human=new Players('O');
	ai=new Players('X');
	
	let origBoard = Array.from(Array(9).keys());
	initial_board=new board(origBoard);
	for (let i = 0; i < cells.length; i++) {
	  cells[i].addEventListener('click', turnClick, false);
	}
	
	  
	
	document.querySelector('.selectSym').style.display = "none";
  }
  //button event handler
  document.getElementById("so").addEventListener('click', symo);
//if user selects X
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
//button event handler
  document.getElementById("sx").addEventListener('click', symx);
//replay button event handler


document.getElementById("Replay").addEventListener('click', startGame);


function turnClick(square) {
	document.getElementById("s_move").style.display="none";
	if (typeof initial_board.state[square.target.id] == 'number') {
		
		stopTimer();
		//document.getElementById("s_move").style.display = "none";
		turn(square.target.id, human.svar);
		if (!initial_board.checkWin(human.svar) &&!checkTie(initial_board)) {
			turn(bestSpot(ai.svar), ai.svar);
			document.getElementById("s_move").style.display = "block";
			document.getElementById("s_move").innerHTML=`<p class="pc" id="oho" >Hooman you better move to <span id="suggest_move_label" class="suggest-move_lable" style="color:blue"> ${human_choice}</span> block if you wanna win </p> `;
			human_choice=bestSpot(human.svar); 
			human_choice=human_choice+1;
			document.getElementById("suggest_move_label").innerHTML =human_choice;
			//sugest move

		}
	}
}
//to call the minimax
function bestSpot(player) {
	if (player==ai.svar)
	{
		return minimax(initial_board,ai.svar).index;
	}
	else if (player==human.svar){
		return minimax(initial_board, human.svar).index;
	}
}
//MINIMAX WITH ALPHA BETHA PRUNING
function minimax(initial_board, player,depth=0) {
	var availSpots = initial_board.emptySquares();
	
	if (initial_board.checkWin( human.svar)||depth==rdepth) {
		return {score: -10};
	} else if (initial_board.checkWin( ai.svar) || depth==rdepth) {
		return {score: 10};
	} else if (availSpots.length === 0 ) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = initial_board.state[availSpots[i]];
		initial_board.state[availSpots[i]] = player;

		if (player == ai.svar) {
			var result = minimax(initial_board, human.svar,depth+1);
			move.score = result.score;
		} else {
			var result = minimax(initial_board, ai.svar,depth+1);
			move.score = result.score;
		}

		initial_board.state[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === ai.svar) {
		var bestScore = -Infinity;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}

		}
	} else {
		var bestScore = Infinity;
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
	if (gameWon) {document.getElementById("s_move").style.display="none";
		gameOver(gameWon)}
	else if(player==ai.svar){
		startTimer();
	}
	else if (player==human.svar){
		
		stopTimer();
	}
}


function declareWinner(who) {
	document.getElementById("s_move").style.display="none";
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}


function checkTie(board) {
    if (board.emptySquares().length == 0) {
		document.getElementById("s_move").style.display="none";
		clearInterval(timerInterval);
		resetTimer();
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}
