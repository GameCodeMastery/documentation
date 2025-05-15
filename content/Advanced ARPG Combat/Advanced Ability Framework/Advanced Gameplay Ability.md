The `BP_AdvancedGameplayAbility` in the Advanced Abilities Framework defines what a gameplay ability does, including activation conditions, execution logic, and end conditions. It serves as the core unit of behavior in the ability system and allows developers to modularly define combat mechanics, buffs, debuffs, and other player or AI actions using Blueprints.

This class enables flexible ability creation that can be triggered by tags, input actions, or gameplay events without requiring C++ programming. It offers a high degree of control over the lifecycle of abilities and supports integration with attribute modification, gameplay cues, and ability tasks.

# Granting and UnGranting Abilities

Before an actor can use an ability, that actor’s Ability System Component must be granted that ability. In order to grant & ungrant an ability you must call the following functions:

- _**GiveAbility**_ - grants the ability to the owning actor’s ability system component
- _**GiveAbilityAndActivateOnce**_ - grants the ability to the owning actor’s ability system component & activates the ability immediately. After the ability completes the ability is ungranted.
- _**ClearAbility**_ - Ungrants & removes the ability from the actor’s ability system component
- _**ClearAbilties**_ - Ungrants & removes multiple abilities from the actor’s ability system component

---

## Basic Usage

A Gameplay Ability's basic execution lifecycle, after being granted to an Actor's Ability System Component, looks like this:

1. **`CanActivateAbility`**
    - Checks if the ability can currently be activated based on tag conditions or other game state.
    - Useful for gating logic or UI display (e.g., graying out unusable abilities).
2. **`TryActivateAbility`**
    - The standard entry point to attempt activating an ability.
    - Internally performs a `CanActivateAbility` check and, if valid, proceeds to call `ActivateAbility`.
3. **`ActivateAbility`**
    - Main execution function.
    - Implement custom logic here using Blueprint scripting (e.g., animations, spawning projectiles, applying effects).
    - Typically followed by a call to `CommitAbility`.

    ```blueprint
    ActivateAbility:
    → Play Montage (Attack)
    → Spawn Projectile
    → Commit Ability (apply cost)
    → End Ability
    ```

4. **`CommitAbility`**
    - Deducts resource costs (e.g., stamina, mana) and applies any activation tags or cooldowns.
5. **`EndAbility`**
    - Called when the ability finishes.
    - Can also be triggered by cancelation or interruption.
6. **`CancelAbility` / `InterruptAbility`**
    - Ends the ability prematurely under specific conditions.
    - Always call parent functions when overriding to preserve internal state cleanup.

---

## Key Properties

|Property|Purpose|
|---|---|
|`Activation Required Tags`|Tags the owner must have to activate the ability.|
|`Activation Blocked Tags`|Tags that, if present on the owner, prevent activation.|
|`Target Required Tags`|Tags required on the target to activate the ability.|
|`Target Blocked Tags`|Tags that prevent activation if present on the target.|
|`Activation Owned Tags`|Tags temporarily granted to the ability's owner while the ability is active.|
|`Cancel Abilities With Tag`|Abilities with these tags are canceled when this ability is activated.|
|`Block Abilities With Tag`|Prevents activation of any other abilities with these tags while this one is active.|
|`bCanBeCanceled`|Whether this ability is cancelable. Defaults to true.|
|`bAutoEndAbility`|Whether the ability should automatically end after `ActivateAbility`.|

---

## Key Concepts

### Instancing Policy

Defines how instances of the ability are created:
- **Instanced Per Execution**: Spawns a new instance each time the ability activates. Best for abilities with short lifespans.
- **Instanced Per Actor**: A single instance is shared per actor. Ideal for reusable abilities with state tracking.
- **Non-Instanced**: Uses the class default object (CDO). Blueprint scripting is not supported.

### Gameplay Events

The Advanced Abilities Framework includes a simple but powerful event system for triggering logic within abilities via gameplay events. This is distinct from Epic's GAS event system and is designed specifically for Blueprint-based workflows.

- Each ability has a property called `GameplayEventTags`.
    - This is an array of tags that define which events this ability will respond to.
    - You must assign the appropriate tags to this array for the ability to listen for those events.
- To send an event to an active ability, use the `SendEventToAbility` function on the Ability System Component.

```blueprint
SendEventToAbility:
→ Target: Ability System Component
→ Event Tag: Event.Ability.YourCustomTag
→ Instigator, Target, Optional Objects: (Optional contextual data)
```

- Inside the `BP_AdvancedGameplayAbility`, override the **`EventReceived`** function to define how the ability responds when the event is received.

```blueprint
EventReceived(EventTag, Instigator, Target, Optional Object):
→ Branch on Event Tag
→ Play FX, Apply Effect, or Trigger Ability Logic
```

This system is ideal for decoupling gameplay logic and triggering reactions to world events, interactions, or status effects across multiple gameplay abilities.

### Triggering with Gameplay Events

Abilities can be activated by sending gameplay events:

```blueprint
SendGameplayEventToActor:
- Target: Actor with Ability System Component
- Event Tag: Event.Ability.Trigger
- Payload: Gameplay Event Data
```

Internally, this triggers `ActivateAbilityFromEvent`, which receives the `FGameplayEventData` struct as input.

### Committing the Ability

Call `CommitAbility` inside `ActivateAbility` to:

- Apply cost effects (e.g., reduce mana).
- Apply cooldowns.
- Register activation tags.

Always follow with `EndAbility` if the ability has completed.

### Ending & Canceling

- `EndAbility` marks the ability as finished and clears activation tags.
- `CancelAbility` ends it due to external factors (e.g., stunned, interrupted).

Best practice:

```blueprint
Override EndAbility → Call Parent → Clear visuals/sounds
Override CancelAbility → Call Parent → Optional fail FX
```

---

This documentation page serves as a reference for understanding and extending the `BP_AdvancedGameplayAbility` class in the Advanced Abilities Framework. For example implementations, refer to built-in classes like `GA_SwordAttack`, `GA_Dash`, or `GA_HeavyStrike`.