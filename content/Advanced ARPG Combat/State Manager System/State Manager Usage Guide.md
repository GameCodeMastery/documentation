This guide provides detailed instructions on using the `State Manager System` in an Unreal Engine 5 project, covering key workflows for managing actor states, triggering transitions, and extending the system with custom states and state machines. Users will learn how to enter and exit states, handle state transitions, and create custom state behaviors for Action RPGs or AI-driven systems. The guide is designed for developers and designers to effectively utilize state management for characters, enemies, or other actors.

## Usage Guide

### Entering and Exiting States

Trigger state changes for an actor using `Gameplay Tags` or state classes.

1. Ensure the `BP_StateManagerComponent` is added to the actor (e.g., `BP_PlayerCharacter` or `BP_EnemyAI`).
2. Call `Enter State By Tag` or `Enter State By Class` to enter a state:
    
    ```blueprint
    Enhanced Input Action (IA_Attack, Triggered) -> Get Component By Class (Class: BP_StateManagerComponent) -> Enter State By Tag (StateTag: State.Attack)
    ```
    
3. Bind to state events for additional logic:
    
    ```blueprint
    BP_StateManagerComponent -> On State Begin (StateTag) -> Spawn Emitter At Location (Emitter: StateStartFX)
    ```
    
    ```blueprint
    BP_StateManagerComponent -> On State End (StateTag) -> Print String (Text: Exited State: StateTag)
    ```
    
4. Exit a state by calling `EndState` in a custom `BP_BaseState` or transitioning to another state.

### Managing State Transitions

Control transitions between states using `BP_StateMachine` or state logic.

1. In `BP_StateManagerComponent`, run a state machine to handle transitions:
    ```blueprint
    Event Tick -> Get Component By Class (Class: BP_StateManagerComponent) -> Run State Machine By Tag (StateMachineTag: StateMachine.Combat)
    ```

2. Send events to trigger transitions:
    ```blueprint
    Event Enemy Detected -> Get Component By Class (Class: BP_StateManagerComponent) -> Send Event To State Machine (EventTag: Event.EnemyDetected)
    ```

3. In a custom `BP_StateMachine`, override `Run State Machine` to define transition logic:
    ```blueprint
    Run State Machine -> Is State Equal To Any (State.Patrol) -> Branch (True) -> Enter State By Tag (StateTag: State.Chase)
    ```

### Processing Input Atoms

Use `Input Atom` assets to influence state transitions or behaviors.

1. In the Content Browser, locate a demo `Input Atom` (e.g., `IA_AttackInput`).
2. Add the `Input Atom` to the state manager:
    
    ```blueprint
    Event BeginPlay -> Get Component By Class (Class: BP_StateManagerComponent) -> Add Input Atom (InputAtom: IA_AttackInput)
    ```
    
3. Check for the `Input Atom` in a state or state machine:
    
    ```blueprint
    Run State Machine -> Has Input Atom (InputAtom: IA_AttackInput) -> Branch (True) -> Enter State By Tag (StateTag: State.Attack)
    ```
    
4. Remove the `Input Atom` when no longer needed:
    
    ```blueprint
    On State End -> Get Component By Class (Class: BP_StateManagerComponent) -> Remove Input Atom (InputAtom: IA_AttackInput)
    ```
    

### Creating Custom States

Extend the system by creating new state classes for project-specific behaviors.

1. In the Content Browser, create a new Blueprint inheriting from `BP_BaseState` (e.g., `BP_State_MyCustomState`).
2. In `BP_State_MyCustomState`, set the `State Tag` property (e.g., `State.MyCustomState`) in the Details panel.
3. Override `CanEnterState` to define entry conditions:
    
    ```blueprint
    CanEnterState -> Is Character Dead? -> Branch (False) -> Return (True)
    ```
    
4. Override `EnterState` for entry logic:
    
    ```blueprint
    EnterState -> Play Animation Montage (Montage: AM_MyCustomAction)
    ```
    
5. Override `EndState` for cleanup:
    
    ```blueprint
    EndState -> Stop Animation Montage
    ```
    
6. Add `BP_State_MyCustomState` to the `State Classes` array in `BP_StateManagerComponent`’s Details panel.

> [!NOTE] Note:
> When using the State Manager within Advanced ARPG Combat, the Player Info Data Asset and Enemy Info Data Assets are used to configure default states for Enemies and Players.

7. Trigger the state in-game:
    ```blueprint
    Enhanced Input Action (IA_MyAction, Triggered) -> Get Component By Class (Class: BP_StateManagerComponent) -> Enter State By Class (StateClass: BP_State_MyCustomState)
    ```
    

### Creating Custom State Machines

Create a custom state machine to manage complex state transitions, such as AI behaviors.

1. Create a new Blueprint inheriting from `BP_StateMachine` (e.g., `BP_MyStateMachine`).
2. Set a unique `State Tag` (e.g., `StateMachine.MyStateMachine`) in the Details panel.
3. Override `Run State Machine` to define transition logic:
    ```blueprint
    Run State Machine -> Is State Equal To Any (State.Idle) -> Branch (True) -> Get State Time -> Greater Than (Value: 5.0) -> Branch (True) -> Enter State By Tag (StateTag: State.Patrol)
    ```

4. In `BP_StateManagerComponent`, run the state machine:
    ```blueprint
    Event BeginPlay -> Get Component By Class (Class: BP_StateManagerComponent) -> Run State Machine By Class (StateMachineClass: BP_MyStateMachine)
    ```
    
5. Send events to the state machine for dynamic transitions:
    ```blueprint
    Event Player Detected -> Get Component By Class (Class: BP_StateManagerComponent) -> Send Event To State Machine (EventTag: Event.PlayerDetected)
    ```

6. Add `BP_MyStateMachine` to the State Classes array in `BP_StateManagerComponent` or activate it dynamically with `RunStateMachineByClass`.

> [!NOTE] Note:
> When using the State Manager within Advanced ARPG Combat, the Player Info Data Asset and Enemy Info Data Assets are used to configure default states for Enemies and Players.
> 

7. Test the state machine in-game to ensure transitions occur as expected.

### Example: AI Behavior State Machine

1. Create a child class of the default `BP_Behavior` class included in the AdvancedARPGCombat > AdvancedCombatFramework > CoreCombatSystem > AI > States folder and call it `BP_ExampleBehavior`
    
2. Modify Run State Machine to define AI transitions (e.g., from State.Idle to State.Pursue on enemy detection):
    ```blueprint
    Run State Machine -> Has Input Atom (InputAtomTag: Input.EnemyDetected) -> Branch (Condition: True) -> Enter State By Tag (StateTag: State.Pursue)
    ```

3. Add input atoms based on AI perception:
    ```blueprint
    Event OnEnemyDetected -> Get BP_StateManagerComponent -> Add Input Atom (InputAtomTag: Input.EnemyDetected)
    ```

4. Add `BP_ExampleBehavior` to the AI behavior State Manager (`BP_BehaviorManagerComponent`), located in the `BP_BaseAIController`.

> [!NOTE] NOTE:
> This guide assumes the state manager is being used standalone. If Using State Machine with default Advanced ARPG Combat Project, the Behavior State Machine is set from the Enemy AI Info Data Asset. If using State Manager standalone, the behavior state machine will be added through the `BP_BehaviorManagerComponent` in the `BP_BaseAIController`.


5. Ensure the Behavior State Manager initialization function is called BEFORE the behavior tree runs
6. Ensure the Behavior Tree is setup to work with the State Machine


> [!NOTE] NOTE:
> Use the included `BP_BaseAIController`, `EnemyInfoDataAsset`, `BP_BaseEnemy`, and `BT_ExampleAI`. Refer to the default included enemy AI in Advanced ARPG Combat if confused.


7. Test the AI in-game to verify state transitions.

## Troubleshooting

- **State Not Entering**:
    - Confirm `StateTag` or `StateClass` matches the target state in `Enter State By Tag` or `Enter State By Class`.
    - Check `CanEnterState` in the state class allows entry.
    - Ensure `BP_StateManagerComponent` is not disabled on the actor.
- **Transitions Not Happening**:
    - Verify `Run State Machine By Tag` or `Run State Machine By Class` references the correct `BP_StateMachine`.
    - Ensure `Send Event To State Machine` uses a valid `EventTag` defined in the state machine.
    - Check transition logic in `Run State Machine` for errors.
- **Input Atoms Not Triggering**:
    - Confirm `Add Input Atom` is called before checking `Has Input Atom`.
    - Verify the correct `Input Atom` asset is referenced.
- **AI Behavior Not Working**:
    - Ensure `BP_BehaviorStateMachine` is assigned and running in `BP_EnemyAI`.
    - Check that AI events (e.g., `Event.EnemyDetected`) are sent correctly.

## Best Practices

- **Workflows**:
    - Use hierarchical `Gameplay Tags` (e.g., `State.Combat.Attack`, `Event.AI.PlayerDetected`) for organization.
    - Test custom states with existing demo state machines before creating new ones.
    - Bind `On State Begin` and `On State End` to debug state changes during development.
- **Pitfalls to Avoid**:
    - Don’t skip setting `State Tag` in custom states or state machines to avoid undefined behavior.
    - Avoid complex logic in `EnterState` or `EndState`; delegate to `Run State Machine` for transitions.
    - Don’t call `Run State Machine` every frame unless necessary; use events for efficiency.