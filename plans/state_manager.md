# Sub-Plan: S0-S4 Entity State Manager

## Purpose
Develop a local client-side state engine that reconciles authoritative server telemetry with the client's local board state.

## Architectural Insights
- **Zone-Based Management:** The client tracks entities in discrete zones: `Hand`, `Reserve` (server-side only), `Fitness` (Deck), `Waste` (Discard), `State` (Permanent), and `Injury` (Exile).
- **Optimistic Execution:** The RMMZ client acts as a dummy executor for immediate feedback. Upon card play, the card moves to a `Temp Zone` locally.
- **Server Reconciliation:** 
  - On 200 OK from the server, the client resets the board state based on the server-authoritative telemetry (the "actual" effect playback).
  - On Failure, the client performs an internal rollback (e.g., returning the card to hand) without further server interaction.

## Key Deliverables
- [ ] Implement the `ZoneManager` to track `Hand`, `Fitness`, `Waste`, `State`, and `Injury`.
- [ ] Implement local "Temp Zone" logic for optimistic card play.
- [ ] Create the state reconciliation engine (handling successful server playbacks vs. local rollbacks).
- [ ] Logic for consuming telemetry updates to refresh board state.

## Verification
- Cards move to `Temp Zone` immediately upon player action.
- Board resets correctly upon successful server response (effect playback).
- Cards return to hand automatically upon server failure.
