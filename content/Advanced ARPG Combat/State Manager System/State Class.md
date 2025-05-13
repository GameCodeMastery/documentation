# Base State Documentation
The `BP_BaseState` class in the State Manager System, designed for Unreal Engine 5, is a UObject-derived Blueprint that defines the logic for a specific state of an actor, such as idle, attacking, or stunned, in complex Action RPGs. Its purpose is to provide a modular, reusable framework for encapsulating state-specific behaviors, including what happens when a state is entered, executed, or ended, and how transitions to other states are managed. By enabling developers to create custom states as child Blueprints, it supports dynamic and flexible state-driven gameplay mechanics.

This compound data type addresses the need for organized, maintainable state logic within the State Manager System, solving the problem of implementing multiple states and their transitions without cluttering actor Blueprints. It is particularly valuable for scenarios requiring distinct behaviors, such as AI state machines or player character states, and integrates seamlessly with the `BP_StateManagerComponent` to manage state activation and transitions (see State Manager Documentation).

---

## Basic Usage

The `BP_BaseState` class is used to define the behavior of a state within an actor’s `BP_StateManagerComponent`. It is activated via `EnterStateByTag` or `EnterStateByClass`, executes custom logic, and supports transitions to other states. Below are the key functions, their purposes, and how they can be used in Blueprints.

1. **CanEnterState**
    - **Purpose**: Checks if the state can be entered based on custom conditions (e.g., attribute values, Gameplay Tags).
    - **Usage**:
        - Override to enforce prerequisites before entering the state.
        - Example: In `BP_AttackState`, verify the actor has sufficient health.

            ```blueprint
            CanEnterState -> Get Owner -> Get Current Attribute Value (AttributeTag: Attribute.Health) -> Branch (Condition: Health > 0) -> True: Return True
            ```

2. **EnterState**
    - **Purpose**: Executes the logic associated with entering the state, such as spawning effects or updating actor properties.
    - **Usage**:
        - Override to define custom behavior when the state begins. This is the primary function for state-specific functionality.
        - Example: In `BP_AttackState`, spawn an attack animation and effect.
            ```blueprint
            EnterState -> Play Animation (Animation: AttackMontage) -> Spawn Emitter at Location (Emitter: AttackEffect)
            ```

3. **EndState**
    - **Purpose**: Executes cleanup logic when the state ends, such as stopping effects or resetting variables.
    - **Usage**:
        - Override to define behavior when exiting the state. Ensure cleanup is thorough to avoid lingering effects.
        - Example: In `BP_AttackState`, stop effects and reset variables.
            ```blueprint
            EndState -> Stop Emitter at Location (Emitter: AttackEffect) -> Set Variable (IsAttacking: False)
            ```

4. **Run State Machine**
    - **Purpose**: Manages transitions to other states based on conditions or inputs, typically used in state machine-like behavior.
    - **Usage**:
        - Override to define transition logic, calling `Enter State` on the desired state via `BP_StateManagerComponent`.
        - Example: In `BP_IdleState`, transition to `State.Attack` on input.
            ```blueprint
            Run State Machine -> Get BP_StateManagerComponent -> Has Input Atom (InputAtomTag: Input.Attack) -> Branch (Condition: True) -> Enter State By Tag (StateTag: State.Attack)
            ```

5. **Get State Time**
    - **Purpose**: Returns the duration the state has been active, if `bTrackStateActiveTime` is enabled.
    - **Usage**:
        - Use to implement time-based logic, such as expiring a state after a duration.
        - Example: In `BP_StunnedState`, end the state after 3 seconds.
            ```blueprint
            Event Tick -> Get State Time -> Branch (Condition: Time >= 3) -> Get BP_StateManagerComponent -> Enter State By Tag (StateTag: State.Idle)
            ```


---

## Key Properties

|Property Name|Purpose|
|---|---|
|`State Tag`|The Gameplay Tag identifying the state (e.g., `State.Attack`). Used to activate or reference the state via `Enter State By Tag` or `Run State Machine By Tag`.|
|`bTrackStateActiveTime`|If true, tracks the duration the state has been active, accessible via `Get State Time`. Useful for timed behaviors like temporary buffs or debuffs.|

---

## Key Concepts

### Modular State Logic

`BP_BaseState` enables modular state logic by encapsulating all behavior for a state (entering, executing, ending, and transitioning) within a single UObject-derived Blueprint. This modularity allows developers to create, modify, or replace states without altering the broader State Manager System, enhancing maintainability and scalability.

- **Implementation**: Create a child Blueprint (e.g., `BP_AttackState`) and override `EnterState`, `EndState`, and optionally `Run State Machine` to define behavior:
    
    ```blueprint
    EnterState -> Play Animation (Animation: AttackMontage) -> Spawn Emitter at Location (Emitter: AttackEffect)
    EndState -> Stop Emitter at Location (Emitter: AttackEffect)
    ```
    
- **Use Cases**: Player states (e.g., attacking, dodging), AI states (e.g., patrolling, pursuing), or environmental states (e.g., active, disabled).
- **Best Practices**: Keep state logic self-contained to ensure reusability. Use `State Tag` consistently to align with `BP_StateManagerComponent` calls. Test state entry and exit to avoid side effects.

### Dynamic State Creation

The State Manager System supports creating states dynamically without predefined `BP_BaseState` classes, allowing flexibility for rapid prototyping or runtime state generation. When `EnterStateByTag` is called with a new tag, a state is created at runtime, and functionality is driven by `BP_StateManagerComponent` dispatchers (`OnStateBegin`, `OnStateEnd`).

- **How It Works**: Call `EnterStateByTag` with a tag not associated with a `State Classes` entry:
    ```blueprint
    Event BeginPlay -> Get BP_StateManagerComponent -> Enter State By Tag (StateTag: State.Custom)
    On State Begin (StateTag) -> Print String (Entered State: StateTag)
    ```

- **Use Cases**: Temporary states (e.g., a one-off event state), prototyping new states, or supporting modding systems where states are defined externally.
- **Best Practices**: Use dispatchers (`On State Begin`, `On State End`) to add logic for runtime states, as no custom `EnterState` or `EndState` exists. Document dynamic tags to maintain clarity in complex systems.

### State Transitions

`BP_BaseState` supports state transitions through the `RunStateMachine` function, which can be overridden to define conditions for moving to other states. This is particularly useful for creating finite state machines, such as AI behavior, where states transition based on inputs or game events.

- **Implementation**: Override `RunStateMachine` to check conditions (e.g., `InputAtom` presence) and call `EnterState`:
    ```blueprint
    Run State Machine -> Get BP_StateManagerComponent -> Has Input Atom (InputAtomTag: Input.EnemyDetected) -> Branch (Condition: True) -> Enter State By Tag (StateTag: State.Pursue)
    ```

- **Use Cases**: AI state machines (e.g., transitioning from `State.Idle` to `State.Pursue` on enemy detection), player combo systems (e.g., chaining attack states), or timed state changes (e.g., exiting `State.Stunned` after `Get State Time` exceeds a threshold).
- **Best Practices**: Ensure `CanEnterState` is robust to prevent invalid transitions. Test transition paths to avoid infinite loops or stuck states. For complex transitions, consider using `BP_StateMachine` (see State Manager System Documentation).

### Integration with State Manager Component

`BP_BaseState` is designed to work with `BP_StateManagerComponent`, which manages state activation and tracks the current state. States are either predefined in the `State Classes` array or created dynamically, and their execution is triggered by `EnterStateByTag` or `EnterStateByClass`.

- **How It Works**: The `BP_StateManagerComponent` activates a state, which runs its `EnterState` logic and tracks its duration (if `bTrackStateActiveTime` is true). The state can trigger transitions via `Run State Machine` or end via `EndState`.
- **Example**: Activate and manage an attack state:
    ```blueprint
    InputAction IA_Attack (Pressed) -> Get BP_StateManagerComponent -> Enter State By Tag (StateTag: State.Attack)
    // In BP_AttackState
    EnterState -> Play Animation (Animation: AttackMontage)
    EndState -> Stop Animation (Animation: AttackMontage)
    ```

- **Use Cases**: Synchronizing states with abilities (e.g., requiring `State.Alive` for ability activation), updating UI based on state changes, or driving AI behavior.
- **Best Practices**: Use `Is State Equal To Any` to check the current state before triggering actions:
    ```blueprint
    Event Tick -> Get BP_StateManagerComponent -> Is State Equal To Any (Tags: State.Attack) -> Branch (Condition: True) -> Perform Action
    ```