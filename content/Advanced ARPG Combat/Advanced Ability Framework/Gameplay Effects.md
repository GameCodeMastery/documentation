The `BP_GameplayEffect` class in the `Advanced Abilities Framework` is a Blueprint class designed to modify attributes in Action RPGs, supporting instant, timed, or periodic changes such as damage, buffs, or debuffs. It enables developers and designers to create data-driven effects that alter gameplay states, like reducing health or boosting speed, while integrating with the `BP_AdvancedAbilitySystemComponent`. This class addresses the need for a flexible, modular system to manage attribute changes and associated visual/audio cues, streamlining dynamic gameplay mechanics.

## Basic Usage

The `BP_GameplayEffect` is used by creating child Blueprints and applying them via the `BP_AdvancedAbilitySystemComponent`. Below are the primary methods for interacting with it in Blueprints.

1. **Apply Effect**:
    - **Purpose**: Applies the effect’s attribute changes and triggers associated cues.
    - **Usage**: Override in a child Blueprint for custom application logic.
    - **Example**:
```blueprint
Apply Effect -> Spawn Emitter At Location (Emitter: PoisonParticles)
```

2. **Remove Effect**:
    - **Purpose**: Removes the effect and performs cleanup.
    - **Usage**: Override for custom removal logic; called automatically for timed effects.
    - **Example**:
```blueprint
Remove Effect -> Stop Emitter
```

3. **Can Apply Effect**:
    - **Purpose**: Checks if the effect can be applied based on tags and conditions.
    - **Usage**: Override to add custom validation logic.
    - **Example**:
```blueprint
Can Apply Effect -> Check Attribute.Health > 0 -> Return True
 ```

4. **Apply Gameplay Effect By Class**:
    - **Purpose**: Applies the effect from `BP_AdvancedAbilitySystemComponent`.
    - **Usage**: Call within an ability to trigger the effect.
    - **Example**:
```blueprint
ActivateAbility -> Get BP_AdvancedAbilitySystemComponent -> Apply Gameplay Effect By Class (Class: GE_DamageEffect)
```

## Key Properties

|Property Name|Purpose|
|---|---|
|`Duration Policy`|Enum (`Instant`, `Infinite`, `Has Duration`) defining how long the effect lasts; set to `Has Duration` for timed effects.|
|`Duration`|Sets the effect’s duration in seconds; requires `Duration Policy` set to `Has Duration`.|
|`Period`|Defines the interval (in seconds) for periodic effect applications (e.g., poison damage).|
|`Modifiers`|Specifies attribute changes (e.g., reduce `Attribute.Health` by 10).|
|`Executions`|Defines custom logic to execute when the effect is applied (e.g., damage calculations).|
|`Application Required Tags`|Requires the owning actor to have all these tags for the effect to apply.|
|`Application Blocked Tags`|Prevents effect application if the owning actor has any of these tags.|
|`Granted Abilities`|Grants specified abilities when the effect is applied.|
|`Stacking`|Defines how multiple applications of the effect stack (e.g., add stacks).|
|`Gameplay Cues`|Links to `BP_GameplayCue` or `BP_GameplayCueActor` for visual/audio feedback.|

## Key Concepts

### Data-Driven Attribute Modification

The `BP_GameplayEffect` uses a data-driven approach, allowing designers to configure attribute changes via properties like `Modifiers` and `Duration`. This eliminates the need for extensive scripting, enabling rapid effect creation.

- **Purpose**: Simplifies attribute management for dynamic gameplay.
- **Usage**: Set `Modifiers` and `Duration Policy` in the Details panel to define effect behavior.
- **Benefit**: Empowers designers to create effects without coding.

### Effect Duration and Periodicity

Effects can be instant (e.g., damage), infinite (e.g., permanent buffs), or timed with periodic applications (e.g., poison). The `Duration Policy`, `Duration`, and `Period` properties control these behaviors.

- **Purpose**: Provides flexible timing for effect application.
- **Usage**: Configure `Duration Policy` to `Has Duration` and set `Duration` and `Period` for timed effects.
- **Benefit**: Supports diverse gameplay mechanics like DoTs or temporary buffs.

### Gameplay Cue Integration

The `BP_GameplayEffect` can trigger `Gameplay Cues` (e.g., `BP_Niagara_ImpactEffect`) to provide visual or audio feedback when applied, enhancing immersion and clarity.

- **Purpose**: Synchronizes effects with player-facing feedback.
- **Usage**: Add `Gameplay Cues` in the Details panel to link effects like particles or sounds.
- **Benefit**: Streamlines effect presentation with minimal setup.

## Best Practices

- **Workflows**:
    - Use the `GE_` naming convention for child Blueprints (e.g., `GE_Poison`) to maintain clarity.
    - Test effects with default configurations (e.g., `GE_DamageEffect`) before adding custom logic.
    - Use `Instant` effects for one-off changes like damage or healing.
    - Use `Executions` for advanced calculations that can't be achieved through basic modifiers.
    - Leave `Modifier ID` blank — the system will generate a unique ID automatically.
- **Pitfalls to Avoid**:
    - Ensure `Duration Policy` is set to `Has Duration` for timed effects, or they won’t expire.
    - Don’t set `Period` too low (<0.5s) to avoid performance issues with frequent ticks.
- **Performance Considerations**:
    - Minimize `Period` frequency for periodic effects to reduce tick overhead.
    - Use `Gameplay Cues` sparingly for frequent effect applications; prefer `BP_GameplayCue` over `BP_GameplayCueActor` for frequent effect applications.