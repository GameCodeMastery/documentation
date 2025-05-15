The `BP_GameplayCueActor` is an actor-based component of the Advanced Abilities Framework used to handle visual or audio effects triggered by gameplay events. It is responsible for spawning, managing, and destroying persistent or complex effects such as auras, trails, area markers, or animations.

Unlike gameplay cue data assets, which are used for simple one-shot effects, cue actors are intended for advanced behaviors that may require Blueprint logic, timelines, or actor persistence. They enable developers to encapsulate high-level audiovisual feedback into reusable, modular classes.

---

## Basic Usage

Cue actors are spawned and executed through the Ability System Component when a gameplay cue is triggered by an ability or effect.

1. **Setup a Gameplay Cue Actor**
    - Create a child Blueprint from `BP_GameplayCueActor` (e.g., `BP_GC_Shockwave`).
    - Assign a unique Gameplay Cue Tag via the Details panel.

2. **Trigger Cue from Ability System Component**
    - Call `ExecuteGameplayCueActor` with the tag or class.

```blueprint
→ ExecuteGameplayCueActor(Tag: Cue.Shockwave)
```

3. **Override Execution Logic**
    - In the `BP_GameplayCueActor`, override the `OnExecute` function to define the cue’s behavior.
    - Optionally override `OnRemove` for cleanup when the cue is ended.

```blueprint
OnExecute:
→ Spawn Niagara System
→ Play Sound
→ Begin Timeline

OnRemove:
→ Stop Timeline
→ Destroy Actor
```

---

## Key Properties

|Property|Purpose|
|---|---|
|`Gameplay Cue Tag`|Identifies the cue for use with the Ability System Component.|
|`Instancing Policy`|Defines if the cue should spawn per execution or persist as one instance per actor.|

---

## Key Concepts

### Instancing Policy

- **Instance Per Execution**:
    - A new `BP_GameplayCueActor` is spawned every time the cue is executed.
    - Best suited for instantaneous or short-lived effects that may occur frequently.
    - Example: A slash trail or impact explosion that should be visually distinct each time it occurs.

- **Instance Per Actor**:
    - One persistent instance is used per actor that owns the Ability System Component.
    - Useful for looping or sustained effects, such as a buff aura or charging animation.
    - Reduces overhead by reusing the same actor for multiple cue triggers.

### Lifecycle of a Gameplay Cue Actor

The typical lifecycle involves these stages:
1. **Spawn**: The Ability System Component spawns the cue using `ExecuteGameplayCueActor`.
2. **Execute (`OnExecute`)**: The cue begins its visual or audio behavior.
3. **Loop or Persist**: Optional looping animations, particles, or timelines run.
4. **Remove (`OnRemove`)**: When the effect ends or is manually cleared, cleanup logic is executed.
5. **Destroy**: The actor is destroyed (manually or automatically), releasing its resources.

### Separation of Visual Logic

Using `BP_GameplayCueActor` allows designers to separate **gameplay logic** (in abilities and effects) from **visual/audio logic** (in cue actors). This supports clean architecture and parallel development between designers and engineers.

- Designers can focus on particle effects, sound cues, and UI hooks.
- Developers maintain logic in gameplay abilities without embedding FX logic directly.

### Coordination with Abilities and Effects

Cue actors are commonly triggered by:

- **Gameplay Effects** applying or removing status effects.
- **Gameplay Abilities** triggering specific phases (e.g., cast start, hit impact).

Example:

```blueprint
→ GA_SpellCast triggers Cue.Cast.Start via ExecuteGameplayCueActor
→ Cue plays charge FX, glows, and looping sound
→ GA_SpellCast ends → OnRemove stops audio and destroys actor
```

### Editor Organization Tips

To keep your cue library maintainable:

- Use naming prefixes like `BP_GC_` for actors and `Cue.` for gameplay tags.
- Organize cues in folders by category (e.g., Slash, Aura, Impact).
- Create cue templates for common logic (e.g., looping emitter + fade-out timeline).

---

- Always destroy or clean up the cue actor when no longer needed.
- Use timelines or custom events inside `OnExecute` and `OnRemove` for polished transitions.
- Keep cue tags descriptive and consistent (e.g., `Cue.Burn`, `Cue.StunLoop`, `Cue.Cast.Start`).
- Consider exposing variables for reuse in different cue implementations.

---

This documentation page provides guidance for using and extending `BP_GameplayCueActor` in the Advanced Abilities Framework. For examples, refer to cues like `BP_GC_SlashTrail`, `BP_GC_ImpactRing`, or `BP_GC_ChargeFX`.