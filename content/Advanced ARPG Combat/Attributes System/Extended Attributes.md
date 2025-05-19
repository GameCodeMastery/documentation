The `BP_BaseExtendedAttribute` class in the `Advanced Attributes System` provides a framework for adding custom functionality to attributes managed by the `BP_AttributesComponent`. It enables developers to implement project-specific logic, such as triggering events when an attribute reaches a threshold (e.g., death when health is zero) or managing regeneratable attributes. This class addresses the need for extensible attribute behavior in Action RPGs, allowing seamless integration with the attribute system without modifying core functionality.

## Basic Usage

The `BP_BaseExtendedAttribute` is used by creating child classes and adding them to the `ExtendedAttributes` array of `BP_AttributesComponent`. Below are the primary methods for interacting with it in Blueprints.

1. **OnAttributeValueModified**:
    
    - **Purpose**: Responds to changes in the associated attribute’s value.
    - **Usage**: Override in a child Blueprint to implement custom logic when the attribute is modified.
    - **Example**:
        ```blueprint
        OnAttributeValueModified -> If GetCurrentAttributeValue (AttributeTag: Attribute.Health) <= 0 -> Trigger Death Ability
        ```

2. **OnCurrentAttributeValueUpdated**:
    - **Purpose**: Reacts to updates to the associated attribute’s current value.
    - **Usage**: Override in a child Blueprint to handle value updates (e.g., UI or gameplay effects).
    - **Example**:
        ```blueprint
        OnCurrentAttributeValueUpdated -> Update Custom HUD Element
        ```

3. **AddExtendedAttribute**:
    - **Purpose**: Adds an instance of `BP_BaseExtendedAttribute` to an actor’s `BP_AttributesComponent`.
    - **Usage**: Call on `BP_AttributesComponent` to register the extended attribute.
    - **Example**:
        ```blueprint
        Get BP_AttributesComponent -> AddExtendedAttribute (ExtendedAttribute: BP_HealthExtendedAttribute)
        ```

> [!NOTE] Note:
> Extended Attributes can also be added to default extended attributes array in the actors Attributes Component. If using attributes with Advanced ARPG Combat, the attributes array will need to be edited within the Player Info Data Asset or Enemy Info Data Asset

## Key Properties

|Property Name|Purpose|
|---|---|
|`ExtendedAttributeTag`|The Gameplay Tag linking the extended attribute to an attribute (e.g., `Attribute.Health`).|
|`MaxAttributeTag`|The Gameplay Tag of the max attribute for reference, used in derived classes like `BP_BaseRegeneratableAttribute` (e.g., `Attribute.HealthMax`).|

## Key Concepts

### Custom Attribute Logic

The `BP_BaseExtendedAttribute` allows developers to define custom behavior for attributes, such as triggering abilities or updating systems when an attribute changes. This is achieved by overriding event functions like `OnAttributeValueModified` in child Blueprints.

- **Purpose**: Extends attribute functionality for project-specific needs.
- **Usage**: Create a child Blueprint and implement logic in `OnAttributeValueModified`.
- **Benefit**: Provides flexibility without altering the core attribute system.

### Modular Attribute Behavior

- **Purpose**: Keeps logic isolated per attribute, avoiding bloated character Blueprints.
- **Usage**: Add multiple extended attributes to support unique logic for each stat.
- **Benefit**: Improves maintainability and code reusability.


### Foundation for Regeneratable Attributes

The `BP_BaseExtendedAttribute` serves as the parent class for `BP_BaseRegeneratableAttribute`, enabling attributes like stamina to regenerate. This makes it a versatile base for both custom and specialized attribute behaviors.

- **Purpose**: Provides a reusable foundation for advanced attribute features.
- **Usage**: Derive new Blueprints from `BP_BaseExtendedAttribute` for custom or regeneratable attributes.
- **Benefit**: Streamlines development of complex attribute mechanics.

## Best Practices

- **Workflows**:
    - Create specific child Blueprints (e.g., `BP_HealthExtendedAttribute`) for each attribute requiring custom logic.
    - Add extended attributes to `PlayerInfoDataAsset` or `EnemyInfoDataAsset` for centralized management in Advanced ARPG Combat projects.
- **Pitfalls to Avoid**:
    - Don’t skip setting `ExtendedAttributeTag`, as it links the extended attribute to the correct `F_Attribute`.
    - Avoid complex logic in `OnAttributeValueModified` to prevent performance bottlenecks.
- **Performance Considerations**:
    - Limit the number of `ExtendedAttributes` per actor to reduce processing overhead.
    - Cache frequently accessed attribute values in Blueprints to optimize event handling.