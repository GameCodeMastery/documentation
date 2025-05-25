---
aliases:
  - BP_BaseState
---

The `BP_BaseState` is a UObject-derived Blueprint class within the `State Manager System` for Unreal Engine 5, designed to define and manage individual states for actors, such as characters or AI, in Action RPGs. It enables developers to specify behavior when entering or exiting a state and supports transitions between states, providing a modular framework for state-driven logic. The class addresses the need for reusable, customizable state behaviors, simplifying the creation of states like idle, attacking, or stunned, and ensuring seamless integration with the `BP_StateManagerComponent`.

## Basic Usage

This section outlines how to use `BP_BaseState` to define and manage state behaviors within the `State Manager System`. The following functions are essential for interacting with states.

1. **CanEnterState**:
    - **Purpose**: Checks if the state can be entered based on defined conditions.
    - **Usage**: Override in a custom `BP_BaseState` to enforce entry requirements, returning a boolean.
    - **Example**: In `BP_State_Attack`, ensure the character is alive before entering.

2. **EnterState**:
    - **Purpose**: Executes logic when the state is entered, such as starting animations or effects.
    - **Usage**: Override in a custom `BP_BaseState` to define entry behavior.
    - **Example**: In `BP_State_Attack`, play an attack animation.

3. **EndState**:
    - **Purpose**: Executes cleanup logic when the state is exited.
    - **Usage**: Override in a custom `BP_BaseState` to reset or disable effects.
    - **Example**: In `BP_State_Attack`, stop the animation.

4. **Run State Machine**:
    - **Purpose**: Manages transitions to other states based on conditions.
    - **Usage**: Override in a custom `BP_BaseState` to define transition logic.
    - **Example**: In `BP_State_Idle`, transition to `State.Attack` on input.

5. **Get State Time**:
    - **Purpose**: Returns the duration the state has been active, if `bTrackStateActiveTime` is enabled.
    - **Usage**: Call in Blueprints to query state duration for timed logic.
    - **Example**: In `BP_State_Stun`, check if stun duration exceeds 3 seconds.

## Key Properties

| Property Name           | Purpose                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `State Tag`             | `Gameplay Tag` identifying the state (e.g., `State.Attack`), used for searching or triggering states. |
| `bTrackStateActiveTime` | If `true`, tracks the active duration of the state, accessible via `Get State Time`.                  |


## Key Concepts

### State Entry and Exit

The `BP_BaseState` defines behavior when an actor enters or exits a state, controlled by `EnterState` and `EndState`. This concept allows developers to encapsulate state-specific logic, such as playing animations or applying effects, ensuring modular and reusable state behavior.

- **Purpose**: Provides a framework for state-specific actions at entry and exit.
- **Usage**: Override `EnterState` and `EndState` in custom states to implement gameplay logic.
- **Benefit**: Simplifies state management by isolating behavior within state classes.

### State Transition Logic

The `BP_BaseState` supports transitions to other states via `Run State Machine`, enabling dynamic state changes based on conditions like input or events. This concept is critical for creating finite state machines within individual states or in conjunction with `BP_StateMachine`.

- **Purpose**: Facilitates state transitions to support complex actor behaviors.
- **Usage**: Override `Run State Machine` to define conditions for transitioning to other states.
- **Benefit**: Enhances flexibility in state-driven systems, especially for AI or player mechanics.

### State Validation

The `CanEnterState` function ensures a state can only be entered under valid conditions, preventing invalid state transitions. This concept is essential for maintaining game state integrity, such as blocking attacks when a character is stunned.

- **Purpose**: Enforces constraints on state entry to avoid incorrect behavior.
- **Usage**: Override `CanEnterState` to check conditions like actor status or resources.
- **Benefit**: Reduces bugs by ensuring states are only entered when appropriate.

### Time Tracking

The `bTrackStateActiveTime` property and `Get State Time` function allow states to track their active duration, enabling timed behaviors like temporary buffs or stuns. This concept supports precise control over state duration in gameplay.

- **Purpose**: Tracks how long a state has been active for time-based logic.
- **Usage**: Enable `bTrackStateActiveTime` and use `Get State Time` in state logic.
- **Benefit**: Simplifies implementation of timed state effects.

## Best Practices

- **Workflows**:
    - Use descriptive `State Tag` names (e.g., `State.Combat.Attack`) for clarity and organization.
    - Test state transitions with demo states before creating custom ones to understand expected behavior.
    - Bind `On State Begin` and `On State End` in `BP_StateManagerComponent` to debug state changes.
- **Pitfalls to Avoid**:
    - Don’t skip overriding `CanEnterState`; always define entry conditions to prevent invalid states.
    - Avoid complex logic in `EnterState` or `EndState`; delegate transitions to `Run State Machine`.
    - Don’t enable `bTrackStateActiveTime` for states that don’t require timing to save performance.