The `BP_AbilityTask` class in the `Advanced Abilities Framework` is a specialized actor Blueprint designed to handle asynchronous or tick-based logic within `Gameplay Abilities`. It enables developers to offload complex or time-dependent tasks, such as delays, animations, or continuous checks, from abilities, enhancing modularity and flexibility in Action RPGs. This class addresses the need for reusable, self-contained logic that integrates seamlessly with the `BP_AdvancedAbilitySystemComponent`, supporting dynamic gameplay mechanics without cluttering ability Blueprints.

## Basic Usage

The `BP_AbilityTask` is used by creating child Blueprints and activating them within a `BP_AdvancedGameplayAbility`. Below are the primary methods for interacting with it in Blueprints.

1. **ActivateTask**:
    - **Purpose**: Executes the task’s core logic when activated.
    - **Usage**: Override in a child Blueprint to define custom functionality (e.g., delay, tick-based checks).
    - **Example**:
```blueprint
ActivateTask -> Delay (2s) -> Apply Gameplay Effect By Class (Class: GE_DamageEffect)
```

2. **EndTask**:
    - **Purpose**: Terminates the task and performs cleanup.
    - **Usage**: Call in the child Blueprint to end the task after completion or on interruption.
    - **Example**:
```blueprint
ActivateTask -> Delay (2s) -> EndTask
 ```

3. **Spawning a Task**:
    - **Purpose**: Spawns and activates a task from `BP_AdvancedAbilitySystemComponent`.
    - **Usage**: Call within a `BP_AdvancedGameplayAbility` to start the task.
    - **Example**:
```blueprint
ActivateAbility -> Get BP_AdvancedAbilitySystemComponent -> Activate Task By Class (Class: BP_DelayedStrike, bAutoCreateTask: True)
```

## Key Properties

|Property Name|Purpose|
|---|---|
|`Task Instancing Policy`|Determines task spawning behavior: `Instance Per Execution` creates a new task per activation; `Instance Per Actor` reuses a single task for the actor.|

## Key Concepts

### Asynchronous Task Execution

The `BP_AbilityTask` enables asynchronous logic, such as delays or continuous updates, outside the main ability Blueprint. This keeps `BP_AdvancedGameplayAbility` logic clean and focused on activation and effects.

- **Purpose**: Offloads time-dependent or tick-based tasks to improve ability modularity.
- **Usage**: Override `ActivateTask` in a child Blueprint to implement delays or loops.
- **Benefit**: Simplifies ability design and enhances reusability.

### Task Lifecycle Management

Tasks must be manually terminated using `EndTask` to prevent lingering actors or logic. The `Task Instancing Policy` controls whether tasks are unique per execution or reused, impacting performance and behavior.

- **Purpose**: Ensures tasks complete cleanly and resources are freed.
- **Usage**: Call `EndTask` in `ActivateTask` or on task completion conditions.
- **Benefit**: Prevents memory leaks and maintains system stability.

- **Note**:
    - Always end the task manually to avoid unintended persistence.
    - **Tasks are not automatically deleted** — you must destroy them when they are no longer needed.
    - For one-shot tasks, destroy the task actor when the task ends.
    - For persistent tasks, destroy the actor explicitly when the logic is no longer required.

### Integration with Ability System

The `BP_AbilityTask` integrates with `BP_AdvancedAbilitySystemComponent`, allowing tasks to interact with abilities, effects, and cues. Tasks are spawned and managed via `Activate Task By Class`, ensuring tight coupling with the ability framework.

- **Purpose**: Facilitates seamless task execution within the ability system.
- **Usage**: Use `Activate Task By Class` in abilities to spawn tasks with `bAutoCreateTask` enabled.
- **Benefit**: Streamlines complex ability workflows with minimal setup.

## Best Practices

- **Workflows**:
    - Create specific child Blueprints (e.g., `BP_DelayedStrike`) for each unique task to promote reusability.
    - Test tasks with `Instance Per Execution` initially to verify behavior before switching to `Instance Per Actor` for optimization.
    - Name tasks clearly based on function (e.g., `BP_DelayedDamageTask`, `BP_ConditionalTriggerTask`).
- **Pitfalls to Avoid**:
    - Always call `EndTask` to terminate tasks; failing to do so can cause persistent actors or logic loops.
    - **Explicitly destroy task actors** when no longer needed, especially for long-lived or reusable tasks.
    - **Use**`InstancePerExecution` for short-lived, effect-based logic (e.g., delays, one-off actions).
    - **Use**`InstancePerActor` for condition monitors or tasks requiring persistent state.
    - Avoid relying on tick unless necessary — prefer latent Blueprint nodes like Delay or Timers.
- **Performance Considerations**:
    - Use `Instance Per Actor` for tasks that don’t require unique instances to reduce actor spawning.
    - Minimize tick frequency in tasks (e.g., avoid <0.1s intervals) to optimize performance.