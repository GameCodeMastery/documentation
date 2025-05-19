This guide details how to use the `Advanced Attributes System` in an Unreal Engine 5 project after integration. Developers will learn key workflows for modifying attributes, setting up regeneratable attributes, configuring associated attributes, creating custom extended attributes, and displaying attributes on the HUD. The guide also covers customization tasks to extend the system for project-specific needs, ensuring effective use in Action RPGs or similar genres.

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

## Troubleshooting

- **Attributes Not Updating**:
    - Verify `AttributeTag` exists in the Gameplay Tags table.
    - Ensure `BP_AttributesComponent` is initialized on `Event BeginPlay`.
- **Regeneration Not Working**:
    - Confirm `BP_BaseRegeneratableAttribute` is in `ExtendedAttributes`.
    - Check `RegenRate` and `RegenTickInterval` are non-zero.
- **HUD Not Displaying**:
    - Ensure `WB_AttributeProgressBar` is initialized with a valid `BP_AttributesComponent`.
    - Verify `AttributeBarsVerticalBox` is used for Advanced ARPG Combat’s `MainHUD`.
- **Associated Attributes Not Scaling**:
    - Check the Curve Table row is correctly assigned in the `AssociatedAttributes` map.
    - Verify the governing attribute’s value is being modified.

## Best Practices

- **Workflows**:
    - Centralize attribute setup in `PlayerInfoDataAsset` or `EnemyInfoDataAsset` for consistency.
    - Use `WB_AttributeProgressBar` for essential attributes only to maintain clean HUDs.
- **Pitfalls to Avoid**:
    - Don’t use duplicate `AttributeTag` values in `Attributes` to prevent conflicts.
    - Avoid complex logic in `OnAttributeValueModified` to maintain responsiveness.
- **Performance Considerations**:
    - Minimize `ExtendedAttributes` per actor to reduce overhead.
    - Optimize `AssociatedAttributes` curves by avoiding overly complex calculations.
    - Disable `bUpdateAttributeLerpBar` for non-critical HUD attributes to improve performance.

