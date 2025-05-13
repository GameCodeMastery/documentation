The `BP_GameplayCue` class in the Advanced Abilities System, designed for Unreal Engine 5, is a Blueprint-based Data Asset that enables the spawning of simple visual and audio effects, such as sparks, blood particles, or hit sounds, without requiring actor instances. Its purpose is to provide a lightweight, efficient method for triggering one-off effects associated with gameplay events, such as ability activations or Gameplay Effects, enhancing player feedback in Action RPGs.

This compound data type addresses the need for streamlined effect management in scenarios where complex actor-based logic (handled by `BP_GameplayCueActor`, see [[Gameplay Cue Actor]]) is unnecessary. By using the Gameplay Cue Component to spawn effects directly, `BP_GameplayCue` reduces actor overhead, making it ideal for frequent, simple effects like combat impacts or environmental cues.

---

## Basic Usage

Gameplay Cue Data Assets are used to trigger simple visual and audio effects via the `BP_AdvancedAbilitySystemComponent`, typically linked to Gameplay Tags in abilities or Gameplay Effects. They do not require manual deletion, as they do not spawn actors. Below are the key functions, their purposes, and how they can be used in Blueprints.

1. **OnExecute**
    - **Purpose**: Executes the logic associated with the Gameplay Cue, such as spawning particles or playing sounds.
    - **Usage**:
        - Override in a child Blueprint to define effect behavior, using the Gameplay Cue Component for spawning.
        - Example: In `BP_HitSoundCue`, play a sound effect.
            
            ```blueprint
            OnExecute -> Play Sound at Location (Sound: HitSound, Location: Target Location)
            ```
            
        - **Note**: Avoid modifying Data Asset variables at runtime, except for local variables, to prevent unintended behavior across instances.

---

## Key Properties

|Property Name|Purpose|
|---|---|
|`GameplayCueTag`|The Gameplay Tag associated with the cue (e.g., `Cue.HitSound`). Used to trigger the cue via `Play Gameplay Cue` or Gameplay Effects.|

---

## Key Concepts

### Lightweight Effect Spawning

`BP_GameplayCue` is designed for simple, one-off visual and audio effects that don’t require the persistent lifecycle management of `BP_GameplayCueActor`. It leverages the Gameplay Cue Component to spawn effects directly, reducing performance overhead by avoiding actor creation.

- **Implementation**: Create a child Blueprint (e.g., `BP_SparkCue`) and override `OnExecute` to define effect logic. Trigger via `BP_AdvancedAbilitySystemComponent`:
    
    ```blueprint
    ActivateAbility -> Get BP_AdvancedAbilitySystemComponent -> Play Gameplay Cue (Cue: BP_SparkCue)
    ```
    
- **Use Cases**: Combat effects (e.g., sparks on weapon impact), environmental cues (e.g., footstep sounds), or minor ability feedback (e.g., mana sparkles).
- **Best Practices**: Ensure `GameplayCueTag` matches the tag used in abilities or Gameplay Effects. Use local variables in `OnExecute` for runtime modifications, avoiding changes to Data Asset properties to maintain consistency.

### Non-Actor-Based Effects

Unlike `BP_GameplayCueActor`, which spawns actors for complex effects, `BP_GameplayCue` operates as a stateless Data Asset, making it ideal for frequent, short-lived effects. It does not require manual deletion, as no actors are created, simplifying cleanup compared to actor-based cues.

- **How It Works**: The Gameplay Cue Component handles effect spawning (e.g., `Spawn Emitter at Location`, `Play Sound at Location`) when `OnExecute` is called, with no persistent state.
- **Customization**: Override `OnExecute` to spawn multiple effects or adjust parameters dynamically:
    
    ```blueprint
    OnExecute -> Spawn Emitter at Location (Emitter: BloodParticles, Scale: 1.5) -> Play Sound at Location (Sound: BloodHitSound)
    ```
    
- **Use Cases**: Instant effects like hit particles, sound cues for ability triggers, or lightweight visual feedback for Gameplay Effects.
- **Best Practices**: Reserve `BP_GameplayCue` for effects that don’t need tick logic or collision, using `BP_GameplayCueActor` for more complex scenarios. Test effect timing to ensure synchronization with gameplay events.

### Impact Effect

The `BP_ImpactEffect` class, a specialized child of `BP_GameplayCue`, provides pre-configured support for surface-specific impact effects (e.g., blood, sparks) using Cascade or Niagara emitters. It extends `BP_GameplayCue` with additional properties for combat scenarios, such as mixing emitters or adding camera shakes, making it ideal for dynamic visual and audio feedback in Action RPGs.

- **Implementation**: Create a child Blueprint (e.g., `BP_BloodImpact`, derived from `BP_Cascade_ImpactEffect` or `BP_Niagara_ImpactEffect`) and configure properties in the Details panel (see **Impact Effect Key Properties** below). Override `OnExecute` to spawn effects:
    
    ```blueprint
    OnExecute -> Spawn Emitter at Location (Emitter: Impact Emitters[Flesh]) -> Play Sound at Location (Sound: Impact Sound[Flesh])
    ```
    
- **Use Cases**: Surface-based combat effects (e.g., blood on flesh, sparks on metal), mixed effects (e.g., blood and sparks), or camera shakes for impactful hits.
- **Best Practices**: Use `Impact Effect Index Type` (Random or Custom) to vary effects for realism. Test with different surface types to ensure correct emitter and sound mapping.

#### Impact Effect Key Properties

Below are the key properties specific to `BP_ImpactEffect` (available in `BP_Cascade_ImpactEffect` or `BP_Niagara_ImpactEffect`), configurable in the Details panel.

|Property Name|Purpose|
|---|---|
|`Impact Emitters`|A map variable linking surface types (key, e.g., `Flesh`) to a structure containing an array of particle emitters, rotation, and scale. Defines the primary visual effect for each surface.|
|`Mixed Reaction Emitter`|A visual effect emitter that can be mixed with the primary `Impact Emitters` (e.g., blood and sparks simultaneously). Enhances visual variety for impacts.|
|`Impact Effect Index Type`|An enum (`Random` or `Custom`) determining whether the emitter is chosen randomly from the `Impact Emitters` array or uses a specific index. Controls effect variation.|
|`Emitter Index`|The specific index of the emitter to use from the `Impact Emitters` array when `Impact Effect Index Type` is set to `Custom`. Allows precise effect selection.|
|`Spawn Mixed Emitters`|A boolean that, when true, spawns the `Mixed Reaction Emitter` alongside the primary `Impact Emitters`. Enables combined effects for richer visuals.|
|`Impact Sound`|A map linking surface types to sound effects (e.g., `Flesh: BloodHitSound`). Defines the audio feedback for impacts.|
|`Camera Shake Class`|An array of camera shake classes to apply during the impact effect. Enhances immersion with screen shake feedback.|
|`Camera Shake Index`|The specific index of the camera shake to use from the `Camera Shake Class` array. Allows precise shake selection.|
|`Camera Shake Scale`|A float value scaling the intensity of the camera shake. Adjusts the strength of the shake effect.|
|`GameplayCueTag`|The Gameplay Tag associated with the impact effect (e.g., `Cue.Impact.Blood`). Used to trigger the cue, inherited from `BP_GameplayCue`.|