# Darwin

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Darwin is a webbased multiplayer survival game written in TypeScript which can be controlled using code.

## Report

The report is written in LaTeX and is located in `/report`.

## Backend

The backend is Node.js based and is located in `/game-backend`.

## Frontend

The frontend uses React and is located in `/game-frontend`.

## Getting Started

### Prerequisites:

- Node.js 12.x
- git
- [gcc & python](https://github.com/laverdet/isolated-vm#requirements) (required for setting up V8 isolates)

### Start development:

`npm run install-app`

`npm run watch`

### Commit Rules

Make sure to run the configured git hooks which apply consistent code formatting.

## Scripts

For the root, the backend and the frontend folder scripts exist to help development.

Root
- `install-app` - installs packages in root, frontend and backend.
- `watch` - builds, runs frontend and backend and restarts jobs on file change
- `build` - builds frontend and backend
- `start` - starts previously built frontend and backend
- `test` - runs all tests, including coverage, in frontend and backend
- `prettier` - checks frontend and backend for formatting errors
- `prettier:fix` - checks frontend and backend for formatting errors and fixes them
- `lint` - lints frontend and backend code

The frontend and backend folders, provide the same scripts as the root folder does. To run a script only for the frontend/backend use `npm run scriptname-[be/fe]` like `npm run build-fe` to run a frontend build.
