# Documentation du Projet Node.js avec MongoDB

Ce projet est une application Node.js avec une base de données MongoDB pour la gestion des utilisateurs et l'authentification. Il expose une API pour l'inscription, la connexion et l'accès à des routes protégées via JWT.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre système :

- Node.js (version 20) 
  - Utiliser nvm pour switcher facilement de version node
- MongoDB (et une instance MongoDB en cours d'exécution)

## Installation

1. Clonez ce dépôt sur votre machine locale :
   ``git clone https://github.com/emmanuel-storm/Nodejs_mangoDB.git``

2. Installez les dépendances à l'aide de npm : ``npm install``
## Configuration

Avant de lancer l'application, assurez-vous de configurer correctement vos variables d'environnement. Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

```.dotenv
PORT=3000
MONGODB_URI=mongodb://localhost:27017/votre-base-de-donnees
SECRET_KEY=votreclésecrete
JWT_SECRET_KEY=votreclésecretepourJWT
```

## Utilisation

Pour démarrer l'application en mode développement, exécutez la commande suivante : ``npm run dev``

L'application sera accessible à l'adresse `http://localhost:3000/api/public`.

## Tests

Pour exécuter les tests, utilisez la commande : ``npm run test``

## Endpoints

Voici la liste des endpoints disponibles dans l'API :

- `POST /api/signup` : Inscription d'un nouvel utilisateur
- `POST /api/login` : Connexion d'un utilisateur et récupération du JWT
- `GET /api/public` : Accès à une route publique
- `GET /api/protected` : Accès à une route protégée nécessitant le JWT
- `GET /api/users` : Accès à la liste de tous les users 
- `PUT /api/users/:id` : Modification d'un users
- `DELETE /api/users/:id` : Suppression d'un utilisateur 

Assurez-vous de consulter la documentation Swagger à l'adresse `http://localhost:3000/api-docs` pour plus de détails sur les endpoints, les paramètres attendus, les réponses, etc.

## Structure du Projet

Le projet suit une structure typique d'application Node.js avec les dossiers et fichiers suivants :

- `controllers/` : Contient les contrôleurs qui gèrent la logique métier pour chaque endpoint.
- `middleware/` : Contient les middlewares utilisés pour la gestion de l'authentification.
- `models/` : Contient les schémas de données MongoDB définis à l'aide de Mongoose.
- `routes/` : Contient les routes de l'API définies à l'aide d'Express.js.
- `helpers/` : Contient des fonctions utilitaires utilisées dans l'application.
- `tests/` : Contient les tests unitaires, fonctionnels et e2e.

## Endpoints

Voici la liste des endpoints disponibles dans l'API :

- POST /api/signup : Inscription d'un nouvel utilisateur
- POST /api/login : Connexion d'un utilisateur et récupération du JWT
- GET /api/public : Accès à une route publique
- GET /api/protected : Accès à une route protégée nécessitant le JWT

Assurez-vous de consulter la documentation Swagger à l'adresse http://localhost:3000/api-docs pour plus de détails sur les endpoints, les paramètres attendus, les réponses, etc.

## Gestion des Erreurs

Les erreurs sont gérées de manière efficace dans l'application grâce à l'utilisation de middlewares personnalisés. Les erreurs sont logguées dans des fichiers de logs pour faciliter le débogage.

## Couche DTO (Data Transfer Object)

Une couche DTO est utilisée dans l'application pour présenter uniquement les données demandées par le client. Cela permet de contrôler les données exposées via l'API et de prévenir la divulgation d'informations sensibles.

## Génération de l'APIDoc Swagger

La documentation Swagger pour l'API est générée automatiquement à l'aide du package `swagger-ui-express`. Pour accéder à la documentation Swagger, lancez l'application et ouvrez votre navigateur à l'adresse `http://localhost:3000/api-docs`.
Pas accessible car j'ai eu des erreurs à la fin du developpement mais tous les fichiers y sont ainsi que la ligne de code 
où j'utilise swagger dans mon index.js mais commentée.
