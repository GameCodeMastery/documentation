## Overview

The `WB_AttributeProgressBar` class in the Advanced Attributes System, designed for Unreal Engine 5, is a Blueprint-based User Widget that displays attribute values (e.g., health, stamina) as customizable progress bars on the HUD. Its purpose is to provide a visually intuitive representation of dynamic attribute values managed by the `BP_AttributesComponent`, enhancing player feedback in stat-driven games like Action RPGs.

This class addresses the need for real-time, visually appealing attribute visualization, supporting smooth lerp animations to reflect value changes (e.g., health decreasing after damage). It enables developers to create polished HUD elements that integrate seamlessly with the Advanced Attributes System, offering flexibility for styling and behavior customization to match a game’s aesthetic and gameplay requirements.This 

---

## Basic Usage

The `WB_AttributeProgressBar` is used to display and animate attribute values on the HUD, connecting directly to the `BP_AttributesComponent` for real-time updates. Below are the key functions, their purposes, and how they can be used in Blueprints.

1. **InitializeStatBar**
    - **Purpose**: Initializes the progress bar by linking it to a `BP_AttributesComponent`, setting up attribute value tracking and visual updates.
    - **Usage**:
        - Call in the HUD’s Event Graph during `Event Construct` to bind the widget to the owning actor’s `BP_AttributesComponent`.
        - Example: In `WBP_HUD`, initialize a health progress bar.
            ```blueprint
            Event Construct -> Get HealthProgressBar -> InitializeStatBar (Target: BP_AttributesComponent from Owning Player Pawn)
            ```
        - Note: In Advanced ARPG Combat, initialization may be handled automatically if the widget is added to the `AttributeBarsVerticalBox`.

2. **UpdateProgressBar**
    - **Purpose**: Updates the progress bar’s fill percentage and lerp animation based on the current and maximum attribute values.
    - **Usage**:
        - Automatically called by the widget when the associated attribute changes, but can be manually triggered for custom updates (e.g., after a direct `SetCurrentAttributeValue`).
        - Example: Force an update after setting stamina manually.
            ```blueprint
            SetCurrentAttributeValue (AttributeTag: Attribute.Stamina, Value: 50) -> Get StaminaProgressBar -> UpdateProgressBar
            ```

3. **SetLerpSpeed**
    - **Purpose**: Adjusts the speed of the lerp animation for smooth transitions when the attribute value changes.
    - **Usage**:
        - Override in a child Blueprint or call in the HUD to customize animation timing (e.g., faster for health, slower for stamina).
        - Example: Set a faster lerp for health changes.
            ```blueprint
            Event Construct -> Get HealthProgressBar -> SetLerpSpeed (Speed: 2.0)
            ```


---

## Key Properties

|Property Name|Purpose|
|---|---|
|`AttributeTag`|The Gameplay Tag of the attribute to display (e.g., `Attribute.Health`). Determines which attribute’s value the progress bar tracks.|
|`MaxAttributeTag`|The Gameplay Tag of the maximum attribute (e.g., `Attribute.HealthMax`). Used to calculate the progress bar’s fill percentage.|
|`AttributeBarStyle`|A Slate Brush style for the main progress bar’s appearance (e.g., background, border, fill image). Customizes the bar’s look.|
|`LerpBarStyle`|A Slate Brush style for the lerp bar, which animates value changes beneath the main bar. Allows distinct styling for animations.|
|`bUpdateAttributeLerpBar`|A boolean that enables or disables lerp bar animations for attribute value changes. Set to true for smooth transitions, false for instant updates.|
|`AttributeFillBarAndOpacity`|The color and opacity of the main progress bar’s fill (e.g., red for health). Defines the primary visual style.|
|`LerpBarFillColorAndOpacity`|The color and opacity of the lerp bar’s fill (e.g., lighter red for health changes). Enhances animation visibility.|
|`MaxAttributeUpdateWidth`|A boolean that determines if the maximum attribute value (e.g., `Attribute.HealthMax`) should scale the progress bar’s width on screen. When true, the bar’s width increases as the max attribute grows (e.g., wider health bar for higher max health).|
|`CustomWidthOverride`|A float value that sets the progress bar’s width on screen when `MaxAttributeUpdateWidth` is false. Allows manual control over the bar’s size.|

---

## Key Concepts

### Attribute Visualization

`WB_AttributeProgressBar` is designed to visually represent attribute values as progress bars, providing immediate feedback to players about their character’s state (e.g., health, stamina). The widget calculates the fill percentage by dividing the current attribute value (via `AttributeTag`) by the maximum value (via `MaxAttributeTag`), ensuring accurate representation of the attribute’s state.

- **Implementation**: Set `AttributeTag` and `MaxAttributeTag` in the Details panel to link the widget to specific attributes. For example, a health bar uses `Attribute.Health` and `Attribute.HealthMax`.
- **Use Cases**: Display health, stamina, mana, or experience points on the HUD, with distinct bars for each attribute.
- **Best Practices**: Ensure `AttributeTag` and `MaxAttributeTag` match Gameplay Tags defined in the `BP_AttributesComponent` to avoid display issues. Test with attribute modifications:
    
    ```blueprint
    InputAction IA_TestHealth (Pressed) -> ModifyAttribute (AttributeTag: Attribute.Health, Value: -25)
    ```

### Lerp Animations

The lerp animation feature, controlled by `bUpdateAttributeLerpBar` and `LerpBarStyle`, provides smooth transitions when attribute values change, enhancing visual polish. The lerp bar animates beneath the main progress bar, gradually catching up to the new value at a speed defined by `SetLerpSpeed`.

- **How It Works**: When an attribute changes (e.g., health decreases), the main bar updates instantly, while the lerp bar transitions smoothly to the new fill percentage, creating a trailing effect.
- **Customization**: Adjust `LerpBarFillColorAndOpacity` for visual distinction (e.g., a lighter color for health loss) and `SetLerpSpeed` for animation timing. For example, set a slower lerp for stamina:

    ```blueprint
    Event Construct -> Get StaminaProgressBar -> SetLerpSpeed (Speed: 0.5)
    ```

- **Use Cases**: Use lerp animations for gradual changes (e.g., damage or regeneration) to avoid jarring updates. Disable `bUpdateAttributeLerpBar` for attributes requiring instant updates (e.g., experience points).
- **Best Practices**: Balance lerp speed with gameplay pacing to ensure animations feel responsive. Test animations with frequent attribute changes to verify smoothness.