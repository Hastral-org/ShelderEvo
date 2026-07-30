# Project Brief: Minimalist Web TCG Prototype & Mobile Client

## 1. Project Overview & Strategy

* **Goal:** A lightweight, minimalist Trading Card Game (TCG) prototype built for the browser (HTML5/CSS/JS). It will serve as a fast playtesting platform on platforms like itch.io and ultimately become the mobile client for an existing desktop version (originally built in RPG Maker MZ via Myth Atelier CGC).
* **Core Philosophy:** Minimal mental friction, zero frameworks (Vanilla JavaScript only), and zero complex build steps. The focus is strictly on responsive web design and clean, direct state architecture.
* **Target Platforms:** Mobile-first responsive web (handled cleanly via CSS layout utilities) running fluidly on both mobile and desktop browsers.

## 2. Technical Architecture & Constraints

* **No Frameworks:** No React, Vue, or build-step dependencies. UI synchronization is handled via direct vanilla JS DOM caching and mutation.
* **Rendering Tech:** **Pure DOM (HTML & CSS).** Chosen over Canvas/WebGL due to the minimalist visual style, lack of performance-heavy particle simulations, native text handling, and ease of mobile scaling.
* **Headless Core Logic:** The game loop, rule engine, and game state (`gameState` object tracking zones like `playerHand`, `playerField`, `deck`, etc.) must remain completely independent of the visual layer. The code should be capable of running text-only in a terminal.
* **Event System:** **Event Delegation.** Click and touch events are bound once to stable parent zone containers (e.g., `#player-hand`) rather than dynamically spawned individual card nodes, ensuring seamless card lifecycle updates.

## 3. Visual & Card Component Design

* **Asset Approach:** High reliance on pre-made card PNG assets exported from the desktop design to eliminate heavy CSS layout and typography rule engineering.
* **Card Component Blueprint:** Implemented using native HTML `<template>` nodes.
* **State Updates & Animations:** Cards are instantiated as persistent DOM elements cloned from the template. Internal text/image elements are cached as properties directly on the element object upon creation. Subsequent logic updates (like modifying health or applying a damage flash) target these cached nodes directly (`cardElement.domHealth.textContent = newHealth`) without destroying the parent node. This fully preserves native CSS 3D flips, hover scales, and translation transitions.

## 4. Current State & Next Objective

We are moving away from the RMMZ build limitations to create a clean repo consisting purely of `index.html`, `style.css`, and `game.js`. The structural foundation of the app is established; the immediate next milestone is writing the baseline files and structuring the UI zones.
