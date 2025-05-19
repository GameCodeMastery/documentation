
The `BP_TargetType` class in the `Collision Manager` system is a Blueprint base class designed to handle custom target selection for [[Advanced Gameplay Ability|Gameplay Abilities]] and [[Gameplay Effects]] in Action RPGs. It enables developers to define flexible, one-off target searches or integrate with other systems for combat targeting, such as lock-on or AoE mechanics. This class addresses the need for modular, reusable target selection logic, integrating with the `BP_CollisionComponent` to streamline ability and effect targeting.

## Basic Usage

The `BP_TargetType` is used by adding it to a `BP_CollisionComponent` and overriding its target selection functions. Below are the primary functions for interacting with it in Blueprints.

1. **AddCollisionTargetType**:
    - **Purpose**: Adds the target type to the `BP_CollisionComponent` for use in collision or targeting logic.
    - **Usage**: Call on `BP_CollisionComponent` to register the target type with a `Gameplay Tag`.
    - **Example**:
 ```blueprint
 Event BeginPlay -> Get Component By Class (Class: BP_CollisionComponent) -> AddCollisionTargetType (TargetTypeTag: Collision.MyTarget, TargetTypeClass: BP_TargetType, PerformingActor: Self)
 ```

2. **GetTarget**:
    - **Purpose**: Returns a single target based on custom selection logic.
    - **Usage**: Override in a child Blueprint to define how a target is selected (e.g., closest enemy).
    - **Example**:
```blueprint
GetTarget -> Line Trace By Channel (TraceChannel: Visibility, Start: ActorLocation, End: ActorLocation + ForwardVector * 1000) -> Return Hit Actor
 ```

3. **GetTargets**:
    - **Purpose**: Returns multiple targets based on custom selection logic.
    - **Usage**: Override to return a list of targets (e.g., all enemies in a radius).
    - **Example**:
```blueprint
 GetTargets -> Sphere Trace By Channel (TraceChannel: Pawn, Radius: 500, Location: ActorLocation) -> Return Hit Actors
 ```

4. **ActivateCollision**:
    - **Purpose**: Executes custom logic associated with the target type, if needed.
    - **Usage**: Override for specific behavior when the target type is activated.
    - **Example**:
 ```blueprint
ActivateCollision -> Spawn Emitter At Location (Emitter: TargetIndicator)
 ```

5. **OnCollisionTargetAdded**:
    - **Purpose**: Initializes data when the target type is added to the `BP_CollisionComponent`.
    - **Usage**: Override to store references or set up initial state.
    - **Example**:
```blueprint
OnCollisionTargetAdded -> Set Variable (PerformingActorReference: PerformingActor)
```

## Key Properties

|Property Name|Purpose|
|---|---|
|`Collision Radius`|Defines the radius for collision detection (e.g., for sphere traces); adjustable for target search area.|
|`Collision Object Types`|Specifies object types the target selection can detect (e.g., `Pawn`, `WorldStatic`).|
|`Collision Profile Names to Ignore`|Ignores targets with these collision profile names.|
|`Gameplay Tags to Ignore`|Ignores targets with any of these `Gameplay Tags`.|
|`Actor Classes to Ignore`|Ignores targets of these actor classes.|

## Key Concepts

### Custom Target Selection

The `BP_TargetType` allows developers to define bespoke target selection logic by overriding `GetTarget` or `GetTargets`. This is ideal for abilities requiring specific targeting, such as selecting the closest enemy or all targets in an AoE.

- **Purpose**: Provides flexible targeting for abilities and effects.
- **Usage**: Create a child Blueprint and override `GetTarget` or `GetTargets` to implement custom logic.
- **Benefit**: Enables tailored targeting without modifying core ability logic.

### Integration with Abilities

The class integrates with the `Advanced Abilities Framework` by providing targets for `Gameplay Abilities` and `Gameplay Effects` via `FindTargetsByClass` on `BP_CollisionComponent`. This ensures seamless ability targeting.

- **Purpose**: Links target selection to ability execution.
- **Usage**: Call `FindTargetsByClass` in an ability to retrieve targets from a `BP_TargetType`.
- **Benefit**: Streamlines ability targeting with minimal setup.

### Modular Collision Handling

The `BP_TargetType` can be added to a `BP_CollisionComponent` to handle both targeting and collision logic, supporting one-off searches or reusable targeting templates. This modularity supports diverse combat scenarios.

- **Purpose**: Enables reusable and project-specific target types.
- **Usage**: Add via `AddCollisionTargetType` and configure with unique `TargetTypeTag`.
- **Benefit**: Reduces duplication and enhances system scalability.

## Best Practices

- **Workflows**:
    - Use `BP_TargetType` for one-off or ability-specific targeting, reserving `BP_TraceTarget` or `BP_SweepingSocketTraceTarget` for continuous collision needs.
    - Test target selection with simple traces (e.g., line or sphere) before implementing complex logic in `GetTarget` or `GetTargets`.
    - Organize `TargetTypeTag` names (e.g., `Collision.Ability.LockOn`) for clarity and consistency.
- **Pitfalls to Avoid**:
    - Don’t skip overriding `GetTarget` or `GetTargets` in child Blueprints, as the base class provides no default logic.
    - Avoid overly broad `Collision Object Types` to prevent detecting irrelevant targets.
    - Don’t reuse `TargetTypeTag` values across different target types to avoid conflicts.
- **Performance Considerations**:
    - Limit the scope of `Collision Radius` and `Collision Object Types` to reduce unnecessary target checks.
    - Use `Gameplay Tags to Ignore` and `Actor Classes to Ignore` to filter out irrelevant targets efficiently.
    - Cache references set in `OnCollisionTargetAdded` to avoid repeated lookups during target selection.