const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isWinner: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Définir la relation
Game.belongsTo(User);
User.hasMany(Game);

module.exports = Game; 