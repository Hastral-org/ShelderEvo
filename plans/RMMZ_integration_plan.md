# RMMZ integration plan

## GOAL

Develop a new prototypal client for [MAGPIE_Server](../../MAGPIE_Server/README.md), using the [ShelderEvo codebase](../../HASTRAL/03_MEMORY/wiki/shelderevo_prototype/index.md) and MAGPIE legacy files as reference for logic and inspiration rather than a direct foundation.

### Conditions for success

- **Must be a functional client that connects to the existing server**
  - *Integrate with existing account handling logic*
  - *Integrate with existing CLI logic*
- **Must use RPG Maker MZ (RMMZ) engine**
- **Must use Myth Atelier CGC (Card Game Combat) plugin**
- **Must use copyright-free assets**
- **Must have at least the core gameplay loop**
  - *adopt creature embryo*
  - *creature trait generation from species template and evolution mechanic*
  - *creature growth until death, either from aging or damage*
  - *player influence creature by 'suggesting' card-play*
  - *Evolution Points (EVP) collection through evolution-related quests*
- **Must be a standalone NWjs app dowloadable via itch.io**
- **Must follow and maintain the overall ShelderEvo theme and aesthetics**
  - *strictly adhere to [ShelderEvolution meta](https://matheraptor.notion.site/Shelder-Evolution-0cea90cc42694d6da94c2f9cee477ec0)*
  - *strictly adhere to guidelines in [README](../../MAGPIE_Server/README.md)*
  - *strictly use existing custom assets and avoid copyrighted material*

---

- [x] MISSION 1: RECON -- pattern extraction and snippet harvesting
  - [x] TASK: extract viable logic/snippets from Project_L2e/ codebase
  - [x] TASK: extract viable logic/snippets from MAGPIE/ codebase
  - [x] TASK: consolidate [INTEL](../docs/intel.md) as a reference library
    - [x] STEP: map extracted snippets to ShelderEvo target files
    - [x] STEP: document compatibility issues with NWjs/RMMZ

---

- [ ] MISSION 2: PREP -- prepare an implementation plan
  - [ ] TASK: use [INTEL](../docs/intel.md) to update this plan
  - [ ] TASK: schedule work within June 8th 08:00 deadline
  - [ ] TASK: allocate resources

---

- [ ] MISSION 3: client boot
  - [ ] TASK: implement boot router in root index.html
    - [x] STEP: clean root index.html to be a router only
    - [x] STEP: implement MAGPIE.BOOT.route() and handshake() in MAGPIE.js
  - [ ] TASK: inherit "CLI" style and logic from server/public/cli/\
    - [ ] STEP: verify [js/cli/index.html](../js/cli/index.html) loads [cli.js](../js/cli/cli.js) and [MAGPIE.js](../js/MAGPIE.js)
    - [ ] STEP: ensure TUI targets #terminal-output and #crt-screen in CLI entry point
  - [x] TASK: socket handshake
    - [x] STEP: connection check in `MAGPIE_CLI.initSocket()`
    - [x] STEP: token validation `localStorage.getItem("jwt_token")` on boot
  - [ ] TASK: Auth routing
    - [ ] STEP: if token is valid => skip to `root` module => trigger `updater`
    - [ ] STEP: if token is missing/invalid => `switchModule('account')` => prompt for `login`
  - [ ] TASK: login
    - [ ] STEP: `LOGIN` emit in `stepHandlers.login_password`
    - [ ] STEP: handle `LOGIN_SUCCESS` response to store JWT
  - [ ] TASK: updater
    - [ ] STEP: hook `LOGIN_SUCCESS` event in [cli.js](../js/cli/cli.js) to call `MAGPIE.BOOT.updater()`
    - [ ] STEP: `MAGPIE.BOOT.updater` to compare local vs server
    - [ ] STEP: asset sync *(placeholder/basic)*
    - [ ] STEP: signal sync success
    - [ ] STEP: use `MAGPIE_CLI.printLine` to notify user
  - [ ] TASK: handoff to RMMZ [main.js](../js/main.js)
    - [ ] STEP: implement `HandoffManager` to bridge TUI state to RMMZ global object
    - [ ] STEP: transfer state `jwt_token` and `playerID` to be available within RMMZ engine for session persistence
    - [ ] STEP: UI transition from [CLI html](../js/cli/index.html) to [RMMZ html](../js/main.html)
    - [ ] STEP: execute DOM purge (remove TUI CSS/HTML) to prevent visual artifacts
    - [ ] STEP: [boot engine](../js/main.js)

---
