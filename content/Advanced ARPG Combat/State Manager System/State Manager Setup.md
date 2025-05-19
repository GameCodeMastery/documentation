This guide provides step-by-step instructions for integrating the `State Manager System` into an Unreal Engine 5 project, enabling state management for actors in Action RPGs. Users will learn how to set up the system, configure default states, and test state transitions using demo assets. The guide focuses on enabling the system to function as it does in the demo content, ensuring developers and designers can quickly implement state-driven behaviors for characters or AI.

### Prerequisites

- Unreal Engine 5.3 or later.
- `Gameplay Tags` plugin enabled (default in UE5.3+).
- A pawn or actor Blueprint (e.g., `BP_PlayerCharacter` or `BP_EnemyAI`) for state management.
- Optional: Enhanced Input System for input-driven state transitions.

### Integration Steps

1. **Migrate the State Machine Folder**:
    - In the Unreal Editor, open the demo project containing the `State Manager System`.
    - In the Content Browser, locate the `StateMachine` folder (containing `BP_StateManagerComponent`, `BP_BaseState`, `BP_StateMachine`, etc.).
    - Right-click and select **Migrate**, then choose your project’s `Content` directory.
    - Ensure all dependencies (e.g., Blueprints, Data Assets) are copied correctly.

2. **Add `BP_StateManagerComponent` to Actor**:
    - Open your target actor Blueprint (e.g., `BP_PlayerCharacter` or `BP_EnemyAI`).
    - In the Components panel, click **Add Component** and select `BP_StateManagerComponent`.
    - Verify the component is added in the Details panel.

3. **Configure Default States**:
    - In the Details panel of `BP_StateManagerComponent`, set the `Default State` property to a `Gameplay Tag` (e.g., `State.Idle`) from the demo content.
    - In the `State Classes` array, add default state classes from the demo (e.g., `BP_State_Idle`, `BP_State_Attack`).
    - Leave other properties (e.g., `bTrackStateActiveTime`) at default values for initial setup.


> [!NOTE] Note:
> When using the State Manager within Advanced ARPG Combat, the Player Info Data Asset and Enemy Info Data Assets are used to configure default states for Enemies and Players


4. **Set Up State Transitions**:
    - Open the demo `BP_StateMachine` (e.g., `BP_BehaviorStateMachine` for AI or `BP_CombatStateMachine` for players).
    - Ensure it is assigned to the `BP_StateManagerComponent` via `Run State Machine By Class` in demo logic or manually in the Details panel.
    - Verify demo states reference the `BP_StateMachine` for transitions (no changes needed for default setup).

5. **Integrate with Input (Optional)**:
    - For input-driven states (e.g., player attacks), ensure an **Input Mapping Context** (e.g., `IMC_Combat`) is set up in **Project Settings > Input**.
    - In `BP_PlayerCharacter`, bind input actions to trigger state changes:
        ```blueprint
        Enhanced Input Action (IA_Attack, Triggered) -> Get Component By Class (Class: BP_StateManagerComponent) -> Enter State By Tag (StateTag: State.Attack)
        ```

    - Apply the `IMC_Combat` on `Event BeginPlay`:
        ```blueprint
        Event BeginPlay -> Get Player Controller -> Add Mapping Context (IMC_Combat)
        ```

6. **Test with Default Assets**:
    - Place the configured actor (e.g., `BP_PlayerCharacter` or `BP_EnemyAI`) in a level.
    - For AI, use the demo `BP_BehaviorStateMachine` to test transitions (e.g., `State.Patrol` to `State.Chase`).
    - For players, trigger input actions (e.g., `IA_Attack`) to enter states like `State.Attack`.
    - Verify state changes by observing `On State Begin` and `On State End` events:
        ```blueprint
        BP_StateManagerComponent -> On State Begin (StateTag) -> Print String (Text: Entered State: StateTag)
        ```

    - Test transitions by sending events to the state machine:
        ```blueprint
        Event Tick -> Get Component By Class (Class: BP_StateManagerComponent) -> Send Event To State Machine (EventTag: Event.EnemyDetected)
        ```

    - Confirm the actor transitions between demo states (e.g., `State.Idle` to `State.Attack`) as expected.

## Troubleshooting

- **States Not Triggering**:
    - Verify `BP_StateManagerComponent` is added to the actor and not disabled.
    - Ensure `Default State` and `State Classes` are set with valid `Gameplay Tags` or classes from the demo content.
    - If using the State Manager with Advanced ARPG Combat, ensure the `Defaut State` and `State Classes` are configured through the proper Info Data Assets.
    - Check that `Enter State By Tag` or `Enter State By Class` uses correct tags or classes.
- **Transitions Not Occurring**:
    - Confirm `BP_StateMachine` is assigned and referenced in `Run State Machine By Tag` or `Run State Machine By Class`.
    - Ensure `Send Event To State Machine` uses valid `EventTag` values defined in the demo `BP_StateMachine`.
    - Verify `CanEnterState` conditions in state classes allow transitions.
- **Input-Driven States Not Working**:
    - Check that `IMC_Combat` is applied via `Add Mapping Context` on `Event BeginPlay`.
    - Ensure input actions call `Enter State By Tag` with the correct `StateTag`.
- **AI Behavior Issues**:
    - Verify `BP_BehaviorStateMachine` is set up in `BP_EnemyAI`’s `BP_StateManagerComponent`.
    - Confirm AI events (e.g., `Event.EnemyDetected`) are sent to trigger transitions.

## Best Practices

- **Workflows**:
    - Use demo states (e.g., `BP_State_Idle`, `BP_State_Attack`) to test functionality before adding custom states.
    - Organize `Gameplay Tags` hierarchically (e.g., `State.Combat.Attack`, `Event.AI.Detected`) for clarity.
    - Bind `On State Begin` and `On State End` early to debug state changes during testing.
- **Pitfalls to Avoid**:
    - Don’t leave `Default State` empty; always set a valid `Gameplay Tag` to avoid undefined behavior.
    - Avoid duplicating `StateTag` values across states to prevent conflicts.
    - Don’t call `Enter State By Tag` without ensuring `CanEnterState` conditions are met.
- **Performance Considerations**:
    - Disable `bTrackStateActiveTime` for states that don’t require time tracking to optimize performance.