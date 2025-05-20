const UtilsService = {
  findGameIndexById(games, gameId) {
    return games.findIndex((game) => game.idGame === gameId);
  },

  findGameIndexBySocketId(games, socketId) {
    return games.findIndex((game) => game.player1Socket.id === socketId || game.player2Socket.id === socketId);
  },

  findDiceIndexByDiceId(dices, diceId) {
    return dices.findIndex((dice) => dice.id === diceId);
  },
};

module.exports = UtilsService;
