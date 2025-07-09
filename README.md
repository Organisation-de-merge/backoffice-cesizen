# CESIZEN Backoffice - Guide d'Installation

## Description

Interface d'administration (backoffice) pour la plateforme CESIZEN, développée avec React 18, TypeScript, Vite et Tailwind CSS. Cette application permet de gérer les utilisateurs, activités, informations et autres données de la plateforme CESIZEN.

## Prérequis

Avant de commencer l'installation, assurez-vous d'avoir les éléments suivants installés sur votre système :

- **Node.js** (version 18 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **npm** ou **yarn** (gestionnaire de paquets)
- **Git** pour cloner le repository
- **Docker** et **Docker Compose** (optionnel, pour l'installation avec conteneurs)

## Technologies utilisées

- **React 19** - Bibliothèque JavaScript pour l'interface utilisateur
- **TypeScript** - Superset typé de JavaScript
- **Vite** - Outil de build rapide et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router DOM** - Gestion des routes côté client
- **Axios** - Client HTTP pour les appels API

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repository>
cd backoffice-cesizen
```

### 2. Installation des dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# URL de l'API Backend
VITE_API_URL=http://localhost:2323

# Autres variables d'environnement (si nécessaire)
VITE_APP_NAME=CESIZEN Backoffice
VITE_APP_VERSION=1.0.0
```

**Note importante :** Les variables d'environnement dans Vite doivent commencer par `VITE_` pour être accessibles côté client.

### 4. Vérification de la connexion API

Assurez-vous que le backend CESIZEN est démarré et accessible à l'URL configurée dans `VITE_API_URL`.

## Démarrage de l'application

### Mode développement

```bash
# Démarrage du serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173` par défaut.

### Mode aperçu (preview)

Pour tester la version de production localement :

```bash
# Construction du projet
npm run build

# Aperçu de la version de production
npm run preview
```

### Mode production

```bash
# Construction pour la production
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## Installation avec Docker

### Développement avec Docker

```bash
# Construction de l'image Docker
docker build -t cesizen-backoffice .

# Démarrage du conteneur
docker run -p 5000:3000 -e VITE_API_URL=http://localhost:2323 cesizen-backoffice
```

### Production avec Docker Compose

```bash
# Démarrage en mode production
docker-compose -f docker-compose.prod.yml up -d
```

L'application sera accessible sur `http://localhost:5000`.

## Scripts disponibles

```bash
# Développement
npm run dev              # Démarrage du serveur de développement Vite

# Build et production
npm run build            # Construction TypeScript + build Vite pour production
npm run preview          # Aperçu local de la version de production

# Code quality
npm run lint             # Vérification du code avec ESLint
```

## Structure du projet

```
src/
├── components/          # Composants réutilisables
├── context/            # Contextes React (AuthContext, etc.)
├── layout/             # Composants de mise en page
├── pages/              # Pages de l'application
├── routes/             # Configuration des routes
├── services/           # Services pour les appels API
├── App.tsx             # Composant principal
├── main.tsx            # Point d'entrée de l'application
└── index.css           # Styles globaux avec Tailwind
```

## Configuration

### Tailwind CSS

Le projet utilise Tailwind CSS pour le styling. La configuration se trouve dans :
- `tailwind.config.js` - Configuration Tailwind
- `postcss.config.js` - Configuration PostCSS
- `src/index.css` - Importation des styles Tailwind

### TypeScript

Configuration TypeScript dans :
- `tsconfig.json` - Configuration principale
- `tsconfig.app.json` - Configuration pour l'application
- `tsconfig.node.json` - Configuration pour les outils Node.js

### Vite

Configuration Vite dans `vite.config.ts` avec le plugin React.

## API Integration

L'application communique avec le backend CESIZEN via Axios. Les services API se trouvent dans `src/services/`.

Exemple d'utilisation :
```typescript
import { authService } from '@/services/authService';

// Connexion utilisateur
const response = await authService.login(email, password);
```

## Authentification

Le système d'authentification est géré via :
- Context API React pour l'état global
- Stockage des tokens JWT
- Protection des routes privées
- Gestion automatique des redirections

## Dépannage

### Problèmes courants

1. **Erreur de connexion à l'API**
   - Vérifiez que le backend est démarré
   - Vérifiez l'URL de l'API dans le fichier `.env`
   - Vérifiez les CORS sur le backend

2. **Erreur lors du build**
   ```bash
   # Nettoyage et réinstallation
   rm -rf node_modules package-lock.json dist
   npm install
   npm run build
   ```

3. **Problèmes de styles Tailwind**
   ```bash
   # Reconstruction des styles
   npm run build
   ```

4. **Port déjà utilisé**
   - Vite utilise le port 5173 par défaut
   - Changez le port : `npm run dev -- --port 3000`

### Variables d'environnement

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL de l'API backend | http://localhost:2323 |
| `VITE_APP_NAME` | Nom de l'application | CESIZEN Backoffice |
| `VITE_APP_VERSION` | Version de l'application | 1.0.0 |

### Logs et debugging

- Les erreurs sont affichées dans la console du navigateur
- Utilisez les DevTools React pour déboguer les composants
- Les erreurs de build sont affichées dans le terminal

## Fonctionnalités principales

- 🔐 **Authentification** - Connexion sécurisée avec JWT
- 👥 **Gestion des utilisateurs** - CRUD complet des utilisateurs
- 🎯 **Gestion des activités** - Administration des activités
- 📰 **Gestion des informations** - Gestion du contenu informationnel
- 📊 **Dashboard** - Tableaux de bord avec statistiques
- 🎨 **Interface moderne** - UI responsive avec Tailwind CSS
- ⚡ **Performance** - Build optimisé avec Vite

## Déploiement

### Build de production

```bash
npm run build
```

### Déploiement sur serveur web

1. Copiez le contenu du dossier `dist/` sur votre serveur web
2. Configurez votre serveur pour servir `index.html` pour toutes les routes
3. Assurez-vous que les variables d'environnement sont correctement configurées

### Nginx (exemple de configuration)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Support

Pour toute question ou problème :
- Vérifiez la documentation de [Vite](https://vitejs.dev/)
- Consultez la documentation de [React](https://react.dev/)
- Vérifiez la documentation de [Tailwind CSS](https://tailwindcss.com/)
- Contactez l'équipe de développement
