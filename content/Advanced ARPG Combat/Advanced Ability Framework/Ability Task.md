The `BP_AbilityTask` is a specialized Blueprint actor class used within the Advanced Abilities Framework to offload specific tasks from a `BP_AdvancedGameplayAbility`. Ability Tasks provide a modular way to handle asynchronous logic, repeated updates (tick), or temporary actors that are required for certain ability behavior but don't belong inside the ability itself.

This design enables separation of concerns, helping to keep individual abilities lightweight while encapsulating reusable logic or state-based functionality.

---

## Basic Usage

An Ability Task is typically activated during an ability’s `ActivateAbility` function and performs a specific action until it ends.

1. **`ActivateTask`**
    - Entry point for the task logic.
    - Called automatically when the task is spawned.
    - Use this function to begin timers, apply effects, or initialize state.

2. **`EndTask`**
    - Cleans up the task.
    - Should be called when the task has completed its purpose.

```blueprint
Ability Example:
→ Activate Ability
→ Activate Task By Class (e.g., AT_ChargeUp)
→ Task handles logic independently
→ Call EndTask when finished
```

3. **`Activate Task By Class`** (from Ability System Component)
    - Spawns and activates a task.
    - Use the `bAutoCreateTask` flag to control whether the task should auto-spawn.

```blueprint
ActivateTaskByClass(TaskClass, AutoCreate: true)
```

---

## Key Properties

|Property|Purpose|
|---|---|
|`Task Instancing Policy`|Determines whether a new instance is spawned for each execution or shared across the actor.|
|`bAutoCreateTask`|If true, the task will be spawned and activated immediately.|

---

## Key Concepts

### Task Instancing Policy

- **Instanced Per Execution**:
    - Spawns a new task each time it is activated.
    - Useful when the task handles runtime data or needs a clean state.
- **Instanced Per Actor**:
    - Only one instance of the task exists per actor.
    - Reduces overhead but requires careful state cleanup.

### Use Cases

Ability Tasks are best used for logic that:
- Needs to tick independently (e.g., charge-up or area scan).
- Should outlive the execution of a short ability but remain attached.
- Is intended to be reusable across multiple abilities.

### Asynchronous Task Execution

Ability Tasks are ideal for handling logic that must execute independently from the main ability graph. This is especially useful for behaviors that depend on delays, conditions, or player input without blocking the main ability flow.

Common asynchronous patterns include:

- **Timers**: Delay execution or trigger repeated logic over time.
    ```blueprint
    Set Timer by Event (e.g., every 0.5s) → Do Action → Stop Timer → End Task
    ```

- **Delegates / Events**: Wait for a callback from another system (e.g., animation notify, collision hit).
    ```blueprint
    Bind to OnMontageEnded → Play Animation → Wait → Trigger OnMontageEnded → End Task
    ```

- **Input Monitoring**: Capture user input during task runtime (e.g., hold to charge, release to fire).
    ```blueprint
    On Input Pressed → Start Charge
    On Input Released → Calculate Power → Fire → End Task
    ```


Because Ability Tasks can tick or wait independently, they are excellent tools for extending interactivity, responsiveness, or sequencing within abilities.

---

### Best Practices

- Always call `EndTask` when the task is complete to avoid memory leaks.
- Avoid placing heavy logic in `Tick` unless necessary.
- Store minimal state—tasks are designed to be temporary and focused.
- For tasks requiring visual feedback, consider spawning cues or linking with `GameplayCueActors`.

---

This documentation page provides guidance for designing, using, and extending `BP_AbilityTask` in the Advanced Abilities Framework. For reference, explore example tasks such as `AT_WindUp`, `AT_RegenPulse`, or `AT_TargetTracker` used in the sample abilities.