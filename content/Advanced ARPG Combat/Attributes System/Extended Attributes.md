## Overview

The Extended Attribute classes in the Advanced Attributes System, designed for Unreal Engine 5, provide a flexible framework for adding custom functionality to attributes managed by the `BP_AttributesComponent`. These Blueprint classes—`BP_BaseExtendedAttribute` (a UObject) and its derived `BP_BaseRegeneratableAttribute`—enable developers to implement specialized behavior for attributes, such as triggering gameplay events when health reaches zero or regenerating stamina over time.

The purpose of these classes is to extend the core attribute system, allowing attributes to interact with gameplay mechanics beyond simple value storage and modification. They address the need for project-specific attribute behavior, such as regeneration mechanics for RPG resources (e.g., mana, stamina) or conditional logic for critical states (e.g., low-health warnings). By associating custom logic with attributes, these classes enable developers to create dynamic, responsive gameplay systems while maintaining a modular and designer-friendly structure within the Advanced Attributes System.

---

## Basic Usage

The Extended Attribute classes are used to enhance attributes by attaching custom or regenerative behavior. Below are the key functions for `BP_BaseExtendedAttribute` and `BP_BaseRegeneratableAttribute`, their purposes, and how they can be used in Blueprints.

1. **OnAttributeValueModified**
    - **Purpose**: Called when the associated attribute’s value is modified via `ModifyAttribute`, allowing custom logic to respond to changes.
    - **Usage**:
        - Override in a child Blueprint to implement project-specific behavior, such as triggering a low-health warning.
        - Example: In `BP_HealthExtendedAttribute`, activate a warning when health falls below a threshold.
            ```blueprint
            OnAttributeValueModified -> GetCurrentAttributeValue (AttributeTag: Attribute.Health) -> Branch (Condition: Value < 20) -> True: Activate Low Health Warning (Sound: LowHealthSound)
            ```

2. **OnCurrentAttributeValueUpdated**
    
    - **Purpose**: Called when the attribute’s current value is updated, including changes from regeneration or other automatic processes.
    - **Usage**:
        - Use to trigger visual or gameplay effects, such as updating a stamina-based effect.
        - Example: In `BP_StaminaExtendedAttribute`, adjust a particle effect based on stamina.
            ```blueprint
            OnCurrentAttributeValueUpdated -> Spawn Particle Effect (Effect: StaminaGlow, Intensity: Based on Attribute.Stamina Value)
            ```

3. **OnStartRegen** (Specific to `BP_BaseRegeneratableAttribute`)
    - **Purpose**: Called when regeneration begins after the `RegenCoolDown` period, allowing custom actions at the start of regeneration.
    - **Usage**:
        - Trigger audio or visual cues to indicate regeneration.
        - Example: In `BP_StaminaRegeneratableAttribute`, play a regeneration sound.
            ```blueprint
            OnStartRegen -> Play Sound (Sound: RegenStartSound)
            ```

4. **OnRegenFinished** (Specific to `BP_BaseRegeneratableAttribute`)
    - **Purpose**: Called when the attribute reaches its maximum value and regeneration stops, enabling notifications.
    - **Usage**:
        - Notify the player when an attribute is fully restored.
        - Example: In `BP_StaminaRegeneratableAttribute`, display a UI notification.

            ```blueprint
            OnRegenFinished -> Display UI Notification (Text: "Stamina Fully Restored")
            ```


---

## Key Properties

|Property Name|Purpose|
|---|---|
|`ExtendedAttributeTag`|The Gameplay Tag of the attribute associated with the extended attribute (e.g., `Attribute.Health`). Defines which attribute the class affects.|
|`MaxAttributeTag`|The Gameplay Tag of the maximum attribute (e.g., `Attribute.StaminaMax`). Used by `BP_BaseRegeneratableAttribute` to cap regeneration.|
|`RegenRate`|The amount added to the attribute per tick during regeneration (e.g., 5 units/second). Specific to `BP_BaseRegeneratableAttribute`.|
|`RegenTickInterval`|The frequency of regeneration updates (e.g., 1 second). Specific to `BP_BaseRegeneratableAttribute`.|
|`RegenCoolDown`|The delay before regeneration begins after a modification (e.g., 2 seconds). Specific to `BP_BaseRegeneratableAttribute`.|

---

## Key Concepts

### Custom Attribute Behavior

`BP_BaseExtendedAttribute` serves as a base class for attaching custom logic to attributes, enabling developers to define behavior that responds to attribute changes. This is particularly useful for gameplay mechanics requiring conditional triggers or interactions with other systems, such as Gameplay Effects or abilities.

- **Implementation**: Create a child Blueprint (e.g., `BP_HealthExtendedAttribute`) and override functions like `OnAttributeValueModified` to add logic. For example, a critical health state can trigger a warning effect:

    ```blueprint
    OnAttributeValueModified -> GetCurrentAttributeValue (AttributeTag: Attribute.Health) -> Branch (Condition: Value < 20) -> True: Spawn Particle Effect (Effect: LowHealthWarning)
    ```

- **Use Cases**: Trigger buffs when an attribute exceeds a threshold, update AI behavior based on attribute states, or activate UI elements for player feedback.
- **Best Practices**: Keep logic lightweight to minimize performance impact, and use `Print String` nodes for debugging during development.

### Regeneration Mechanics

`BP_BaseRegeneratableAttribute` extends `BP_BaseExtendedAttribute` to provide built-in regeneration for attributes, ideal for RPG resources like stamina or mana. It automates the process of restoring an attribute’s value over time, with configurable parameters to control the regeneration behavior.

- **How It Works**: After an attribute (e.g., `Attribute.Stamina`) is modified, regeneration is delayed by `RegenCoolDown`. The attribute then increases by `RegenRate` every `RegenTickInterval` until it reaches the value defined by `MaxAttributeTag`.
- **Customization**: Adjust `RegenRate`, `RegenTickInterval`, and `RegenCoolDown` in the Class Defaults to balance gameplay. Override `OnStartRegen` or `OnRegenFinished` for additional effects:

    ```blueprint
    OnStartRegen -> Spawn Particle Effect (Effect: RegenSparkle)
    ```

- **Use Cases**: Implement stamina recovery after sprinting, mana regeneration for spellcasting, or health restoration in safe zones.
- **Best Practices**: Ensure `MaxAttributeTag` is defined to prevent over-regeneration, and test regeneration timing to match gameplay pacing.