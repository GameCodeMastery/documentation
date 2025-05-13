This section provides a comprehensive guide on operating and extending the Advanced Attributes System. It covers key workflows such as modifying attributes, setting and retrieving values, creating regeneratable attributes, configuring associated attributes, and implementing custom extended attributes. Each subsection includes step-by-step instructions and Blueprint examples to ensure developers can effectively use and customize the system for their project’s needs.

### Modifying Attributes

1. In the Blueprint of the actor with the `BP_AttributesComponent`, get a reference to the component.

2. Call `ModifyAttribute` to adjust an attribute’s current value:
    ```blueprint
    Get BP_AttributesComponent -> ModifyAttribute (AttributeTag: Attribute.Health, Value: -10)
    ```

3. Use dispatchers like `OnAttributeValueModified` to trigger other logic (e.g., updating UI or triggering abilities):
    ```blueprint
    BP_AttributesComponent -> OnAttributeValueModified -> Custom Event (Update HUD or Trigger Ability)
    ```

### Setting and Retrieving Attribute Values

1. To set an attribute value directly:
    ```blueprint
    BP_AttributesComponent -> SetCurrentAttributeValue (AttributeTag: Attribute.Stamina, Value: 50)
    ```

2. To retrieve an attribute’s current value:
    ```blueprint
    BP_AttributesComponent -> GetCurrentAttributeValue (AttributeTag: Attribute.Stamina) -> Print String
    ```

3. Use other getter functions like `GetBaseAttributeValue` or `GetMultiplierValue` for specific needs.

### Creating a Regeneratable Attribute

1. Define the attribute and its max counterpart in the `Attributes` array:
    - Add `Attribute.MyNewAttribute` (Base Value: 100).
    - Add `Attribute.MyNewAttributeMax` (Base Value: 100).
2. Create a new Blueprint class inheriting from `BP_BaseRegeneratableAttribute` (e.g., `BP_MyNewRegeneratableAttribute`).
3. In the new class’s Defaults:
    - Set `ExtendedAttributeTag` to `Attribute.MyNewAttribute`.
    - Set `MaxAttributeTag` to `Attribute.MyNewAttributeMax`.
    - Adjust `RegenRate`, `RegenTickInterval`, and `RegenCoolDown` as needed (e.g., RegenRate = 5, RegenTickInterval = 1).

![[Regeneratable Attribute.png]]

4. Add the new extended attribute to the `ExtendedAttributes` array:
    - If standalone, add to the `BP_AttributesComponent` in the actor’s Details panel.
    - If using Advanced ARPG Combat, add to the `PlayerInfoDataAsset` or `EnemyInfoDataAsset`.

![[Attributes added to player info data asset.png]]

5. Add a `WB_AttributeProgressBar` to the HUD:
    - Set `AttributeTag` to `Attribute.MyNewAttribute` and `MaxAttributeTag` to `Attribute.MyNewAttributeMax`.
    - Initialize the progress bar in the HUD’s Event Graph (unless using Advanced ARPG Combat’s default HUD).

> [!NOTE] NOTE: 
> If using the included Combat Systems HUD (`MainHUD`), add your new attribute progress bar to the `AttributeBarsVerticalBox` and the attribute bar will be initialized for you. You MUST add your attribute bar to that vertical box before automatic initialization will work.


6. Test by modifying the attribute (e.g., subtract 25) and observing regeneration:
    
    ```blueprint
    InputAction IA_TestAttribute (Pressed) -> ModifyAttribute (AttributeTag: Attribute.MyNewAttribute, Value: -25)
    ```
    

### Configuring Associated Attributes

1. In the `Attributes` array, select the governing attribute (e.g., `Attribute.Endurance`).
2. In the `AssociatedAttributes` map, add an entry:
    - Key: The governed attribute tag (e.g., `Attribute.Stamina`).
    - Value: A Curve Table row defining the relationship (e.g., a curve where X is Endurance value and Y is Stamina value).

![[Associated Attributes.png]]

3. Create or modify a Curve Table:
    - In the Content Browser, create a new `Curve Table` asset.
    - Add a curve row, adjusting values to define the relationship (e.g., linear increase or diminishing returns).
![[Add new attribute Curve.png]]

![[Attribute Curve.png]]

4. Test by modifying the governing attribute and checking the governed attribute’s value:
    ```blueprint
    ModifyAttribute (AttributeTag: Attribute.Endurance, Value: 10) -> GetCurrentAttributeValue (AttributeTag: Attribute.Stamina) -> Print String
    ```


### Creating Custom Extended Attributes

1. Create a new Blueprint class inheriting from `BP_BaseExtendedAttribute` (e.g., `BP_HealthExtendedAttribute`).
2. Implement custom logic in functions like `OnAttributeValueModified`:

    ```blueprint
    OnAttributeValueModified -> If GetCurrentAttributeValue (Attribute.Health) <= 0 -> Trigger Death Ability
    ```

3. Add the new class to the `ExtendedAttributes` array in the `BP_AttributesComponent` or relevant data asset.
4. Test by modifying the associated attribute and verifying the custom logic triggers.

### Summary

In this Usage Guide, we explored how to effectively operate and extend the Advanced Attributes System. We covered modifying attributes using ModifyAttribute and leveraging dispatchers for system integration, setting and retrieving attribute values with functions like SetCurrentAttributeValue and GetCurrentAttributeValue, creating regeneratable attributes with BP_BaseRegeneratableAttribute, configuring associated attributes using curve tables for souls-like leveling, and implementing custom extended attributes for project-specific logic. These workflows enable developers to fully utilize the system’s flexibility and integrate it into their gameplay mechanics.

### Notes

- Always initialize the `BP_AttributesComponent` to ensure proper functionality.
- Use Gameplay Tags consistently (e.g., `Attribute.Health`) to avoid mismatches.
- For regeneratable attributes, ensure both the attribute and max attribute tags are defined.
- Curve Tables for Associated Attributes provide a powerful way to balance progression without manual calculations.
- Test attribute modifications incrementally to avoid unexpected behavior, using `Print String` for debugging.

[^1]: 
