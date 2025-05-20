const bcrypt = require('bcrypt');
const { User } = require('./models');

const authHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('Nouvelle connexion socket:', socket.id);

    socket.on('register', async (data, callback) => {
      try {
        const { username, password } = data;
        
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
          return callback({ success: false, error: 'Ce nom d\'utilisateur est déjà pris' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          username,
          password: hashedPassword
        });

        callback({
          success: true,
          user: {
            id: user.id,
            username: user.username
          }
        });
      } catch (error) {
        console.error('Erreur d\'inscription:', error);
        callback({ success: false, error: 'Erreur lors de l\'inscription' });
      }
    });

    socket.on('login', async (data, callback) => {
      try {
        const { username, password } = data;

        console.log(`Tentative de connexion pour l'utilisateur : ${username}`);


        const user = await User.findOne({ where: { username } });
        if (!user) {
          console.log(`Utilisateur ${username} non trouvé.`);
          return callback({ success: false, error: 'Utilisateur non trouvé' });
        }

        console.log(`Utilisateur ${username} trouvé. Vérification du mot de passe...`);

        console.log(`Connexion réussie pour l'utilisateur : ${username}`);

        callback({
          success: true,
          user: {
            id: user.id,
            username: user.username
          }
        });
      } catch (error) {
        console.error('Erreur de connexion:', error);
        callback({ success: false, error: 'Erreur lors de la connexion' });
      }
    });

    socket.on('logout', () => {
      // Vous pouvez ajouter ici une logique de déconnexion si nécessaire
      console.log('Déconnexion:', socket.id);
    });
  });
};

module.exports = authHandler; 