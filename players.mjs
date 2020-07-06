import board from './board.mjs'



export default class Players{
constructor(svar,max_depth=-1,score={ x:100,o:-100,tie:0}){
    this.max_depth=max_depth;
    this.svar=svar;
    this.score=score;
}

getsvar(){
    return this.svar;
}


//minimax
 //single player
 bestSpot(initial_board,player) {
	return this.minimax(initial_board, player).index;
}
minimax(board,player,depth=0 , ismaximizing=true){
    var empty_spots=board.emptySquares();
    //bleh
    if (empty_spots.length !==0){
        if(player=='O' && board.winnercheck(player)){
            return {score: -10+depth};}//pass only the character
        else if(player=='X' && board.winnercheck(player)){
            return {score: 10+depth};
        }
        
    }
    else{
        return {score:0};//recheck
    }

    //heuristic vlues
    //currently its maximizing
    
    var moves = [];
	for (var i = 0; i < empty_spots.length; i++) {
		var move = {};
		move.index = board.state[empty_spots[i]];
		board.state[empty_spots[i]]= player;

		if (player == 'X') {
			var result = this.minimax(board, 'O',depth+1,false);
			move.score = result.score;
		} else {
			var result = this.minimax(board, 'X',depth+1,true);
			move.score = result.score;
		}

		board.state[empty_spots[i]]= move.index;

		moves.push(move);
    }
    



    	var bestMove;
	if(player === 'X') {
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


 /*bestScore(thatboard ,depth,isMaximizing){
     //heuristic val
    var spots=emptySquares();
    if(thatboard.winnercheck(this)){
        return 
    }
    //humanplayer
     if(isMaximizing){
         let bestScore = -Infinity;
         for (let i = 0; i < 3; i++) {
             for (let j = 0; j < 3; j++) {
                 //check for available spot
                 if(board[i][j]==''){
                    board[i][j] =ai;//check agaun
                    let temp_score=minimax(board,depth+1,false);
                    board[i][j] = '';
                    bestScore=max(temp_score,bestScore);

                 }
             }
         }
         return bestScore;}
    
         else{
             if(!isMaximizing){
                 let bestScore=Infinity;
                 for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        //check for available spot
                        if(board[i][j]==''){
                           board[i][j] =human;//check agaun
                           let temp_score=minimax(board,depth+1,true);
                           board[i][j] = '';
                           bestScore=max(temp_score,bestScore);
       
                        }
                    }
                }
                return bestScore;}
             }
         }


    */



}//class