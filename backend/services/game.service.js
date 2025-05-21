const init = require("./init");
const timer = require("./timer");
const dices = require("./dices");
const send = require("./send");
const choices = require("./choices");
const grid = require("./grid");
const tokens = require("./tokens");
const score = require("./score");
const utils = require("./utils");
const win = require("./win");

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
  win,
};

module.exports = GameService;
