# Sub-Plan: Socket Bridge (Telemetry & Intent Pipe)

## Purpose
Establish a reliable bi-directional communication channel between the ShelderEvo client and the `MAGPIE_Server` using `socket.io`.

## Architectural Insights
- **Ticket Architecture (Monomorphic):** All intents are wrapped as uniform `Ticket` objects. The bridge treats all tickets as identical data units; interpretation is strictly server-side.
- **Async Lifecycle:** Intent submission is atomic/fire-and-forget; the server acknowledges queueing, and actual side effects are realized via subsequent `entity_update` telemetry (side-effect propagation to the `exp` queue).
- **Data Source:** The client relies on the local dictionary (provided via login/public folders) as the authoritative source for card/command interpretation.

## Key Deliverables
- [ ] Implement `socket.io` client module.
- [ ] Define and implement the telemetry ingestion protocol (POVART arrays).
- [ ] Implement polymorphic `Ticket` submission mechanism (wrapper for Cards/Commands).
- [ ] Establish connection status monitoring and auto-reconnect logic.

## Verification
- Connection established successfully with `MAGPIE_Server`.
- Ability to subscribe to `entity_update` events and parse POVART telemetry.
- Successful submission of `Ticket` objects (cards/commands) with queue acknowledgment.
