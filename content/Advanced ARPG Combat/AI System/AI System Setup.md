## Setup

1. **Migrate Assets**
    - Migrate the `AI` folders  via the Unreal Editor to preserve dependencies.

> [!NOTE] NOTE:
> the MeleeCombatSystem, RangedCombatSystem, and MagicCombatSystem each have their own AI folder, so migrate each AI folder you wish to have in the new project

2. **Enable Required Plugins**
    - Gameplay Tags, AI System, Navigation System (default in UE5)
    - Ensure the important dependencies are in the new project:
	    - Abilities System
	    - State Manager System
	    - Attributes System

3. **Place Preconfigured Example Enemy**
    - Drag `BP_ExampleSwordEnemy` from the content browser into the level
    - This enemy already includes all required components, logic, and references to `EnemyInfo`, combat style, and behavior tree

4. **Optional: Use Enemy Spawner**
    - Place `BP_EnemySpawner` in the level and assign `BP_ExampleSwordEnemy`'s `EnemyInfo` asset

5. **Place Navigation Mesh**
    - Add a `NavMeshBoundsVolume` to ensure enemy AI can move

6. **Play and Test**
    - Begin Play to see enemy behavior in action using the default AI configuration

---
