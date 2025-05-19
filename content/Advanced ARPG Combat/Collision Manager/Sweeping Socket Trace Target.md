The `BP_SweepingSocketTraceTarget` class in the `Collision Manager` system is a Blueprint class derived from `BP_TraceTarget`, designed to handle precise collision tracing for sweeping melee attacks, such as weapon swings or fist strikes, in Action RPGs. It enables developers to create accurate hit detection by tracing along a mesh’s sockets, ensuring collisions align with attack animations. This class addresses the need for realistic, mesh-based collision detection, integrating with the `BP_CollisionComponent` to support dynamic combat mechanics.

## Basic Usage

The `BP_SweepingSocketTraceTarget` is used by adding it to a `BP_CollisionComponent`, setting a mesh and sockets, and activating it via animations or abilities. Below are the primary functions for interacting with it in Blueprints.

1. **ActivateCollision**:
    - **Purpose**: Starts the tick-based collision trace along the specified mesh sockets.
    - **Usage**: Call via `ActivateCollisionByTag` on `BP_CollisionComponent`, often triggered by `ANS_CollisionTrace`.
    - **Example**:
```blueprint
Animation Blueprint -> Play Anim_SwordSwing -> ANS_CollisionTrace (Collision Target Tag: Collision.SwordTrace) -> ActivateCollisionByTag (GameplayTag: Collision.SwordTrace)
 ```

2. **DeactivateCollision**:
    - **Purpose**: Stops the collision trace and cleans up.
    - **Usage**: Call via `DeactivateCollisionByTag` or automatically via `ANS_CollisionTrace` when the animation ends.
    - **Example**:
```blueprint
EndAbility -> Get Component By Class (Class: BP_CollisionComponent) -> DeactivateCollisionByTag (GameplayTag: Collision.SwordTrace)
```

3. **CollisionTrace**:
    - **Purpose**: Performs the tick-based trace along the mesh’s socket paths to detect hits.
    - **Usage**: Override in a child Blueprint to customize trace behavior (e.g., adjust trace shape or path).
    - **Example**:
```blueprint
 CollisionTrace -> Multi Line Trace By Channel (TraceChannel: Weapon, Start: Socket BladeStart, End: Socket BladeEnd) -> Process Hits
 ```

4. **OnHit**:
    - **Purpose**: Executes logic when the trace hits a valid target.
    - **Usage**: Override to apply `Gameplay Effects` or trigger events on hit.
    - **Example**:
```blueprint
 OnHit -> Apply Gameplay Effect By Class (Class: GE_DamageEffect, Target: Hit Actor)
```

5. **SetCollisionProperties**:
    - **Purpose**: Configures the mesh and sockets for tracing.
    - **Usage**: Call after adding the target type to set the weapon mesh and socket names.
    - **Example**:
```blueprint
AddCollisionTargetType (TargetTypeClass: BP_SweepingSocketTraceTarget) -> SetCollisionProperties (Mesh: SkeletalMeshComponent, Sockets: BladeStart, BladeEnd)
 ```


## Key Properties

|Property Name|Purpose|
|---|---|
|`Collision Radius`|Defines the radius of the trace (e.g., for sphere or capsule traces); adjusts hit detection size.|
|`Collision Object Types`|Specifies object types the trace can collide with (e.g., `Pawn`, `WorldStatic`).|
|`Collision Profile Names to Ignore`|Ignores hits from actors with these collision profile names.|
|`Gameplay Tags to Ignore`|Ignores hits from actors with any of these `Gameplay Tags`.|
|`Actor Classes to Ignore`|Ignores hits from actors of these classes.|
|`Draw Debug Type`|Sets debug visibility for the trace (e.g., `For One Frame`, `Persistent`); used for testing.|

## Key Concepts

### Mesh-Based Socket Tracing

The `BP_SweepingSocketTraceTarget` traces collisions along paths defined by a mesh’s sockets (e.g., blade start to end), ensuring hit detection matches the weapon’s visual motion. This is ideal for melee attacks requiring precise, animation-driven hit boxes.

- **Purpose**: Aligns collision detection with weapon mesh animations for realistic combat.
- **Usage**: Set the mesh and sockets via `SetCollisionProperties` and activate via `ANS_CollisionTrace`.
- **Benefit**: Enhances visual fidelity and hit accuracy for melee attacks.

### Animation-Driven Collision

The class integrates with `ANS_CollisionTrace` to activate/deactivate traces during specific animation frames, ensuring collisions occur only when the attack visually connects. This ties hit detection to animation timing.

- **Purpose**: Synchronizes hit boxes with attack animations.
- **Usage**: Use `ANS_CollisionTrace` in animations with the correct `Collision Target Tag`.
- **Benefit**: Improves gameplay feel by matching collision to visual cues.

### Customizable Hit Responses

The `OnHit` event allows developers to define custom responses to hits, such as applying `Gameplay Effects` or spawning `Gameplay Cues`. This flexibility supports varied combat mechanics, like different damage types or status effects.

- **Purpose**: Enables tailored hit reactions for specific weapons or abilities.
- **Usage**: Override `OnHit` in a child Blueprint to implement custom logic.
- **Benefit**: Supports diverse combat interactions with minimal setup.

## Best Practices

- **Workflows**:
    - Use `BP_SweepingSocketTraceTarget` for melee weapons with skeletal meshes, reserving `BP_TraceTarget` for non-mesh-based traces.
    - Define clear socket names (e.g., `BladeStart`, `BladeEnd`) in the mesh to simplify `SetCollisionProperties` setup.
    - Test with `ANS_CollisionTrace` and debug visuals (`Draw Debug Type`) to ensure traces align with animations.
- **Pitfalls to Avoid**:
    - Always call `SetCollisionProperties` with valid mesh and sockets; missing sockets cause trace failures.
    - Don’t leave traces active beyond their intended duration; use `DeactivateCollisionByTag` or `ANS_CollisionTrace` to stop them.
    - Avoid excessive socket counts in `SetCollisionProperties` to prevent performance overhead.
- **Performance Considerations**:
    - Minimize active `BP_SweepingSocketTraceTarget` instances by deactivating unused traces promptly.
    - Use `Collision Profile Names to Ignore` and `Gameplay Tags to Ignore` to filter irrelevant hits.
    - Set `Draw Debug Type` to `None` in production to eliminate debug rendering costs.