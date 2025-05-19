The `WB_AttributeProgressBar` widget in the `Advanced Attributes System` provides a customizable progress bar for displaying attribute values, such as health or stamina, on the HUD in Unreal Engine 5 projects. It enables developers to visually represent attribute data with dynamic updates, optional lerp animations, and size scaling based on the max attribute value, enhancing player feedback in Action RPGs. This widget addresses the need for a plug-and-play solution to integrate attribute visualization, ensuring seamless connection with the `BP_AttributesComponent` for real-time updates and souls-like visual feedback for player progression.

## Basic Usage

The `WB_AttributeProgressBar` is added to a HUD widget Blueprint and configured via the Details panel to display an attribute’s value. Below is the primary method for using it in Blueprints.

### Setup in a HUD Widget

1. Open your player HUD widget (e.g., `WBP_PlayerHUD`).
2. Drag a `WB_AttributeProgressBar` into the desired container (e.g., `AttributeBarsVerticalBox`).
3. Set the following properties in the Details panel:
    - `AttributeTag`: The tag of the attribute to display (e.g., `Attribute.Health`).
    - `MaxAttributeTag`: The tag of the attribute representing the maximum value (e.g., `Attribute.HealthMax`).

### Initialize the Progress Bar

To bind the widget to the correct `BP_AttributesComponent`, call the `InitializeStatBar` function in the event graph:

```blueprint
Event OnInitialized →
  Get Owning Player Pawn →
  GetComponentByClass (BP_AttributesComponent) →
  InitializeStatBar (Target: WB_AttributeProgressBar, Input: Attributes Component)
```

> If using the default HUD included in the **Advanced ARPG Combat** framework, simply add the progress bar to the container. Initialization is handled automatically.

To configure the widget:

- Add `WB_AttributeProgressBar` to your HUD Blueprint (e.g., `WBP_HUD`) in a container (e.g., `VerticalBox`).
- Select the widget and, in the Details panel, set `AttributeTag` (e.g., `Attribute.Health`), `MaxAttributeTag` (e.g., `Attribute.HealthMax`), and other properties like `AttributeBarStyle` or `bUpdateAttributeLerpBar` to customize appearance and behavior.

## Key Properties

|Property Name|Purpose|
|---|---|
|`AttributeTag`|The Gameplay Tag of the attribute to display (e.g., `Attribute.Health`).|
|`MaxAttributeTag`|The Gameplay Tag of the max attribute for percentage calculations and optional size scaling (e.g., `Attribute.HealthMax`).|
|`AttributeBarStyle`|Defines the visual appearance of the main progress bar (e.g., color, texture).|
|`LerpBarStyle`|Defines the visual appearance of the lerp bar for animations.|
|`bUpdateAttributeLerpBar`|Enables/disables lerp animations to show value changes (e.g., health decrease).|
|`AttributeFillBarAndOpacity`|Sets the fill color and opacity of the main progress bar.|
|`LerpBarFillColorAndOpacity`|Sets the fill color and opacity of the lerp bar.|
|`MaxAttributeUpdateWidth`|A boolean that enables scaling the progress bar’s width based on the `MaxAttributeTag` value (e.g., wider bar for higher `Attribute.HealthMax`).|
|`CustomWidthOverride`|A float that sets the progress bar’s width when `MaxAttributeUpdateWidth` is false, allowing manual size control.|

## Key Concepts

### Dynamic Progress Updates

The `WB_AttributeProgressBar` automatically updates to reflect changes in the linked attribute’s `CurrentValue` relative to its `MaxAttributeTag`. This ensures real-time HUD feedback when attributes are modified (e.g., taking damage).

- **Purpose**: Provides immediate visual representation of attribute changes.
- **Usage**: Configure `AttributeTag` and `MaxAttributeTag` in the Details panel, then initialize with `BP_AttributesComponent`.
- **Benefit**: Simplifies HUD integration with minimal setup.

### Lerp Animation

The lerp bar, controlled by `bUpdateAttributeLerpBar`, displays a smooth transition between the previous and new attribute values (e.g., a gradual health decrease). This enhances visual polish for player feedback.

- **Purpose**: Improves readability of attribute changes through animations.
- **Usage**: Enable `bUpdateAttributeLerpBar` in the Details panel and customize `LerpBarStyle` for desired visuals.
- **Benefit**: Enhances player experience with smooth, intuitive feedback.

### Customizable Appearance

The widget supports extensive visual customization via `AttributeBarStyle` and `LerpBarStyle`, allowing designers to adjust colors, textures, and opacity in the Details panel to match the game’s aesthetic.

- **Purpose**: Aligns the progress bar with the game’s visual design.
- **Usage**: Modify `AttributeFillBarAndOpacity` and `LerpBarFillColorAndOpacity` in the Details panel.
- **Benefit**: Offers flexibility for designers without requiring code changes.

### Max Attribute Size Scaling

The `MaxAttributeUpdateWidth` feature scales the progress bar’s width based on the `MaxAttributeTag` value, similar to souls-like games. For example, a higher `Attribute.HealthMax` results in a wider health bar, visually indicating player progression. When disabled, `CustomWidthOverride` sets a fixed width.

- **Purpose**: Provides visual feedback on attribute growth for enhanced player engagement.
- **Usage**: Enable `MaxAttributeUpdateWidth` or set `CustomWidthOverride` in the Details panel.
- **Benefit**: Reinforces player progression with intuitive HUD scaling.

## Best Practices

- **Workflows**:
    - Place `WB_AttributeProgressBar` in `AttributeBarsVerticalBox` when using Advanced ARPG Combat’s `MainHUD` for automatic initialization.
    - Test progress bar updates and size scaling in-game after modifying max attributes to ensure correct visuals.
- **Pitfalls to Avoid**:
    - Don’t forget to set both `AttributeTag` and `MaxAttributeTag` in the Details panel to avoid display or scaling errors.
    - Avoid enabling `bUpdateAttributeLerpBar` for minor attributes to prevent visual clutter.