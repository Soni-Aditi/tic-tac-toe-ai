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