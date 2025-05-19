The `Associated Attributes` feature in the `Advanced Attributes System` enables attributes to govern the values of other attributes using curve tables, mimicking souls-like leveling systems. It allows developers to create dynamic relationships, such as an `Attribute.Endurance` increasing `Attribute.Stamina`, with designer-friendly curve adjustments. This feature addresses the need for flexible, scalable attribute interactions in Action RPGs, simplifying complex leveling mechanics without requiring manual calculations.

![[Attribute Curve.png]]

## Basic Usage

The `Associated Attributes` feature is managed within the `F_Attribute` struct of the `BP_AttributesComponent`. Below are the primary methods for configuring and using this feature in Blueprints.

1. **ConfigureAssociatedAttributes**:
    
    - **Purpose**: Sets up the relationship between a governing attribute and its governed attributes.
    - **Usage**: Add entries to the `AssociatedAttributes` map in the `Attributes` array of `BP_AttributesComponent`.
    - **Example**: In `BP_AttributesComponent`, set `Attribute.Endurance`’s `AssociatedAttributes` map to link `Attribute.Stamina` to a Curve Table row.

> [!NOTE] Note:
> If using attributes standalone (without Advanced ARPG Combat), the attributes array will need to be edited within the attributes component in the actor

2. **ModifyAttribute**:
    - **Purpose**: Updates the governing attribute, triggering updates to associated attributes based on the curve.
    - **Usage**: Call `ModifyAttribute` on `BP_AttributesComponent` to change the governing attribute’s value.
    - **Example**:
        ```blueprint
        Get BP_AttributesComponent -> ModifyAttribute (AttributeTag: Attribute.Endurance, Value: 10)
        ```

3. **GetCurrentAttributeValue**:
    - **Purpose**: Retrieves the updated value of an associated attribute after modification.
    - **Usage**: Use `GetCurrentAttributeValue` to check the governed attribute’s value.
    - **Example**:
        ```blueprint
        Get BP_AttributesComponent -> GetCurrentAttributeValue (AttributeTag: Attribute.Stamina) -> Print String
        ```

## Key Properties

|Property Name|Purpose|
|---|---|
|`AssociatedAttributes`|A map in `F_Attribute` linking governed attributes (e.g., `Attribute.Stamina`) to Curve Table rows that define their value based on the governing attribute (e.g., `Attribute.Endurance`).|
|`AttributeTag`|The Gameplay Tag identifying the governing attribute (e.g., `Attribute.Endurance`) in the `F_Attribute` struct.|

## Key Concepts

### Curve-Based Scaling

The `Associated Attributes` feature uses Curve Tables to define how a governing attribute affects associated attributes. The curve’s X-axis represents the governing attribute’s value, and the Y-axis determines the governed attribute’s value, enabling linear scaling or diminishing returns.

- **Purpose**: Simplifies attribute relationships with visual, adjustable curves.
- **Usage**: Create a Curve Table in the Content Browser, add a row, and assign it to the `AssociatedAttributes` map.
- **Benefit**: Allows designers to tweak scaling without coding, supporting rapid iteration.

### Dynamic Attribute Updates

When a governing attribute’s value changes, the `Associated Attributes` feature automatically updates governed attributes based on the curve. This ensures real-time synchronization of related attributes during gameplay.

- **Purpose**: Maintains consistent attribute relationships in response to gameplay events.
- **Usage**: Modify the governing attribute with `ModifyAttribute` to trigger updates.
- **Benefit**: Streamlines complex leveling mechanics, reducing manual scripting.

### Designer-Friendly Configuration

The feature is designed for ease of use by non-programmers, leveraging Unreal’s Curve Table editor to adjust attribute relationships. This allows designers to fine-tune gameplay without touching Blueprints.

- **Purpose**: Empowers designers to control attribute scaling directly.
- **Usage**: Adjust Curve Table rows in the Content Browser to set desired scaling behavior.
- **Benefit**: Enhances workflow efficiency and accessibility for design teams.

## Best Practices

- **Workflows**:
    - Use simple Curve Tables with clear X-Y relationships for easy designer adjustments.
    - Test governing attribute changes in-game to verify associated attribute updates.
- **Pitfalls to Avoid**:
    - Avoid overly complex curves, as they can confuse designers.
    - Don’t assign multiple Curve Tables to the same governed attribute, as this may cause conflicts.