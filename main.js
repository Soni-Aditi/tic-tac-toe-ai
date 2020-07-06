
class Board{
    constructor(state
    
        ){this.state=state;}

    getstate(){
      return this.state;
    }
    
    isfull(){
        let free_space=0;
        for(let i=0;i<3;i++){
            for(let j =0;j<3;j++){
                if(state[i][j]==''){
                    free_space++;
                }
            }
        }
    if(free_space==9){
        return True;
    }
  }
    //eqaulity
    equals3(a, b, c) {
        return a == b && b == c && a != '';
      }

    emptySquares() {
        return this.state.filter(s => typeof s == 'number');
      }
    winnercheck(Player){
        if(!this.isfull()){
            return False
        }
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


        let winner=null;
        //horizontal

      let plays = this.state.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
      let gameWon = null;
      for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
          gameWon = {index: index, player: player};
          break;
        }
      }
      return gameWon;
/*  for (let i = 0; i < 3; i++) {
            if (this.equals3(this.state[i][0],this.state[i][1],this.state[i][2])) 
              winner={'winner':this.state[i][0] ,'direction': 'Horizontal','num':i};
            }
          
          

        //vertical
        for (let i = 0; i < 3; i++) {
            if (this.equals3(this.state[0][i], this.state[1][i], this.state[2][i])) {
              winner={'winner':this.state[0][i] , 'direction':'Vertical','num':i};
            }
          }

          //diagnal
          if (this.equals3(this.state[0][0], this.state[1][1], this.state[2][2])) {
            winner={'winner':this.state[0][0], 'direction':'Diagnal','num':1};
        }
          if (this.equals3(this.state[2][0], this.state[1][1], this.state[0][2])) {
            winner={'winner':this.state[2][0], 'direction':'Diagnal','num':2};
          }
        if (winner==null && isfull()){
            return {'winner' : 'tie'}
        }
        else{
            return winner;
        }""" */


    }
    
    
    


    }//class

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

function startGame() {
    document.querySelector(".endgame").style.display = "none";
   
	let b= Array.from(Array(9).keys());
	initial_board=new Board(b);
    //human=new Players('O');
   // ai=new Players('X');
    console.log(initial_board.getstate());

    	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}
/*
function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
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
