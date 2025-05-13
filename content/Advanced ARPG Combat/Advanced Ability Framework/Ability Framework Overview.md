The Advanced Abilities System is a modular, Blueprint-based framework designed for Unreal Engine 5 projects, enabling the creation of stateful gameplay systems for Action RPGs and other stat-driven genres. Its purpose is to facilitate the development of complex abilities, attributes, and effects, such as those found in RPGs, using Gameplay Tags, Gameplay Abilities, and Gameplay Effects. Unlike Epic’s Gameplay Ability System, this custom system is built entirely in Blueprints, offering a flexible and designer-friendly solution for managing actor interactions, visual effects, and attribute modifications.

The system addresses the need for a scalable, data-driven approach to ability management, allowing developers to create modular gameplay mechanics that can be easily modified or extended. It is tailored for game developers and designers working on RPGs, particularly those integrating with the Advanced Attributes System for attribute management. Standout features include its Gameplay Cue System for visual and audio feedback, support for ability tasks to handle asynchronous logic, and a robust stacking mechanism for Gameplay Effects.

---

## System Architecture

The Advanced Abilities System is organized as a collection of Blueprint classes that work together to manage abilities, effects, and visual cues. The `BP_AdvancedAbilitySystemComponent` serves as the central manager, coordinating interactions between actors and the system’s components. Data flows from the Ability System Component to Gameplay Abilities, Effects, Tasks, and Cues, with Gameplay Tags driving conditional logic and state management.

### Key Blueprint Classes and Their Roles

- **BP_AdvancedAbilitySystemComponent**: An Actor Component that manages abilities, gameplay effects, and gameplay cues for an owning actor (e.g., player or NPC). It handles initialization, ability activation, and effect application.
- **BP_AdvancedGameplayAbility**: Defines the logic, cost, and activation conditions for in-game abilities. Child Blueprints implement custom functionality (e.g., combat abilities).
- **BP_GameplayEffect**: Manages attribute modifications, such as instant damage, temporary buffs, or persistent effects (e.g., poison). It supports data-driven customization via properties.
- **BP_AbilityTask**: A specialized actor class for asynchronous or tick-based logic associated with abilities, such as delayed effects or continuous checks.
- **BP_GameplayCueActor**: An actor class that spawns and manages visual effects (e.g., particles) and associated logic for gameplay cues.
- **BP_GameplayCue**: A Data Asset for simple visual and audio effects (e.g., sparks, hit sounds) that don’t require an actor, using the Gameplay Cue Component.
- **BP_ImpactEffect**: A specialized Gameplay Cue Data Asset for impact effects (e.g., blood, sparks), supporting Cascade and Niagara emitters with surface-specific customization.

### Data Flow

- **BP_AdvancedAbilitySystemComponent**: Stores and manages abilities, effects, and cues. It processes ability activation, applies effects, and triggers cues based on Gameplay Tags.
- **BP_AdvancedGameplayAbility**: Executes ability logic, optionally applying Gameplay Effects or spawning Ability Tasks. It interacts with the Ability System Component for cost and condition checks.
- **BP_GameplayEffect**: Modifies attributes in the Advanced Attributes System and triggers Gameplay Cues for visual feedback.
- **BP_AbilityTask**: Runs asynchronous or tick-based logic, reporting back to the owning ability or Ability System Component.
- **BP_GameplayCueActor/BP_GameplayCue**: Handles visual and audio effects, spawned by the Ability System Component or Gameplay Effects.

---

## Core Features

- **Ability Management**: Grants, activates, and ends abilities via `BP_AdvancedAbilitySystemComponent`, supporting modular gameplay mechanics like attacks, spells, or buffs.
    - **Benefit**: Enables developers to create reusable, customizable abilities for diverse gameplay scenarios.
- **Gameplay Effects**: Modifies attributes instantly, temporarily, or persistently, with support for stacking, tag-based conditions, and granted abilities.
    - **Benefit**: Provides a data-driven approach to attribute changes, simplifying complex mechanics like buffs or debuffs.
- **Gameplay Cue System**: Spawns visual and audio effects (e.g., particles, sounds, camera shakes) using `BP_GameplayCueActor` or `BP_GameplayCue`, enhancing player feedback.
    - **Benefit**: Streamlines the creation of immersive effects without excessive actor spawning.
- **Ability Tasks**: Supports asynchronous or tick-based logic for abilities, allowing complex behaviors like delayed effects or continuous checks.
    - **Benefit**: Offloads specialized logic from abilities, improving organization and performance.
- **Impact Effects**: Offers pre-configured `BP_ImpactEffect` assets for surface-specific visual effects (e.g., blood, sparks), supporting both Cascade and Niagara systems.
    - **Benefit**: Simplifies the creation of combat-related visual feedback with customizable properties.

