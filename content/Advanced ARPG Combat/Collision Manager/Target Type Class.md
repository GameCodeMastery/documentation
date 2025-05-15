## Overview

The **Target Type (`BP_TargetType`)** class is a core building block of the Advanced Collision Manager System. It serves as a generic, Blueprint-based **collision handler** and **target resolver**, designed to manage collision logic and locate potential targets for actions such as attacks or abilities.

Target Types allow gameplay systems to query the environment for valid targets using customizable logic. These objects can be instantiated dynamically or preconfigured as reusable utility classes. The flexible architecture allows them to be extended for specialized use cases like projectile targeting, ability targeting, or proximity-based activations.

---

## Basic Usage

### Core Functions

1. **AddCollisionTargetType**
    - Registers a new target type instance with a Collision Manager Component.
    - Useful when dynamically spawning a Target Type from gameplay logic.

2. **ActivateCollision**
    - Called to start evaluating collisions or begin active processing (e.g., line traces).
    - Override this to define how your Target Type begins searching or monitoring for targets.

3. **DeactivateCollision**
    - Ends the current collision search. Often used to clean up traces or end time-based evaluations.

4. **OnCollisionTargetAdded**
    - Called when this Target Type is added to the Collision Manager.
    - Override to initialize properties or cache actor/component references.

5. **GetTarget**
    - Returns a single Actor considered the most appropriate target based on internal logic.
    - Override this to define custom targeting rules.
        
6. **GetTargets**
    - Returns an array of valid targets.
    - Useful for area-of-effect skills or logic that impacts multiple actors simultaneously.

---

## Key Properties

|Property|Purpose|
|---|---|
|CollisionRadius|Radius for collision overlap or targeting. Used in traces or spheres.|
|CollisionObjectTypes|Defines which object types the trace or search will interact with.|
|CollisionProfileNamesToIgnore|List of collision profiles to skip during trace evaluation.|
|GameplayTagsToIgnore|Actors with these tags will be excluded from targeting results.|
|ActorClassesToIgnore|Actor class filter to skip unwanted targets.|

---

## Key Concepts

### Custom Target Acquisition

The primary function of a Target Type is to acquire targets through overridden logic in `GetTarget` or `GetTargets`. These can be implemented with logic such as:

- Sphere Overlaps
- Line Traces
- Gameplay Tag checks
- Custom pathfinding or visibility constraints

**Example Use Case:**

```blueprint
Override GetTarget:
- Perform Sphere Overlap around performing actor
- Filter results by tag and class
- Return closest valid actor
```

### Utility Across Gameplay Systems

Target Types are designed to be reusable. They are especially useful in systems like:

- **Gameplay Abilities**: Determine the best target during activation
- **Combat System**: Define AOE or single-target impact zones
- **Interaction Systems**: Select the nearest interactable object

### Stateless Design

By default, `BP_TargetType` is stateless between calls to `GetTarget` or `GetTargets`, making it lightweight. However, you can store persistent data (e.g., references, context) in your subclass as needed.

### Extendability

To implement custom targeting logic:

1. Create a child class of `BP_TargetType`.
2. Override `GetTarget` and/or `GetTargets` with your desired logic.
3. Optionally override `ActivateCollision` for persistent or dynamic scans.
4. Add the class to a Collision Component via `AddCollisionTargetType`.

---

## Best Practices

- When creating custom Target Types, prefix them clearly (e.g., `TT_AOE_Cone`, `TT_SingleLineTrace`).
- Reuse logic with Blueprint Functions or Macros when implementing trace filters.
- Avoid complex logic in `GetTarget` if it's reused frequently; optimize where needed.
- Use `DeactivateCollision` responsibly to avoid memory and performance issues.
- Use gameplay tags to modularly define filter conditions.

---

## Notes

- `BP_TargetType` is fully Blueprint extendable.
- Intended to be used as a building block for modular targeting systems.
- Works independently or in coordination with the Advanced Collision Component.
- Often used in abilities, weapon collision, or interaction detection systems.

---