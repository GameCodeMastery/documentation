This guide provides detailed instructions on using the `Combat AI Behavior System` within the `Advanced ARPG Combat` framework in Unreal Engine 5. It covers key workflows for managing enemy AI behaviors, triggering combat actions, configuring patrol routes, and extending the system with custom AI behaviors, abilities, and configurations. The guide is designed for developers and designers to effectively utilize the system for creating dynamic enemy AI in Action RPGs.
### Managing AI Behaviors

Control enemy AI behavior using the `BP_BehaviorManagerComponent` and `SM_Humanoid_CombatBehavior`.

1. Select a `BP_BaseEnemy` in the level or spawned via `BP_EnemySpawner`.
2. In the Details panel, locate `BP_BehaviorManagerComponent` and ensure it references a `SM_Humanoid_CombatBehavior` (set via `BP_EnemyInfo`).
3. Adjust behavior properties in the referenced `BP_EnemyInfo` (e.g., `BP_EnemyInfo_Humanoid`):
    - Set `Attack Distance` for combat range.
    - Modify `Enemy Aggression` to control attack frequency.
    ```blueprint
    BP_EnemyInfo -> Behavior -> Set Attack Distance (Value: 500.0)
    ```

4. Send events to trigger behavior changes:
    ```blueprint
    BP_BaseAIController -> UpdateTarget -> Set Blackboard Value As Object (Key: TargetActor, Value: Player) -> Send Event To State Machine (EventTag: Event.PlayerDetected)
    ```

### Triggering Combat Actions

Execute AI combat abilities using Behavior Tree tasks and `GA_EnemyAbility` classes.

1. Open the Behavior Tree (e.g., `BT_ExampleAI`) set in `BP_EnemyInfo`.
2. Add a task node to execute an ability (e.g., `GA_EnemyMeleeAttack`):
    ```blueprint
    Behavior Tree -> Task: TryActivateAbilitiesByTag -> Set Blackboard Key (Key: AbilityTag, Value: Ability.MeleeAttack)
    ```

3. Configure attack ranges in the Behavior Tree (e.g., close, medium, far) to select appropriate abilities.
4. Ensure `Default Ability Sets` in `BP_EnemyInfo` includes the ability:
    ```blueprint
    BP_EnemyInfo -> Abilities -> Default Ability Sets -> Add (Class: GA_EnemyMeleeAttack)
    ```

### Configuring Patrol Routes

Set up AI patrolling using `BP_PatrolComponent` and `BP_PatrolPath`.

1. Place a `BP_PatrolPath` actor in the level.
2. In the Details panel, adjust `Patrol Points` using the 3D widget to define the route.
3. Select a `BP_BaseEnemy` and, in its `BP_PatrolComponent`, set `Patrol Path` to the `BP_PatrolPath` in the level.
4. Optionally, if using `BP_EnemySpawner` set the `Patrol Path` to the `BP_PatrolPath` in the level.
5. Configure patrol settings:
    ```blueprint
    BP_PatrolComponent -> Set bLoopPatrolPath (Value: True)
    ```

6. If using with a behavior state manager, ensure to set the default behavior state to `Behavior.Patrol` in the `EnemyInfoDataAsset` to ensure the AI starts with Patrol behavior.
7. Ensure the Behavior Tree includes a patrol task:
    ```blueprint
    Behavior Tree -> Task: Move To Patrol Point -> Set Blackboard Key (Key: PatrolPoint, Value: Next Patrol Point)
    ```

### Managing Health and Ragdoll

Handle AI health bars and ragdoll effects during combat.

1. On damage, trigger the health bar:
    ```blueprint
    BP_BaseEnemy -> OnDamageApplied -> ShowHealthBar
    ```

2. On death, enable ragdoll:
    ```blueprint
    BP_BaseEnemy -> OnDamageApplied -> Is Health Zero? -> Branch (True) -> EnableRagdoll
    ```

3. Configure `PelvisBoneName` in `BP_BaseEnemy` to match the AI’s skeletal mesh:
    ```blueprint
    BP_BaseEnemy -> Set PelvisBoneName (Value: pelvis)
    ```

### Creating Custom AI Behaviors

Extend the system by creating a custom behavior state machine.

1. Create new behavior tag in gameplay tag manager (e.g., `Behavior.MyCustomBehavior`)
2. Open `SM_Humanoid_CombatBehavior` and modify the `RunStateMachine` event to add the new behavior to the switch statement and edit existing behaviors to configure when to transition into the new state.
3. Optionally, Create a new Blueprint inheriting from `SM_CombatBehavior` (e.g., `SM_MyCombatBehavior`).
4. Override `RunStateMachine` and `UpdateBehavior` to define custom behavior and transitions:
    ```blueprint
    UpdateBehavior -> Is State Equal To Any (State.Idle) -> Branch (True) -> Has Blackboard Value (Key: TargetActor) -> Branch (True) -> Enter State By Tag (StateTag: State.Chase)
    ```

5. Adjust behavior properties (e.g., `Attack Distance`, `Enemy Aggression`) in the Details panel.
6. In `BP_EnemyInfo`, set `Behavior Classes` to include `SM_MyCombatBehavior`.
7. Update the Behavior Tree to support new states:
    ```blueprint
    Behavior Tree -> Task: Custom Action -> Set Blackboard Key (Key: BehaviorTag, Value: Behavior.MyCustomAction)
    ```

### Creating Custom Enemy Abilities

Develop new AI abilities for unique combat behaviors.

1. Create a new Blueprint inheriting from the appropriate enemy ability class.
	1. For completely custom enemy abilities inherit from `GA_EnemyAbility` (e.g., `GA_MyEnemyAbility`)
	2. For Attack Abilities inherit from `GA_EnemyMeleeAttack` (e.g., `GA_MyEnemyAttack`)
	3. For Dodge a Dodge Ability inherit from `GA_EnemyDodge` (e.g., `GA_MyEnemyDodge`)


> [!NOTE] NOTE:
> There are several default enemy abilities for you to inherit from and configure without the need to write any code. Check `AdvancedARPGCombat > MeleeCombatSystem > Blueprints > Abilities > AI` to see what default abilities you can inherit your custom ability from.

2. Set ability properties (e.g., `Attack Montage`, `Gameplay Tags`) in the Details panel.
3. If using a default included enemy action ability such as Attack or Dodge, simply set the desired animation montage.
4. Configure optional Ability Montage properties 
	1. Set `AbilityEndType` to either `Automatic` or `Manual` depending on use case. If manual the ability will need to be ended by adding the `AN_EndAbility` anim notify to the ability montage.
	2. Configure `EndTimeMultiplier` value for automatic ability ending (e.g., `0.8`)
	3. Set Montage `PlayRate` to desired value (e.g., `1.0`)
	4. Set `InTimeToStartMontageAt` to desired value to change when the montage starts
	5. Configure `StartSectionName` to desired value to change the default start montage section
5. For completely custom enemy abilities, Override `ActivateAbility` to define behavior:
    ```blueprint
    ActivateAbility -> Play Montage (Montage: AM_MyAttack) -> Apply Gameplay Effect (Effect: GE_Damage)
    ```

6. Add the ability to `Default Ability Sets` in `BP_EnemyInfo`:
    ```blueprint
    BP_EnemyInfo -> Abilities -> Default Ability Sets -> Add (Class: GA_MyEnemyAbility)
    ```

7. Update the Behavior Tree to trigger the ability:
    ```blueprint
    Behavior Tree -> Task: Perform Ability -> Set Blackboard Key (Key: AbilityTag, Value: Ability.MyCustomAttack)
    ```

### Creating Custom Enemy AI

Create a new enemy type with custom configurations.

1. Create a new Blueprint inheriting from `BP_BaseEnemy` (e.g., `BP_MyEnemy`).
2. Set `AI Controller Class` to `BP_BaseAIController` in the Details panel.
3. Create a new `BP_EnemyInfo` (e.g., `BP_MyEnemyInfo`):
    - Set `AI Pawn Class` to `BP_MyEnemy`.
    - Assign a custom `Anim Class` and `Combat Style`.
    - Add custom abilities and behaviors (e.g., `SM_MyCombatBehavior`, `GA_MyEnemyAbility`).
    - Add custom behavior tree or select included behavior tree
    - Configure hostile tags to ensure the enemy can detect hostiles
4. Configure `BP_MyEnemy` to use `BP_MyEnemyInfo`:
    ```blueprint
    BP_MyEnemy -> Event BeginPlay -> SetEnemyInfoRef (EnemyInfo: BP_MyEnemyInfo)
    ```
5. Place `BP_MyEnemy` in the level or use `BP_EnemySpawner` with `BP_MyEnemyInfo`.

### Notes

- Use `BP_EnemyInfo` for all AI configurations to leverage async loading and simplify setup.
- Combine Behavior Tree tasks and `SM_Humanoid_CombatBehavior` properties for fine-tuned AI behavior.
- Test custom behaviors with demo assets to understand default interactions before scaling complexity.
- Ensure `Gameplay Tags` are unique to avoid conflicts between AI and player systems.

## Troubleshooting

- **AI Not Transitioning States**:
    - Verify `SM_Humanoid_CombatBehavior` is set in `BP_EnemyInfo` and referenced by `BP_BehaviorManagerComponent`.
    - Ensure `UpdateBehavior` in `SM_Behavior` processes valid `Gameplay Tags` or Blackboard values.
    - Check Behavior Tree tasks are setting correct Blackboard keys.
- **Abilities Not Executing**:
    - Confirm `Default Ability Sets` in `BP_EnemyInfo` includes the ability class.
    - Verify `Combat Style` in `BP_EnemyInfo` matches the ability’s requirements.
    - Ensure `ActivateAbility` in the ability class is correctly configured.
- **Patrol Not Working**:
    - Check `BP_PatrolPath` is assigned to `BP_PatrolComponent` and `Patrol Points` are defined.
    - Ensure a `Nav Mesh Bounds Volume` covers the patrol area.
- **Health Bar or Ragdoll Issues**:
    - Verify `OnDamageApplied` calls `ShowHealthBar` and `EnableRagdoll` in `BP_BaseEnemy`.
    - Confirm `PelvisBoneName` matches the AI’s skeletal mesh.

## Best Practices

- **Workflows**:
    - Start with demo `BP_EnemyInfo` and `SM_Humanoid_CombatBehavior` to test default behaviors before customizing.
    - Use hierarchical `Gameplay Tags` (e.g., `Behavior.Combat.Attack`, `Enemy.Hostile.Player`) for clarity.
    - Regularly test AI in-game to validate Behavior Tree and FSM interactions.
- **Pitfalls to Avoid**:
    - Don’t skip setting `HostileTags` in `BP_EnemyInfo` or `BP_BehaviorManagerComponent` to ensure proper targeting.
    - Don't forget to add Behavior Tree to `BP_EnemyInfo`
    - Don’t hard-reference assets; use `BP_EnemyInfo` for async loading.