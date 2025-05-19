This guide provides step-by-step instructions for integrating the `Combat AI Behavior System`, part of the `Advanced ARPG Combat` framework, into an Unreal Engine 5 project. Users will learn how to set up the system, configure default enemy AI behaviors, and test functionality using demo assets. The guide focuses on enabling the system to function as it does in the demo content, ensuring developers and designers can quickly implement dynamic enemy AI for Action RPGs.

### Prerequisites

- Unreal Engine 5.3 or later.
- Plugins enabled: `Gameplay Tags`, `AI Framework` (default in UE5).
- Dependencies: `State Manager System`, `Advanced Abilities System`, `Attributes System`.
- A level with a `Nav Mesh Bounds Volume` for AI navigation.
- Optional: `Enhanced Input System` for testing player interactions with AI.

### Integration Steps

1. **Migrate AI Folders**:
    - In the Unreal Editor, open the demo project containing the `Combat AI Behavior System`.
    - In the Content Browser, locate the relevant AI folders:
        - `Content/AdvancedARPGCombat/AdvancedCombatFramework/CoreCombatSystem/AI`
        - `Content/AdvancedARPGCombat/MeleeCombatSystem/Blueprints/AI` (optional for melee AI)
        - `Content/AdvancedARPGCombat/MagicCombatSystem/Blueprints/AI` (optional for magic AI)
        - `Content/AdvancedARPGCombat/RangedCombatSystem/Blueprints/AI` (optional for ranged AI)
    - Right-click and select **Migrate**, then choose your project’s `Content` directory.
    - Ensure dependencies (e.g., `State Manager System`, Blueprints, Data Assets) are copied.

2. **Add `BP_BaseEnemy` to Level**:
    - In your project’s Content Browser, locate `BP_BaseEnemy` in the migrated AI folder.
    - Drag `BP_BaseEnemy` into a level or use `BP_EnemySpawner` for dynamic spawning.
    - If using `BP_EnemySpawner`, set its `Enemy Info` property to a demo `BP_EnemyInfo` (e.g., `BP_EnemyInfo_Humanoid`) in the Details panel.

3. **Configure `BP_BaseEnemy`**:
    - Select the placed `BP_BaseEnemy` or a spawned instance.
    - In the Details panel, ensure `AI Controller Class` is set to `BP_BaseAIController`.
    - Set `EnemyInfo` to a demo `BP_EnemyInfo` (e.g., `BP_EnemyInfo_Humanoid`) to initialize default behaviors, abilities, and attributes.
    - Verify `BP_BehaviorManagerComponent` and `BP_PatrolComponent` are present in the Components panel.

4. **Set Up Patrol Path (Optional)**:
    - Place a `BP_PatrolPath` actor in the level from the migrated AI folder.
    - In the Details panel, adjust `Patrol Points` using the 3D widget to define the patrol route.
    - Select the `BP_BaseEnemy`and, in its `BP_PatrolComponent`, set `Patrol Path` to the placed `BP_PatrolPath`.
    - If using the `BP_EnemySpawner`, select the `BP_EnemySpawner` and, in its details panel, set `Patrol Path` to the placed `BP_PatrolPath`.
    - Configure `bLoopPatrolPath` or `bReverseDirection` as needed.

5. **Configure Behavior Tree and State Machine**:
    - Open the demo `BP_EnemyInfo` (e.g., `BP_EnemyInfo_Humanoid`) and verify:
        - `Behavior Tree` is set to a demo Behavior Tree (e.g., `BT_HumanoidCombat`).
        - `Behavior Classes` includes `SM_Humanoid_CombatBehavior` for default humanoid behaviors.
    - Ensure `BP_BehaviorManagerComponent` on `BP_BaseEnemy` references `SM_Humanoid_CombatBehavior` via `BP_EnemyInfo`.

6. **Add Navigation Mesh**:
    - In the level, place a `Nav Mesh Bounds Volume` covering the AI’s operational area.
    - Press **P** to visualize the green navigation mesh, ensuring it encompasses patrol and combat areas.

7. **Test with Default Assets**:
    - Play the level and observe the `BP_BaseEnemy` behavior:
        - Verify patrol behavior (if `BP_PatrolPath` is set) using `BP_PatrolComponent`.
        - Test combat by approaching with a player character; the AI should engage using abilities from `BP_EnemyInfo`.
    - Monitor health bar visibility:
        ```blueprint
        OnDamageApplied -> ShowHealthBar
        ```

    - Test ragdoll on death:
        ```blueprint
        OnDamageApplied -> Is Health Zero? -> Branch (True) -> EnableRagdoll
        ```

    - Debug Behavior Tree tasks:
        ```blueprint
        BP_BaseAIController -> UpdateTarget -> Set Blackboard Value As Object (Key: TargetActor, Value: Player)
        ```

## Troubleshooting

- **AI Not Moving**:
    - Ensure a `Nav Mesh Bounds Volume` is present and covers the AI’s area.
    - Verify `BP_PatrolPath` is assigned to `BP_PatrolComponent` if patrolling.
    - Check `BP_BaseAIController` is set as the `AI Controller Class` in `BP_BaseEnemy`.
- **AI Not Engaging in Combat**:
    - Confirm `HostileTags` in `BP_EnemyInfo` or `BP_BehaviorManagerComponent` include player tags (e.g., `Player.Character`).
    - Ensure `Behavior Tree` and `SM_Humanoid_CombatBehavior` are set in `BP_EnemyInfo`.
    - Verify `UpdatePerception` is detecting the player via `BP_BaseAIController`.
- **Abilities Not Triggering**:
    - Check `Default Ability Sets` in `BP_EnemyInfo` includes valid abilities (e.g., `GA_EnemyMeleeAttack`).
    - Ensure `Combat Style` in `BP_EnemyInfo` is set and matches the AI’s abilities.
- **Health Bar Not Showing**:
    - Verify `ShowHealthBar` is called in `OnDamageApplied` in `BP_BaseEnemy`.
    - Ensure the health bar widget is set in `InitializeHUD` or `BP_EnemyInfo`.

## Notes

- **Migration**: Always migrate entire AI folders to ensure dependencies (e.g., abilities, animations) are included.
- **Enemy Info**: Use `BP_EnemyInfo` for all AI configurations to leverage async loading and avoid hard references.
- **Navigation**: AI behaviors like patrolling or chasing require a valid navigation mesh; adjust `Nav Mesh Bounds Volume` size for larger levels.
- **Testing**: Test with demo `BP_EnemyInfo` assets before customizing to understand default behavior.
- **Dependencies**: Ensure `State Manager`, `Advanced Abilities`, and `Attributes` systems are migrated and functional, as they are critical for AI behavior and abilities.
