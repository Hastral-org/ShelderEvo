# Legacy Logic Import Map

This document tracks all `@audit` and `@todo` markers found across the legacy codebase to prioritize the recovery of simulation logic and identify known technical debt.

## 🚩 High Priority: `@audit import`

These markers explicitly flag logic that was intended for migration or is critical to the core simulation.

### `ShelderEvo_core_old.js` (The Goldmine)

- **Line 1740**: General import marker.
- **Line 2350**: Logic surrounding initialization/runtime.
- **Line 2374**: Logic related to habitat/wild zone checks.
- **Line 3902**: Logic related to territory/region management.
- **Line 5288**: Creature/Species logic.
- **Line 5299**: Creature/Species logic.
- **Line 5311**: Creature/Species logic.
- **Line 5551**: Advanced creature/growth logic.
- **Line 5781**: System/Time logic.
- **Line 5905**: Final system cleanup/initialization.
- **Line 5910**: Final system cleanup/initialization.
- **Line 5932**: Final system cleanup/initialization.

### `MAGPIE_ShelderEvo_Core.js` (incomplete refactor attempt)

- **Line 2525**: Logic related to scene loading/initialization.
- **Line 2756**: Logic related to battle/sprite setup.

---

## ⚠️ Technical Debt & Issues (`@audit-issue` / `@audit`)

Known bugs or architectural flaws that must be fixed during the porting process.

### `ShelderEvo_core_old.js`

- **Line 3251**: `generateDeck` needs a complete rewrite.
- **Line 3788**: `pushRoom()` is broken and prevents saving (CRITICAL).
- **Line 4406**: `spawnSpeciesGroup` has issues.
- **Line 4635**: `getGrowthStage` needs audit.
- **Line 4711**: `Game_Genealogy` needs audit.
- **Line 5349**: `Creature.pushIdea()` needs audit.
- **Line 5828**: Bug: "cannot read property `_gameday` of undefined".

### Other Files

- **`MAGPIE.js` (Line 1144)**: Graphics initialization failure.
- **`MAGPIE_ShelderEvo_Core.js` (Line 2945)**: Questionable eval of `a.result()` in `actionRespond`.

---

## 📝 Pending Tasks (`@todo`)

Feature gaps or planned improvements.

- **`MAGPIE_ShelderEvo_Core.js` (Line 2215)**: POI (Point of Interest) system implementation.
- **`MAGPIE_CBE.js` (Line 607)**: `MCON.getLogs` needs to be asynchronous.
- **`MAGPIE_CBE.js` (Line 743)**: Campaign system implementation.
- **`MAGPIE_Geography.js` (Line 256)**: `pickHabitat` logic needs implementation.
- **`MAGPIE_Geography.js` (Line 1500)**: General geography todo.
- **`MAGPIE_Geography.js` (Line 2094)**: `calculateRAAN` (Right Ascension of the Ascending Node) implementation.
- **`MAGPIE_SYS_rmmz.js` (Line 1825)**: New Commodities system.

---

## 🛠️ Porting Strategy

1. **Prioritize `@audit import`** blocks from `ShelderEvo_core_old.js` to restore the simulation.
2. **Bypass/Rewrite** any logic flagged as `@audit-issue` (especially `pushRoom` and `generateDeck`).
3. **Mock/Implement** `@todo` items only after the core simulation is stable.
