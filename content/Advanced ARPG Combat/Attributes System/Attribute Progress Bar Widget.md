The **Attribute Progress Bar Widget** (`WB_AttributeProgressBar`) is a reusable, designer-friendly user interface component that visually displays an attribute’s current and maximum value. It is part of the Advanced Attributes System and is intended to be dropped into any HUD to show stats like Health, Mana, Stamina, or any custom attribute.

This widget supports both a primary fill bar and an optional delayed lerp bar for enhanced visual feedback when attribute values change.

---

## Basic Usage

The widget is initialized and updated using the `InitializeStatBar` function, which links it to a valid `BP_AttributesComponent` at runtime.

### Steps:

1. **Add Widget to HUD**
    - Open your HUD widget.
    - Add a `WB_AttributeProgressBar` to your canvas or vertical box.

2. **Configure in Details Panel**
    - Set `AttributeTag` to the attribute this bar should reflect (e.g., `Attribute.Health`).
    - Set `MaxAttributeTag` to the attribute's corresponding max value (e.g., `Attribute.HealthMax`).

3. **Initialize in Blueprint**
    - In the HUD’s Event Graph:
        ```blueprint
        OnInitialized
        → Get Owning Player Pawn
        → Get Component by Class (BP_AttributesComponent)
        → Call InitializeStatBar on the progress bar
        ```

    - Pass the attributes component reference into the `InitializeStatBar` function.


> Note: If you use the ARPG Combat default HUD, initialization is handled automatically when the progress bar is added to the `AttributeBarsVerticalBox`.

---

## Key Properties

| Property Name                | Purpose                                                                                                                                                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AttributeTag`               | The gameplay tag associated with the primary attribute shown in the progress bar.                                                                                                                                                                       |
| `MaxAttributeTag`            | The gameplay tag for the attribute’s maximum value, used to calculate fill percentage.                                                                                                                                                                  |
| `AttributeBarStyle`          | Controls the style (e.g., color, shape) of the main fill bar.                                                                                                                                                                                           |
| `LerpBarStyle`               | Style for the optional delayed bar that visually trails the primary bar.                                                                                                                                                                                |
| `bUpdateAttributeLerpBar`    | If true, enables lerp bar animations when attribute values change.                                                                                                                                                                                      |
| `AttributeFillBarAndOpacity` | Set the fill color and opacity of the main bar.                                                                                                                                                                                                         |
| `LerpBarFillColorAndOpacity` | Set the fill color and opacity of the lerp/trail bar.                                                                                                                                                                                                   |
| `MaxAttributeUpdateWidth`    | A boolean that determines if the maximum attribute value (e.g., `Attribute.HealthMax`) should scale the progress bar’s width on screen. When true, the bar’s width increases as the max attribute grows (e.g., wider health bar for higher max health). |
| `CustomWidthOverride`        | A float value that sets the progress bar’s width on screen when `MaxAttributeUpdateWidth` is false. Allows manual control over the bar’s size.                                                                                                          |

---

## Key Concepts

### Lerp Feedback for Value Changes

The `WB_AttributeProgressBar` supports a visual trail effect where a secondary bar (lerp bar) lags behind the main bar to indicate the difference between old and new values.

- Especially useful for health loss visuals.
- Designers can toggle this feature using `bUpdateAttributeLerpBar`.

### Blueprint Initialization Logic

To function, the widget must be initialized with a reference to a valid `BP_AttributesComponent`. This ensures:

- It binds to relevant dispatchers.
- It receives real-time updates for the selected attributes.

```blueprint
InitializeStatBar(AttributesComponent)
→ Updates on OnCurrentAttributeValueUpdated and OnBaseAttributeValueUpdated
```

### Designer-Friendly Customization

- All styles are exposed as properties in the Details Panel.
- No need to edit the widget graph for basic usage.
- Easily theme bars by category (e.g., red for health, blue for mana).

---

## Best Practices

- Use descriptive attribute tags (`Attribute.Health`, `Attribute.Mana`) for clarity.
- Keep attribute bars consistent in color and layout for UI clarity.
- Add bars to the `AttributeBarsVerticalBox` for automatic initialization if using the default ARPG HUD.
- Test in-game with edge cases (e.g., 0 and max values) to verify visual behavior.

---

## Notes

- The widget is fully Blueprint-based and does not require C++.
- It supports both persistent and temporary attributes.
- Designed to be reused across multiple characters or HUDs.
- Can be extended to support icon overlays or text labels if needed.

---