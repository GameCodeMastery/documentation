This guide details how to use the State Manager System once integrated, covering state activation, transitions, state machine setup, and customization tasks.

### Activating States

1. Ensure the `BP_StateManagerComponent` is added to the target actor and configured with a Default State or State Classes.
2. Activate a state using Enter State By Tag or Enter State By Class:
    ```blueprint
    InputAction IA_Attack (Pressed) -> Get BP_StateManagerComponent -> Enter State By Tag (StateTag: State.Attack)
    ```

3. Alternatively, use runtime state creation without a predefined class:
    ```blueprint
    Event Tick -> Get BP_StateManagerComponent -> Enter State By Tag (StateTag: State.Custom) -> On State Begin -> Print String (State Began)
    ```

### Managing State Transitions
1. Create a `BP_StateMachine` Blueprint (child of `BP_BaseState`) to define transition logic.
2. Override Run State Machine in `BP_StateMachine` to evaluate conditions and transition states:
    ```blueprint
    Run State Machine -> Has Input Atom (InputAtomTag: Input.Attack) -> Branch (Condition: True) -> Enter State By Tag (StateTag: State.Attack)
    ```

3. Trigger the state machine from the `BP_StateManagerComponent`:
    ```blueprint
    Event Tick -> Get BP_StateManagerComponent -> Run State Machine By Tag (StateMachineTag: StateMachine.AIBehavior)
    ```


### Processing Inputs

1. Add Input Atom objects to the state manager to process inputs:
    ```blueprint
    InputAction IA_Dodge (Pressed) -> Get BP_StateManagerComponent -> Add Input Atom (InputAtomTag: Input.Dodge)
    ```

2. Check for input atoms in BP_BaseState or BP_StateMachine:
    ```blueprint
    CanEnterState -> Get BP_StateManagerComponent -> Has Input Atom (InputAtomTag: Input.Dodge) -> Return True
    ```

3. Remove input atoms when no longer needed:
    ```blueprint
    EndState -> Get BP_StateManagerComponent -> Remove Input Atom (InputAtomTag: Input.Dodge)
    ```


### Creating Custom States

1. Create a new Blueprint (child of `BP_BaseState`) named `BP_MyCustomState`.
2. Set the State Tag property in the Details panel (e.g., `State.MyCustom`).
3. Override `CanEnterState`, `EnterState`, and `EndState` to define custom logic:
    ```blueprint
    CanEnterState -> Get Owner -> Get Current Attribute Value (AttributeTag: Attribute.Health) -> Branch (Condition: Health > 0) -> Return True
    EnterState -> Spawn Emitter at Location (Emitter: CustomEffect) -> Print String (Entered Custom State)
    EndState -> Stop Emitter at Location (Emitter: CustomEffect) -> Print String (Exited Custom State)
    ```

4. Add `BP_MyCustomState` to the State Classes array in `BP_StateManagerComponent` or activate it dynamically with `Enter State By Class`.

### Creating Custom State Machines

1. Create a new Blueprint (child of `BP_StateMachine`) named `BP_MyStateMachine`.
2. Set the State Tag property (e.g., `StateMachine.MyA`I).

3. Override `RunStateMachine` to define transition logic:
    ```blueprint
    Run State Machine -> Has Input Atom (InputAtomTag: Input.EnemyDetected) -> Branch (Condition: True) -> Enter State By Tag (StateTag: State.Pursue)
    ```

4. Optionally, override `OnStateBegin` and `OnStateEnd` to centralize state management:
    ```blueprint
    OnStateBegin (StateTag) -> Print String (State Began: StateTag)
    OnStateEnd (StateTag) -> Print String (State Ended: StateTag)
    ```
    
5. Run the state machine via `RunStateMachineByTag`:
    
    ```blueprint
    Event BeginPlay -> Get BP_StateManagerComponent -> Run State Machine By Tag (StateMachineTag: StateMachine.MyAI)
    ```
    

### Example: AI Behavior State Machine

1. Create a child class of the default `BP_Behavior` class included in the AdvancedARPGCombat > AdvancedCombatFramework > CoreCombatSystem > AI > States folder and call it BP_ExampleBehavior
    
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


5. Test the AI in-game to verify state transitions.

### Notes

- Use Gameplay Tags consistently across states, state machines, and input atoms to ensure reliable triggering and transitions.
- For runtime-created states, rely on `OnStateBegin` and `OnStateEnd` dispatchers to add functionality, as no predefined class exists.
- Test state transitions thoroughly to avoid stuck states, ensuring `EndState` is called appropriately.
- For complex AI, leverage `BP_StateMachine` to centralize transition logic, reducing Blueprint clutter in `BP_StateManagerComponent`.
- Use Reset Owner to force a state reset when needed, especially after interrupting behaviors.