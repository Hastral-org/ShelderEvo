# INTEL: ShelderEvo Prototype Reference Library

**Last Updated:** 2026-06-05

This document consolidates the relevant code snippets and architectural patterns from the `MAGPIE` legacy codebase that are essential for implementing the ShelderEvo prototype. It maps the legacy logic to the new project's structure and identifies potential compatibility issues with NWjs/RMMZ.

---

## 1. Core System & State Management (`MAGPIE_SYS.js`)

### Key Logic

- **HIMS Framework**: The Humanized Interface Management System acts as the primary bridge between the RMMZ engine and custom plugin components.
- **Runtime Engine**: Implements a tiered ticking system (`refresh` $\rightarrow$ `superTICK` $\rightarrow$ `megaTICK` $\rightarrow$ `ultraTICK`) for managing game state and "guest" plugin updates.
- **Persistence**: `MAGDATA` and `MAGFILE` classes handle JSON-based save/load operations.
- **Entity Management**: `MAGPIE_EntityDatabase` and `MAGPIE_EntityPool` provide a generic system for managing game objects with ID/slot allocation.
- **System Constants**: `MAGPIE_KEY` defines core constants like `PARAMETER` (ALIVE, HUNGER, SIZE, AGE) and `IMPULSE` (EAT, MOVE, GROW, DIE), which are fundamental for the creature lifecycle.

**Target File Mapping:**

- `js/MAGPIE.js` (for socket/auth, already present)
- `js/main.js` (for bootstrapping)
- A new file, e.g., `js/core/state_manager.js`, for `MAGDATA`/`MAGFILE` logic.
- A new file, e.g., `js/core/constants.js`, for `MAGPIE_KEY` constants.

### Compatibility Notes

- The `require('seedrandom')` call will need to be adapted for NWjs module loading or bundled with the app.
- File I/O (`MAGFILE`) will likely need to be re-implemented using NWjs's `fs` module or `indexedDB` for web compatibility.

---

## 2. Creature Lifecycle & Traits (`MAGPIE_ShelderEvo_Core.js`)

**Key Logic:**

- **State Management**: `SHELDEX.STATE` (FATIGUE, HUNGER, THIRST, FATAL) and `SHELDEX.INJURY` define creature conditions. `SHELDEX.MOVE` (SLEEPING, SNEAKING) defines actions.
- **Behavioral Dictionary**: A comprehensive set of creature skills/actions including `seekNRG`, `purgeGut`, `migrate`, and `forage`.
- **Trait/Evolution**: `SHELDEX.DICE` for randomness, `CARDS.HABCOMBO` / `CARDS.PBUFF` for stat buffs and potential trait generation.
- **Adoption Flow**: The `HIMS_Adoption` class contains the core logic for `adopt`, `speciesAdopt`, `setupActor`, and `setupTraits`. This directly addresses "adopt creature embryo" and "trait generation".
- **Growth Mechanics**: `HIMS_Game.prototype.Growth` and `PDL_Creature.prototype.initGrowth` handle creature maturation.
- **Data Mapping**: `cVar` and plugin parameters map RMMZ variables/switches to game concepts (e.g., `fertility`, `biome`).

**Target File Mapping:**

- `js/creature_manager.js`: Core logic for `Game_Creature`, `PDL_Creature`, lifecycle states (`HUNGER`, `FATAL`), growth, and traits.
- `js/adoption_system.js`: Logic for `HIMS_Adoption`, `speciesAdopt`, and `setupActor/Traits`.
- `js/core/constants.js`: `SHELDEX.STATE`, `SHELDEX.INJURY`, `SHELDEX.MOVE`, `SHELDEX.DICE`, `CARDS` definitions.
- `js/rmmz_objects.js` (or a new `js/core/rmmz_bridge.js`): Mapping `cVar` and plugin parameters to RMMZ's internal systems.

**Compatibility Notes:**

- The `$PDL` (Persistent Data Library) system is deeply integrated. We will need to implement a simplified version or adapt its core concepts (like `Game_Creature`) for our prototype.
- RMMZ's `$dataActors`, `$gameActors`, `$gameParty` are used extensively. These are standard RMMZ objects and should be compatible.
- The `Adoption_list` class provides a framework for a shop-based adoption UI, which could be useful later.

---

## 3. Battle & CGC Integration (`ShelderEvo_BattleCore.js`)

**Key Logic:**

- **Creature Rendering**: `Sprite_CreatureBase` is defined for rendering creatures in battle, including custom shadow and frame handling.
- **Combat Architecture (Dual Party System)**: The `MAGPIE.SE.battleCore._design` block outlines a concrete strategy to bypass MZ constraints:
**Placeholder Enemy**: Use a dummy enemy in the database as a battle trigger.
  - **Custom Party**: Implement `$gameEnemyParty` to allow Actor vs. Actor combat.
  - **Member Override**: Override `BattleManager.allBattleMembers` to recognize both parties.
  - **Action Processing**: Custom `MyActionSystem.processEnemyActions` to target the enemy party.

**Target File Mapping:**

- `js/plugins/Myth Atelier CGC` (plugin folder): This is the target plugin to be integrated.
- `js/battle_integration.js`: Implementation of the pseudocode design, custom party management, and linking RMMZ battlers to `Game_Creature` objects.
- `js/core/rmmz_bridge.js`: Helper functions to translate between CGC card data and RMMZ battler data.

**Compatibility Notes:**

- The pseudocode design is a good starting point but will require concrete implementation.
- Creating a `$gameEnemyParty` separate from `$gameParty` is a valid RMMZ pattern for custom battle systems.
- `Sprite_CreatureBase` will need to be registered with RMMZ's sprite system.

---

## 4. Temporal Mechanics (`ShelderEvo_core.js`)

**Key Logic:**

- **Time System**: A detailed `TIME` system (Calendar, Seasons, Day/Night cycles) is implemented. This is critical for triggering "growth until death" and "aging".
- **Data Mapping**: `cVar` and `cSwitch` constants map RMMZ variables/switches to time-related game states.

**Target File Mapping:**

- `js/time_manager.js`: Core logic for the `TIME` system, calendar, and day/night cycles.
- `js/core/    - rmmz_bridge.js`: Mapping `cVar`/`cSwitch` to RMMZ and triggering lifecycle events based on time.

**Compatibility Notes:**

- The time system logic should be directly adaptable to NWjs.
- Integration with RMMZ's `SceneManager` and `Scene_Map` for time-based events is standard.

---
