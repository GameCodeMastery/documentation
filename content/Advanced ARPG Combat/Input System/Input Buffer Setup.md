This guide provides step-by-step instructions for integrating the `Input Buffering System` into an Unreal Engine 5 project, enabling input queuing for responsive gameplay in Souls-like Action RPGs. Users will learn how to set up the system, integrate it with existing Enhanced Input bindings, and test input buffering using default assets. The guide focuses on enabling the system to function as it does in the demo content, ensuring developers and designers can quickly implement input queuing for combat mechanics.
### Prerequisites

- Unreal Engine 5.3 or later.
- `Enhanced Input` and `Gameplay Tags` plugins enabled (default in UE5.3+).
- A pawn Blueprint (e.g., `BP_PlayerCharacter`) with existing Enhanced Input setup.
- Animation Montages (e.g., `AM_Heal`) for testing input buffering.

### Integration Steps

1. **Migrate the Input Folder**:
    - In the Unreal Editor, open the demo project containing the `Input Buffering System`.
    - In the Content Browser, locate the `Input` folder (containing `BP_InputBufferComponent`, `ANS_InputBuffer`, etc.).
    - Right-click and select **Migrate**, then choose your project’s `Content` directory.
    - Ensure all dependencies (e.g., Blueprints, Animation Notifies) are copied correctly.

2. **Add `BP_InputBufferComponent` to Pawn**:
    - Open your pawn Blueprint (e.g., `BP_PlayerCharacter`).
    - In the Components panel, click **Add Component** and select `BP_InputBufferComponent`.
    - Verify the component is added in the Details panel (no additional configuration needed for default setup).

3. **Integrate with Existing Input Actions**:
    - Ensure your project has `Gameplay Tags` for inputs (e.g., `InputTag.Dodge`, `InputTag.Attack`) defined in the Gameplay Tag Manager.
    - In **Project Settings > Input**, confirm existing **Input Actions** (e.g., `IA_Dodge`, `IA_Attack`) are mapped in an **Input Mapping Context** (e.g., `IMC_Combat`).
    - In `BP_PlayerCharacter`’s Event Graph, modify the input action events to use `BP_InputBufferComponent`:
        - For each input action’s `Pressed` and `Released` events, replace direct action calls with `Store Input In Buffer`:
            ```blueprint
            Enhanced Input Action (IA_Dodge, Triggered) -> Get Component By Class (Class: BP_InputBufferComponent) -> Store Input In Buffer (InputTag: InputTag.Dodge, bConsumeInputBuffer: true, Input Status: Pressed)
            ```

            ```blueprint
            Enhanced Input Action (IA_Dodge, Completed) -> Get Component By Class (Class: BP_InputBufferComponent) -> Store Input In Buffer (InputTag: InputTag.Dodge, bConsumeInputBuffer: false, Input Status: Released)
            ```

    - Repeat for other buffered inputs (e.g., `IA_Attack` with `InputTag.Attack`).

> [!NOTE] Note:
> bConsumeInputBuffer determines which StoreInputInBuffer call consumes the input and activates the input action. So set this value to true on the input where you wish for the input to actually happen and set it to false on the other input event.

4. **Set Up Animation Notify for Input Buffering**:
    - Open your existing Animation Montage associated with the input you're trying to setup with the input buffer system (e.g., `Attack_Montage`).
    - Add an `ANS_InputBuffer` Anim Notify State to the desired frames where input buffering should occur (e.g., during the attack animation).

5. **Bind `On Input Buffer Consumed` Event**:
    - In your player character blueprint, select the `BP_InputBufferComponent` in the Components panel.
    - In the Details panel, click the green `+` next to `On Input Buffer Consumed` to bind an event.
    - In the Event Graph, add logic to handle consumed inputs:
        ```blueprint
        On Input Buffer Consumed (InputTag) -> Switch on Gameplay Tag (InputTag) -> 
          Case InputTag.Dodge -> PerformDodge
          Case InputTag.Attack -> PerformAttack
        ```
    - Ensure the pawn checks for valid states (e.g., not dead) before executing actions.

6. **Test with Your Existing Assets**:
    - Play the level and trigger an action (e.g., healing via `IA_Attack`).
    - During the attacking animation, press another input (e.g., `IA_Dodge`).
    - Verify the dodge action triggers after the attacking animation buffer window ends, confirming input buffering.
    - Test other buffered inputs as needed to ensure they queue and execute correctly.

## Troubleshooting

- **Inputs Not Buffering**:
    - Verify `BP_InputBufferComponent` is added to `BP_PlayerCharacter` and not disabled.
    - Ensure `ANS_InputBuffer` is placed on the correct Animation Montage frames.
    - Confirm `Store Input In Buffer` is called with the correct `InputTag` and `bConsumeInputBuffer` set to `true` for the triggering event.
- **Inputs Not Triggering After Buffering**:
    - Check that the `On Input Buffer Consumed` event is bound in `BP_PlayerCharacter` and handles the correct `InputTag` cases.
    - Verify the Animation Montage with `ANS_InputBuffer` is played by the Animation Blueprint.
    - Ensure the pawn is in a valid state (e.g., not dead) when the buffer consumes the input.
- **Multiple Inputs Overriding Each Other**:
    - Note that only the last input is queued; this is expected behavior. Adjust `bConsumeInputBuffer` to control which input takes priority.
    - Check that `InputTag` values are unique and not duplicated across actions.
- **Performance Issues**:
    - Ensure `ANS_InputBuffer` is only added to necessary Animation Montages to avoid unnecessary buffer openings.
    - Limit the number of buffered inputs by using specific `InputTag` filters in `Store Input In Buffer`.

## Best Practices

- **Workflows**:
    - Group related `InputTag` values (e.g., `InputTag.Combat.Dodge`, `InputTag.Combat.Attack`) for clarity in the Gameplay Tag Manager.
    - Bind `On Input Buffer Consumed` early in development to handle all buffered inputs centrally.
- **Pitfalls to Avoid**:
    - Don’t skip binding `On Input Buffer Consumed`; without it, buffered inputs won’t trigger actions.
    - Avoid setting `bConsumeInputBuffer` to `true` for both `Pressed` and `Released` events of the same input, as it may cause unexpected behavior.
    - Don’t add `ANS_InputBuffer` to every Animation Montage; use it only for actions requiring input buffering.
- **Performance Considerations**:
    - Use specific `InputTag` filters in `Store Input In Buffer` to avoid queuing unnecessary inputs.
    - Regularly test input buffering with debug logs in `On Input Buffer Consumed` to ensure only intended inputs are processed.