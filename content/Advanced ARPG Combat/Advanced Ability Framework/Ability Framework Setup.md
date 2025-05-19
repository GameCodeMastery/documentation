This guide provides step-by-step instructions for integrating and using the `Advanced Abilities Framework` in an Unreal Engine 5 project. By following this guide, users will learn how to set up the framework, add default abilities and effects to pawns, and test core functionality using preconfigured assets. It is designed for developers and designers building Action RPGs, focusing on enabling the system as it functions in the demo content.

## Setup

Follow these steps to integrate the `Advanced Abilities Framework` into a new Unreal Engine 5 project using default assets.

### Prerequisites

- Unreal Engine 5.3 or later.
- Enhanced Input System enabled (default in UE5 templates).
- A pawn Blueprint (e.g., `BP_PlayerCharacter`) for testing abilities.
- No additional plugins required.

### Integration Steps

1. **Migrate the AbilitySystem Folder**:
    
    - In the Unreal Editor, open the demo project containing the `Advanced Abilities Framework`.
    - In the Content Browser, locate the `AbilitySystem` folder.
    - Right-click and select **Migrate**, then choose your project’s `Content` directory.
    - Ensure all dependencies (e.g., Blueprints, Data Assets) are copied correctly.
2. **Add `BP_AdvancedAbilitySystemComponent` to Pawn**:
    
    - Open your pawn Blueprint (e.g., `BP_PlayerCharacter`).
    - In the Components panel, click **Add Component** and select `BP_AdvancedAbilitySystemComponent`.
    - In the Details panel of `BP_AdvancedAbilitySystemComponent`, optionally add default abilities to the `Default Abilities` array (e.g., `GA_JumpAbility`) and gameplay cues to `Default Gameplay Cues` (e.g., `BP_Niagara_ImpactEffect`).
3. **Initialize the Component**:
    
    - In the pawn’s Event Graph, on `Event BeginPlay`, add a node to get `BP_AdvancedAbilitySystemComponent`.
    - Call the `Initialize` function on `BP_AdvancedAbilitySystemComponent`.
    - Example:
        
        ```blueprint
        Event BeginPlay -> Get BP_AdvancedAbilitySystemComponent -> Initialize
        ```
        
4. **Implement `BP_AbilitySystemInterface`**:
    
    - In the pawn’s Class Settings, under **Interfaces**, add `BP_AbilitySystemInterface`.
    - Implement the `IsAbilityStateActive` function:
        - Get `BP_AdvancedAbilitySystemComponent` and call `Is Ability Active By Tag`, passing the input `Gameplay Tag`.
        - Return the result.
        - Example:
            
            ```blueprint
            IsAbilityStateActive (Input: GameplayTag) -> Get BP_AdvancedAbilitySystemComponent -> Is Ability Active By Tag (Tag: Input) -> Return
            ```
            
    - Implement the `Get Ability System Component` function:
        - Return the `BP_AdvancedAbilitySystemComponent`.
        - Example:
            
            ```blueprint
            Get Ability System Component -> Return (BP_AdvancedAbilitySystemComponent)
            ```
            
5. **Configure Enhanced Input for Ability Activation**:
    
    - In **Project Settings > Input**, create an **Input Action** (e.g., `IA_ActivateJump`).
    - Create an **Input Mapping Context** (e.g., `IMC_Abilities`) and map `IA_ActivateJump` to a key (e.g., Spacebar).
    - In the pawn’s `Event BeginPlay`, add the `IMC_Abilities` mapping context:
        
        ```blueprint
        Event BeginPlay -> Get Player Controller -> Add Mapping Context (IMC_Abilities)
        ```
        
    - In the pawn’s Event Graph, bind `IA_ActivateJump` via an **Enhanced Input Action** node.
    - Call `Try Activate Abilities By Tag` on `BP_AdvancedAbilitySystemComponent`, using a tag (e.g., `Ability.Jump`).
        
        ```blueprint
        Enhanced Input Action (IA_ActivateJump) -> Get BP_AdvancedAbilitySystemComponent -> Try Activate Abilities By Tag (Tags: Ability.Jump)
        ```
        
6. **Test with Default Assets**:
    
    - Place `BP_PlayerCharacter` in a level.
    - Ensure `BP_AdvancedAbilitySystemComponent` has `GA_JumpAbility` in `Default Abilities` and `BP_Niagara_ImpactEffect` in `Default Gameplay Cues`.
    - Play the level and press the bound key (e.g., Spacebar) to activate `GA_JumpAbility`.
    - Verify the ability executes (e.g., pawn jumps) and triggers effects (e.g., impact particles via `BP_Niagara_ImpactEffect`).

## Troubleshooting

- **Abilities Don’t Activate**:
    - Verify `BP_AdvancedAbilitySystemComponent` is initialized on `Event BeginPlay`.
    - Ensure `Default Abilities` includes the ability (e.g., `GA_JumpAbility`) or call `Give Ability` manually.
    - Check that `IA_ActivateJump` is bound in `IMC_Abilities` and the context is applied.
- **Gameplay Cues Don’t Spawn**:
    - Confirm `Default Gameplay Cues` includes the cue (e.g., `BP_Niagara_ImpactEffect`) or the ability triggers it via `Play Gameplay Cue`.
    - For `BP_GameplayCueActor`, ensure `Instancing Policy` is set correctly (`Instance Per Execution` for stateless cues).
- **Interface Errors**:
    - Ensure `BP_AbilitySystemInterface` is implemented with correct function logic for `IsAbilityStateActive` and `Get Ability System Component`.
- **Pawn Doesn’t Respond to Input**:
    - Verify the pawn is possessed by the player controller and `IMC_Abilities` is active.

## Best Practices

- **Workflows**:
    - Use `Default Abilities` and `Default Gameplay Cues` in `BP_AdvancedAbilitySystemComponent` for quick setup.
    - Test abilities with default assets before creating custom ones to ensure system stability.
- **Pitfalls to Avoid**:
    - Don’t skip `Initialize` on `BP_AdvancedAbilitySystemComponent`, as it’s required for functionality.
    - Avoid overriding `End Ability`, `Cancel Ability`, or `Interrupt Ability` in `BP_AdvancedGameplayAbility` without calling the parent function.
    - Don’t leave `BP_GameplayCueActor` with `Instance Per Execution` active without manual destruction to prevent memory leaks.
- **Performance Considerations**:
    - Limit the number of active `BP_GameplayCueActors` by using `BP_GameplayCue` for simple effects.
    - Use `Instance Per Actor` for stateful `BP_GameplayCueActors` to avoid excessive spawning.