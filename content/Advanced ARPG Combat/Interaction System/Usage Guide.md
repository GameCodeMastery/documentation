This guide explains how to use the Advanced Interaction System once it is set up. It is divided into sections for key operational and customization tasks, ensuring developers can quickly understand how to interact with and extend the system.

![[Interaction System Bonfire 1.png]]

### Initiating an Interaction

1. Ensure the `IA_Interact` Input Action is bound to a key (e.g., “E”) in the **Input Mapping Context**.
2. Approach an interactable actor (e.g., `BP_Interactable`); the system automatically detects it via `Search for Interactables` and displays the interaction widget (e.g., "Press [E] to interact").
3. Press the bound key to trigger the `IA_Interact` action, which calls `ToggleInteraction` on `BP_InteractionComponent`, initiating `BeginInteraction` and sending the `Interact` event to the interactable actor to start actions like playing an animation or opening a menu.

### Ending an Interaction

1. While interacting (i.e., `IsInteracting` returns true), press the `IA_Interact` key again.
2. `ToggleInteraction` calls `EndInteraction`, setting the interaction state to false and sending the `EndInteraction` event to the interactable actor to clean up (e.g., close a menu or stop an animation).

### Creating a Custom Interactable Actor

1. Create a new actor Blueprint or open an existing one (e.g., a loot chest, NPC, or bonfire).
2. In the Class Defaults, add the `BP_InteractionInterface` to the Interfaces list.

![[Interaction Interface.png]]

3. Add a Widget Component to the actor:
    - Set the Widget Class to `WB_InteractableWidget` (or a custom widget if desired).
    - Set the default visibility to **Hidden**.

![[InteractableWidget.png]]

4. Initialize Interactable Widget on **Begin Play**

![[InitailizeInteractionWidget.png]]

5. Add a boolean variable (e.g., `bIsInteracting`) to track the interaction state.
6. Implement the following interface functions:
    - **ToggleInteractableMessage**: Set the Widget Component’s visibility based on the input parameter (e.g., Visible if true, Hidden if false).
    - **Interact**: Store the caller (interactor) reference, set `bIsInteracting` to true, and call a custom `OnInteractionBegin` function to handle initiator-driven logic, such as playing an interaction animation or activating an ability on the caller.
    - **EndInteraction**: Set `bIsInteracting` to false and call a custom `OnInteractionEnd` function to clean up (e.g., stop the animation or deactivate the ability).
    - **StartInteractableAction**: Implement context-sensitive actions on the interactable actor, such as triggering a "Rest at bonfire" effect and respawning enemies when called by another system (e.g., a "Rest" button in a bonfire menu).
    - **GetInteractableMessage**: Return a string for the interaction prompt (e.g., "Press [E] to Open Loot Chest" or "Press [E] to Rest at Bonfire").

![[Example Interaction Implementation.png]]

7. Ensure the actor’s collision settings include the `Interactable` object type (e.g., set a component’s collision to respond to the `Interactable` channel).
8. Place the custom actor in the level and test interactions.

### Creating Custom Interaction Widgets

1. Create a new Widget Blueprint (e.g., `WBP_CustomInteractableWidget`) in the Content Browser.
2. Design the widget (e.g., add a custom text block or image for the interaction prompt).
3. In the interactable actor’s Blueprint, set the Widget Component’s Widget Class to `WBP_CustomInteractableWidget`.
4. Ensure the `ToggleInteractableMessage` function updates the Widget Component’s visibility.

### Add Custom Interaction Animation

1. Create custom animation for your interactable (or create an ability to activate this animation through)
2. In your custom interactable on the overridden event: “Interact” add functionality here to get the Caller (Caller is an input for this function) and from the caller get a reference to the necessary system to activate an ability or play an animation.
3. Use EndInteraction event to stop the ability, animation, or play an end interaction animation in a similar fashion as interacting. You likely will need to store a reference to the caller as a variable as EndInteraction doesn’t have a Caller input.

![[Activate Interaction Ability.png]]

### Implementing Context-Sensitive Actions

1. In the interactable actor’s Blueprint, override the `StartInteractableAction` interface function.
2. Add logic for context-specific actions on the interactable actor, triggered by another system. For example:
    - For a bonfire, implement logic to play a "Rest at bonfire" visual effect and respawn enemies when a "Rest" button is pressed in the bonfire menu.
    - For a loot chest, trigger the transfer of items to the player’s inventory when a “loot” button is pressed in a loot menu.
3. Ensure the calling system (e.g., a menu widget) retrieves the interactable actor reference (stored during `Interact`) and calls `StartInteractableAction` when the action is triggered.

![[Interaction Action.png]]

### Customizing Interaction Properties

1. Open the interactor’s Blueprint and select `BP_InteractionComponent`.
2. Adjust properties in the Details panel:
    - `SearchForInteractablesTickTime`: Decrease for more frequent searches or increase for better performance.
    - `InteractableObjectTypes`: Add additional object types to expand the range of interactable actors.
    - `VisualizeInteractionTrace`: Enable during development to debug the capsule trace.
3. Save and test the changes in-game.

![[Interaction System Component Details 1.png]]

**Notes**:

- Always add the `Interactable` object type in **Project Settings > Collision**, as it is required for the system to function.
- Use `bIsInteracting` in interactable actors to manage state and prevent unintended interactions.
- Optimize `SearchForInteractablesTickTime` for performance in scenes with many interactable actors.
- Leverage `ANS_Interact` for animation-driven interactions to ensure smooth visual feedback.
- Ensure `StartInteractableAction` is called by the appropriate system (e.g., a menu) to trigger context-sensitive actions on the interactable actor.