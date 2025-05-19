This guide provides step-by-step instructions for integrating and using the `Advanced Attributes System` in an Unreal Engine 5 project. Developers will learn how to set up the system, configure attributes for actors, display attributes on the HUD, and test default functionality using included assets. The guide focuses on enabling the system as it functions in the Advanced ARPG Combat demo content, ensuring quick and effective integration.

### Prerequisites

- Unreal Engine 5.3 or later.
- A project configured with the **Gameplay Tag** system enabled (default in most Unreal Engine 5 templates).
- If using standalone, no additional plugins are required. If using with Advanced ARPG Combat, ensure the full framework is migrated.
- Basic familiarity with Unreal Engine Blueprints and Gameplay Tags.

### Integration Steps

1. **Copy the System Assets**:
    - Copy the `AdvancedAttributesSystem` folder from the Advanced ARPG Combat project (or provided assets) to your project’s `Content` directory.
2. **Add Attributes Component to an Actor**:
    - Open the Blueprint for the actor (e.g., player character or enemy, such as `BP_PlayerCharacter`).
    - Add a new component of type `BP_AttributesComponent` to the actor.

3. **Initialize the Attributes Component**:
    - In the actor’s Blueprint, get a reference to the `BP_AttributesComponent` (e.g., via `Get Component by Class`).
    - On `Event BeginPlay`, call the `Initialize` function on the `BP_AttributesComponent` to ensure proper setup.
        
![[Pasted image 20250511013544.png]]
        
4. **Configure Default Attributes**:
    - Select the `BP_AttributesComponent` in the actor’s Details panel.
    - In the `Attributes` array, add elements for each attribute (e.g., `Attribute.Health`, `Attribute.HealthMax`).
    - Set default values (e.g., Base Value = 100 for `Attribute.Health`).


> [!NOTE] Note:
> If using Advanced ARPG Combat, define attributes in the `PlayerInfoDataAsset` or `EnemyInfoDataAsset` under the `Attributes` array.


![[Health Attributes added to player info data asset.png]]

5. **Set Up HUD (Optional)**:
    - Open the HUD widget Blueprint (e.g., `WBP_HUD`).
    - Add a `WB_AttributeProgressBar` widget to the desired location (e.g., a Vertical Box).
    - Set the `AttributeTag` (e.g., `Attribute.Health`) and `MaxAttributeTag` (e.g., `Attribute.HealthMax`) in the widget’s Details panel.
    - In the HUD’s Event Graph, on `Event Construct`, initialize the progress bar:
        
![[Pasted image 20250511013959.png]]


> [!NOTE] NOTE:
> If using Advanced ARPG Combat’s default HUD, add the progress bar to the `AttributeBarsVerticalBox`, and initialization is handled automatically.


6. **Configure Test Input**:
    - In **Project Settings > Input > Input Actions**, create an Input Action (e.g., `IA_TestAttribute`).
    - In an Input Mapping Context (e.g., `IMC_Default`), map `IA_TestAttribute` to a key (e.g., “T”).
    - In the actor’s Blueprint, add an `Enhanced Input Component` and bind `IA_TestAttribute` to call `ModifyAttribute`:
    ```blueprint
    InputAction IA_TestAttribute (Pressed) -> Get BP_AttributesComponent -> ModifyAttribute (AttributeTag: Attribute.Health, Value: -25)
    ```

7. **Test the System**:
    - Place a default actor (e.g., `BP_PlayerCharacter`) in the level.
    - Play in Editor and press the bound key (e.g., “T”) to modify `Attribute.Health`.
    - Verify the attribute updates in the HUD (if set up) or use `GetCurrentAttributeValue` to print the value:
    ```blueprint
    ModifyAttribute -> GetCurrentAttributeValue (AttributeTag: Attribute.Health) -> Print String
    ```

## Troubleshooting

- **Attributes Not Modifying**:
    - Ensure `Initialize` is called on `BP_AttributesComponent` during `Event BeginPlay`.
    - Verify the `AttributeTag` (e.g., `Attribute.Health`) exists in the Gameplay Tags table.
- **HUD Not Updating**:
    - Confirm `WB_AttributeProgressBar` is initialized with a valid `BP_AttributesComponent` reference.
    - Check that `AttributeBarsVerticalBox` is used if leveraging Advanced ARPG Combat’s `MainHUD`.
- **Input Not Working**:
    - Verify the Input Mapping Context (`IMC_Default`) is applied via `Add Mapping Context` on `Event BeginPlay` in the Player Controller.
    - Ensure the `Enhanced Input Component` is added to the actor.
- **Regeneration Not Occurring**:
    - Confirm the attribute is linked to a `BP_BaseRegeneratableAttribute` in the `ExtendedAttributes` array.
    - Check `RegenRate` and `RegenTickInterval` are set in the regeneratable attribute class.

## Best Practices

- **Workflows**:
    - Use `PlayerInfoDataAsset` or `EnemyInfoDataAsset` for centralized attribute configuration in Advanced ARPG Combat projects.
    - Bind `OnAttributeValueModified` to update UI or trigger gameplay events for seamless integration.
- **Pitfalls to Avoid**:
    - Don’t skip `Initialize` on `BP_AttributesComponent`, as it sets up critical data.
    - Avoid duplicate Gameplay Tags in the `Attributes` array to prevent conflicts.
- **Performance Considerations**:
    - Limit the number of `ExtendedAttributes` per actor to avoid overhead.
    - Use simple curves in the `AssociatedAttributes` system to reduce calculation complexity.
    - Disable `bUpdateAttributeLerpBar` in `WB_AttributeProgressBar` for minor attributes to optimize HUD performance.

