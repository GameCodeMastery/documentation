The `SM_Humanoid_CombatBehavior` is a UObject-derived Blueprint class within the `Combat AI Behavior System` for Unreal Engine 5, extending `SM_CombatBehavior` to provide a pre-configured state machine for humanoid enemy AI behaviors in Action RPGs. It enables developers to manage complex AI behaviors, such as patrolling, chasing, attacking, and retreating, with extensive customization options. The class addresses the need for a robust, ready-to-use AI behavior framework, integrating seamlessly with `BP_BehaviorManagerComponent` in the `Advanced ARPG Combat` framework to support dynamic combat scenarios.

## Basic Usage

This section outlines how to use `SM_Behavior` to define AI behavior states within the `Combat AI Behavior System`. The following functions are essential for managing behavior states.

1. **CanEnterState**:
    
    - **Purpose**: Checks if the behavior state machine can be entered based on initialization conditions.
    - **Usage**: Override in a custom `SM_Behavior` to enforce entry requirements, returning a boolean.
    - **Example**: Ensure the AI is valid before entering.

2. **EnterState**:
    - **Purpose**: Executes logic when the behavior state machine is entered, initializing the AI behavior.
    - **Usage**: Override in a custom `SM_Behavior` to set the initial state.
    - **Example**: When the`State.Patrol` starts, run the corresponding start patrol state function.

3. **EndState**:
    - **Purpose**: Executes cleanup logic when the behavior state machine is exited.
    - **Usage**: Override in a custom `SM_Behavior` to reset behavior data.
    - **Example**: When the`State.Patrol` ends, run the corresponding end patrol state function.

4. **UpdateBehavior**:
    - **Purpose**: Updates AI behavior every Behavior Tree tick for continuous adjustments.
    - **Usage**: Override in a custom `SM_Behavior` to handle frequent behavior updates, such as movement or targeting.
    - **Example**: Transition state based on distance to player

5. **RunStateMachine**:
    - **Purpose**: Manages complex state transitions, triggered when an ability ends or explicitly called with the correct `Behavior State Machine Tag`.
    - **Usage**: Override in a custom `SM_Behavior` to define transition logic for significant state changes.
    - **Example**: Transition from `State.Idle` to `State.Chase` on target detection.

6. **OnTrackTargetUpdated**:
    
    - **Purpose**: Updates AI targeting frequently for precise behavior adjustments.
    - **Usage**: Override in a custom `SM_Behavior` to handle frequent target tracking.
    - **Example**: Adjust movement toward a target.

7. **OnBehaviorLogicStopped**:
    
    - **Purpose**: Performs cleanup when behavior logic is stopped, such as on AI death.
    - **Usage**: Override in a custom `SM_Behavior` to handle cleanup.
    - **Example**: Reset Blackboard values or clear behavior related timers

## Key Properties

| Property Name                 | Purpose                                                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `State Tag`                   | `Gameplay Tag` identifying the behavior state machine (e.g., `Behavior.Combat.Humanoid`), used for referencing in `BP_BehaviorManagerComponent`. |
| `bTrackStateActiveTime`       | If `true`, tracks the active duration of the state, accessible via `Get State Time`.                                                             |
| `Attack Distance`             | Sets the range for initiating attacks (e.g., 500 units).                                                                                         |
| `Enemy Aggression`            | Controls attack frequency, with higher values increasing attack rate.                                                                            |
| `Enemy Aggression Multiplier` | Adjusts aggression dynamically for custom scaling (e.g., for boss encounters).                                                                   |
| `Strafing Behavior Ranges`    | Defines distances for strafing during combat (e.g., close, medium).                                                                              |
| `Following Behavior Ranges`   | Sets distances for following targets (e.g., player or patrol point).                                                                             |
| `Behavior Movement Speed`     | Specifies movement speed for behaviors like chasing or patrolling.                                                                               |
| `Turning Distances`           | Determines distances for AI turning adjustments during movement.                                                                                 |
| `Return To Post Distances`    | Sets the range for returning to a patrol post after deviation.                                                                                   |
| `Retaliation Data`            | Configures retaliation behavior, such as counterattacks after damage.                                                                            |
| `Healing Behavior Data`       | Defines conditions and effects for AI healing actions.                                                                                           |
| `Enemy Defense Data`          | Sets defensive behaviors, like blocking or dodging, with associated conditions.                                                                  |

## Key Concepts

### Pre-Configured Humanoid Behaviors

The `SM_Humanoid_CombatBehavior` provides a pre-configured state machine tailored for humanoid AI, supporting states like `State.Idle`, `State.Patrol`, `State.Chase`, and `State.Attack`. This concept simplifies setup for common enemy types while still allowing customization.

- **Purpose**: Offers a ready-to-use framework for humanoid AI behaviors.
- **Usage**: Assign `SM_Humanoid_CombatBehavior` in `BP_EnemyInfo` and adjust properties like `Attack Distance`.
- **Benefit**: Accelerates development of standard enemy AI with minimal setup.

### Continuous Behavior Updates

The `UpdateBehavior` function runs every Behavior Tree tick, enabling real-time adjustments to AI actions, such as aligning to a target or adjusting movement speed. This concept ensures smooth, responsive AI behavior.

- **Purpose**: Maintains dynamic AI behavior during gameplay.
- **Usage**: Override `UpdateBehavior` to tweak continuous actions using properties like `Behavior Movement Speed`.
- **Benefit**: Enhances AI fluidity in combat and navigation.

### Complex State Transitions

The `RunStateMachine` function handles significant state transitions, triggered by ability completion or explicit calls from `BP_BehaviorManagerComponent`. This concept supports critical AI behavior shifts, like entering combat or retreating.

- **Purpose**: Manages pivotal state changes for complex AI logic.
- **Usage**: Override `RunStateMachine` to define transitions based on `Gameplay Tags` or Blackboard data.
- **Benefit**: Provides precise control over major AI state changes.

### Extensive Customization

The `SM_Humanoid_CombatBehavior` offers numerous properties (e.g., `Enemy Aggression`, `Retaliation Data`) for tailoring AI behavior without coding. This concept allows developers to create varied enemy types, from aggressive melee fighters to defensive healers.

- **Purpose**: Enables fine-tuned AI behavior for diverse roles.
- **Usage**: Configure properties in `BP_EnemyInfo` or a custom child class of `SM_Humanoid_CombatBehavior`.
- **Benefit**: Supports rapid prototyping and iteration of enemy behaviors.

## Best Practices

- **Workflows**:
    - Use `BP_EnemyInfo` to configure `SM_Humanoid_CombatBehavior` properties for consistent setup.
    - Start with demo `SM_Humanoid_CombatBehavior` to test default behaviors before creating child classes.
    - Use hierarchical `Gameplay Tags` (e.g., `Behavior.Combat.Humanoid.Attack`) for clear state transitions in `RunStateMachine`.
- **Pitfalls to Avoid**:
    - Don’t overload `UpdateBehavior` with complex logic; reserve intricate transitions for `RunStateMachine`.
    - Avoid conflicting `State Tag` values across `SM_Humanoid_CombatBehavior` instances.
    - Don’t skip setting `Retaliation Data` or `Enemy Defense Data` to ensure robust combat behavior.