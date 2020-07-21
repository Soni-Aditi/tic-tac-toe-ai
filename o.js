import board from './board.mjs'
import Players from './players.mjs'
var initial_board;
var human;
var ai;
var rdepth;
var maxdepth =-1;
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
//UNSTOPABLE timer going on after the first move
  //timer things

  /*function hasClass(el, className) {
	if (el.classList)
	  return el.classList.contains(className);
	else
	  return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }

  function addClass(el, className) {
	if (el.classList)
	  el.classList.add(className);
	else if (!hasClass(el, className)) el.className += " " + className;
  }
  function removeClass(el, className) {
	if (el.classList)
	  el.classList.remove(className);
	else if (hasClass(el, className)) {
	  var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	  el.className=el.className.replace(reg, ' ');
	}
  }
  document.getElementById("newGame").addEventListener("click", startGame);

  document.getElementById("depth").addEventListener("click", (event) => {
	if(event.target.tagName !== "LI" || hasClass(event.target, 'active')) return
	let depth_choices = [...document.getElementById("depth").children[0].children];
	depth_choices.forEach((choice) => {
		removeClass(choice, 'active');
	});
	addClass(event.target, 'active');
	rdepth = event.target.dataset.value;
	console.log(rdepth)
}, false);*/




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

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;




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
	document.getElementById("app").style.display="none";
}
function onTimesUp() {
	clearInterval(timerInterval);
	resetTimer();
	time_up();
}

function startTimer() {
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

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

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

  function startGame() {
	

	document.querySelector('.endgame').style.display = "none";
	document.querySelector('.endgame .text').innerText ="";
	document.querySelector('.selectSym').style.display = "block";
	for (let i = 0; i < cells.length; i++) {
	  cells[i].innerText = '';
	  cells[i].style.removeProperty('background-color');
	}
  }


  function gameOver(gameWon) {
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

document.getElementById("Replay").addEventListener('click', startGame);
//document.querySelector('').
function turnClick(square) {
	if (typeof initial_board.state[square.target.id] == 'number') {
		turn(square.target.id, human.svar);
		if (!initial_board.checkWin(human.svar) &&!checkTie(initial_board)) turn(bestSpot(ai.svar), ai.svar);
	}
}
////////////////MIGHT DELETE LATER

function bestSpot(player) {
	if (player==ai.svar)
	{
		return minimax(initial_board, ai.svar).index;
	}
	else if (player==human.svar){
		return minimax(initial_board,-Infinity,-Infinity, human.svar).index;
	}
}

function minimax(initial_board, player,alpha,beta,depth=0) {
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
			alpha=Math.max(alpha,bestScore);
			if(beta<=alpha){
				break;
			}
		}
	} else {
		var bestScore = Infinity;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
			beta=Math.min(beta,bestScore);
			if(beta<=alpha){
				break;
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
	else if(player==ai.svar){
		startTimer();
	}
	else if (player==human.svar){
		
		stopTimer();
	}
}


function declareWinner(who) {

	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}


function checkTie(board) {
    if (board.emptySquares().length == 0) {
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
