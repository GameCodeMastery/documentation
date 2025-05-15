`BP_StateMachine` is a specialized subclass of `BP_BaseState` designed to manage transitions between multiple states in the Advanced State Manager system. It functions as a centralized state logic controller, enabling you to define conditional flows between finite states. This makes it especially powerful for creating modular AI behavior, player combat chains, or reactive systems.

By overriding its transition logic inside the `RunStateMachine` event, developers can define how the system should respond to dynamic conditions, such as gameplay events, attribute values, or custom input.

---

## Basic Usage

To implement a state machine:

1. **Create a New Blueprint**
    - Inherit from `BP_StateMachine`.

2. **Override `RunStateMachine`**
    - Define logic for determining state transitions based on internal or external conditions.
    - Call `EnterStateByTag` or `EnterStateByClass` on the owning `BP_StateManagerComponent`.

3. **Add to State Classes**
    - Add the new state machine class to the `State Classes` array of the `BP_StateManagerComponent`.

4. **Trigger the State Machine**
    - Use `RunStateMachineByTag` or `RunStateMachineByClass` to begin evaluation.


```blueprint
Event RunStateMachine
If Health <= 0
→ Enter State (Tag: State.Dead)
Else If IsInCombat
→ Enter State (Tag: State.Attack)
Else
→ Enter State (Tag: State.Idle)
```

---

## Key Properties

|Property Name|Purpose|
|---|---|
|StateTag|Identifies this state machine with a gameplay tag.|
|bTrackStateActiveTime|Enables tracking of how long the state machine has been active.|

---

## Key Concepts

### Centralized State Management

A `BP_StateMachine` can be used as a central authority for an actor's behavior. Rather than scattering transition logic across multiple states, a state machine consolidates all transitions in one location. This is useful for AI systems, combat logic, or interaction workflows.

### Overriding `RunStateMachine`

The `RunStateMachine` function should be overridden to contain branching logic. Example conditions may include:

- Attribute values (e.g., health, stamina)
- Input atoms (e.g., jump, attack)
- Timers or cooldowns
- Environmental or gameplay tags

### Triggering from Other Systems

You can activate a state machine from:

- **Gameplay events**
- **Animation notifies**
- **Timers**
- **Input atoms**

```blueprint
Run State Machine By Tag → Tag: AI.Behavior
```

### Calling Transitions

Inside `RunStateMachine`, call:

```blueprint
→ Get StateManagerComponent
→ EnterStateByTag("State.Chase")
```

This will initiate a state transition from within the machine.

### Hierarchical FSM Design

Complex behaviors can be built by chaining or nesting state machines:

- A top-level AI behavior machine
- Sub-states for movement, alert, idle
- Triggering sub-state machines from parent state logic

```blueprint
→ Run Sub-StateMachine By Tag (e.g., "AI.Alert")
```

### AI Behavior Example
![[Combat Behavior State Machine.png]]

`BP_StateMachine` is ideal for AI, as shown in the default `BP_AIBehaviorStateMachine`. It manages transitions (e.g., `State.Idle` to `State.Pursue`) based on inputs like enemy detection.

- **Usage**: Modify `Run State Machine` for AI behavior:
    ```blueprint
    Run State Machine -> Has Input Atom (InputAtomTag: Input.EnemyDetected) -> Branch (True) -> Enter State By Tag (StateTag: State.Pursue)
    ```

- **Best Practices**: Test transitions in-game to ensure smooth AI behavior.

---

## Notes

- `BP_StateMachine` inherits from `BP_BaseState` and shares all its lifecycle functions.
- It can be used as both an active state and a logic hub for transitions.
- Ideal for use cases like enemy behavior trees, combat chains, NPC dialogue flows, or input response logic.
- Logic should remain deterministic and predictable to avoid unpredictable transitions.
- This system is entirely Blueprint-compatible and works well with designer-authored behavior flows.

---
