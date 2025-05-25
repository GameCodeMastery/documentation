---
aliases:
  - F_Attribute
---

The `F_Attribute` struct in the `Advanced Attributes System` is the core data structure for storing and managing gameplay-related floating-point attribute values, such as health, stamina, or experience points, within the `BP_AttributesComponent`. It enables developers to define and track actor traits efficiently, supporting dynamic modifications and relationships like souls-like leveling. The struct addresses the need for a flexible, standardized way to handle attribute data in Action RPGs, ensuring seamless integration with other system features like HUD displays and associated attributes.

## Basic Usage

The `F_Attribute` struct is managed within the `Attributes` array of the `BP_AttributesComponent`. Below are the primary methods for interacting with `F_Attribute` in Blueprints.

1. **SetCurrentAttributeValue**:
    - **Purpose**: Sets the current value of an `F_Attribute` for gameplay logic.
    - **Usage**: Call `SetCurrentAttributeValue` on `BP_AttributesComponent`, specifying the `AttributeTag` and value.

2. **GetCurrentAttributeValue**:
    - **Purpose**: Retrieves the current value of an `F_Attribute` for use in gameplay or UI.
    - **Usage**: Use `GetCurrentAttributeValue` on `BP_AttributesComponent` with the `AttributeTag`.

3. **ModifyAttribute**:
    - **Purpose**: Dynamically adjusts the current value of an `F_Attribute` during gameplay.
    - **Usage**: Call `ModifyAttribute` on `BP_AttributesComponent` to add or subtract a value.

## Key Properties

|Property Name|Purpose|
|---|---|
|`AttributeTag`|The Gameplay Tag identifying the attribute (e.g., `Attribute.Health`).|
|`CurrentValue`|The dynamic value used in calculations, affected by modifiers (e.g., current health).|
|`BaseValue`|The fixed reference value, unaffected by temporary modifiers (e.g., max health).|
|`MultiplierValue`|Stores multiplication factors applied to the attribute via modifiers.|
|`PercentValue`|Tracks the percentage of the current value relative to the max (e.g., health percentage).|
|`AssociatedAttributes`|A map linking governed attributes to Curve Table rows for dynamic scaling (e.g., `Attribute.Endurance` to `Attribute.Stamina`).|

## Key Concepts

### Attribute Value Types

The `F_Attribute` struct distinguishes between `CurrentValue` and `BaseValue` to support dynamic gameplay. `CurrentValue` reflects real-time changes (e.g., health reduced by damage), while `BaseValue` remains stable for reference (e.g., max health). This separation enables flexible attribute management without losing baseline data.

- **Purpose**: Supports dynamic and static attribute tracking.
- **Usage**: Use `GetCurrentAttributeValue` for gameplay logic and `GetBaseAttributeValue` for reference checks.
- **Benefit**: Simplifies handling of temporary modifiers and persistent data.

### Percentage Tracking

The `PercentValue` property stores the current value as a percentage of the max, useful for UI displays or save/load systems. For example, it can represent current health divided by max health, ensuring accurate restoration after loading.

- **Purpose**: Facilitates UI updates and data persistence.
- **Usage**: Access `PercentValue` via `BP_AttributesComponent` getters for HUD widgets.
- **Benefit**: Streamlines progress bar integration and save system compatibility.

### Associated Attributes Integration

The [[Associated Attributes]] map in `F_Attribute` allows attributes to govern others using Curve Tables, enabling souls-like leveling mechanics. This integrates seamlessly with the `Associated Attributes` feature for dynamic scaling.

- **Purpose**: Enables complex attribute relationships.
- **Usage**: Configure `AssociatedAttributes` in `BP_AttributesComponent` to link attributes.
- **Benefit**: Reduces manual scripting for leveling systems.

## Best Practices

- **Workflows**:
    - Define `AttributeTag` values clearly in the Gameplay Tags table to avoid conflicts.
    - Use `SetCurrentAttributeValue` for initial setup and `ModifyAttribute` for runtime changes.
- **Pitfalls to Avoid**:
    - Don’t modify `BaseValue` directly during gameplay; use `CurrentValue` for dynamic changes.
    - Avoid duplicate `AttributeTag` entries in the `Attributes` array to prevent errors.
- **Performance Considerations**:
    - Limit the number of `AssociatedAttributes` entries to reduce curve calculations.
    - Cache frequently accessed `CurrentValue` results in Blueprints to optimize performance.