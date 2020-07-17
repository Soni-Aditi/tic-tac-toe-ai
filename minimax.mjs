
export function bestSpot(origBoard,player,huPlayer) {
	return minimax(origBoard, player,huPlayer,aiPlayer).index;
}


export function minimax(newBoard, player,huPlayer,aiPlayer) {
	var availSpots = newBoard.emptySquares();

	if (newBoard.checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (newBoard.checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard.state[availSpots[i]];
		newBoard.state[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer,huPlayer,aiPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer,huPlayer,aiPlayer);
			move.score = result.score;
		}

		newBoard.state[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
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