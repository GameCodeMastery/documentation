The `EnemyInfo` Data Asset is a centralized configuration object used to initialize and manage all relevant systems tied to AI-controlled enemies in the Combat AI System. It allows designers to define an enemy's class, behavior, combat style, abilities, attributes, and other key systems in a modular, data-driven manner.

![[EnemyInfoDataAsset.png]]

---

## Overview

The `EnemyInfo` Data Asset simplifies enemy creation by consolidating configuration values across multiple systems:

- Sets the enemy character class and animation blueprint
- Defines combat behavior, perception, and blackboard mappings
- Grants gameplay abilities and gameplay effects
- Initializes combat styles and ability sets
- Defines starting attribute values and extended attributes
- Configures default collision types used by the Collision Manager System

This modular approach improves reuse, scalability, and runtime efficiency via asynchronous asset loading.

---

## Basic Usage

To configure an enemy AI with the `EnemyInfo` Data Asset:

1. Create a new Data Asset using the `BP_EnemyInfo` class.
2. Populate each section with the desired configuration data:
    - Character pawn class
    - Anim blueprint
    - Behavior tree and state machine blueprint
    - Combat style and ability sets
    - Attributes, extended attributes, gameplay tags
    - Collision manager target types

3. Assign this data asset to a `BP_BaseEnemy` instance via the Details panel or through the `BP_EnemySpawner`.

4. The asset will be loaded asynchronously at runtime and used to initialize all relevant systems.

---

## Key Properties

| Property Name          | Purpose                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| AI Pawn Class          | The character or Pawn class spawned for this enemy                  |
| Anim Class             | The animation blueprint to use for this enemy                       |
| Behavior Tree          | The AI behavior tree to drive logic                                 |
| Behavior State Machine | The FSM asset controlling high-level combat state                   |
| Hostile Tags           | Tags used to identify enemies this AI considers hostile             |
| Blackboard Mappings    | Mapping of Gameplay Tags to Blackboard Keys                         |
| Default State Classes  | State classes to be added to the State Manager Component            |
| Default Combat Style   | The Combat Style data asset defining the enemies abilities and tags |
| Default Ability Sets   | A list of Ability Set assets to grant abilities to this AI          |
| Default Gameplay Cues  | Tags of cues added to the Ability System Component                  |
| Collision Target Types | Target type classes used by the Collision Manager                   |
| Default Attributes     | Attribute Set class and data defining starting stats                |
| Extended Attributes    | List of Extended Attributes to be added to the Attributes Component |

---

## Key Concepts

### Asynchronous Initialization

The `EnemyInfo` asset is loaded and applied asynchronously during enemy spawn. This avoids unnecessary hard references between assets and reduces memory overhead.

If needed, you can manually inspect and step through the initialization process by reviewing the implementation of `InitializeAI` and `SetEnemyInfoRef` in `BP_BaseEnemy`.

### Centralized Configuration

Instead of configuring systems across multiple Blueprints, `EnemyInfo` consolidates:
- Behavior settings for AI logic
- Ability granting
- Attribute initialization
- Collision manager setup
- Blackboard key mappings

This reduces maintenance effort and ensures consistent behavior across enemies.

### Modularity and Reuse

By creating separate `EnemyInfo` assets for different AI archetypes (e.g. melee grunt, ranged unit, boss), you can rapidly prototype and test different enemy variants by assigning different assets to each spawner or placed enemy in the world.

---

## Best Practices

- Use one `EnemyInfo` asset per distinct enemy type or archetype
- Avoid hardcoding AI logic in Blueprints—favor state machine subclasses and behavior tree assets
- Use Gameplay Tags to manage hostile detection and Blackboard logic
- Use child animation blueprints and state machines to share behavior logic across AI types
- Always validate that the referenced classes exist and are correctly linked

---

## Notes

- Compatible with and dependent on the Combat AI System, Advanced Abilities System, and State Manager System
- Assets referenced in `EnemyInfo` must be migrated with the project to function correctly
- Safe to use for spawning via both `BP_EnemySpawner` and manually placed AI characters
- Automatically initializes Perception, Abilities, Behavior Manager, and Collision Manager