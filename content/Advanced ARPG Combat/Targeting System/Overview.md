The Advanced Targeting System is a robust lock-on targeting solution designed for Unreal Engine 5 projects, integrated within the Advanced ARPG Combat system. Its primary purpose is to enable precise and intuitive target selection and tracking, similar to lock-on mechanics found in souls-like games. The system addresses the need for smooth camera and character rotation toward a selected target, seamless target switching, and reliable target validation in dynamic combat scenarios. It is targeted at game developers working on action RPGs requiring precise targeting mechanics. Unique features include customizable targeting parameters, automatic target validation, and a flexible interface for integrating custom targeting behaviors.

![[Screenshot 2025-05-06 105004.png]]

## System Architecture

The Advanced Targeting System is built entirely in Blueprints, leveraging a component-based architecture to ensure modularity and ease of integration. The system centers around a core targeting component and an interface for defining targetable actors, with additional widget assets for visual feedback. Key components and their interactions are as follows:

- **BP_TargetingComponent**: Attached to a pawn (e.g., the player character), this component handles all targeting logic, including finding the closest targetable actor (prioritized by camera center proximity), switching between targets, validating line-of-sight, and updating the pawn’s controller rotation to face the target.
- **BP_TargetingInterface**: Implemented by targetable actors (e.g., enemies or NPCs) to filter valid targets and provide custom behavior, such as displaying a targeting widget or defining the targeting location.
- **WBP_LockOn**: A widget Blueprint used as the default lock-on visual indicator, displayed on targeted actors via a widget component. It includes a targeting dot texture for clear visual feedback.

**Data Flow**: The `BP_TargetingComponent` queries the scene for actors implementing `BP_TargetingInterface`, evaluates them based on distance, camera proximity, and line-of-sight, and selects a target. When a target is selected, the component triggers the `On Target Selected` event on the target’s interface, enabling custom logic like showing the `WBP_LockOn` widget. The component continuously updates the pawn’s rotation to face the target while lock-on is active.

---

## Core Features

- **Lock-On Targeting**: Enables players to lock onto a target, automatically rotating the pawn’s controller to face it, enhancing combat precision and fluidity.
- **Target Switching**: Allows seamless switching to the closest target to the left or right, supporting dynamic combat scenarios.
- **Line-of-Sight Validation**: Checks for obstructions (e.g., walls) between the player and the target, ensuring reliable targeting.
- **Customizable Targeting Parameters**: Offers adjustable properties like targeting distance, rotation speed, and targetable object types for tailored behavior.
- **Automatic Target Selection**: Optionally auto-selects a new target if the current one becomes invalid (e.g., out of range or destroyed).
- **Targeting Widget Integration**: Includes a default lock-on widget (`WBP_LockOn`) to visually indicate the selected target, with support for custom widgets.