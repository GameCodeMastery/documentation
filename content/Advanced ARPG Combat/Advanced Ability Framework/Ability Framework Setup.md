### Prerequisites
- Unreal Engine 5.3 or later.
- Enable the **Gameplay Tags** plugin in your project.
- Familiarity with Blueprint scripting (no C++ required).

### Step-by-Step Integration

1. **Migrate the System**:
    - Open the project that contains the `AbilitySystem` folder.
    - Right-click the `AbilitySystem` folder in the Content Browser and select **Asset Actions > Migrate**.
    - Choose your target project’s `Content` folder as the destination.

2. **Add the Ability System Component**:
    - Open your Pawn or Character Blueprint (e.g., `BP_PlayerCharacter`).
    - Click **Add Component**, then select `BP_AdvancedAbilitySystemComponent`.
    - In the Details panel:
        - Optionally add **Default Abilities** (e.g., `GA_Attack`, `GA_Dodge`).
        - Optionally add **Default Gameplay Cues** (e.g., `Cue.Dash`, `Cue.Hit`).

3. **Initialize the Component**:
    - In the Event Graph of your character:
        - On `Event BeginPlay`, drag in the Ability System Component and call `Initialize`.
    ```
    Event BeginPlay → Get Ability System Component → Initialize
    ```

4. **Implement the Interface**:
    - In the Class Settings, click **Add Interface** and choose `BP_AbilitySystemInterface`.
    - Implement the required functions:
        - `GetAbilitySystemComponent`: Return the ability system component.
        - `IsAbilityStateActive`: Use the component’s function of the same name.
    ```
    GetAbilitySystemComponent → Return BP_AdvancedAbilitySystemComponent
    IsAbilityStateActive(Tag) → Call IsAbilityStateActive on Component
    ```

5. **Test the Setup**:
    - Assign an ability to the component’s **Default Abilities**.
    - Call `TryActivateAbilitiesByTag` in an input binding (e.g., “Q” for a Dash tag).
    ```
    InputAction_Q → TryActivateAbilitiesByTag(Tag: Ability.Dash)
    ```


### Example Setup for Designers

- Add `GA_SwordAttack` to your default abilities.
- Add an Input Action (e.g., `IA_Attack`) and bind it to `TryActivateAbilitiesByTag` with `Ability.Attack`.
- Confirm the gameplay cue tag `Cue.SlashEffect` is linked to a cue data asset.

### Troubleshooting

- **Inputs not triggering**:
    - Ensure the Enhanced Input Mapping Context includes the action.
    - Confirm `Add Mapping Context` is called in your Player Controller.
- **Effects not appearing**:
    - Check tag matching between ability and gameplay cue.
    - Make sure the cue is assigned to the Ability System Component.
- **Abilities not activating**:
    - Ensure the ability was granted using `Give Ability`.
    - Confirm `CanActivateAbility?` returns true and isn’t blocked by tags.