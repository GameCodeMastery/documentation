To integrate the State Manager System into an Unreal Engine 5 project (5.3 or later), follow these steps to enable functionality with default assets.

### Prerequisites
- Unreal Engine 5.3 or later.
- Optional: A project with the Enhanced Input System enabled (default in Unreal Engine 5 templates).
- Optional: The Advanced Abilities System for Gameplay Tag integration (see Advanced Abilities System Documentation).

### Integration Steps

1. **Migrate Assets**:
    - Copy the StateMachine folder from the default project to your project’s Content directory.

2. **Add State Manager Component**:
    - In the Blueprint Editor, select the target actor (e.g., a player pawn or AI character).
    - Add a `BP_StateManagerComponent` to the actor’s Components panel.

3. **Configure Default States**:
    - In the Details panel for `BP_StateManagerComponent`, set the Default State property to a `BP_BaseState` or `BP_StateMachine` class (e.g., `BP_IdleState`).
    - Add state classes (e.g., `BP_AttackState`, `BP_StunnedState`) to the State Classes array to make them available to the state manager.

4. **Set Up Input (Optional)**:
    - In **Project Settings > Input > Input Actions**, create Input Actions (e.g., IA_Attack, IA_Dodge) and map them to keys in an Input Mapping Context (e.g., IMC_Gameplay).
    - In the actor’s Blueprint, add an **Enhanced Input Component** and bind Input Actions to call Add Input Atom on BP_StateManagerComponent:
        ```blueprint
        InputAction IA_Attack (Pressed) -> Get BP_StateManagerComponent -> Add Input Atom (InputAtomTag: Input.Attack)
        ```

5. **Test with Default Assets**:
    - Place the actor in a level and play the game.
    - Use default states (e.g., BP_IdleState, BP_AttackState) included in the StateMachine folder to test state transitions by triggering inputs or calling Enter State By Tag:
        ```blueprint
        Event BeginPlay -> Get BP_StateManagerComponent -> Enter State By Tag (StateTag: State.Idle)
        ```


### Troubleshooting

- **State Not Activating**: Ensure StateTag matches the tag in BP_BaseState or BP_StateMachine. Verify that the state class is in the State Classes array or that runtime state creation is intended.
- **Inputs Not Registering**: Confirm the **Input Mapping Context** is applied via Add Mapping Context on **Event BeginPlay** in the actor’s Blueprint.
- **Lingering States**: Check that EndState is called appropriately in BP_BaseState to avoid stuck states.