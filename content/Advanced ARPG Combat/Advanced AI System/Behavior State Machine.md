The `SM_Behavior` is a UObject-derived Blueprint class within the `Combat AI Behavior System` for Unreal Engine 5, extending `BP_StateMachine` to define and manage AI behavior states for enemies in Action RPGs. It serves as the base class for state machines like `SM_Humanoid_CombatBehavior`, enabling developers to control AI state transitions and behaviors, such as patrolling, attacking, or retreating. The class addresses the need for flexible, modular AI behavior management, integrating with `BP_BehaviorManagerComponent` to drive complex enemy interactions in the `Advanced ARPG Combat` framework.

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

| Property Name           | Purpose                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `State Tag`             | `Gameplay Tag` identifying the state (e.g., `State.Attack`), used for searching or triggering states. |
| `bTrackStateActiveTime` | If `true`, tracks the active duration of the state, accessible via `Get State Time`.                  |

## Key Concepts

### Continuous Behavior Updates

The `UpdateBehavior` function runs every Behavior Tree tick, enabling continuous AI behavior adjustments, such as updating movement or orientation. This concept is essential for maintaining smooth, responsive AI in dynamic combat scenarios.

- **Purpose**: Supports frequent updates for real-time AI behavior.
- **Usage**: Override `UpdateBehavior` to adjust AI actions based on Blackboard values or environmental conditions.
- **Benefit**: Ensures AI remains reactive during fast-paced gameplay.

### Complex State Transitions

The `RunStateMachine` function handles significant state transitions, triggered by ability completion or explicit calls from `BP_BehaviorManagerComponent`. This concept allows developers to define critical AI state changes, such as switching from idle to combat modes.

- **Purpose**: Facilitates major state changes for complex AI behaviors.
- **Usage**: Override `RunStateMachine` to define transitions using `Gameplay Tags` or Blackboard data.
- **Benefit**: Provides precise control over pivotal AI behavior shifts.

### Target Tracking

The `OnTrackTargetUpdated` function supports frequent updates to AI targeting, ensuring precise movement and combat adjustments. This concept is critical for tight AI behaviors, such as tracking a moving player.

- **Purpose**: Maintains accurate targeting for dynamic AI interactions.
- **Usage**: Override `OnTrackTargetUpdated` to adjust AI positioning or actions.
- **Benefit**: Enhances AI responsiveness in fast-paced combat.

### Behavior Customization

The `SM_Behavior` allows customization of AI behaviors through several useful customizable functions. This concept enables developers to tailor AI without modifying core logic, using `BP_EnemyInfo` or child classes like `SM_Humanoid_CombatBehavior`.

- **Purpose**: Provides flexible behavior tuning for different enemy types.
- **Usage**: Adjust properties in `BP_EnemyInfo` or a custom `SM_Behavior` child class.
- **Benefit**: Streamlines AI configuration for varied gameplay roles.

### Behavior Synchronization

The state machine provides high-level context that the Behavior Tree can reference. For example, if the current state is "Strafe" or "Retreat", the Behavior Tree can use this context to branch into appropriate logic by checking a blackboard key.

This allows the FSM and Behavior Tree to operate in tandem and stay aligned.

## Best Practices

- **Workflows**:
    - Use `BP_EnemyInfo` to set `SM_Behavior` properties for consistent configuration.
    - Test transitions with demo `SM_Humanoid_CombatBehavior` before creating custom behaviors.
    - Leverage `Gameplay Tags` (e.g., `Behavior.Combat.Attack`) for clear state identification in `RunStateMachine`.
- **Pitfalls to Avoid**:
    - Don’t overload `UpdateBehavior` with complex logic; reserve intricate transitions for `RunStateMachine`.
    - Avoid duplicate `State Tag` values across `SM_Behavior` instances to prevent conflicts.
    - Don’t skip overriding `CanEnterState` to ensure valid state entry.