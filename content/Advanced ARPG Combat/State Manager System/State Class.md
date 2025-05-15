The `BP_BaseState` is the foundational class used by the Advanced State Manager system to define actor states. It is a Blueprint based `UObject` that encapsulates the logic and behavior for individual states. By extending this class, developers can modularly define what should happen when an actor enters or exits a state, and optionally dictate transitions between states.

This class is critical to building finite state machines (FSMs) that manage actor behavior, AI patterns, animation states, or game mechanics in Unreal Engine 5 projects. It allows states to remain cleanly separated and reusable.

---

## Basic Usage

To use `BP_BaseState`, create a child Blueprint and override key events:

1. **CanEnterState**
    - Determines whether the state can be entered.
    - Useful for gating logic (e.g., "Can only enter 'Dead' if Health <= 0").
    - Called automatically by the state manager.

2. **EnterState**
    - Executes when the actor enters this state.
    - Override this to start logic such as playing animations or triggering effects.
    - Example: Activate a hit reaction animation.

3. **EndState**
    - Called when exiting the state.
    - Use this to clean up effects or reset conditions.
    - Example: Disable visual feedback like flashing effects.

4. **RunStateMachine**
    - Optional. Implement custom transition logic to switch between multiple states.
    - Typically used in subclasses like `BP_StateMachine`.

5. **GetStateTime**
    - Returns how long the state has been active if `bTrackStateActiveTime` is enabled.

```blueprint
Event EnterState
→ Play Animation: "Charge Attack"
→ Start Timer to End State after 1.5s
```

---

## Key Properties

|Property Name|Purpose|
|---|---|
|StateTag|Gameplay tag that uniquely identifies the state.|
|bTrackStateActiveTime|If true, tracks how long the state has been active (in seconds).|

---

## Key Concepts

### Modular State Definition

States are intended to be modular and self-contained. Each derived `BP_BaseState` should encapsulate the logic for one specific state, making it easier to manage and reuse across different characters or systems.

### Using Tags to Identify States

State tags provide an easy way to reference and activate states using functions like `EnterStateByTag`. It is recommended to follow a consistent naming scheme like `State.Idle`, `State.Attack`, `State.Dead`, etc.

### Event-Driven Behavior

Pair `BP_BaseState` with the State Manager Component’s dispatcher events:

- `OnStateBegin`: Useful for triggering external logic.
- `OnStateEnd`: Useful for resetting UI or gameplay status.

```blueprint
Bind Event to OnStateBegin
→ If Tag == State.HitReaction → Display Damage Effect
```

### Tracking State Time

If `bTrackStateActiveTime` is enabled, use `GetStateTime` to:

- Gate transitions based on duration.
- Trigger time-based effects or animations.
- Sync with UI or cooldown displays.

```blueprint
If GetStateTime >= 2.0
→ End State
```

### Extending Functionality

You can extend `BP_BaseState` to build:

- `BP_StateMachine`: Supports full FSM behavior and centralized control.
- Specialized states: e.g., `BP_HitReactionState`, `BP_DodgeState`, `BP_DeathState`.

This approach keeps logic isolated, modular, and easier to maintain.

---

## Notes

- States can be triggered at runtime without being pre-defined in the State Manager’s list by using tags.
- Always use `Call to Parent Function` when overriding if base logic should be preserved.
- The system works entirely in Blueprints and is designer-friendly.
- Designed to support any actor: characters, enemies, interactables, etc.

---