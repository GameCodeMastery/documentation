---
aliases:
  - BP_TraceTarget
---

The `BP_TraceTarget` class in the `Collision Manager` system is a Blueprint class derived from `BP_TargetType`, designed to handle continuous, tick-based collision tracing for detecting hits in Action RPGs. It enables developers to create persistent hit detection for abilities or weapons, such as laser beams or ongoing melee sweeps, without requiring manual trace setup. This class addresses the need for dynamic, automated collision detection that searches for targets until deactivated, integrating seamlessly with the `BP_CollisionComponent` to support combat mechanics.

## Basic Usage

The `BP_TraceTarget` is used by adding it to a `BP_CollisionComponent` and configuring its trace behavior. Below are the primary functions for interacting with it in Blueprints.

1. **ActivateCollision**:
    - **Purpose**: Starts the continuous tick-based collision trace.
    - **Usage**: Call via `ActivateCollisionByTag` on `BP_CollisionComponent` to begin tracing.

2. **DeactivateCollision**:
    - **Purpose**: Stops the collision trace and performs cleanup.
    - **Usage**: Call via `DeactivateCollisionByTag` to end tracing when no longer needed.

3. **CollisionTrace**:
    - **Purpose**: Performs the actual tick-based collision tracing to detect hits.
    - **Usage**: Override in a child Blueprint to customize trace logic (e.g., trace shape, channel).

4. **OnHit**:
    - **Purpose**: Executes logic when the trace hits a valid target.
    - **Usage**: Override to apply effects or trigger events on hit.

## Key Properties

|Property Name|Purpose|
|---|---|
|`Collision Radius`|Defines the radius of the trace (e.g., for sphere or capsule traces); adjustable for trace size.|
|`Collision Object Types`|Specifies object types the trace can collide with (e.g., `Pawn`, `WorldStatic`).|
|`Collision Profile Names to Ignore`|Ignores hits from actors with these collision profile names.|
|`Gameplay Tags to Ignore`|Ignores hits from actors with any of these `Gameplay Tags`.|
|`Actor Classes to Ignore`|Ignores hits from actors of these classes.|
|`Draw Debug Type`|Sets debug visibility for the trace (e.g., `For One Frame`, `Persistent`); used for testing.|

## Key Concepts

### Continuous Tick-Based Tracing

The `BP_TraceTarget` performs ongoing collision traces on each tick while active, detecting hits until deactivated. This is ideal for abilities or weapons requiring persistent hit detection, like a continuous beam or a prolonged melee attack.

- **Purpose**: Automates repeated tracing for dynamic combat scenarios.
- **Usage**: Activate via `ActivateCollisionByTag` and configure trace parameters in `CollisionTrace`.
- **Benefit**: Simplifies setup for continuous hit detection without manual trace management.

### Hit Event Handling

When a trace detects a valid hit, the `OnHit` event fires, allowing developers to apply `Gameplay Effects`, spawn cues, or trigger other logic. This ensures seamless integration with combat systems.

- **Purpose**: Enables custom responses to collision hits.
- **Usage**: Override `OnHit` in a child Blueprint to define hit behavior.
- **Benefit**: Provides flexibility to tailor hit reactions to specific gameplay needs.

### Trace Customization

The `BP_TraceTarget` supports customizable trace behavior through properties like `Collision Radius` and `Collision Object Types`, and by overriding `CollisionTrace`. This allows developers to adapt traces to specific use cases, such as line, sphere, or multi-trace setups.

- **Purpose**: Offers control over trace shape, targets, and filtering.
- **Usage**: Adjust properties in the Details panel or override `CollisionTrace` for custom logic.
- **Benefit**: Ensures precise collision detection tailored to project requirements.

## Best Practices

- **Workflows**:
    - Use `BP_TraceTarget` for abilities or weapons needing continuous hit detection, reserving `BP_SweepingSocketTraceTarget` for mesh-based melee attacks.
    - Test traces with `Draw Debug Type` set to `For Duration` to visualize trace paths before finalizing.
- **Pitfalls to Avoid**:
    - Always call `DeactivateCollisionByTag` to stop tracing; leaving traces active causes performance issues.
    - Don’t set `Collision Radius` too large, as it increases trace computation cost.
    - Avoid overriding `ActivateCollision` or `DeactivateCollision` without calling parent functions to ensure proper state management.
- **Performance Considerations**:
    - Limit active `BP_TraceTarget` instances by deactivating unused traces promptly.
    - Use `Collision Profile Names to Ignore` and `Actor Classes to Ignore` to reduce unnecessary trace checks.
    - Disable `Draw Debug Type` in production to eliminate debug rendering overhead.