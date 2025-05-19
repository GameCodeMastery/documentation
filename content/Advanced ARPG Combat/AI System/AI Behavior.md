The `Behavior State Machine` provides designers with precise control over how enemy AI reacts to changing combat conditions. It coordinates state transitions such as idle, engage, strafe, retreat, or heal, and feeds this high-level context into the Behavior Tree to determine low-level tasks.

This separation of concerns enables clean and modular AI design: the state machine governs overall combat behavior, while the behavior tree dictates individual tasks, actions, and animations.

---

## Basic Usage

1. Create a new Blueprint class derived from `SM_HumanoidCombatBehavior`.
    
2. In the class defaults, configure behavior-related properties:
    
    - Aggression levels
        
    - Attack distances
        
    - Attach chances
        
    - Movement speeds
        
    - Behavior ranges
        
    - Defense and healing thresholds
        
3. Override relevant functions such as `UpdateBehavior`, `RunStateMachine`, or `OnTrackTargetUpdated` to implement state-specific logic.
    
4. Assign the Behavior State Machine to the enemy via the `EnemyInfo` Data Asset under the Behavior section.
    

---

## Key Properties

|Property Name|Purpose|
|---|---|
|Attack Distance|Defines close, mid, and long ranges for selecting attacks|
|Aggression Level|Controls how frequently the AI chooses to attack|
|Strafing Range|Minimum and maximum distance for strafing around the player|
|Turn Speed|Controls how fast the AI rotates to face its target|
|Follow Distance|The range in which the AI will follow a target|
|Return To Post Distance|Distance from spawn point after which AI returns to idle state|
|Heal Threshold|Health percentage at which the AI will consider healing|
|Retaliation Data|Controls how AI reacts to being attacked|

---

## Key Concepts

### State Transition Control

The `RunStateMachine` function is the central logic point for determining which behavior state the AI should enter. State transitions can be based on health, distance to target, aggression level, or gameplay tags.

Example:

```blueprint
if (Health <= HealThreshold)
{
    EnterStateByTag("AI.Heal");
}
else if (IsInRange(AttackDistance))
{
    EnterStateByTag("AI.Attack");
}
```

### Behavior Synchronization

The state machine provides high-level context that the Behavior Tree can reference. For example, if the current state is "Strafe" or "Retreat", the Behavior Tree can use this context to branch into appropriate logic by checking a blackboard key.

This allows the FSM and Behavior Tree to operate in tandem and stay aligned.

### Performance Optimization

Use `OnTrackTargetUpdated` for lightweight updates that run more frequently than full decision logic. This is useful for real-time tracking and reactive checks without incurring the cost of full state transitions each tick.

### Customizing Combat Behavior

The `SM_Humanoid_CombatBehavior` subclass exposes a large number of configurable variables to shape AI behavior, including:

- Attack aggression multiplier
    
- Defensive behavior toggles
    
- Healing conditions and cooldowns
    
- Speed overrides for specific states
    

These controls allow you to:

- Fine-tune how aggressive or passive AI characters behave
    
- Determine when AI should dodge, block, or flee
    
- Control strafing and flanking logic
    
- Adjust how and when enemies return to a patrol point or original location
    

---

## Best Practices

- Use `SM_Humanoid_CombatBehavior` as a base class for most enemies
    
- Override only the necessary functions for custom logic to minimize complexity
    
- Group similar enemy types using shared state machine blueprints
    
- Use Gameplay Tags and blackboard keys for flexible condition handling
    

---

## Notes

- Controlled by the `BP_BehaviorManagerComponent`, which is owned by the AI Controller
    
- Behavior State Machine is assigned via the `EnemyInfo` Data Asset
    
- Operates in parallel with the Behavior Tree for complex, layered AI behavior
    
- Highly extensible through Blueprint inheritance and property configuration