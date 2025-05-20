const init = require("./gameServices/init");
const timer = require("./gameServices/timer");
const dices = require("./gameServices/dices");
const send = require("./gameServices/send");
const choices = require("./gameServices/choices");
const grid = require("./gameServices/grid");
const tokens = require("./gameServices/tokens");
const score = require("./gameServices/score");
const utils = require("./gameServices/utils");

const GameService = {
  init,
  timer,
  dices,
  send,
  choices,
  grid,
  tokens,
  score,
  utils,
};

module.exports = GameService;