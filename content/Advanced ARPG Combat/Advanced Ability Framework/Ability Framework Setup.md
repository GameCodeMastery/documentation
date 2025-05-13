This section provides step-by-step instructions for integrating the Advanced Abilities System into an Unreal Engine 5 project, enabling it to function with default assets provided by the system.

### Prerequisites

- Unreal Engine 5.3 or later.
- A project configured with the **Gameplay Tag** system enabled (default in most Unreal Engine 5 templates).
- The Advanced Attributes System for attribute modifications (see [[Attributes System Overview|Attributes System]] Documentation).
- No additional plugins required, as the system is Blueprint-based.

### Integration Steps

1. **Migrate System Assets**:
    - In the Unreal Editor, migrate the `AbilitySystem` folder from the source project to your project’s `Content` directory. Avoid copying manually to preserve asset references.
2. **Add Ability System Component**:
    - Open the Blueprint for the pawn (e.g., `BP_PlayerCharacter` or `BP_NPC`).
    - Add a `BP_AdvancedAbilitySystemComponent` to the Components list.
    - Optionally, in the Details panel, set `Default Abilities` (e.g., combat abilities like `BP_AttackAbility`) and `Default Gameplay Cues` (e.g., `BP_ImpactEffect`) to be granted on initialization.
3. **Initialize the Component**:
    - In the pawn’s Event Graph, on `Event BeginPlay`, get the `BP_AdvancedAbilitySystemComponent` and call `Initialize`:
        ```blueprint
        Event BeginPlay -> Get Component by Class (BP_AdvancedAbilitySystemComponent) -> Initialize
        ```

4. **Implement Ability System Interface**:
    - In the pawn’s Blueprint, go to **Class Settings** and add the `BP_AbilitySystemInterface` under Interfaces.
    - Implement `IsAbilityStateActive`:
        - Get the `BP_AdvancedAbilitySystemComponent`.
        - Call `IsAbilityStateActive`, passing the input Gameplay Tag to the component’s function:
            ```blueprint
            IsAbilityStateActive (AbilityTag) -> Get BP_AdvancedAbilitySystemComponent -> IsAbilityStateActive (AbilityTag) -> Return Node
            ```
    - Implement `Get Ability System Component`:
        - Return the `BP_AdvancedAbilitySystemComponent`:
            ```blueprint
            Get Ability System Component -> Get Component by Class (BP_AdvancedAbilitySystemComponent) -> Return Node
            ```

5. **Set Up Input Bindings**:
    - In **Project Settings > Input > Input Actions**, create Input Actions for ability activation (e.g., `IA_ActivateAbility1`, `IA_ActivateAbility2`).
    - Map them to keys (e.g., “1”, “2”) in an **Input Mapping Context** (e.g., `IMC_Default`).
    - In the pawn’s Blueprint, add an **Enhanced Input Component** and bind inputs to call `Try Activate Abilities By Tag`:
        ```blueprint
        InputAction IA_ActivateAbility1 (Pressed) -> Get BP_AdvancedAbilitySystemComponent -> Try Activate Abilities By Tag (Tag: Ability.Attack1)
        ```

6. **Test with Default Assets**:
    - Place a pawn with the `BP_AdvancedAbilitySystemComponent` in the level (e.g., `BP_PlayerCharacter`).
    - Ensure default abilities (e.g., `BP_AttackAbility`) and gameplay cues (e.g., `BP_ImpactEffect`) are assigned in the component’s Details panel.
    - Play in Editor and press bound keys (e.g., “1”) to activate abilities.
    - Verify effects (e.g., attribute changes, particle effects) using default assets.

### Troubleshooting

- **Abilities Not Activating**: Ensure `Initialize` is called on `Event BeginPlay` and `Default Abilities` are assigned.
- **Inputs Not Working**: Verify the **Input Mapping Context** is applied via `Add Mapping Context` on `Event BeginPlay` in the player controller.
- **Effects Not Applying**: Confirm the Advanced Attributes System is set up and attributes (e.g., `Attribute.Health`) are defined (see [[Attributes System Usage Guide]] for more details).
- **Cues Not Spawning**: Check that `Default Gameplay Cues` are assigned and Gameplay Tags match those in `BP_GameplayCue` or `BP_GameplayCueActor`.