This section provides instructions for integrating the Advanced Attributes System into a fresh Unreal Engine 5 project or using it within the Advanced ARPG Combat framework.

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
        
4. **Define Attributes**:
    - Select the `BP_AttributesComponent` in the actor’s Details panel.
    - In the `Attributes` array, add elements for each attribute (e.g., `Attribute.Health`, `Attribute.HealthMax`).
    - Set default values (e.g., Base Value = 100 for `Attribute.Health`).
    - Alternatively, if using Advanced ARPG Combat, define attributes in the `PlayerInfoDataAsset` or `EnemyInfoDataAsset` under the `Attributes` array.

![[Health Attributes added to player info data asset.png]]

5. **Set Up HUD (Optional)**:
    - Open the HUD widget Blueprint (e.g., `WBP_HUD`).
    - Add a `WB_AttributeProgressBar` widget to the desired location (e.g., a Vertical Box).
    - Set the `AttributeTag` (e.g., `Attribute.Health`) and `MaxAttributeTag` (e.g., `Attribute.HealthMax`) in the widget’s Details panel.
    - In the HUD’s Event Graph, on `Event Construct`, initialize the progress bar:
        
![[Pasted image 20250511013959.png]]


> [!NOTE] NOTE:
> If using Advanced ARPG Combat’s default HUD, add the progress bar to the `AttributeBarsVerticalBox`, and initialization is handled automatically.


6. **Test the System**:
    - Create a test input action (e.g., `IA_TestAttribute`) in **Project Settings > Input > Input Actions**.
    - Map it to a key (e.g., “T”) in an **Input Mapping Context** (e.g., `IMC_Default`).
    - In the player character Blueprint, bind the input to call `ModifyAttribute` on the `BP_AttributesComponent`:
        
        ```blueprint
        InputAction IA_TestAttribute (Pressed) -> Get BP_AttributesComponent -> ModifyAttribute (AttributeTag: Attribute.Health, Value: -25)
        ```
        
    - Add a `Print String` node to display the result of `GetCurrentAttributeValue` for `Attribute.Health`.
    - Play in Editor and press the bound key to verify the attribute value changes and regenerates (if configured).

### Troubleshooting

- **Attributes Not Modifying**: Ensure the `Initialize` function is called on the `BP_AttributesComponent` during `Event BeginPlay`.
- **HUD Not Updating**: Verify that the `WB_AttributeProgressBar` is initialized with a valid `BP_AttributesComponent` reference.
- **Gameplay Tags Not Found**: Check that the Gameplay Tag table includes the required tags (e.g., `Attribute.Health`). Add new tags via **Gameplay Tags** in the Project Settings.
- **Regeneration Not Working**: Confirm that the attribute is associated with a `BP_BaseRegeneratableAttribute` class in the `ExtendedAttributes` array.