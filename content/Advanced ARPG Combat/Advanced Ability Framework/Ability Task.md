## Overview

The `BP_AbilityTask` class in the Advanced Abilities System, designed for Unreal Engine 5, is a specialized Blueprint-based actor class that enables asynchronous or tick-based logic for Gameplay Abilities. Its purpose is to offload complex or prolonged tasks from `BP_AdvancedGameplayAbility` instances, such as delayed effects, continuous checks, or state management, enhancing modularity and performance in RPG ability systems.

This compound data type addresses the need for handling gameplay mechanics that require ongoing or deferred execution, which would otherwise clutter ability Blueprints or impact performance if implemented directly in `ActivateAbility`. For example, an Ability Task can manage a delayed explosion or monitor a character’s position during a dash ability, making it ideal for creating dynamic, stateful abilities in Action RPGs.

---

## Basic Usage

Ability Tasks are used within Gameplay Abilities to perform specialized logic, activated via the `BP_AdvancedAbilitySystemComponent` and terminated manually by the developer. Below are the key functions, their purposes, and how they can be used in Blueprints.

1. **ActivateTask**
    - **Purpose**: Called when the task is activated, executing the task’s primary logic.
    - **Usage**:
        - Override in a child Blueprint to define custom functionality, such as spawning effects or starting a timer.
        - Example: In `BP_DelayedEffectTask`, delay a Gameplay Effect application.
            ```blueprint
            ActivateTask -> Delay (Duration: 2) -> Apply Gameplay Effect By Class (Class: BP_DamageEffect) -> EndTask
            ```

2. **EndTask**
    - **Purpose**: Terminates the task, cleaning up resources and stopping execution.
    - **Usage**:
        - Override to add cleanup logic (e.g., destroying spawned actors) and call manually to end the task.
        - Example: In `BP_DashMonitorTask`, stop monitoring and clean up.
            ```blueprint
            EndTask -> Call Parent Function -> Destroy Spawned Actors -> Return
            ```


---

## Key Properties

|Property Name|Purpose|
|---|---|
|`TaskInstancingPolicy`|An enum defining the task’s instancing behavior. Set to `Instance Per Execution` to spawn a new task actor each time the task runs, or `Instance Per Actor` to spawn once and reuse for the owning actor. Determines whether the task persists across executions.|

---

## Key Concepts

### Asynchronous Task Execution

`BP_AbilityTask` enables asynchronous logic for Gameplay Abilities, allowing tasks to run independently of the ability’s main execution thread. This is critical for mechanics that require delays, continuous updates, or external triggers, such as waiting for a condition to be met or applying effects after a set time.

- **Implementation**: Create a child Blueprint (e.g., `BP_DelayedEffectTask`) and override `ActivateTask` to define the task’s logic. Activate via `BP_AdvancedAbilitySystemComponent`:
    ```blueprint
    ActivateAbility -> Get BP_AdvancedAbilitySystemComponent -> Activate Task By Class (Class: BP_DelayedEffectTask, bAutoCreateTask: True)
    ```

- **Use Cases**: Delayed ability effects (e.g., a fireball exploding after 2 seconds), continuous monitoring (e.g., tracking a target’s position), or multi-step ability sequences.
- **Best Practices**: Always call `EndTask` to terminate the task and free resources. Test task activation within an ability to ensure proper execution and cleanup.

### Tick-Based Logic

Ability Tasks support tick-based logic, making them suitable for mechanics that require ongoing updates, such as monitoring an actor’s state or updating visual effects over time. Unlike Gameplay Abilities, which avoid tick functions for performance, Ability Tasks can implement `Event Tick` for continuous processing.
- **How It Works**: Override `Event Tick` in a child Blueprint to perform per-frame updates. For example, a task monitoring a dash ability’s distance:
    ```blueprint
    Event Tick -> Get Owning Actor Location -> Calculate Distance from Start -> Branch (Condition: Distance > MaxDistance) -> True: EndTask
    ```

- **Customization**: Set `TaskInstancingPolicy` to `Instance Per Actor` for tasks that need to persist and tick across multiple ability activations.
- **Use Cases**: Tracking a character’s movement during a dash, updating a particle effect’s intensity, or checking for environmental triggers.
- **Best Practices**: Keep tick logic lightweight to avoid performance issues. Use conditions to call `EndTask` when the task’s purpose is fulfilled.

### Instancing Policy

The `TaskInstancingPolicy` property determines how Ability Tasks are instantiated, offering flexibility for different use cases. It balances performance and functionality by controlling whether tasks are created anew or reused.

- **Instance Per Execution**:
    - Spawns a new task actor each time the task is activated, ideal for one-off or short-lived tasks.
    - **Important**: The system does not automatically delete these actors. Developers must manually call `EndTask` and ensure the actor is destroyed (e.g., via `Destroy Actor`) to prevent memory leaks or performance issues.
    - Example: A task for a single delayed explosion:
        ```blueprint
        ActivateTask -> Delay (Duration: 3) -> Spawn Emitter at Location (Emitter: ExplosionParticles) -> EndTask -> Destroy Actor
        ```

    - **Use Case**: Tasks that don’t need to persist or store state between executions.
- **Instance Per Actor**:
    - Spawns one task actor per owning actor, reused across executions, suitable for tasks requiring persistent state or tick logic.
    - Example: A task monitoring a character’s status:
        ```blueprint
        ActivateTask -> Set Actor Tick Enabled (True) -> Event Tick -> Check Actor Health -> EndTask if Health < 0
        ```

    - **Use Case**: Tasks that track ongoing conditions or maintain state (e.g., a buff’s duration).
- **Best Practices**: Choose `Instance Per Execution` for simple, stateless tasks to minimize actor count, but ensure manual deletion via `EndTask` and `Destroy Actor`. Use `Instance Per Actor` for tasks requiring continuous updates or stored data, and reset variables between executions to avoid unintended behavior.