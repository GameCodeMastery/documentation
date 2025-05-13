The `BP_AdvancedGameplayAbility` class in the Advanced Abilities System, designed for Unreal Engine 5, is a Blueprint-based class that defines the logic, costs, and activation conditions for in-game abilities, such as attacks, spells, or buffs in Action RPGs. Its purpose is to provide a modular, reusable framework for creating gameplay mechanics, enabling developers to implement complex ability behaviors through Blueprint scripting while maintaining flexibility for customization.

This compound data type addresses the need for scalable, designer-friendly ability systems that can be easily modified or extended without altering core game logic. By encapsulating ability functionality in child Blueprints, it supports diverse gameplay systems, such as combat or utility abilities, and integrates seamlessly with the `BP_AdvancedAbilitySystemComponent`, Gameplay Effects, and Gameplay Cues.

# Granting and UnGranting Abilities

Before an actor can use an ability, that actor’s Ability System Component must be granted that ability. In order to grant & ungrant an ability you must call the following functions:

- _**GiveAbility**_ - grants the ability to the owning actor’s ability system component
- _**GiveAbilityAndActivateOnce**_ - grants the ability to the owning actor’s ability system component & activates the ability immediately. After the ability completes the ability is ungranted.
- _**ClearAbility**_ - Ungrants & removes the ability from the actor’s ability system component
- _**ClearAbilties**_ - Ungrants & removes multiple abilities from the actor’s ability system component

---

The `BP_AdvancedGameplayAbility` class in the Advanced Abilities System, designed for Unreal Engine 5, is a Blueprint-based class that defines the logic, costs, and activation conditions for in-game abilities, such as attacks, spells, or buffs in Action RPGs. Its purpose is to provide a modular, reusable framework for creating gameplay mechanics, enabling developers to implement complex ability behaviors through Blueprint scripting while maintaining flexibility for customization.

This compound data type addresses the need for scalable, designer-friendly ability systems that can be easily modified or extended without altering core game logic. By encapsulating ability functionality in child Blueprints, it supports diverse gameplay systems, such as combat or utility abilities, and integrates seamlessly with the `BP_AdvancedAbilitySystemComponent`, Gameplay Effects, and Gameplay Cues.

---

## Basic Usage

Advanced Gameplay Abilities are granted to and activated by the `BP_AdvancedAbilitySystemComponent`, typically triggered by player inputs or game events. They execute custom logic, apply costs, and interact with other system components like Gameplay Effects. Below are the key functions, their purposes, and how they can be used in Blueprints.

1. **CanActivateAbility?**
    
    - **Purpose**: Checks if the ability can be activated based on conditions like costs or Gameplay Tags.
    - **Usage**:
        - Override to enforce custom conditions (e.g., checking resource availability).
        - Example: In `BP_FireballAbility`, verify mana availability.
            
            ```blueprint
            CanActivateAbility? -> Get Current Attribute Value (AttributeTag: Attribute.Mana) -> Branch (Condition: Mana >= 20) -> True: Return True
            ```
            
2. **ActivateAbility**
    
    - **Purpose**: Executes the core logic of the ability, such as spawning projectiles or applying effects.
    - **Usage**:
        - Override to define custom functionality. Call `CommitAbility` to apply the cost defined by `Cost Gameplay Effect Class` (e.g., mana reduction).
        - Example: In `BP_FireballAbility`, spawn a projectile and apply a mana cost.
            
            ```blueprint
            ActivateAbility -> Spawn Actor (Class: BP_FireballProjectile) -> CommitAbility -> Apply Gameplay Effect By Class (Class: GE_ManaCost)
            ```
            
3. **TryActivateAbility**
    
    - **Purpose**: Attempts to activate the ability, checking `CanActivateAbility?` before calling `ActivateAbility`.
    - **Usage**:
        - Called by `BP_AdvancedAbilitySystemComponent` to trigger abilities (e.g., via input).
        - Example: Bind to an input action.
            
            ```blueprint
            InputAction IA_ActivateFireball (Pressed) -> Get BP_AdvancedAbilitySystemComponent -> Try Activate Abilities By Tag (Tag: Ability.Fireball)
            ```
            
4. **End Ability**
    
    - **Purpose**: Handles system-wide cleanup for the ability, ensuring proper termination and state management.
    - **Usage**:
        - **Always** override with a call to the parent function, as it performs critical system cleanup. Only advanced users should override this function to modify core cleanup logic.
        - Example: In `BP_FireballAbility`, ensure parent cleanup is called.
            
            ```blueprint
            End Ability -> Call Parent Function -> Custom Cleanup (e.g., Reset System Variables)
            ```
            
        - **Note**: Similarly, do **not** override `Cancel Ability` or `Interrupt Ability` without calling the parent function, as they also handle system-wide cleanup.
5. **OnAbilityEnd**
    
    - **Purpose**: Allows designers to handle ability-specific end logic, such as resetting variables or playing effects, without affecting system-wide cleanup.
    - **Usage**:
        - Override to add custom end logic. Calling the parent function is optional, depending on the ability’s needs, making it designer-friendly.
        - Example: In `BP_FireballAbility`, play a sound on ability end.
            
            ```blueprint
            OnAbilityEnd (EndState) -> Switch on Enum (EndState) -> Finished: Play Sound (Sound: AbilityEndSound)
            ```


---

## Key Properties

|Property Name|Purpose|
|---|---|
|`Gameplay Ability Tags`|Gameplay Tags associated with the ability (e.g., `Ability.Fireball`). Used by `BP_AdvancedAbilitySystemComponent` to identify, activate, block, or cancel the ability.|
|`Cancel Abilities With Tag`|Cancels any already-executing abilities with tags matching the provided list while this ability is executing, ensuring conflicting abilities are stopped (e.g., cancel `Ability.Cast` when `Ability.Attack` activates).|
|`Block Abilities With Tag`|Prevents execution of any other abilities with matching tags while this ability is executing, enforcing ability exclusivity (e.g., block `Ability.Jump` during `Ability.Cast`).|
|`Activation Owned Tags`|Tags granted to the owning actor while this ability is executing, enabling state-based conditions (e.g., grant `State.Casting` during a spell).|
|`Activation Required Tags`|Tags the activating actor must have for the ability to activate, ensuring specific conditions are met (e.g., require `State.Alive` for `Ability.Attack`).|
|`Activation Blocked Tags`|Tags that prevent the ability from activating if present on the activating actor, enforcing restrictions (e.g., block `Ability.Heal` if `State.Immune` is present).|
|`Cost Gameplay Effect Class`|Specifies the `BP_GameplayEffect` class (using the `GE_` naming convention, e.g., `GE_ManaCost`) that defines the resource cost for activating the ability (e.g., reduce `Attribute.Mana` by 20). Applied via `CommitAbility`. Some default abilities, like `BP_AttackAbility` or `BP_FireballAbility`, include costs set up by default. To make an ability cost-free, set this property to blank, removing any associated costs.|

---

## Key Concepts

### Modular Ability Logic

`BP_AdvancedGameplayAbility` enables modular gameplay mechanics by encapsulating ability logic in child Blueprints, allowing developers to create reusable and customizable abilities. Each ability defines its behavior, costs, and conditions, making it easy to swap or modify mechanics without altering the broader system.

- **Implementation**: Create a child Blueprint (e.g., `BP_AttackAbility`) and override `ActivateAbility` to define logic. Grant via `BP_AdvancedAbilitySystemComponent`:
    
    ```blueprint
    Event BeginPlay -> Get BP_AdvancedAbilitySystemComponent -> Give Ability (Class: GA_AttackAbility)
    ```
    
- **Use Cases**: Combat abilities (e.g., melee attacks), utility abilities (e.g., healing spells), or passive effects (e.g., stat boosts).
- **Best Practices**: Use `CanActivateAbility?` to enforce conditions like resource availability or cooldowns. Refer to default combat abilities (e.g., `BP_AttackAbility`) in the project for implementation examples.

### Cost and Condition Management

Abilities can impose costs (e.g., mana, stamina) and require specific conditions (e.g., Gameplay Tags) for activation, managed through `CommitAbility` and `CanActivateAbility?`. This ensures balanced gameplay and prevents unintended ability usage.

- **Cost Management**:
    - Configure `Cost Gameplay Effect Class` (e.g., `GE_ManaCost`) in the Details panel. Call `CommitAbility` to apply the cost defined by the Gameplay Effect:
        
        ```blueprint
        ActivateAbility -> CommitAbility -> Apply Gameplay Effect By Class (Class: GE_ManaCost)
        ```

    - Integrates with the Advanced Attributes System (see Advanced Attributes System).
- **Condition Management**:
    - Use `CanActivateAbility?` to check conditions like Gameplay Tags or attribute values:
        
        ```blueprint
        CanActivateAbility? -> Check Actor Has Tag (Tag: State.Alive) -> Branch (Condition: True) -> True: Return True
        ```
        
- **Use Cases**: Resource-based abilities (e.g., spells requiring mana), state-dependent abilities (e.g., only usable when alive), or combo abilities (e.g., requiring prior ability activation).
- **Best Practices**: Test costs with `GetCurrentAttributeValue` to ensure balance. Use consistent Gameplay Tags to align with `BP_AdvancedAbilitySystemComponent` logic.

### Ability Lifecycle and Cleanup

The ability lifecycle involves activation, execution, and termination, with critical system-wide cleanup handled by `End Ability`, `Cancel Ability`, and `Interrupt Ability`, and designer-friendly end logic handled by `OnAbilityEnd`. Proper management ensures system stability and flexibility.

- **Lifecycle**:
    - **Activation**: `TryActivateAbility` checks `CanActivateAbility?` and calls `ActivateAbility`.
    - **Execution**: `ActivateAbility` runs custom logic, optionally using Ability Tasks (see [[Ability Task]] or [[Gameplay Effects]].
    - **Termination**: `End Ability` (or `Cancel Ability`, `Interrupt Ability`) triggers system-wide cleanup and calls `OnAbilityEnd`, which returns an enum (`Finished`, `Interrupted`, `Cancelled`) for custom handling.
    - Example: Handle different end states in `OnAbilityEnd`:

        ```blueprint
        OnAbilityEnd (EndState) -> Switch on Enum (EndState) -> Finished: Reset Variables -> Interrupted: Play Sound (Sound: InterruptSound)
        ```

- **Cleanup**:
    - **End Ability**, **Cancel Ability**, and **Interrupt Ability**: Always call parent functions, as they handle system-wide cleanup (e.g., resetting `BP_AdvancedAbilitySystemComponent` state). Only advanced users should override these to modify core cleanup logic:

        ```blueprint
        End Ability -> Call Parent Function -> Custom System Cleanup (e.g., Reset System Flags)
        ```

    - **OnAbilityEnd**: Designed for designers to override for ability-specific logic (e.g., resetting variables, playing effects). Calling the parent function is optional:

        ```blueprint
        OnAbilityEnd (EndState) -> Reset Ability Variables -> Play Sound (Sound: AbilityEndSound)
        ```

- **Use Cases**: Abilities with system cleanup needs (e.g., clearing active states), designer-defined end effects (e.g., visuals on ability end), or cancellable abilities (e.g., player-initiated stops).
- **Best Practices**: Test lifecycle transitions (e.g., cancel, interrupt) to ensure cleanup. Advanced users overriding `End Ability`, `Cancel Ability`, or `Interrupt Ability` must call parent functions, while designers can safely override `OnAbilityEnd` for custom logic.