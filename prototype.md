# SHELDER EVOLUTION prototype (v2)

## Table of Contents {#top}

- [SHELDER EVOLUTION prototype (v2)](#shelder-evolution-prototype-v2)
  - [Table of Contents {#top}](#table-of-contents-top)
  - [META | high-level concept](#meta--high-level-concept)
    - [Core Purpose](#core-purpose)
  - [ShelderEvo UX | minimum viable product](#shelderevo-ux--minimum-viable-product)
  - [Prototype success criteria](#prototype-success-criteria)
  - [Implementation Plan](#implementation-plan)

---

## META | high-level concept

### Core Purpose

Setup the existing [magpie-server](../MAGPIE_Server/README.md) and create a client app so that the combined operations of these provides a user[^player] with the desired "ShelderEvo" experience (see "UX" below).

[^player]: A user of ShelderEvo is called "PLAYER".

## ShelderEvo UX | minimum viable product

The MVP (minimum viable product) must provide the following feelings of user experience (UX):

- entities are persistent and perpetual[^S0]
- the adopted creature is alive and growing[^S1]
- the adopted creature has a valid agency and intelligence[^S3]
- affinity with the chosen adopted creature[^S4]
- persistence within the game world[^db]
- "bleak character agency"[^agency]
- "grey decisions"[^tone]
- plausible hard-science[^scifi]
- sense of adventure[^quest]
- emerging persistent inter-character drama[^emergence]
- the ecosystem goes on independently of the player's creature[^ecosystem]
- the server exists within the game lore as the "A.I. overlady"[^magpie]
- no plot armor or power-creep[^tone]
- sense of belonging to the ecosystem[^ecosystem] [^agency]

[back to top ⤴️](#top)

[^S0]: Persistence and perpetuality ([see ".refresh"](../MAGPIE_Server/core/entity.js))
[^S1]: creature instinct, metabolism, and growth ([see ".processInstinct"](../MAGPIE_Server/core/entity.js))
[^S3]: creature agency is a combination of state-driven impulses and experience-driven morality ([see ".processAgency"](../MAGPIE_Server/core/entity.js))
[^S4]: player-creature affinity is the emergent property of how well the creature responds to player influence, is persisted through their rapport via exp[^exp], and directly affects the gameplay loop — a "loose" creature-player team might only interact sporadically (if at all), or have conflict, thus feeling inefficient and "laggy", while a "tight" creature-player team might be interacting often, have "shorthand" rapport and in-jokes, thus feeling efficient and "responsive", which could even lead to unlock more direct and immediate interface options (e.g. direct 'WASD' control)
[^db]: there are two sqlite3 database: the server db and the world db. The world db is where the large majority of action happens — entities have their own table and make up anything that can be considered a "subject", that has properties and can interact in the world. Even abstract things like "geomarkers" are entities, because they interact directly with the world coordinates, they just don't have a 'body'. Other elements in the database are events[^event], exps[^exp], keys[^key], symbols[^symbol], contexts[^context], metastate[^metastate].
[^event]: special type of abstract entities that govern what happens in the game world. They function similar to exps[^exp] and also interact with them to propagate collateral, and they make use of keys[^key] and symbols[^symbol] to automate semantics.
[^exp]: data structure designed to be handed among entities and systems to gather and deliver data across the server and client. It also represents the individual experiences of a sentient entity[^creature]
[^creature]: a sentient entity in the game world
[^key]: semantic unit design to attach and/or unlock meaning to other components
[^symbol]: semantic archetype designed to synthesize the most common denominator traits so that they can be easily put on a single card[^ccg]
[^context]: semantic grouping designed for quick configuration of scenarios involving entities, exps, keys, and symbols, so that they're buffered in hive[^hive] together for more efficient performance. Can also double as semantic metakey.
[^metastate]: designed to save the current state of the hive[^hive] and handle the game date.
[^hive]: system dedicated to managing entities and the buffering of components necessary to those entities to run smoothly.
[^ccg]: collectible-card-game mechanics like in "Pokémon", "Magic: The Gathering", or more digitally like in the roguelike deckbuilder "Slay The Spire".
[^ecosystem]: emergent property of the interaction among entities and events in the game world
[^emergence]: a large portion of the game consists in emergent properties of interacting systems, components, and entities. These properties should be treated like any other element of the game, even though they aren't directly measureable or defined at boot. They can be derived or infered by tracking these interactions.
[^tone]: "grey tone" in this case means that anyone can die at any moment for any reason (no plot armor), every decision has an inherent price (nothing is free), and that events don't have implicit meaning (no pre-defined lore aka no destiny)
[^agency]: "bleak agency" in this case means that no creature is more or less important than the other, except the importance and relevant they give each other, and that the impact of any one creature is directly proportional to the gravity of the events it cascades into, meaning that there are no implicit "heroes" or "villains" — every one is just "a creature" to the universe.
[^scifi]: "hard-scifi" means a strict adherence to realism in science up to and not beyond the plausible.
[^quest]: adventure can be achieved via organic emergence of creature-player-ecosystem interaction or via a quest system that automates this process so that creatures can embark on their own adventures autonomously, meaning even so-called "NPCs" can have their own quests
[^magpie]: M.A.G.P.I.E. is the "AI overlady" overseeing the game world both in-lore and off-lore, as the two realms overlap as a meta-narrative.

---

## Prototype success criteria

For this prototype to be a success, it must achieve the following:

- create creature (options: Reodon, Aralodon)
- creature growth via deckbuilding mechanics
- creature S1 automation
- creature S2/S3 agency
- player-creature S4 affinity
- creature survival via roguelike mechanics
- creature persistence in server

Optional/bonus:

- player account registration
- player account management
- player account login
- player-creature S4 controls
- player-creature S4 affinity metrics
- MAGPAYAN language basis
- RMMZ client

[back to top ⤴️](#top)

---

## Implementation Plan

The prototype implementation is divided into three modular work areas:

- [Socket Bridge](plans/socket_bridge.md): Telemetry ingestion & intent transmission.
- [S0-S4 Entity State Manager](plans/state_manager.md): Client-side authoritative state management and interpolation.
- [Player Console](plans/player_console.md): Retro-CLI interface & S5 affinity module.

[back to top ⤴️](#top)

---
