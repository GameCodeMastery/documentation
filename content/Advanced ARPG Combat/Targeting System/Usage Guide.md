This guide explains how to use the Advanced Targeting System once it is set up. It is divided into sections for key operational and customization tasks, ensuring developers can quickly understand how to interact with and extend the system.

### Toggling Lock-On

1. Ensure the `IA_ToggleLockOn` Input Action is bound to a key (e.g., “T”) in the **Input Mapping Context**.
2. Press the bound key to trigger `ToggleLockOn` on `BP_TargetingComponent`. If a valid target is found (based on distance, camera proximity, and line-of-sight), the system locks onto it, and the pawn’s controller rotates to face the target.
3. Press the key again to disable lock-on.

### Switching Targets

1. While locked on, press the key bound to `IA_SwitchTargetRight` (e.g., “E”) to trigger `Switch To Right`, selecting the closest target to the right.
2. Press the key bound to `IA_SwitchTargetLeft` (e.g., “Q”) to trigger `Switch To Left`, selecting the closest target to the left.
3. The system evaluates nearby targets, updates the lock-on, and triggers the `On Target Selected` event on the new target.

![[Screenshot 2025-05-06 105004 1.png]]
### Creating a Custom Targetable Actor

1. Create a new actor Blueprint or open an existing one (e.g., an enemy or NPC).
2. In the Class Settings, add the `BP_TargetingInterface` to the Interfaces list.

![[Targeting Interface.png]]

3. Add a Widget Component to the actor:
    - Set the Widget Class to `WBP_LockOn` (or a custom widget if desired).
    - Set the default visibility to **False**.

![[Targeting Widget.png]]


> [!NOTE] Note
> You can also adjust the position of the targeting dot by clicking on the widget component and moving it in the Character View Port.


4. Implement the following interface functions:
    - **On Target Selected**: Use the provided `bTargeted` bool to set the Widget Component’s visibility (e.g., Visible if `bTargeted` is true, Hidden otherwise). Add custom logic, such as playing a sound or highlighting the actor.
    - **Get Targeting Location**: Return the world location of the Widget Component (e.g., using `GetComponentLocation`) to position the lock-on widget.
    - **Can Be Targeted**: Return `true` if the actor is targetable (e.g., check if the actor is alive or meets other conditions). For example, implement logic to return `false` if the actor’s health is zero.
5. Ensure the actor’s collision settings respond to the object types specified in `BP_TargetingComponent`’s `Targeting Object Types` (e.g., `Pawn`).
6. Place the custom actor in the level and test targeting, ensuring the lock-on widget appears and target switching works.

![[Pasted image 20250506120010.png]]
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

![[Targeting Component Details 1.png]]

**Notes**:

- Use default targetable actors for quick testing during setup to verify system functionality.
- Always implement `Can Be Targeted` to prevent targeting invalid actors (e.g., dead enemies), improving performance and reliability.
- Test targeting in crowded scenes to ensure the system prioritizes the correct target (closest to camera center).
- If extending the system, consider adding events in `BP_TargetingComponent` to notify other systems (e.g., animation or AI) when a target is selected.