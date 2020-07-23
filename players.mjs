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



}//class