# Legacy Analysis: ShelderEvo_core_old.js

**Analysis Date:** 2026-06-06
**File Path:** `c:\Users\Marika\MAGPIE\js\plugins\ShelderEvo_core_old.js`

## 1. Core Architecture

The plugin is structured using a hierarchical namespace system to separate core utilities, data management, and combat logic. It heavily relies on global objects and RPG Maker MZ's `$gameVariables` and `$gameSwitches` for state persistence.

### Namespaces

- **`MAGPIE`**: The top-level namespace.
  - **`MAGPIE.HIMS`**: "HIMS system" - A prototype for setting up game systems from templates.
  - **`MAGPIE.SE` / `SECore`**: The primary runtime and utility hub for Shelder Evolution.
  - **`MAGPIE.CBE` / `CBE`**: Combat/Battle Engine. Handles combat-specific logic, state combinations, and battle-flow utilities.
  - **`MAGPIE.PDL` / `PDL`**: Procedural Data Layer. Manages the "pools" of creatures, territories, and species.
- **`Imported`**: A flag object used to track which core modules have been loaded.

---

## 2. Key Systems Analysis

### HIMS/MAGPIE

- **Initialization**: The plugin uses `MAGGIE.parseStructObj` (an external utility) to parse plugin parameters into usable JavaScript objects.
- **Runtime**: It implements a custom logging system via `MAGPIE.console.Log` and a message system `SECore.message` that hooks into `$gameMessage` to provide formatted feedback to the user.

### Time System

- **Calendar Logic**: Supports multiple calendars (e.g., "Gregorian" and "Sabi"). The `Time_System` class handles month lengths, leap years, and conversion from `yearDay` to specific dates.
- **Cycles**: Implements a granular time scale (Seconds $\rightarrow$ Minutes $\rightarrow$ Hours $\rightarrow$ Days).
- **Time of Day (ToD)**: A state machine that transitions between `dawn`, `morning`, `afternoon`, `dusk`, and `night` based on `Sunrise` and `Sunset` variables, which are dynamically adjusted by the current season.
- **Seasonal Logic**: Seasons (Winter, Spring, Summer, Autumn) are determined by the `yearDay` and affect the length of days (Sunrise/Sunset offsets).

### PDL Manager (Procedural Data Layer)

- **Pool Management**: Uses a "hash and slot" system (`Creature_Pool`, `Territory_Pool`) to manage large numbers of entities. IDs are generated as `(hash * 1000) + slot`.
- **Procedural Spawning**: `PDL.createCreature` and `SECore.spawnCreature` handle the instantiation of creatures based on species templates and randomized levels.
- **Data Loading**: During `Game_System.prototype.initialize`, the PDL loads habitats, habitat states, resources, and species from the database (`$dataSkills`, `$dataStates`, `$dataItems`).

### CBE (Combat/Battle Engine)

- **`habitatCombo` Logic**: This is a critical integration point. It reads metadata from a habitat state (`$dataStates[habitatId].meta`) and applies "bulk states" to a subject.
  - It maps habitat attributes (Mass, Aggro, Dex, Sen) to specific state IDs defined in `habCombos`.
  - **Action "add"**: Applies the states.
  - **Action "remove"**: Removes the states.
- **Battle Utilities**: Includes `CBE.spawnSpeciesGroup` for generating encounter parties and `CBE.isFieldClear` to check for active enemies.

### Territory & Biome System

- **Biomes**: Defined as objects containing climate, humidity, battleback IDs, and habitat distributions (Common, Uncommon, Rare, Unique).
- **Territories**: `Game_Territory` instances manage a "Deck" of cards (skills/habitats).
- **Exploration**: The `explore()` method pops a card from the territory deck into the "Wild" zone, potentially triggering a creature spawn via the `spawnController`.
- **Fertility**: Biomes have a fertility value that is consumed when resources are taken (`Biome.prototype.fertilityCost`).

### Creature/Battler Logic

- **`Game_Creature`**: A complex class that handles species-specific traits, instincts (Survive, Compete, Interact, Adapt, Meta), and growth stages (Infant $\rightarrow$ Juvenile $\rightarrow$ Adolescent $\rightarrow$ Adult $\rightarrow$ Elder).
- **Genealogy**: `Game_Genealogy` tracks parent-child relationships and siblings.

---

## 3. Method Index

| Category      | Method                        | Purpose                                          | Typical Arguments                                 |
|:--------------|:------------------------------|:-------------------------------------------------|:--------------------------------------------------|
| **Time**      | `SECore.setCalendar`          | Initializes the global calendar system           | `CalendarID, gameday, day, month, year, hour`     |
| **Time**      | `SECore.clock`                | Advances game time and triggers TICK events      | None                                              |
| **PDL**       | `PDL.createCreature`          | Instantiates a new creature in the pool          | `species, archetype, genealogy, nickName...`      |
| **PDL**       | `SECore.spawnCreature`        | Spawns a creature into the game world/battle     | `creatureID, speciesID, encounter, creatureLevel` |
| **CBE**       | `CBE.habitatCombo`            | Applies/Removes habitat-based states             | `subject, action ("add"/"remove"), habitatId`     |
| **CBE**       | `CBE.bulkAddState`            | Adds multiple copies of a state to a subject     | `subject, statesArray, amount`                    |
| **Territory** | `Game_Territory.explore`      | Draws a card from the deck to the wild           | None                                              |
| **Territory** | `Game_Territory.generateDeck` | Procedurally generates the territory's card pool | None                                              |
| **Species**   | `Game_Species.getGrowthStage` | Determines current life stage based on growth    | `totalGrowth`                                     |
| **Utility**   | `SECore.die`                  | Standard random number generator (1 to dX)       | `dX` (number of sides)                            |

---

## 4. Integration Points

- **`Game_System.prototype.initialize`**: Overridden to call `initSECoreSettings()` and `initPDL()`, ensuring the procedural database is loaded on game start.
- **`$gameVariables` / `$gameSwitches`**: The plugin uses these as the primary "save-game" storage for time, current territory, and system flags.
- **`$dataSkills` / `$dataStates` / `$dataItems`**: The plugin treats these as a database, using `.meta` properties to define species, habitats, and resources.
- **`$gameParty.leader()._extraZones`**: Integrates with a card-game-like system (likely a CGC plugin) to manage "Territory" and "Wild" zones.
- **`$gameMessage`**: Custom formatted messages using `\>` and `\|` markers for the HIMS console.

---

## 6. Eval Tag Mapping (TURevaltags)

The following methods in `MAGPIE_ShelderEvo_Core.js` (under the `HIMS_Game.prototype` namespace) are the primary targets for mapping `eval` tags via the **TURevaltags** plugin. These methods act as the lifecycle hooks for battle and turn logic:

- `turnStart(user)`: Triggered at the beginning of a turn.
- `turnEnd(user)`: Triggered at the end of a turn.
- `actionTargeted(user, target)`: Triggered when an action is targeted.
- `actionHit(a)`: Triggered when an action successfully hits.
- `actionReaction(a)`: Triggered during the reaction phase.
- `actionDamaged(a)`: Triggered when a unit takes damage.
- `actionRespond(b)`: Triggered during the response phase.
- `actionAfter(a)`: Triggered after an action is fully resolved.

These methods allow for the injection of dynamic logic and state changes based on the current battle context.
