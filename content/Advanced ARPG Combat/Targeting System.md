## Overview

The Advanced Targeting System is a robust lock-on targeting solution designed for Unreal Engine 5 projects, integrated within the Advanced ARPG Combat system. Its primary purpose is to enable precise and intuitive target selection and tracking, similar to lock-on mechanics found in souls-like games. The system addresses the need for smooth camera and character rotation toward a selected target, seamless target switching, and reliable target validation in dynamic combat scenarios. It is targeted at game developers working on action RPGs, third-person shooters, or other combat-focused genres requiring precise targeting mechanics. Unique features include customizable targeting parameters, automatic target validation, and a flexible interface for integrating custom targeting behaviors.

image below here

![[Aim Camera Mode Example.png]]

## System Architecture

The Advanced Targeting System is built entirely in Blueprints, leveraging a component-based architecture to ensure modularity and ease of integration. The system centers around a core targeting component and an interface for defining targetable actors, with additional widget assets for visual feedback. Key components and their interactions are as follows:

- **BP_TargetingComponent**: Attached to a pawn (e.g., the player character), this component handles all targeting logic, including finding the closest targetable actor (prioritized by camera center proximity), switching between targets, validating line-of-sight, and updating the pawn’s controller rotation to face the target.
- **BP_TargetingInterface**: Implemented by targetable actors (e.g., enemies or NPCs) to filter valid targets and provide custom behavior, such as displaying a targeting widget or defining the targeting location.
- **WBP_LockOn**: A widget Blueprint used as the default lock-on visual indicator, displayed on targeted actors via a widget component. It includes a targeting dot texture for clear visual feedback.

**Data Flow**: The `BP_TargetingComponent` queries the scene for actors implementing `BP_TargetingInterface`, evaluates them based on distance, camera proximity, and line-of-sight, and selects a target. When a target is selected, the component triggers the `On Target Selected` event on the target’s interface, enabling custom logic like showing the `WBP_LockOn` widget. The component continuously updates the pawn’s rotation to face the target while lock-on is active.

**Text Diagram**:

```cpp
[Player Pawn] --> [BP_TargetingComponent]
                            |
                            v
[Targetable Actor] --> [BP_TargetingInterface] --> [WBP_LockOn Widget]
```

---

## Core Features

- **Lock-On Targeting**: Enables players to lock onto a target, automatically rotating the pawn’s controller to face it, enhancing combat precision and fluidity.
- **Target Switching**: Allows seamless switching to the closest target to the left or right, supporting dynamic combat scenarios.
- **Line-of-Sight Validation**: Checks for obstructions (e.g., walls) between the player and the target, ensuring reliable targeting.
- **Customizable Targeting Parameters**: Offers adjustable properties like targeting distance, rotation speed, and targetable object types for tailored behavior.
- **Automatic Target Selection**: Optionally auto-selects a new target if the current one becomes invalid (e.g., out of range or destroyed).
- **Targeting Widget Integration**: Includes a default lock-on widget (`WBP_LockOn`) to visually indicate the selected target, with support for custom widgets.

---
## Setup

Follow these steps to integrate the Advanced Targeting System into a new Unreal Engine 5 project. These steps are necessary for custom setups, as the system is pre-configured in the default project included with Advanced ARPG Combat.

1. **Prerequisites**:
    
    - Unreal Engine 5.3 or later.
    - A pawn (e.g., player character) to host the targeting component.
    - The default targetable actor (e.g., an enemy with `BP_TargetingInterface`) or custom targetable actors in the project.
2. **Add the Targeting Component**:
    
    - Open the Blueprint of the pawn that will perform targeting (e.g., player character).
    - In the Components panel, click **Add Component** and select `BP_TargetingComponent`.
    - Select the `BP_TargetingComponent` in the Details panel and configure properties as needed:
        - `Targeting Distance`: Set the maximum distance for valid targets.
        - `Rotation Interp Speed`: Control how quickly the pawn rotates to face the target.
        - `Targeting Object Types`: Ensure `Pawn` is included (default).
        - `bAutoSelectNextTarget`: Enable to auto-select a new target if the current one becomes invalid.
3. **Set Up Input Bindings Using Enhanced Input**:
    
    - Navigate to **Project Settings > Input > Input Actions**.
    - Create the following **Input Action** assets in the Content Browser (e.g., under `Content/Input/Actions`):
        - `IA_ToggleLockOn` (e.g., mapped to “T” key).
        - `IA_SwitchTargetRight` (e.g., mapped to “E” key).
        - `IA_SwitchTargetLeft` (e.g., mapped to “Q” key).
    - In each Input Action asset, add the corresponding key mapping under **Mappings**.
    - In **Project Settings > Engine > Input**, under **Bindings**, assign the Input Actions.
    - Ensure the project uses the Enhanced Input System:
        - In **Project Settings > Game > Default Classes**, set the **Default Pawn Class** to use a Blueprint with an **Enhanced Input Component** (or add it to your pawn).
        - In **Project Settings > Input > Default Input Component Class**, select `EnhancedInputComponent`.
    - In the pawn’s Blueprint:
        - Create an **Input Mapping Context** asset (e.g., `IMC_Targeting` in `Content/Input`).
        - Map `IA_ToggleLockOn`, `IA_SwitchTargetRight`, and `IA_SwitchTargetLeft` to the `IMC_Targeting` context in the **Input Mapping Context** asset.
        - On **Event BeginPlay**, call `Add Mapping Context` (from the Player Controller) to apply `IMC_Targeting`.
        - Bind the Input Actions to functions:
            - Add **Input Action** nodes for `IA_ToggleLockOn`, `IA_SwitchTargetRight`, and `IA_SwitchTargetLeft` (using the **Enhanced Input Component**).
            - Connect the **Triggered** pins to call `ToggleLockOn`, `Switch To Right`, and `Switch To Left` on `BP_TargetingComponent`, respectively.
4. **Modify Look Input**:
    
    - In the pawn’s input handling (e.g., in the Blueprint graph), add a condition to disable look input (e.g., yaw/pitch) when `BP_TargetingComponent`’s `IsTargeting` property is true. Use an **Input Action** node for look input (e.g., `IA_Look`) and gate it with a branch checking `IsTargeting`.
5. **Test with Default Targetable Actors**:
    
    - Place a default targetable actor (e.g., an enemy Blueprint pre-configured with `BP_TargetingInterface` and a Widget Component for `WBP_LockOn`) in the level.
    - Ensure the actor’s collision settings respond to the `Pawn` object type (or other types specified in `Targeting Object Types`).
    - Playtest to ensure the system locks onto the actor, displays the `WBP_LockOn` widget, and allows target switching.

**Troubleshooting**:

- If the lock-on widget doesn’t appear, verify that the targetable actor has a Widget Component with the Widget Class set to `WBP_LockOn` and that `On Target Selected` sets its visibility.
- If targeting fails, check that `Targeting Object Types` in `BP_TargetingComponent` includes the relevant object types (e.g., `Pawn`) and that targetable actors implement `BP_TargetingInterface`.
- If inputs don’t work, ensure the `IA_ToggleLockOn`, `IA_SwitchTargetRight`, and `IA_SwitchTargetLeft` Input Actions are bound in the **Input Mapping Context** and that the Enhanced Input Component is set up correctly.
- If rotation feels jittery, adjust the `Rotation Interp Speed` property in `BP_TargetingComponent`.
- For custom targetable actors, see the “Creating a Custom Targetable Actor” subsection in the Usage Guide.

---

## Usage Guide

This guide explains how to use the Advanced Targeting System once it is set up. It is divided into sections for key operational and customization tasks, ensuring developers can quickly understand how to interact with and extend the system.

### Toggling Lock-On

1. Ensure the `IA_ToggleLockOn` Input Action is bound to a key (e.g., “T”) in the **Input Mapping Context**.
2. Press the bound key to trigger `ToggleLockOn` on `BP_TargetingComponent`. If a valid target is found (based on distance, camera proximity, and line-of-sight), the system locks onto it, and the pawn’s controller rotates to face the target.
3. Press the key again to disable lock-on.

### Switching Targets

1. While locked on, press the key bound to `IA_SwitchTargetRight` (e.g., “E”) to trigger `Switch To Right`, selecting the closest target to the right.
2. Press the key bound to `IA_SwitchTargetLeft` (e.g., “Q”) to trigger `Switch To Left`, selecting the closest target to the left.
3. The system evaluates nearby targets, updates the lock-on, and triggers the `On Target Selected` event on the new target.

### Creating a Custom Targetable Actor

1. Create a new actor Blueprint or open an existing one (e.g., an enemy or NPC).
2. In the Class Defaults, add the `BP_TargetingInterface` to the Interfaces list.
3. Add a Widget Component to the actor:
    - Set the Widget Class to `WBP_LockOn` (or a custom widget if desired).
    - Set the default visibility to **Hidden**.
4. Implement the following interface functions:
    - **On Target Selected**: Use the provided `bTargeted` bool to set the Widget Component’s visibility (e.g., Visible if `bTargeted` is true, Hidden otherwise). Add custom logic, such as playing a sound or highlighting the actor.
    - **Get Targeting Location**: Return the world location of the Widget Component (e.g., using `GetComponentLocation`) to position the lock-on widget.
    - **Can Be Targeted**: Return `true` if the actor is targetable (e.g., check if the actor is alive or meets other conditions). For example, implement logic to return `false` if the actor’s health is zero.
5. Ensure the actor’s collision settings respond to the object types specified in `BP_TargetingComponent`’s `Targeting Object Types` (e.g., `Pawn`).
6. Place the custom actor in the level and test targeting, ensuring the lock-on widget appears and target switching works.

### Adding Custom Targeting Widgets

1. Create a new Widget Blueprint (e.g., `WBP_CustomLockOn`) in the Content Browser.
2. Design the widget (e.g., add a custom image or text for the lock-on indicator).
3. In the targetable actor’s Blueprint, set the Widget Component’s Widget Class to `WBP_CustomLockOn`.
4. Ensure the `On Target Selected` function updates the Widget Component’s visibility.

### Customizing Targeting Behavior

1. Open the pawn’s Blueprint and select `BP_TargetingComponent`.
2. Adjust properties in the Details panel:
    - `Targeting Distance`: Set the maximum distance for valid targets.
    - `Rotation Interp Speed`: Control how quickly the pawn rotates to face the target.
    - `Targeting Object Types`: Add or remove object types to filter valid targets.
    - `bAutoSelectNextTarget`: Enable to automatically select a new target if the current one becomes invalid.
3. Save and test the changes in-game.

**Notes**:

- Use default targetable actors for quick testing during setup to verify system functionality.
- Always implement `Can Be Targeted` to prevent targeting invalid actors (e.g., dead enemies), improving performance and reliability.
- Test targeting in crowded scenes to ensure the system prioritizes the correct target (closest to camera center).
- If extending the system, consider adding events in `BP_TargetingComponent` to notify other systems (e.g., animation or AI) when a target is selected.