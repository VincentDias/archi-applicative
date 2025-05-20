const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { pseudo, email, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ 
      where: { 
        [sequelize.Op.or]: [{ email }, { pseudo }] 
      } 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email ou pseudo déjà utilisé' });
    }

    // Créer le nouvel utilisateur
    const user = await User.create({
      pseudo,
      email,
      password
    });

    // Générer le token
    const token = jwt.sign(
      { id: user.id, pseudo: user.pseudo },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { pseudo, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ where: { pseudo } });
    if (!user) {
      return res.status(401).json({ message: 'Pseudo ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Pseudo ou mot de passe incorrect' });
    }

    // Générer le token
    const token = jwt.sign(
      { id: user.id, pseudo: user.pseudo },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
});

module.exports = router; 