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
  - [x] TASK: use [INTEL](../docs/intel.md) to update this plan
  - [x] TASK: schedule work within June 8th 08:00 deadline
    - [x] STEP: RMMZ bootstrap -- Saturday 08:00 => 13:00
    - [ ] STEP: RMMZ import legacy logic -- Saturday 16:00 => 20:00
    - [ ] STEP: RMMZ socket sync -- Saturday 23:00 => Sunday 05:00
    - [ ] STEP: RMMZ card mechanics -- Sunday 10:00 => 20:00
    - [ ] STEP: RMMZ playtesting -- Sunday 23:00 => Monday 07:00
    - [ ] STEP: client publish -- Monday 07:00 => Monday 08:00
  - [x] TASK: allocate resources
    - [ ] 08:00 => 09:00 | cleanup RMMZ database
    - [x] 09:00 => 10:00 | player account setup
      - [x] registration
      - [x] login
      - [x] player stats
      - [x] creature slots
    - [ ] 10:00 => 12:00 | creature adoption
      - [ ] creature creation
      - [ ] creature/player affinity
      - [ ] starter decks
      - [ ] booster packs
      - [ ] trait generation minigame
    - [ ] 12:00 => 13:00 | lunch break
    - [ ] 13:00 => 16:00 | client setup
      - [ ] login to map scene
      - [ ] map scene to battle
      - [ ] battle to map scene
      - [ ] map scene to logout
      - [ ] menu to web link
      - [ ] web link to client
    - [ ] 16:00 => 16:30 | afternoon break
    - [ ] 16:30 => 20:00 | battle scene
      - [ ] onBattleEnter
      - [ ] socket sync & deck setup
      - [ ] deck load
      - [ ] zone load
      - [ ] CGC onStart
      - [ ] CGC TurnStart
      - [ ] turnStart socket sync
      - [ ] onClientCardSelection
      - [ ] onServerCardAction
      - [ ] onSelectionAccepted
      - [ ] onSelectionRefused
      - [ ] onClientEXPpack
      - [ ] onServerEXPreceived
      - [ ] onServerEXPsent
      - [ ] onClientEXPunpack
    - [ ] 20:00 => 22:00 | dinner break
    - [ ] 22:00 => 03:00 | map scene
      - [ ] onLoginSuccessful
      - [ ] onBattleExit
      - [ ] onClientTerritorySelection
      - [ ] onServerTerritoryData
      - [ ] onClientTerritorySelected
      - [ ] onServerTerritoryEntered
      - [ ] onServerTerritoryRefused
      - [ ] onClientTerritoryMigration
      - [ ] onServerTerritoryMigrated
      - [ ] onClientMenu
      - [ ] onServerMenuData
      - [ ] onClientLogout
      - [ ] onSocketDisconnect
      - [ ] onServerMessage
      - [ ] onClientMessage
    - [ ] 03:00 => 05:00 | playtesting & debugging
    - [ ] 05:00 => 07:00 | assets allocation
      - [ ] audio bgm
      - [ ] audio bgs
      - [ ] audio me
      - [ ] audio se
      - [ ] sprite cards
      - [ ] sprite actors
      - [ ] UI
      - [ ] CLI
    - [ ] 07:00 => 08:00 | export and upload
      - [ ] client app package
      - [ ] itch.io upload
      - [ ] domain client download link
      - [ ] marketing post

---

- [x] MISSION 3: client boot
  - [x] TASK: implement boot router in root index.html
    - [x] STEP: clean root index.html to be a router only
    - [x] STEP: implement MAGPIE.BOOT.route() and handshake() in MAGPIE.js
  - [x] TASK: inherit "CLI" style and logic from server/public/cli/\
    - [x] STEP: verify [js/cli/index.html](../js/cli/index.html) loads [cli.js](../js/cli/cli.js)
    - [x] STEP: ensure TUI targets #terminal-output and #crt-screen in CLI entry point
  - [x] TASK: socket handshake
    - [x] STEP: connection check in `SE_CLI.initSocket()`
    - [x] STEP: token validation `localStorage.getItem("jwt_token")` on boot
  - [x] TASK: Auth routing
    - [x] STEP: if token is valid => skip to `root` module => trigger `updater`
    - [x] STEP: if token is missing/invalid => `switchModule('account')` => prompt for `login`
  - [x] TASK: login
    - [x] STEP: `LOGIN` emit in `stepHandlers.login_password`
    - [x] STEP: handle `LOGIN_SUCCESS` response to store JWT
  - [ ] TASK: updater
    - [x] STEP: hook `LOGIN_SUCCESS` event in [cli.js](../js/cli/cli.js) to call `SE_CLI.BOOT.updater()`
    - [ ] STEP: `SE_CLI.BOOT.updater` to compare local vs server
    - [ ] STEP: asset sync *(placeholder/basic)*
    - [ ] STEP: signal sync success
    - [ ] STEP: use `SE_CLI_CLI.printLine` to notify user
  - [ ] TASK: handoff to RMMZ [main.js](../js/main.js)
    - [ ] STEP: implement `HandoffManager` to bridge TUI state to RMMZ global object
    - [ ] STEP: transfer state `jwt_token` and `playerID` to be available within RMMZ engine for session persistence
    - [x] STEP: UI transition from [CLI html](../js/cli/index.html) to [RMMZ html](../js/main.html)
    - [x] STEP: execute DOM purge (remove TUI CSS/HTML) to prevent visual artifacts
    - [x] STEP: [boot engine](../main.html)

---

- [ ] MISSION 5: RMMZ client app
  - [x] TASK: Initialize RMMZ project structure and NWjs environment
  - [ ] TASK: Implement Handoff Logic in `js/plugins/app/handler.js`
    - [ ] STEP: Implement `localStorage` write for `jwt_token` and `playerID` (B.4)
    - [ ] STEP: Implement session read and `MAGPIE_METASTATE` global injection (B.5)
    - [ ] STEP: Implement boot guard to redirect to CLI login if token is missing (B.6)
  - [ ] TASK: Verify NWjs filesystem access for local caching/persistence
  - [ ] TASK: Integrate `handler.js` into RMMZ boot sequence (`main.js`)
  - [ ] TASK: @todo `$PDL.sceneLoad`

---

- [ ] MISSION 6: RMMZ legacy logic (Thin-Client Conversion)
  - [x] TASK: Implement `js/plugins/app/sheldex.js`
    - [x] STEP: Port `MAGPIE.KEY` constants for local lookup
    - [x] STEP: Map constants to RMMZ database identifiers
  - [ ] TASK: Implement `js/plugins/app/creature.js`
    - [ ] STEP: Import legacy `Game_Creature` logic to server
    - [ ] STEP: import legacy `Game_Creatre` rendering integration
    - [ ] STEP: integrate `Sprite` modifications
    - [ ] STEP: map entity.states to stateID.anim
    - [ ] STEP: Implement dialogue/emote playback system
  - [ ] TASK: Implement `js/plugins/app/evolution.js`
    - [ ] STEP: extend shop scene for Adoption store
    - [ ] STEP: map server EVP feed to local EVP (RMMZ gold)
    - [ ] STEP: brainstorm 'trait roulette' minigame (not an actual roulette)
  - [ ] TASK: Implement `js/plugins/app/scenes.js`
    - [ ] STEP: Override `Scene_Battle` for thin-client data flow
    - [ ] STEP: Implement `Scene_Adoption` and `Scene_Menu` shells
    - [ ] STEP: Implement `Scene_Map` for location transition and tac-view
  - [ ] TASK: Implement `js/plugins/app/CGC.js`
    - [ ] STEP: Integrate Myth Atelier CGC plugin
    - [ ] STEP: Implement Actor-to-Card sprite conversion for rendering
    - [ ] STEP: Map server-side card play to CGC animation triggers

- [ ] MISSION 7: RMMZ socket sync (Surgical Feed)
  - [ ] TASK: Implement Socket Hub (Decompose feed into specialized packages to avoid "worldstate" bloat)
  - [ ] TASK: Implement Time Sync (Map server metastate to localized day/night and weather visuals)
  - [ ] TASK: Implement Playback System (Render server-side creature actions as client-side visual events)
  - [ ] TASK: Implement Input Bridge (Process user inputs through core systems for surgical socket emission)

---

## DETAILS

### 🛠 Thin-Client Architecture Specs

- **Core Philosophy**: Data-first prototype. The client is a minimal renderer/terminal; the server is the sole source of truth. No "mock" data; features are implemented server-side first.
- **Playback Model**: "Recipe & Cook". Server sends concise indexed scripts (MAGPIE_EXP payloads, keyIDs, emoteIDs). Client maps these via `sheldex.js` to RMMZ database entries and executes the visual playback.
- **Input Flow**: Implicitly validated. Player actions are limited to the current creature deck (pre-approved actions).
- **Action Refusal**: Client handles "refusal feedback" (e.g., card revoked/discarded) based on server memos when a queued action is not executed.
- **Scene Control**: Server-driven. All gameplay transitions (Battle, Adoption, Map) are triggered by server state. Only the Main Menu is client-autonomous.
- **Surgical Sync**: Socket Hub decomposes feeds into specialized packages to minimize traffic and maintain laser-focus on the current task.
- **Handoff Mechanism**: `localStorage` is used to pass session tokens (JWT, PlayerID) from the CLI bootstrapper to the RMMZ engine.
- **Rendering Priority**: Minimal. Focus is on restoring functional card battles using the CGC plugin and card sprites as the primary actor rendering source.

---

### 🧬 Embryo Generation: The "Birth Ritual" (Option D)

The generation process is a literal assembly of the creature's starting deck, combining fate (parents) and investment (EVP).

- **The Baseline**: Player starts with 1 Creature Card + 2 "Parental Boosters" (Gift).
- **The Blind Draft**: Parental boosters are blind-swappable from a virtually infinite pool. The player chooses a Mother and Father booster without knowing the contents, creating a "push-your-luck" gamble on heritage.
- **The Informed Draft**: Players can spend EVP to purchase generic boosters. These are "Aware-Drafts" where cards are visible, allowing the player to strategically swap out baseline traits for specific mutations.
- **The Constraint**: Deck size is fixed during this phase; any new trait from a booster must replace an existing one.
- **The Window**: This drafting process is exclusive to the Embryo Generation minigame. Once the "Seal" is closed, the starting deck is locked.
- **The Flow**: `Surgical Socket Feed` $\rightarrow$ `Sifting/Swapping UI` $\rightarrow$ `Final Seal` $\rightarrow$ `Creature Spawn`.
- **Scene Control**: Server-driven. All gameplay transitions (Battle, Adoption, Map) are triggered by server state. Only the Main Menu is client-autonomous.
- **Surgical Sync**: Socket Hub decomposes feeds into specialized packages to minimize traffic and maintain laser-focus on the current task.

---

### 🐤 Creature Growth

- @audit `.getGrowthStage()` from [ShelderEvo_core_old.js](../js/plugins/ShelderEvo_core_old.js)
- @audit sources of `SECore.attemptDice()` from [ShelderEvo_core_old.js](../js/plugins/ShelderEvo_core_old.js)

---
