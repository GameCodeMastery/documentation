---
aliases:
  - Gameplay  Cue Data Asset
  - BP_GameplayCueDataAsset
---
The `BP_GameplayCue` class in the `Advanced Abilities Framework` is a Blueprint Data Asset designed to manage simple visual and audio effects, such as sparks, blood particles, or hit sounds, without spawning actors. It enables developers to trigger lightweight effects tied to gameplay events, enhancing player feedback in Action RPGs. This class addresses the need for efficient, non-persistent effect handling, integrating with the `BP_AdvancedAbilitySystemComponent` to provide quick, designer-friendly visual and audio cues.

## Basic Usage

The `BP_GameplayCue` is used by creating child Data Assets and triggering them via the `BP_AdvancedAbilitySystemComponent`. Below are the primary methods for interacting with it in Blueprints.

1. **OnExecute**:
    - **Purpose**: Executes the cue’s visual or audio effect logic.
    - **Usage**: Override in a child Data Asset to define simple effect behavior (e.g., spawn particles, play sounds).

2. **Play Gameplay Cue**:
    - **Purpose**: Triggers the cue from `BP_AdvancedAbilitySystemComponent`.
    - **Usage**: Call within an ability or effect to activate the cue.

## Key Properties

|Property Name|Purpose|
|---|---|
|`Gameplay Cue Tag`|Associates a `Gameplay Tag` (e.g., `Cue.HitSound`) with the cue for triggering by tag.|

## Key Concepts

### Lightweight Effect Handling

The `BP_GameplayCue` is optimized for simple, non-persistent effects that don’t require actor spawning, unlike `BP_GameplayCueActor`. This makes it ideal for frequent, lightweight feedback like impact sounds or particle bursts.

- **Purpose**: Provides efficient effect delivery for common gameplay events.
- **Usage**: Configure `OnExecute` in a child Data Asset to spawn particles or sounds.
- **Benefit**: Reduces performance overhead compared to actor-based cues.

### Automatic Cleanup

Unlike `BP_GameplayCueActor`, the `BP_GameplayCue` does not spawn actors, so it requires no manual destruction. Effects are handled by the system and cleaned up automatically after execution.

- **Purpose**: Simplifies effect management for developers.
- **Usage**: Trigger via `Play Gameplay Cue` without worrying about cleanup.
- **Benefit**: Eliminates memory leak risks and streamlines workflows.

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
## Best Practices

- **Workflows**:
    - Use `BP_GameplayCue` for simple effects like sounds or single-frame particles to optimize performance.
    - Test cues with default assets (e.g., `BP_Niagara_ImpactEffect`) before creating custom ones.
- **Pitfalls to Avoid**:
    - Don’t modify `BP_GameplayCue` variables at runtime; use local variables for dynamic logic.
    - Avoid using `BP_GameplayCue` for complex or persistent effects; use `BP_GameplayCueActor` instead.
- **Performance Considerations**:
    - Prefer `BP_GameplayCue` over `BP_GameplayCueActor` for frequent effects to minimize actor spawning.
    - Keep `OnExecute` logic simple to avoid execution delays.