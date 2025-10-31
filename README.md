# My Site

Projet web fullstack avec **backend NestJS** et **frontend Vue/React**.

---

## Backend

- **Technologies** : NestJS, Prisma, PostgreSQL (via Docker)
- **Fonctionnalités principales** :
  - Auth JWT (signup / login / profile)
  - Gestion des utilisateurs (CRUD)
  - Dockerisé pour un environnement cohérent

---

## Frontend

- **Technologies** : Vue
- **Fonctionnalités** :
  - Connexion / Inscription
  - Affichage du profil utilisateur
  - Gestion de plusieurs modules
  - Communication avec le backend via API REST

---

## Installation

### Backend

```bash
cd backend
pnpm install
# Création de la base de données via Docker (exemple)
docker-compose up -d
# Lancer le serveur en mode développement
pnpm run start:dev
```

```front
cd frontend
pnpm install
pnpm dev
```
