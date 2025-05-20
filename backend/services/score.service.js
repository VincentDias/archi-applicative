/**
 * Service qui gère les alignements dans le jeu et le score
 */

/** Dans ce jeu, on gagne des points en alignant des pions :
 * 3 pions alignés = 1 point
 * 4 pions alignés = 2 points
 */
const POINTS = {
  TROIS_ALIGNES: 1,
  QUATRE_ALIGNES: 2,
};

// Directions de vérification des alignements
const DIRECTIONS = [
  { ligne: 0, colonne: 1 }, // droite
  { ligne: 1, colonne: 0 }, // bas
  { ligne: 1, colonne: 1 }, // diagonale bas-droite
  { ligne: 1, colonne: -1 }, // diagonale bas-gauche
];

const ScoreService = {

  // Compte le nombre de pions alignés dans une direction
  compterAlignement(grid, joueur, ligne, colonne, direction) {
    let compte = 1; // On compte le pion qu'on vient de placer
    console.log(
      `Vérification des alignements pour ${joueur} en [${ligne},${colonne}]`,
    );

    // Vérifie dans les deux sens de la direction
    for (let sens of [-1, 1]) {
      for (let distance = 1; distance <= 4; distance++) {
        const nouvelleLigne = ligne + direction.ligne * sens * distance;
        const nouvelleColonne = colonne + direction.colonne * sens * distance;

        // Si ce n'est pas un pion du joueur, on arrête
        if (
          grid[nouvelleLigne][nouvelleColonne].owner !== joueur
        ) {
          console.log(`Arrêt à [${nouvelleLigne},${nouvelleColonne}]`);
          break;
        }
        compte++;
        console.log(
          `Pion trouvé en [${nouvelleLigne},${nouvelleColonne}] - Total: ${compte}`,
        );
      }
    }

    console.log(`Nombre total de pions alignés: ${compte}`);
    return compte;
  },

  // Calcule les points gagnés après le placement d'un pion
  calculerScore(grid, joueur, ligne, colonne) {
    let pointsGagnes = 0;
    console.log(`Calcul des points pour ${joueur} en [${ligne},${colonne}]`);

    for (let direction of DIRECTIONS) {
      const alignement = this.compterAlignement(
        grid,
        joueur,
        ligne,
        colonne,
        direction,
      );

      if (alignement >= 4) {
        pointsGagnes += POINTS.QUATRE_ALIGNES;
        console.log(`4 pions alignés: +${POINTS.QUATRE_ALIGNES} points`);
      } else if (alignement === 3) {
        pointsGagnes += POINTS.TROIS_ALIGNES;
        console.log(`3 pions alignés: +${POINTS.TROIS_ALIGNES} point`);
      }
    }

    console.log(`Points gagnés au total: ${pointsGagnes}`);
    return pointsGagnes;
  },

  // Met à jour le score d'un joueur
  mettreAJourScore(gameState, joueur, pointsGagnes) {
    if (!gameState.score) {
      gameState.score = {};
      console.log(`Initialisation du score pour ${joueur}`);
    }

    const ancienScore = gameState.score[joueur] || 0;
    gameState.score[joueur] = ancienScore + pointsGagnes;
    console.log(
      `Score ${joueur}: ${ancienScore} + ${pointsGagnes} = ${gameState.score[joueur]}`,
    );
  },

  // Diminue le nombre de pions restants pour un joueur
  diminuerPionsRestants(gameState, joueur) {
    if (!gameState.pawnsRemaining) {
      gameState.pawnsRemaining = {};
      console.log(`Initialisation des pions pour ${joueur}`);
    }

    const ancienNombre = gameState.pawnsRemaining[joueur] || 12;
    gameState.pawnsRemaining[joueur] = ancienNombre - 1;
    console.log(
      `Pions restants ${joueur}: ${ancienNombre} -> ${gameState.pawnsRemaining[joueur]}`,
    );
  },

  // Vérifie si un joueur a gagné la partie
  verifierGagnant(gameState) {
    const joueur1 = "player:1";
    const joueur2 = "player:2";

    console.log("État de la partie:");
    console.log(
      `${joueur1}: ${gameState.pawnsRemaining[joueur1]} pions, score: ${gameState.score[joueur1]}`,
    );
    console.log(
      `${joueur2}: ${gameState.pawnsRemaining[joueur2]} pions, score: ${gameState.score[joueur2]}`,
    );

    if (
      gameState.pawnsRemaining[joueur1] === 0 ||
      gameState.pawnsRemaining[joueur2] === 0
    ) {
      const gagnant =
        gameState.score[joueur1] > gameState.score[joueur2] ? joueur1 : joueur2;
      console.log(`Gagnant: ${gagnant}`);
      return gagnant;
    }

    console.log("Pas encore de gagnant");
    return null;
  },
};

module.exports = ScoreService;
