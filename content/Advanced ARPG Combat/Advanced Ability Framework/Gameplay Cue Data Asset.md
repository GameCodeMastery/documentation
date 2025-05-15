The `BP_GameplayCue` is a lightweight, data-driven asset used in the Advanced Abilities Framework to play visual or audio effects associated with gameplay events. Unlike `BP_GameplayCueActor`, which is actor-based and designed for persistent or complex logic, the gameplay cue data asset is ideal for quick, one-shot effects such as hit sparks, footsteps, impact sounds, or short bursts of particles.

This data asset provides a clean way to trigger simple effects without the overhead of spawning an actor into the world.

---

## Basic Usage

Gameplay cue data assets are triggered using the Ability System Component, typically as part of a gameplay effect or ability.

1. **Create a Cue Asset**
    - Create a child of `BP_GameplayCue` (e.g., `DA_GC_ImpactHit`).
    - Assign a `Gameplay Cue Tag` in the Details panel.

2. **Configure Effects**
    - In the `OnExecute` function, define the visual/audio response.
    - Use Blueprint nodes such as `SpawnEmitterAtLocation`, `PlaySoundAtLocation`, or `CameraShake`.

```blueprint
OnExecute:
→ Spawn Niagara Blood Particle
→ Play Impact Sound
→ Apply Camera Shake
```

3. **Trigger via Ability System Component**
    - Call `PlayGameplayCue` from the owning actor’s ability system component.

```blueprint
→ PlayGameplayCue(Tag: Cue.Hit.Light)
```

---

## Key Properties

|Property|Purpose|
|---|---|
|`Gameplay Cue Tag`|Identifies the cue for lookup and execution.|
|`Visual Effect`|The particle system or Niagara system to play.|
|`Sound Effect`|The sound cue to trigger at the cue location.|
|`Camera Shake`|Optional camera shake class for feedback.|
|`Local Variables`|Internal-only Blueprint variables used to customize behavior at runtime.|

---

## Key Concepts

### Stateless, One-Shot Execution

Gameplay cue data assets do not spawn actors or tick. Their behavior is executed once, typically at a location or on a target actor, then considered complete. This makes them ideal for effects that:

- Require no tracking or cleanup.
- Are triggered frequently (e.g., damage hits, surface steps).
- Don’t need lifecycle management like `OnRemove` or `Destroy`.

### Separation of Data and Logic

Using cue data assets keeps the system modular. Designers can:

- Define effects in standalone assets.
- Modify visuals or audio independently of gameplay logic.
- Reuse effects across multiple gameplay events.

### Local Variables for Runtime Customization

Cue data assets support internal Blueprint variables for runtime use. These variables are:

- Meant for temporary runtime state (e.g., selected emitter or sound index).
- Not persistent or meant to store global state.
- Safe to change within `OnExecute` only.

### Editor-Friendly Workflow

- Store cue assets in a structured folder hierarchy (e.g., `Content/Cues/Impacts`).
- Prefix with `DA_GC_` for clarity.
- Categorize cues by event type (e.g., Hit, StatusEffect, Footstep).
- Use DataTables if you want to bulk manage or associate metadata with cue assets.

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

---

## Best Practices

- Keep cue logic simple—avoid complex branching or state management.
- Use Gameplay Tags to maintain consistency and avoid duplication.
- Don’t modify non-local variables at runtime.
- Use cue actors (`BP_GameplayCueActor`) for anything that needs persistence or logic beyond a single frame.

---

This documentation page describes how to use and customize `BP_GameplayCue` assets in the Advanced Abilities Framework. For examples, explore cues like `DA_GC_BloodSplash`, `DA_GC_StepDust`, or `DA_GC_ShieldImpact`.