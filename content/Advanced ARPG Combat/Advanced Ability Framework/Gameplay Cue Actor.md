---
aliases:
  - BP_GameplayCueActor
---

The `BP_GameplayCueActor` class in the `Advanced Abilities Framework` is a Blueprint actor designed to manage complex visual and audio effects, such as explosions or persistent particle systems, within the ability system. It enables developers to spawn, control, and destroy effects tied to gameplay events, enhancing player feedback in Action RPGs. This class addresses the need for dynamic, stateful, or stateless effect handling, integrating with the `BP_AdvancedAbilitySystemComponent` to trigger effects from abilities or gameplay effects.

## Basic Usage

The `BP_GameplayCueActor` is used by creating child Blueprints and triggering them via the `BP_AdvancedAbilitySystemComponent`. Below are the primary methods for interacting with it in Blueprints.

1. **OnExecute**:
    - **Purpose**: Executes the cue’s visual or audio effect logic.
    - **Usage**: Override in a child Blueprint to define custom effect behavior; manually destroy the actor if needed.


2. **OnRemove**:
    - **Purpose**: Handles cleanup when the cue is removed.
    - **Usage**: Override to perform additional cleanup; call `Destroy Actor` if required.


3. **Execute Gameplay Cue Actor**:
    - **Purpose**: Spawns and triggers the cue actor from `BP_AdvancedAbilitySystemComponent`.
    - **Usage**: Call within an ability or effect to activate the cue.


## Key Properties

|Property Name|Purpose|
|---|---|
|`Instancing Policy`|Determines spawning behavior: `Instance Per Execution` creates a new actor per trigger; `Instance Per Actor` reuses a single actor for the owning component.|
|`Gameplay Cue Tag`|Associates a `Gameplay Tag` (e.g., `Cue.Explosion`) with the cue for triggering by tag.|

## Key Concepts

### Stateful vs. Stateless Effects

The `BP_GameplayCueActor` supports both stateful (persistent, tracked) and stateless (one-off) effects. Stateful cues use `Instance Per Actor` for effects like ongoing poison clouds, while stateless cues use `Instance Per Execution` for effects like explosions. 

When using a Gameplay Cue Actor with a Gameplay Effect (such as a buff or poisoned effect), **automatic removal of the cue when the effect ends** is only supported when `InstancingPolicy` is set to `InstancePerActor`. This allows the Ability System Component to track and call remove on the cue when the effect ends.

- **Purpose**: Provides flexibility for different effect types.
- **Usage**: Set `Instancing Policy` in the Details panel based on the effect’s needs.
- **Benefit**: Optimizes performance and behavior for specific use cases.

### Manual Destruction

Regardless if the `InstancePolicy` is `Instance Per Execution` or `InstancePerActor`, developers must manually destroy the cue actor using `Destroy Actor` when no longer needed to prevent lingering actors.  `Instance Per Execution` are **not automatically deleted** when the Ability System Component is destroyed.

- **Purpose**: Ensures resource cleanup for gameplay cues.
- **Usage**: Call `Destroy Actor` in `OnExecute` after a delay or override `OnRemove` and call `Destroy` when no longer needed
- **Benefit**: Prevents memory leaks and maintains performance.

### Automatic Destruction
The **only case where** `Instance Per Actor` **cue actors are automatically deleted** is when the owning Ability System Component is destroyed. `Instance Per Execution` `GameplayCues` are **never automatically deleted**.

- **Purpose**: Ensures resource cleanup for stateful cues.
- **Usage**: Upon Ability Component destruction, all `InstancePerActor` gameplay cues are automatically destroyed
- **Benefit**: Prevents memory leaks and maintains performance.


> [!NOTE] NOTE
> `InstancePerActor` AND `InstncePerExecution` gameplay cues do NOT call `Destroy` by default when `Remove` is called on the gameplay cue. The developer will need to explicitly override `OnRemove` and add `Destroy Actor` to ensure proper cleanup upon gameplay cue removal

### Integration with Ability System

The `BP_GameplayCueActor` is triggered via `BP_AdvancedAbilitySystemComponent`, either directly by abilities or through `BP_GameplayEffect`. This ensures effects align with gameplay events, such as ability activations or attribute changes.

- **Purpose**: Synchronizes effects with gameplay mechanics.
- **Usage**: Use `Execute Gameplay Cue Actor` or link to `Gameplay Cues` in a `BP_GameplayEffect`.
- **Benefit**: Simplifies effect triggering with minimal setup.

## Best Practices

- **Workflows**:
    - Use `Instance Per Actor` for stateful cues paired with `BP_GameplayEffect` for automatic cleanup.
    - Test cues with default effects (e.g., `BP_ExplosionCue`) before creating custom ones.
- **Pitfalls to Avoid**:
    - Always call `Destroy Actor` for both `Instance Per Execution` AND `Instance Per Actor` to avoid persistent actors.
    - Must override `OnRemove` and manually add destroy if the gameplay cue needs to be deleted on removal
    - When using a Gameplay Cue Actor with a Gameplay Effect (such as a buff or poisoned effect), **automatic removal of the cue when the effect ends** is only supported when `InstancingPolicy` is set to `InstancePerActor`.
    - Don’t overuse `Instance Per Execution` for frequent effects; prefer `BP_GameplayCue` for simple cases.
- **Performance Considerations**:
    - Minimize active `BP_GameplayCueActors` by using `Instance Per Actor` for reusable effects.
    - Avoid complex logic or frequent ticks in `OnExecute` to reduce overhead.