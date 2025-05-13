The `BP_GameplayCueActor` class in the Advanced Abilities System, designed for Unreal Engine 5, is a Blueprint-based actor class that manages the spawning, execution, and destruction of visual and audio effects associated with gameplay events, such as ability activations or Gameplay Effects. Its purpose is to provide a flexible framework for creating complex, interactive visual feedback (e.g., explosions, projectiles, or environmental effects) that enhance immersion in Action RPGs.

This compound data type addresses the need for dynamic, actor-based effects that require custom logic or persistence beyond simple particle or sound spawns, which are handled by `BP_GameplayCue` Data Assets (see [[Gameplay Cue Data Asset]]). For example, a Gameplay Cue Actor can manage a multi-stage explosion effect with timed particle spawns and sound triggers, ensuring precise control over effect lifecycles.

---

## Basic Usage

Gameplay Cue Actors are used to execute visual and audio effects triggered by abilities or Gameplay Effects via the `BP_AdvancedAbilitySystemComponent`. They are activated using Gameplay Tags and must be manually managed by developers for cleanup. Below are the key functions, their purposes, and how they can be used in Blueprints.

1. **OnExecute**
    - **Purpose**: Executes the logic associated with the Gameplay Cue, such as spawning particles or playing sounds.
    - **Usage**:
        - Override in a child Blueprint to define custom effect behavior. For **Stateless** Gameplay Cues (`Instancing Policy` set to `Instance Per Execution`), call `Destroy Actor` after the effect completes to prevent lingering actors. For **Stateful** Gameplay Cues (`Instancing Policy` set to `Instance Per Actor`), destruction may occur in `OnRemove` when triggered by a Gameplay Effect.
        - Example: In `BP_ExplosionCue` (Stateless), spawn particles and destroy the actor after a delay.

            ```blueprint
            OnExecute -> Spawn Emitter at Location (Emitter: ExplosionParticles) -> Play Sound at Location (Sound: ExplosionSound) -> Delay (Duration: 2) -> Destroy Actor
            ```

2. **OnRemove**
    - **Purpose**: Handles cleanup when the Gameplay Cue is removed, typically used for **Stateful** Gameplay Cues associated with Gameplay Effects.
    - **Usage**:
        - Override to add cleanup logic, such as stopping particle effects or destroying the actor. For Stateful Gameplay Cues (`Instance Per Actor`), `OnRemove` is called by a Gameplay Effect when it is removed, and `Destroy Actor` must be included to prevent lingering actors. Not applicable for Stateless Gameplay Cues (`Instance Per Execution`).
        - Example: In `BP_PoisonedCue` (Stateful), stop effects and destroy the actor.

            ```blueprint
            OnRemove -> Stop Emitter at Location (Emitter: PoisonParticles) -> Destroy Actor
            ```


---

## Key Properties

|Property Name|Purpose|
|---|---|
|`InstancingPolicy`|An enum defining the cue’s instancing behavior. Set to `Instance Per Execution` for Stateless Gameplay Cues (e.g., `BP_ExplosionCue`) or `Instance Per Actor` for Stateful Gameplay Cues (e.g., `BP_PoisonedCue`). Determines whether the cue persists and is tracked by the Ability System.|
|`GameplayCueTag`|The Gameplay Tag associated with the cue (e.g., `Cue.Explosion`). Used to trigger the cue via `Execute Gameplay Cue Actor` or Gameplay Effects.|

---

## Key Concepts

### Visual and Audio Effect Management

`BP_GameplayCueActor` is designed to handle complex visual and audio effects that require an actor’s lifecycle management, offering more control than `BP_GameplayCue` Data Assets. It is triggered by abilities or Gameplay Effects and executes custom logic to spawn effects, play sounds, or trigger other gameplay events.

- **Implementation**: Create a child Blueprint (e.g., `BP_ExplosionCue`) and override `OnExecute` to define effect logic. Trigger via `BP_AdvancedAbilitySystemComponent`:
    ```blueprint
    ActivateAbility -> Get BP_AdvancedAbilitySystemComponent -> Execute Gameplay Cue Actor (Class: BP_ExplosionCue)
    ```

- **Use Cases**: Multi-stage effects (e.g., an explosion with initial burst and lingering smoke), interactive effects (e.g., a projectile trail), or effects requiring collision checks.
- **Best Practices**: Ensure `GameplayCueTag` matches the tag used in abilities or Gameplay Effects to trigger the cue correctly. Test effect timing and cleanup to maintain performance.

### Actor-Based Lifecycle

Unlike `BP_GameplayCue` Data Assets, which rely on the Gameplay Cue Component for simple effect spawning, `BP_GameplayCueActor` instances are full actors with their own lifecycle. This allows for persistent or interactive effects but requires developers to manage creation and destruction explicitly.

- **How It Works**: The actor is spawned when triggered (via `Execute Gameplay Cue Actor` or a Gameplay Effect) and runs its `OnExecute` logic. Developers must call `Destroy Actor` in `OnExecute` (for Stateless cues) or `OnRemove` (for Stateful cues) to terminate it.
- **Customization**: Override `OnRemove` for Stateful cues to handle cleanup when triggered by a Gameplay Effect:
    
    ```blueprint
    OnRemove -> Stop Emitter at Location (Emitter: PoisonParticles) -> Destroy Actor
    ```
    
- **Use Cases**: Effects that persist for a duration (e.g., a burning area effect), require tick updates (e.g., a rotating visual), or interact with the environment (e.g., collision-based triggers).
- **Best Practices**: Minimize actor lifespans to reduce performance overhead. Use `BP_GameplayCue` for simple effects to avoid unnecessary actor spawns.

### Instancing Policy

The `InstancingPolicy` property determines how Gameplay Cue Actors are instantiated, defining whether they are **Stateful** or **Stateless**, which is a critical distinction for their behavior and management.

- **Stateful Gameplay Cues** (`Instance Per Actor`):
    - **Purpose**: Used for complex cues that maintain data about past operations for later use (e.g., `BP_PoisonedCue` tracking poison cue for Gameplay Effect integration). The Ability System holds onto and tracks these cues.
    - **Instancing Policy**: **Must** be set to `Instance Per Actor` to enable persistence and tracking.
    - **Deletion**: Actors remain in the world unless explicitly destroyed. When associated with a Gameplay Effect, `OnRemove` is called upon effect removal, and developers must override `OnRemove` to include `Destroy Actor`:
        ```blueprint
        OnRemove -> Stop Emitter at Location (Emitter: PoisonParticles) -> Destroy Actor
        ```

    - **Use Case**: Persistent effects like a poison aura that updates over time or responds to Gameplay Effect removal.
- **Stateless Gameplay Cues** (`Instance Per Execution`):
    - **Purpose**: Used for one-off complex cues that do not need to maintain state (e.g., `BP_ExplosionCue` for a single explosion). The Ability System does not track these cues.
    - **Instancing Policy**: **Must** be set to `Instance Per Execution` to avoid tracking.
    - **Deletion**: Actors remain in the world unless explicitly destroyed. Typically, call `Destroy Actor` in `OnExecute` after completion or a delay, as `OnRemove` cannot be triggered by Gameplay Effects:
        ```blueprint
        OnExecute -> Spawn Emitter at Location (Emitter: ExplosionParticles) -> Delay (Duration: 2) -> Destroy Actor
        ```

    - **Use Case**: Temporary effects like explosions or impact visuals that execute once and terminate.
- **General Recommendation**: Regardless of Stateful or Stateless, always destroy Gameplay Cue Actors after completion using `Destroy Actor` to prevent lingering unused actors and optimize performance.
- **Best Practices**: Choose `Instance Per Execution` for Stateless, one-off effects and ensure `Destroy Actor` is called in `OnExecute`. Use `Instance Per Actor` for Stateful effects requiring persistence or Gameplay Effect integration, and override `OnRemove` to include `Destroy Actor`. Test both creation and destruction to avoid memory leaks.

### Integration with Gameplay Effects

Gameplay Cue Actors can be associated with `BP_GameplayEffect` instances to synchronize visual and audio effects with gameplay attribute changes, enhancing immersion. This integration is particularly relevant for Stateful Gameplay Cues.

- **How It Works**:
    - Add a Gameplay Cue Actor to the `Gameplay Cue Actors` array in a `BP_GameplayEffect` (e.g., `GE_PoisonEffect` includes `BP_PoisonedCue`).
    - When the Gameplay Effect is applied, the associated Gameplay Cue Actor is spawned, and `OnExecute` is called to trigger the effect.
    - For Stateful Gameplay Cues (`Instance Per Actor`), when the Gameplay Effect is removed, the Ability System calls `OnRemove` on the Gameplay Cue Actor, allowing cleanup and destruction:
        
        ```blueprint
        OnRemove -> Stop Emitter at Location (Emitter: PoisonParticles) -> Destroy Actor
        ```

    - Stateless Gameplay Cues (`Instance Per Execution`) do not support `OnRemove` calls from Gameplay Effects, so destruction must occur in `OnExecute`.
- **Implementation**: Configure the `Gameplay Cue Actors` array in the Gameplay Effect’s Details panel and ensure the Gameplay Cue Actor’s `GameplayCueTag` matches the effect’s trigger tag. For Stateful cues, set `Instancing Policy` to `Instance Per Actor` and override `OnRemove`:

    ```blueprint
    // GE_PoisonEffect Details: Gameplay Cue Actors: BP_PoisonedCue, GameplayCueTag: Cue.Poison
    OnExecute -> Spawn Emitter at Location (Emitter: PoisonParticles)
    OnRemove -> Stop Emitter at Location (Emitter: PoisonParticles) -> Destroy Actor
    ```

- **Use Cases**: Stateful cues like a poison effect that persists with a Gameplay Effect’s duration, or Stateless cues like a damage impact triggered by an instant effect.
- **Best Practices**: Use `Instance Per Actor` for Gameplay Effect-driven cues to leverage `OnRemove`. Test the full lifecycle (spawn, execution, removal) to ensure proper cleanup. For Stateless cues, ensure `OnExecute` includes `Destroy Actor` to avoid lingering actors.