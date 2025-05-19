---
aliases:
  - Gameplay Abilities
---

The `BP_AdvancedGameplayAbility` class in the `Advanced Abilities Framework` is a Blueprint class that defines in-game abilities for Action RPGs, such as attacks, jumps, or spells. It enables developers to create modular, customizable gameplay mechanics, specifying activation conditions, costs, cooldowns, and effects. This class addresses the need for a flexible, data-driven ability system, allowing designers to script complex behaviors without C++ coding, while integrating seamlessly with the `BP_AdvancedAbilitySystemComponent` for execution and state management.

# Granting and UnGranting Abilities

Before an actor can use an ability, that actor’s Ability System Component must be granted that ability. In order to grant & ungrant an ability you must call the following functions:

- **GiveAbility** - grants the ability to the owning actor’s ability system component
- **GiveAbilityAndActivateOnce** - grants the ability to the owning actor’s ability system component & activates the ability immediately. After the ability completes the ability is ungranted.
- **ClearAbility** - Ungrants & removes the ability from the actor’s ability system component
- **ClearAbilties** - Ungrants & removes multiple abilities from the actor’s ability system component

## Basic Usage

The `BP_AdvancedGameplayAbility` is used by creating child Blueprints and granting them to a `BP_AdvancedAbilitySystemComponent`. Below are the primary methods for interacting with it in Blueprints.

1. **CanActivateAbility**:
    - **Purpose**: Checks if the ability can be activated based on tags and costs.
    - **Usage**: Automatically called by `TryActivateAbility`; override for custom conditions.
    - **Example**:
```blueprint
CanActivateAbility -> Check Attribute.Stamina >= 10 -> Return True
```

2. **ActivateAbility**:
    - **Purpose**: Executes the ability’s core logic.
    - **Usage**: Override in a child Blueprint to define custom behavior; call `CommitAbility` to apply costs.
    - **Example**:
```blueprint
ActivateAbility -> Call CommitAbility -> Spawn Actor (Class: BP_Projectile) -> Start Cooldown
```

3. **TryActivateAbility**:
    - **Purpose**: Attempts to activate the ability via `BP_AdvancedAbilitySystemComponent`.
    - **Usage**: Call from the component to trigger the ability if conditions are met.
    - **Example**:
```blueprint
Enhanced Input Action (IA_Attack) -> Get BP_AdvancedAbilitySystemComponent -> Try Activate Abilities By Tag (Tags: Ability.Attack)
```

4. **End Ability**:
    - **Purpose**: Terminates the ability and performs cleanup.
    - **Usage**: Call to end execution; override with parent call for custom cleanup.
    - **Example**:
```blueprint
End Ability -> Call Parent: End Ability -> Reset Variables
```

## Key Properties

| Property Name               | Purpose                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Cost Gameplay Effect`      | Specifies a `BP_GameplayEffect` to apply costs (e.g., reduce `Attribute.Stamina`) when the ability is committed. |
| `CooldownTime`              | Sets the cooldown duration in seconds, activated by `Start Cooldown`.                                            |
| `Cooldown Loop Interval`    | Defines the frequency (in seconds) of cooldown timer updates.                                                    |
| `Cancel Abilities With Tag` | Cancels active abilities with matching tags during execution.                                                    |
| `Block Abilities With Tag`  | Prevents other abilities with matching tags from activating during execution.                                    |
| `Activation Owned Tags`     | Grants these tags to the owning actor during execution for state-based logic.                                    |
| `Activation Required Tags`  | Requires the activating actor/component to have all these tags to activate.                                      |
| `Activation Blocked Tags`   | Prevents activation if the activating actor/component has any of these tags.                                     |

## Key Concepts

### Modular Ability Logic

The `BP_AdvancedGameplayAbility` encapsulates ability behavior in a single Blueprint, allowing developers to define activation, effects, and cleanup logic. This modularity supports rapid iteration and reuse across different abilities.

- **Purpose**: Simplifies ability creation and maintenance.
- **Usage**: Override `ActivateAbility` and `OnAbilityEnd` in child Blueprints for custom logic.
- **Benefit**: Enables designers to script complex mechanics without modifying core systems.

### Tag-Based Control

Abilities use `Gameplay Tags` to manage activation, cancellation, and blocking, providing precise control over ability interactions. Tags ensure abilities only execute under specific conditions, preventing conflicts.

- **Purpose**: Enforces state-driven ability execution.
- **Usage**: Configure `Activation Required Tags`, `Block Abilities With Tag`, etc., in the Details panel.
- **Benefit**: Reduces errors and enhances gameplay consistency.

### Cooldown Management

The `BP_AdvancedGameplayAbility` supports optional cooldowns, activated by calling `Start Cooldown`. This allows designers to balance ability usage with configurable durations and update intervals.

- **Purpose**: Limits ability frequency for gameplay balance.
- **Usage**: Set `CooldownTime` and call `Start Cooldown` in `ActivateAbility`.
- **Benefit**: Provides designer-friendly control over ability pacing.

## Best Practices

- **Workflows**:
    - Use the `GA_` naming convention for child Blueprints (e.g., `GA_Fireball`) to maintain clarity.
    - Test abilities with default effects (e.g., `GE_DamageEffect`) before adding custom logic.
- **Pitfalls to Avoid**:
    - Always call parent functions in `End Ability`, `Cancel Ability`, and `Interrupt Ability` overrides to ensure proper cleanup.
    - Don’t skip setting `Cost Gameplay Effect` if the ability consumes resources to avoid unbalanced gameplay.
- **Performance Considerations**:
    - Minimize complex logic in `ActivateAbility` to reduce execution overhead.
    - Use `Cooldown Loop Interval` sparingly (e.g., >0.5s) to avoid frequent ticks.
    - Cache `BP_AdvancedAbilitySystemComponent` references in Blueprints to optimize performance.