const sequelize = require('./index');
const User = require('./User');
const Game = require('./Game');

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
    
    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ alter: true });
    console.log('Base de données synchronisée avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
};

module.exports = initDatabase; 