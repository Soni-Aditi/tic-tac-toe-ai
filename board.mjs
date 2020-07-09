
export default class board{
  constructor(state= Array.from(Array(9).keys())
  
      ){this.state=state;}

  getstate(){
    return this.state;
  }

  emptySquares() {
   // console.log(this.state.filter(s => typeof s == 'number'));
      return this.state.filter(s => typeof s == 'number');
    }

 checkWin( player) {
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

      let plays =this.state.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
      let gameWon = null;
      for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
          gameWon = {index: index, player: player};
          break;
        }
      }
      return gameWon;
    }
    










    winnercheck(player){
  
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

  }


}//class