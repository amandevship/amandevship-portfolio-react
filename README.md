# Amanda Devship Portfolio Monorepo

This is a monorepo containing the client (React) and server (Node.js) for the Amanda Devship portfolio project.

## Structure

- `client/`: React frontend application
- `server/`: Node.js backend API
- `docs/`: Documentation

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the client:
   ```bash
   yarn start:client
   ```

3. Start the server:
   ```bash
   yarn start:server
   ```

## Scripts

- `yarn install:all`: Install all dependencies
- `yarn build:client`: Build the client
- `yarn build:server`: Build the server
- `yarn start:client`: Start client in development mode
- `yarn start:server`: Start server in development mode
- `yarn test`: Run tests in all workspaces

## Workspaces

This project uses Yarn workspaces for managing the monorepo.