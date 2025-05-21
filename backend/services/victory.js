const init = require("./init");

const victory = {
  checkVictory: (gameState) => {
    // Vérifier si un joueur a atteint le score maximum
    if (gameState.player1Score >= init.WINNING_SCORE() || gameState.player2Score >= init.WINNING_SCORE()) {
      return gameState.player1Score > gameState.player2Score ? "player:1" : "player:2";
    }

    // Vérifier si tous les pions ont été utilisés
    if (gameState.pawnsRemaining["player:1"] === 0 || gameState.pawnsRemaining["player:2"] === 0) {
      return gameState.player1Score > gameState.player2Score ? "player:1" : "player:2";
    }

    return null;
  },

  announceVictory: (gameState, winner) => {
    gameState.gameEndTime = Date.now();
    gameState.winner = winner;
    return {
      winner: winner,
      player1Score: gameState.player1Score,
      player2Score: gameState.player2Score,
      gameDuration: gameState.gameEndTime - gameState.gameStartTime,
    };
  },
};

module.exports = victory;
