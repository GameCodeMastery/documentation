This guide provides step-by-step instructions for integrating the `Collision Manager` into an Unreal Engine 5 project, enabling trace hit detection and target selection for weapons and abilities in Action RPGs. Users will learn how to set up the system, add default collision target types to actors, and test core functionality using preconfigured assets. The guide focuses on enabling the system as it functions in the demo content, ensuring developers and designers can quickly implement collision and targeting mechanics.

### Prerequisites

- Unreal Engine 5.3 or later.
- Enhanced Input System enabled (default in UE5 templates).
- A pawn Blueprint (e.g., `BP_PlayerCharacter`) and a weapon Blueprint (e.g., `BP_Sword`) for testing collisions.
- No additional plugins required.

### Integration Steps

1. **Migrate the CollisionSystem Folder**:
    
    - In the Unreal Editor, open the demo project containing the `Collision Manager`.
    - In the Content Browser, locate the `CollisionSystem` folder.
    - Right-click and select **Migrate**, then choose your project’s `Content` directory.
    - Ensure all dependencies (e.g., Blueprints, Animation Notifies) are copied correctly.

2. **Add `BP_CollisionComponent` to Actor**:
    - Open your pawn Blueprint (e.g., `BP_PlayerCharacter`).
    - In the Components panel, click **Add Component** and select `BP_CollisionComponent`.
    - In the Details panel of `BP_CollisionComponent`, add default target types to the `DefaultTargetTypes` array (e.g., `BP_TraceTarget` with tag `Collision.DefaultTrace`) or `DefaultTargetTypeMap` (e.g., map `Collision.SwordTrace` to `BP_SweepingSocketTraceTarget`).


> [!NOTE] NOTE:
> If using with Advanced ARPG Combat System, default collision component target types are configured through the Enemy Info Data Asset and Player Info Data Asset by default for enemies and players


3. **Configure Weapon with Default Collision**:
    - Open your weapon Blueprint (e.g., `BP_Sword`).
    - Ensure it has a `SkeletalMeshComponent` with sockets defined (e.g., `StartSocket`, `EndSocket`) for `BP_SweepingSocketTraceTarget`.
    - In the weapon’s Class Defaults, search for `Collision Trace Class` and set the default target type for the weapon:
```blueprint
// Class Defaults | Initialization
- CollisionTraceTarget = BP_MyCollisionTraceTarget
```

- Optionally, in the weapon’s Event Graph, on `Event BeginPlay`, get the owner’s `BP_CollisionComponent` and add a default target type:
```blueprint
Event BeginPlay -> Get Owner -> Get Component By Class (Class: BP_CollisionComponent) -> AddCollisionTargetType (TargetTypeTag: Collision.SwordTrace, TargetTypeClass: BP_SweepingSocketTraceTarget, PerformingActor: Self)
 ```

- Call `SetCollisionProperties` to set the weapon mesh and sockets:

```blueprint
 AddCollisionTargetType -> SetCollisionProperties (Mesh: SkeletalMeshComponent, Sockets: StartSocket, EndSocket)
```

4. **Set Up Animation Notify for Melee Collision**:
    - Open an attack animation (e.g., `Anim_SwordSwing`) included in the demo content.
    - Add an `ANS_CollisionTrace` Anim Notify State to the desired frames where the attack should detect hits.
    - In the Notify’s Details panel, set:
        - `Collision Target Tag`: `Collision.SwordTrace`
        - `Attack Data`: Optional; leave as null to use default trace settings.
        - `Trace Radius Modifier`: 0 (or adjust for wider/narrower traces).
    - Verify the animation is assigned to an Animation Blueprint used by `BP_PlayerCharacter`.

5. **Configure Enhanced Input for Ability Targeting**:
    - In **Project Settings > Input**, create an **Input Action** (e.g., `IA_TargetAbility`).
    - Create an **Input Mapping Context** (e.g., `IMC_Combat`) and map `IA_TargetAbility` to a key (e.g., Left Mouse Button).
    - In `BP_PlayerCharacter`’s Event Graph, on `Event BeginPlay`, add the `IMC_Combat` mapping context:
```blueprint
Event BeginPlay -> Get Player Controller -> Add Mapping Context (IMC_Combat)
```

- Bind `IA_TargetAbility` to query targets using `FindTargetsByClass`:

```blueprint
Enhanced Input Action (IA_TargetAbility) -> Get Component By Class (Class: BP_CollisionComponent) -> FindTargetsByClass (Class: BP_TargetType) -> Store Targets for Ability
```

6. **Test with Default Assets**:
    - Place `BP_PlayerCharacter` in a level with a weapon (e.g., `BP_Sword`) equipped.
    - Ensure `BP_CollisionComponent` on `BP_PlayerCharacter` has a default target type (e.g., `BP_SweepingSocketTraceTarget` for `Collision.SwordTrace`).
    - Add an enemy actor (e.g., `BP_Enemy`) from the demo content to the level.
    - Play the level and trigger the attack animation (via input or ability) to test melee collision; verify hits register (e.g., enemy takes damage).
    - Press the `IA_TargetAbility` key to test target selection; confirm a target is returned for ability use.

## Troubleshooting

- **Collisions Don’t Register**:
    - Verify `BP_CollisionComponent` is added to the owning actor (e.g., `BP_PlayerCharacter`) and initialized with `DefaultTargetTypes` or `AddCollisionTargetType`.
    - Ensure `BP_SweepingSocketTraceTarget` has valid sockets set via `SetCollisionProperties`.
    - Check that `ANS_CollisionTrace` uses the correct `Collision Target Tag` matching the target type.
- **Target Selection Fails**:
    - Confirm `FindTargetsByClass` uses the correct `BP_TargetType` class and the actor has a `BP_CollisionComponent`.
    - Ensure `Collision Object Types` and `Gameplay Tags to Ignore` in the target type are set to include desired targets.
- **Animation Notify Not Triggering**:
    - Verify the animation is played via the Animation Blueprint and `ANS_CollisionTrace` is placed on the correct frames.
    - Check that the `Collision Target Tag` in `ANS_CollisionTrace` matches the target type tag in `BP_CollisionComponent`.

## Best Practices

- **Workflows**:
    - Use `DefaultTargetTypeMap` or `DefaultTargetTypes` in `BP_CollisionComponent` to preconfigure common target types for quick setup.
    - Test collision with demo assets (e.g., `BP_Sword`, `Anim_SwordSwing`) before integrating with custom animations or weapons.
- **Pitfalls to Avoid**:
    - Always call `DeactivateCollisionByTag` for `BP_TraceTarget` or `BP_SweepingSocketTraceTarget` to stop tracing and prevent performance issues.
    - Don’t skip setting `Performing Actor` in `AddCollisionTargetType` for weapons, as it’s required for correct collision context.
    - Avoid adding `BP_CollisionComponent` to weapons unless necessary (e.g., projectiles); use the owner’s component instead.
- **Performance Considerations**:
    - Limit the number of active `BP_TraceTarget` or `BP_SweepingSocketTraceTarget` instances by deactivating unused traces.
    - Use `Collision Profile Names to Ignore` and `Actor Classes to Ignore` to reduce unnecessary collision checks.
    - Set `Draw Debug Type` to `None` in production to disable debug visuals for `BP_TraceTarget`.