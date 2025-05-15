The `BP_GameplayEffect` is a core data-driven component of the Advanced Abilities Framework used to apply changes to attributes over time, either instantly, temporarily, or periodically. Gameplay effects enable the creation of buffs, debuffs, healing, damage-over-time, stat boosts, and other attribute-based mechanics in a modular, designer-friendly format.

These effects are fully Blueprint-driven and are intended to be applied through abilities or the Ability System Component to self or other targets.

---

## Basic Usage

Gameplay effects are applied using the Ability System Component through various methods:

1. **Create a Gameplay Effect**
    - Create a child of `BP_GameplayEffect` (e.g., `GE_Bleed`, `GE_BuffSpeed`).
    - Configure the `Duration`, `Modifiers`, and optional `Executions`.

2. **Apply to Self or Target**
    - Use `ApplyGameplayEffectByClass` to apply to self.
    - Use `ApplyGameplayEffectToTarget` to apply to another actor’s Ability System Component.

```blueprint
ApplyGameplayEffectToTarget:
→ Target: Target ASC
→ Effect Class: GE_Bleed
```

3. **Optional Logic Hooks**
    - Override `ApplyEffect` to define what happens when the effect is applied.
    - Override `RemoveEffect` for custom cleanup logic.
    - Override `CanApplyEffect` to gate the effect based on tags or other checks.

---

## Key Properties

|Property|Purpose|
|---|---|
|`Duration`|Duration of the effect (0 = instant, >0 = timed).|
|`Period`|Time between recurring applications (used for periodic effects like poison).|
|`Modifiers`|Array of attribute modifications (e.g., +5 Strength, -20 Health).|
|`Executions`|Executes Blueprint logic or calculations when the effect is applied.|
|`Application Required Tags`|Tags that must be present on the owning actor to allow application.|
|`Application Blocked Tags`|Tags that, if present, prevent the effect from being applied.|
|`Granted Abilities`|Abilities given to the actor for the duration of the effect.|
|`Gameplay Cues`|Cue tags to trigger visual/audio effects while the effect is active.|
|`Stacking`|Determines whether the effect can stack and how multiple instances are managed.|

---

## Key Concepts

### Attribute Modifiers

Modifiers are used to directly alter attribute values. Each modifier defines:

- **Target Attribute**: The attribute to modify.
- **Operation Type**: Add, Multiply, Override, etc.
- **Value**: The amount to apply.

Modifiers can be used for effects such as:

- +10 Armor (Flat Add)
- -20% Move Speed (Multiply)
- Set Max Health to 150 (Override)

### Periodic Application

- Set the `Period` value to apply an effect at intervals.
- Example: A poison effect with Period = 1s and Duration = 5s applies 5 times.
- Use `ApplyEffect` logic to apply damage, visual effects, or other behaviors on each tick.

### Execution Blueprints

Executions are custom child Blueprints of `BP_Execution` that allow for advanced calculations or event logic.

- Used when modifier math isn’t enough (e.g., damage scaling based on attributes).
- Triggered once when the effect is applied.

```blueprint
BP_Execution_CalculateFireDamage → Read Attacker Intelligence → Apply Bonus Damage
```

### Gameplay Tags and Application Rules

Use `Application Required Tags` and `Blocked Tags` to control who can receive the effect. This helps enforce:

- Immunity rules
- Class- or state-based targeting restrictions
- Layered systems (e.g., only poisoned enemies can be burned)

### Stacking Policies

Determine how multiple instances of the same effect behave:

- Stack Count: Number of times the effect can stack.
- Refresh Duration: Whether applying again resets the timer.
- Unique Behavior: Custom stacking logic can be implemented in Blueprints.

### Integration with Gameplay Cues

- Effects can trigger gameplay cues for visual/audio feedback.
- These cues will activate on apply and optionally deactivate when removed.
- Combine with Niagara systems, sound effects, or animations.

```blueprint
GE_Frozen → Cue.FX.FreezeAura
→ Spawn icicles and play sound while active
```

---

## Best Practices

- Use modifiers for simple, direct changes. Use executions for calculations.
- Combine tags and stacking to support deep systemic interaction.
- Keep each effect focused; combine effects modularly for layered mechanics.
- When creating buffs or status effects, pair them with visual cue assets.
- Don’t forget to remove temporary gameplay cues on `RemoveEffect`.

---

This documentation page outlines the design and implementation of `BP_GameplayEffect` in the Advanced Abilities Framework. For examples, explore `GE_Bleed`, `GE_HealOverTime`, or `GE_BuffStaminaRegen`.