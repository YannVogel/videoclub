# VidéoClub VHS 🎬

## 🇫🇷 Présentation (Français)

Projet démo façon **vidéo-club des années 90**, combinant une application web amusante et nostalgique avec une stack moderne et professionnelle.

### Fonctionnalités
- **CRUD VHS** : ajout, édition, suppression, statut (disponible, louée, en retard, perdue).
- **CRUD Clients** : gestion du fichier client.
- **Création de VHS via API externe** (ex. OMDb API).
- **Filtres et recherche** : trier les VHS par genre ou par statut.
- **Interface de location/retour**.
- **Historique des locations** : voir quand une VHS a été louée, par qui et quand elle a été rendue.

### Stack technique
- **Frontend** : Next.js 16 (App Router), PandaCSS, React Aria, React Query, Redux (si nécessaire).
- **Backend** : d’abord mocks avec MSW, puis une vraie API Symfony.
- **Qualité** : Storybook, Vitest, ESLint (flat config), Prettier.

### Objectif
Un projet :
- **Techniquement solide** : monorepo pnpm, tests, doc.
- **Visuellement clair** : UI moderne + accessibilité.
- **Fun et original** : univers VHS rétro.

---

## 🇬🇧 Overview (English)

A demo project inspired by **90’s video rental stores**, mixing a nostalgic theme with a modern professional stack.

### Features
- **VHS CRUD**: create, edit, delete, status (available, rented, late, lost).
- **Clients CRUD**: manage client database.
- **VHS creation via external API** (e.g., OMDb API).
- **Filters & search**: sort VHS by genre or status.
- **Rental/return interface**.
- **Rental history**: track when a VHS was rented, by whom, and when it was returned.

### Tech stack
- **Frontend**: Next.js 16 (App Router), PandaCSS, React Aria, React Query, Redux (if needed).
- **Backend**: start with MSW mocks, then migrate to a Symfony API.
- **Quality**: Storybook, Vitest, ESLint (flat config), Prettier.

### Goal
A project that is:
- **Technically strong**: pnpm monorepo, testing, documentation.
- **Visually clean**: modern UI + accessibility.
- **Fun & unique**: retro VHS universe.

---

## 🚀 Installation & Démarrage | Setup & Run

```bash
# Installer les dépendances
pnpm install

# Lancer PandaCSS en mode watch + Next.js dev server
pnpm dev

# Lancer Storybook
pnpm storybook

# Lancer les tests
pnpm test