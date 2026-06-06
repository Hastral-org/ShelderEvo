# ShelderEvo Codebase Index

**Last Updated:** 2026-06-04

## 📂 Project Structure Overview

The project is a hybrid TUI (Command Line Interface) and RPG Maker MZ (RMMZ) client designed to connect to the MAGPIE_Server.

### 🛠️ Core Logic (`/js`)

- `MAGPIE.js`: The primary backend connector. Handles Socket.io connections, JWT authentication, and global metadata.
- `main.js`: The RMMZ engine bootstrapper.
- `rmmz_*.js`: Core engine overrides and extensions for customizing RMMZ behavior.
- `/cli/`:
  - `cli.js`: TUI logic, module management, and terminal output handling.
  - `index.html`: The TUI entry point.
- `/libs/`: Third-party dependencies (PixiJS, Pako, etc.).
- `/plugins/`: RMMZ plugins for UI and system management.

### 📊 Data & Assets

- `/data/`: RMMZ JSON database files (Actors, Classes, Maps, etc.).
- `/assets/`: Game visual and audio resources.

### 📋 Planning & Documentation

- `/plans/`: Implementation roadmaps (e.g., `RMMZ_integration_plan.md`).
- `/docs/`: Project documentation and codebase indexing.

## ⚙️ Key Technical Implementations

- **Authentication**: JWT-based, stored in `localStorage`.
- **Communication**: Socket.io-client connecting to `https://shelderevolution.org`.
- **TUI Architecture**: Module-based state machine (`MAGPIE_CLI.modules`) with asynchronous text printing.
- **Engine**: NWjs-based RPG Maker MZ.

## ⚠️ Known Gaps & Technical Debt

- **Creature Logic**: Embryo adoption, trait generation, and evolution mechanics are currently missing (pending RECON).
- **CGC Integration**: Myth Atelier CGC plugin is not yet configured.
- **State Bridge**: No formal mechanism to transfer session data from TUI to RMMZ engine.
- **Asset Sync**: `MAGPIE.BOOT.updater` is currently a placeholder.
