## Creating a New Enemy AI

1. Create a child of `BP_BaseEnemy` (e.g. `BP_MyEnemy`)

2. Create a new `EnemyInfo` asset and configure:
    - AI Pawn and Anim class
    - Behavior tree and state machine
    - Combat Style and Ability Sets
    - Default attributes and gameplay tags

3. Create and configure a custom `CombatStyle`:
    - Add ability classes (e.g. `GA_EnemyMeleeAttack`)

4. Place `BP_MyEnemy` in level or spawn using `BP_EnemySpawner`

5. Test and tune behavior in-editor


## Setting Up Patrol Paths

1. Drag `BP_PatrolPath` into the level

2. Edit patrol point widgets directly in the viewport

3. Assign this path to an enemy via `BP_PatrolComponent`


## Defining Behavior States

1. Create child of `SM_Humanoid_CombatBehavior`

2. Optionally, override logic for `UpdateBehavior`, `RunStateMachine`, or `OnTrackTargetUpdated`

3. Customize aggression, behavior distance values, movement speed, and timers


## Behavior Tree Tasks

- Add logic for actions like attack, evade, or cast via task nodes

- Use Blackboard Keys mapped via `EnemyInfo` to control logic branching


---

## Best Practices

- Use data assets (`EnemyInfo`) for modular configuration and async loading
- Derive behavior from `SM_Humanoid_CombatBehavior` to retain support for aggression and movement settings
- Keep FSM transitions concise; rely on BT for granular control
- Use `OnTrackTargetUpdated` for frequent targeting needs
- Validate `NavMesh` in all AI areas

---

## Notes

- Supports full Blueprint-only workflows
- Designed to scale across multiple enemy types and complex encounters
- Built-in support for patrol, targeting, blackboard, and abilities
- Easily extensible for ranged, magic, or boss AI variants