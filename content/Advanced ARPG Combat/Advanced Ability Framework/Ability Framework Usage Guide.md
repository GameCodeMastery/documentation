This guide provides detailed instructions on using the `Advanced Abilities Framework` in an Unreal Engine 5 project, covering key workflows for activating abilities, applying gameplay effects, spawning gameplay cues, and creating custom components. It is designed for developers and designers building Action RPGs, focusing on operational tasks and customization to extend the system with project-specific functionality. By following this guide, users will learn how to leverage the framework’s modular components effectively.

## Usage Guide

This section outlines core workflows for using and customizing the `Advanced Abilities Framework`. Each subsection provides step-by-step instructions with practical Blueprint examples, tailored for both developers and non-programmers.

## Activating Abilities

1. Ensure the pawn has a `BP_AdvancedAbilitySystemComponent` with the desired abilities granted (e.g., via `Default Abilities` or `Give Ability`).
2. Bind an Input Action (e.g., `IA_ActivateAbility1`) to a key in the **Input Mapping Context**.
3. In the pawn’s Event Graph, call `Try Activate Abilities By Tag` or `Try Activate Abilities By Class`:

![[Activate Ability On Press.png]]

4. Test by pressing the bound key and verifying the ability’s effects (e.g., attribute changes, visual cues).

## Applying Gameplay Effects
1. Create a child Blueprint of `BP_GameplayEffect` (e.g., `GE_DamageEffect`).
2. In the Details panel, set properties:
    - `Duration`: Set to 0 for instant effects (e.g., damage) or a value (e.g., 10 seconds) for buffs.
    - `Modifiers`: Add an attribute modifier (e.g., reduce `Attribute.Health` by 25).
    - `Gameplay Cues`: Add a cue (e.g., `BP_ImpactEffect` for blood particles).
3. Apply the effect via the Ability System Component:

![[Apply Gameplay Effect Example.png]]

4. Test by checking attribute changes (e.g., via [[Attribute Progress Bar Widget]] and cue spawning.

## Spawning Gameplay Cues
1. For simple cues, create a `BP_ImpactEffect` (e.g., `BP_BloodImpact`):
    - Set `Impact Emitters` for surface types (e.g., `Flesh: BloodParticles`).
    - Set `Impact Sound` (e.g., `BloodHitSound`) and `Gameplay Cue Tag` (e.g., `Cue.Impact.Blood`).

![[Example Impact Effect.png]]

2. For complex effects, create a `BP_GameplayCueActor` (e.g., `BP_ExplosionCue`):
    - Set `Gameplay Cue Tag` (e.g., `Cue.Explosion`).
    - Override `OnExecute` to spawn particles and call `Destroy Actor` when complete:

![[Example Explosion Cue.png]]

3. Trigger the cue via the Ability System Component:

![[Example of calling a gameplay cue.png]]


> [!NOTE] IMPORTANT NOTE:
> Gameplay Cue Actors set to InstancePerExecution will NOT be deleted automatically. The Gameplay Cues with this setting will need to be manually deleted by the developer, as the Advanced Abilities System does not handle their automatic deletion.

## Creating Custom Abilities
1. Create a child Blueprint of `BP_AdvancedGameplayAbility` (e.g., `GA_JumpAbility`).
2. In the Details panel, set properties like `Gameplay Ability Tags` (e.g., `Ability.Jump`) and `Cost Gameplay Effect` (e.g., reduce `GE_StaminaCost` ).
3. Override `ActivateAbility` to define custom logic:

![[Example Jump Ability.png]]

4. Override `OnAbilityEnd` for cleanup if needed (e.g., reset variables), ensuring the parent function is called for `End Ability`, `Cancel Ability`, or `Interrupt Ability`:

![[Example Jump Ability End.png]]

5. Grant the ability to the `BP_AdvancedAbilitySystemComponent`:

![[Give Ability Example.png]]


> [!NOTE] NOTE:
> In the default setup for Advanced ARPG Combat, it is not required to explicitly call `GiveAbility` for default abilities. These can be defined in either the player info data asset or the enemy info data asset. If using the Ability System standalone there is a Default Abilities array where default granted abilities can be added.

6. Test New Ability by activating the ability (e.g. activate the jump ability through a jump input)

![[Jump Ability Test.png]]

## Creating a Custom Gameplay Effect (Poisoned)
1. Create a child Blueprint of `BP_GameplayEffect` (e.g., `GE_Poisoned`).

2. Set properties:
	- `Duration Policy`: `Has Duration`
    - `Duration`: 90 seconds
    - `Modifiers`: decrease `Attribute.Health` by 2 points.
    - `Effect Tags`: `Effect.Negative`, `Effect.Poison`
    - `Period`: 1.5 seconds
    - `Gameplay Cue Actors`: `BP_PoisonedCue`

3. Optionally, override `Apply Effect` for custom logic if needed:

![[Custom Effect Logic.png]]

4. Apply the effect in appropriate location where you want the poisoned effect to be applied:
![[Apply Poison on Hit Example.png]]

## Creating Custom Gameplay Cues 
### Custom Poisoned Gameplay Cue Actor (Stateful)
Stateful Gameplay Cues `Instancing Policy` MUST be set to `Instance Per Actor` so that the Ability System can hold onto and track the gameplay cue. Check [[Gameplay Cue Actor]] documentation for more information.

1. For stateful cues, create a `BP_GameplayCueActor` (e.g., `BP_PoisonedCue`):
    - Set `Instancing Policy` (e.g., `Instance Per Actor`).
    - Override `OnExecute`:

![[Poison Cue Updated.png]]

> [!NOTE] NOTE:
> `Instance Per Actor` should be used when stateful changes need to be executed over a duration of time (e.g. a poison effect). For more information check: [[Gameplay Cue Actor]].

2. Triggering a Stateful Gameplay Cue:
- Stateful gameplay gameplay cues can be triggered in one of two ways, through a gameplay effect or manually by calling Execute Gameplay Cue from either the ability system component or through an ability. 

> [!NOTE] NOTE:
> It is generally recommended to execute stateful gameplay cues through a gameplay effect. 

3. Add stateful gameplay cue to an appropriate gameplay effect you wish to associate with the stateful gameplay cue (e.g. GE_Poisoned)

![[Pasted image 20250512205129.png]]

4. Apply the effect in appropriate location:

Apply the effect in the appropriate location and test to see if the gameplay cue is spawning, executing, and being removed and destroyed automatically with the gameplay effect.

![[Apply Poison on Hit Example.png]]


> [!NOTE] NOTE:
> The gameplay effect and any stateful gameplay cues will only be automatically removed if a duration is set. If no duration the gameplay effect will need to be manually removed. 

5. Trigger manually (Optionally if not using with a gameplay effect):

![[Execute Poisoned Cue.png]]

6. Remove Manually (Optionally if not using with a gameplay effect)

![[Remove poisoned cue.png]]

7. Optionally handle executing and removing gameplay cue through an Ability (Optionally if not using with a gameplay effect)

![[Executing and removing gameplay cue with ability.png]]

### Custom Gameplay Cue Actor (Explosion - Stateless)
Stateless gameplay cues are useful for more complex one off gameplay cues  (e.g., `BP_ExplosionCue`). Stateless Gameplay Cues `Instancing Policy` MUST be set to `Instance Per Execution` so that the Ability System does NOT hold onto or track the gameplay cue. Check [[Gameplay Cue Actor]] documentation for more information.

1. For stateless cues, create a `BP_GameplayCueActor` (e.g., `BP_ExplosionCue`):
    - Set `Instancing Policy` (e.g., `Instance Per Execution`).
    - Override `OnExecute`:

![[Example Explosion Cue.png]]


> [!NOTE] NOTE:
> Set the `Instancing Policy` to `Instance Per Execution` for one off effects such as an explosion. For more information check: [Gameplay Cue Actor](app://obsidian.md/Gameplay%20Cue%20Actor).

 2. Add explosion effect, explosion sound, impulse, etc
 3. After delay call delete on actor

> [!NOTE] IMPORTANT:
> Stateless gameplay cues will always remain in the world unless explicitly destroyed. Generally it is recommended to destroy the stateless gameplay cue actor after it has finished what it needed to do. For more information check: [Gameplay Cue Actor](app://obsidian.md/Gameplay%20Cue%20Actor).

### Custom Gameplay Cue Data Asset
1. For simple effects, create a `BP_GameplayCue` Data Asset (e.g., `BP_HitSound`):
    - Set `Gameplay Cue Tag` (e.g., `Cue.HitSound`).
    - Override `OnExecute` to play a sound:

![[Simple Gameplay Cue DA.png]]


## Creating Custom Ability Tasks
1. Create a child Blueprint of `BP_AbilityTask` (e.g., `BP_DelayedEffectTask`).
2. Set `Task Instancing Policy` (e.g., `Instance Per Execution` for one-off tasks).
3. Override `ActivateTask` for task logic:
    ```blueprint
    ActivateTask -> Delay (Duration: 2) -> Apply Gameplay Effect By Class (Class: BP_DamageEffect) -> EndTask
    ```
4. Activate the task in an ability:
    ```blueprint
    ActivateAbility -> Get BP_AdvancedAbilitySystemComponent -> Activate Task By Class (Class: BP_DelayedEffectTask, bAutoCreateTask: True)
    ```

## Troubleshooting

- **Abilities Fail to Activate**:
    - Ensure `Activation Required Tags` and `Activation Blocked Tags` are correctly set in `BP_AdvancedGameplayAbility`.
    - Verify the ability is granted via `Default Abilities` or `Give Ability`.
- **Gameplay Effects Don’t Apply**:
    - Check `Duration Policy` is set to `Has Duration` for timed effects and `Duration` is non-zero.
    - Confirm `Application Required Tags` are met on the target actor.
- **Gameplay Cues Persist**:
    - For `BP_GameplayCueActor` with `Instance Per Execution`, call `Destroy Actor` in `OnExecute`.
    - Ensure `BP_GameplayEffect` has a `Duration` for automatic cue cleanup.
- **Ability Tasks Don’t End**:
    - Verify `EndTask` is called in `ActivateTask` or after task completion.

## Best Practices

- **Workflows**:
    - Use `PlayerInfoDataAsset` or `EnemyInfoDataAsset` to centralize ability and effect assignments.
    - Prototype with preconfigured assets (e.g., `GA_JumpAbility`, `GE_DamageEffect`) before customizing.
- **Pitfalls to Avoid**:
    - Don’t modify `BP_GameplayCue` data asset variables at runtime; use local variables instead.
    - Avoid frequent `Period` ticks (<0.5s) in `BP_GameplayEffect` to prevent performance issues.
    - Don’t skip parent function calls in `BP_AdvancedGameplayAbility` overrides like `End Ability`.
- **Performance Considerations**:
    - Use `BP_GameplayCue` for simple effects to reduce actor spawning.
    - Limit active `BP_GameplayCueActors` by reusing `Instance Per Actor` for stateful effects.