# Yams avec Socket.IO

## Prérequis

- Docker et Docker Compose installés
- Git

## Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
cd yams-with-socket-io
```

2. Configuration des variables d'environnement :
   - Créer un fichier `.env` à la racine du projet avec les variables suivantes :
   ```
   # Configuration de la base de données
   DB_NAME=yams
   DB_USER=le_v
   DB_PASSWORD=le_p
   DB_HOST=postgres
   DB_PORT=5432

   # Configuration du serveur
   PORT=3000
   ```

3. Lancer tous les services avec Docker Compose :
```bash
docker-compose up --build
```

## Accès aux services

Une fois les conteneurs lancés, vous pouvez accéder à :
- Frontend (Expo) : http://localhost:8081 (interface web)
  - Pour le développement mobile : utilisez l'application Expo Go sur votre téléphone
  - Pour le développement web : http://localhost:8081
- Backend : http://localhost:3000
- Base de données PostgreSQL : localhost:5432

## Structure du projet

```
.
├── app/                    # Application frontend (Expo)
├── backend/               # Serveur backend
│   ├── models/           # Modèles de base de données
│   ├── routes/           # Routes API
│   ├── middleware/       # Middleware
│   └── services/         # Services
├── docker-compose.yml    # Configuration Docker
├── Dockerfile.frontend   # Configuration du frontend
└── .env                  # Variables d'environnement
```

## Services Docker

- **PostgreSQL** : Base de données
  - Port : 5432
  - Base de données : yams
  - Utilisateur : le_v
  - Mot de passe : le_p

- **Backend** : Serveur Node.js
  - Port : 3000
  - API REST
  - Socket.IO pour la communication en temps réel

- **Frontend** : Application Expo
  - Ports : 19000, 19001, 19002, 8081
  - Interface web : http://localhost:8081
  - Hot-reload activé grâce aux volumes Docker

## Commandes utiles

- Démarrer tous les services :
```bash
docker-compose up --build
```

- Démarrer en arrière-plan :
```bash
docker-compose up -d
```

- Arrêter les conteneurs :
```bash
docker-compose down
```

- Voir les logs :
```bash
docker-compose logs -f
```

- Modifiez les identifiants de la base de données pour votre environnement

# Socket IO Example

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

This example shows how to connect and interact with socket-io backends.

## 🚀 How to use

### Running the app

- Run `yarn` or `npm install`
- Open `App.js` and change the `socketEndpoint` at the top of the file to point to your endpoint.
- Open `app` with `yarn start` or `npm run start` to try it out.

### Running the server

- `cd` into the `backend` directory and run `yarn` or `npm install`, then run `yarn start` or `npm run start`
- Install [ngrok](https://ngrok.com/download) and run `ngrok http 3000` and copy the https url that looks something like this `https://f7333e87.ngrok.io`.

## 📝 Notes

React Native provides a socket-io compatible WebSocket implementation, some people get tripped up on the https requirement so this example helps to clarify how you can get it running.
