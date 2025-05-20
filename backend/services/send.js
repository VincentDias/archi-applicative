const SendService = {
  forPlayer: {
    gameViewState(playerId, game) {
      return {
        gameState: game.gameState,
        playerId: playerId,
      };
    },

    gameTimer(playerId, gameState) {
      return {
        timer: gameState.timer,
        currentTurn: gameState.currentTurn,
      };
    },

    deckViewState(playerId, gameState) {
      return {
        dices: gameState.deck.dices,
        rollsCounter: gameState.deck.rollsCounter,
        rollsMaximum: gameState.deck.rollsMaximum,
      };
    },

    choicesViewState(playerId, gameState) {
      return {
        availableChoices: gameState.choices.availableChoices,
        idSelectedChoice: gameState.choices.idSelectedChoice,
      };
    },

    gridViewState(playerId, gameState) {
      return {
        grid: gameState.grid,
      };
    },

    playerAndOppnonentInfosState(playerId, gameState) {
      return {
        score: gameState.score,
        pawnsRemaining: gameState.pawnsRemaining,
      };
    },

    viewQueueState() {
      return {
        inQueue: true,
      };
    },
  },
};

module.exports = SendService;
