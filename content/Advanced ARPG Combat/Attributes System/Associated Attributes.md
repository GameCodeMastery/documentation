## Overview

The Associated Attributes System in the Advanced Attributes System, designed for Unreal Engine 5, is a compound data type implemented as the `AssociatedAttributes` map within the `F_Attribute` struct. Its purpose is to enable attributes to govern the values of other attributes using curve-based calculations, facilitating complex leveling mechanics in Action RPGs, such as those found in souls-like games. For example, an `Endurance` attribute can dynamically adjust a `Stamina` attribute based on a designer-defined curve.

This system addresses the need for scalable, designer-friendly progression systems that allow attributes to influence one another without requiring manual mathematical calculations. By leveraging Curve Tables, it provides a flexible framework for balancing gameplay mechanics, such as implementing diminishing returns or exponential growth, making it ideal for creating nuanced character progression in RPGs.

---

## Basic Usage

The Associated Attributes System is used to define relationships where a governing attribute modifies the value of one or more governed attributes via Curve Tables. Below are the key functions, their purposes, and how they can be used in Blueprints.

1. **ModifyAttribute**
    - **Purpose**: Modifies the governing attribute’s value, triggering updates to all governed attributes defined in its `AssociatedAttributes` map.
    - **Usage**:
        - Call on the `BP_AttributesComponent` to adjust the governing attribute, which automatically recalculates governed attribute values based on the Curve Table.
        - Example: Increase `Attribute.Endurance` to adjust `Attribute.Stamina`.
            ```blueprint
            InputAction IA_TestEndurance (Pressed) -> Get BP_AttributesComponent -> ModifyAttribute (AttributeTag: Attribute.Endurance, Value: 10)
            ```

2. **GetCurrentAttributeValue**
    
    - **Purpose**: Retrieves the current value of a governed attribute, reflecting updates driven by the governing attribute’s `AssociatedAttributes` map.
    - **Usage**:
        - Use to verify or display the governed attribute’s value after modification of the governing attribute.
        - Example: Check `Attribute.Stamina` after modifying `Attribute.Endurance`.

            ```blueprint
            Get BP_AttributesComponent -> GetCurrentAttributeValue (AttributeTag: Attribute.Stamina) -> Print String
            ```


---

## Key Properties

|Property Name|Purpose|
|---|---|
|`AssociatedAttributes`|A map in the `F_Attribute` struct linking a governing attribute to governed attributes. The key is the governed attribute’s Gameplay Tag (e.g., `Attribute.Stamina`), and the value is a Curve Table row defining the relationship.|

---

## Key Concepts

### Curve-Based Attribute Governance

The Associated Attributes System enables a governing attribute to control the values of governed attributes using Curve Tables, which define the mathematical relationship between the governing attribute’s value (X-axis) and the governed attribute’s value (Y-axis). This allows designers to create complex progression mechanics, such as linear growth, exponential increases, or diminishing returns, without coding.

- **Implementation**: In the `AssociatedAttributes` map of a governing attribute (e.g., `Attribute.Endurance`), add entries where the key is the governed attribute’s Gameplay Tag (e.g., `Attribute.Stamina`) and the value is a Curve Table row (e.g., `EnduranceToStamina`). The Curve Table defines how `Endurance` values map to `Stamina` values.
- **Use Cases**: Increase stamina based on endurance, boost health regeneration with vitality, or scale damage output with strength.
- **Best Practices**: Use the Curve Editor to visually adjust curves for intuitive balancing. Test relationships by modifying the governing attribute and checking governed values:

    ```blueprint
    ModifyAttribute (AttributeTag: Attribute.Endurance, Value: 5) -> GetCurrentAttributeValue (AttributeTag: Attribute.Stamina) -> Print String
    ```


### Designer-Friendly Balancing

The use of Curve Tables in the Associated Attributes System empowers designers to balance progression mechanics without requiring programming expertise. By adjusting curves in the Content Browser, designers can fine-tune how attributes influence each other, achieving desired gameplay feel and balance.

- **How It Works**: A Curve Table row (e.g., `EnduranceToStamina`) maps the governing attribute’s value to the governed attribute’s value. For example, a curve might define `Attribute.Stamina` as 50 at `Attribute.Endurance = 0`, 150 at `Endurance = 50`, and 180 at `Endurance = 100` for diminishing returns.
- **Customization**: Modify Curve Table rows to adjust progression. For example, flatten the curve at higher values to limit stamina growth:

    ```blueprint
    // Curve Table: EnduranceToStamina
    // X=0, Y=50; X=50, Y=140; X=100, Y=160
    ```

- **Use Cases**: Create balanced leveling systems where attributes scale appropriately, avoiding overpowered stats at high levels.
- **Best Practices**: Start with simple linear curves for initial testing, then refine with non-linear curves. Use small increments when testing to ensure smooth progression.