Follow these steps to integrate the Advanced Interaction System into a new Unreal Engine 5 project. These steps are necessary for custom setups, as the system is pre-configured in the default project included with Advanced ARPG Combat.

1. **Prerequisites**:
    - Unreal Engine 5.3 or later.
    - A pawn (e.g., player character) to host the interaction component.
    - An actor to interact with in the project.
    
2. **Add the Interactable Object Type**:
    - Navigate to **Project Settings > Collision > Object Channels**.
    - Add a new object channel named `Interactable`.
    - Set the default response to **Block**.
    - **Note**: This step is critical, as the system relies on the `Interactable` object type for tracing.

![[Interactable Collision Type.png]]

3. **Add the Interaction Component**:
    - Open the Blueprint of the pawn that will perform interactions (e.g., player character).
    - In the Components panel, click **Add Component** and select `BP_InteractionComponent`.
    - Select the `BP_InteractionComponent` in the Details panel and configure properties as needed:
        - `SearchForInteractablesTickTime`: Set the interval for searching (e.g., 0.1 seconds).
        - `InteractableObjectTypes`: Ensure `Interactable` is included.
        - `VisualizeInteractionTrace`: Enable for debug visibility during testing.

![[Interaction System Component Details.png]]

4. **Initialize the Component**:
    - In the pawn’s Blueprint, on the **Event BeginPlay** node, call the `Initialize` function on `BP_InteractionComponent` to start the interactable search.

5. **Set Up Input Bindings Using Enhanced Input**:
    - Navigate to **Project Settings > Input > Input Actions**.
    - Create a new **Input Action** asset named `IA_Interact` (e.g., create a new asset in the Content Browser under `Content/Input/Actions`).
    - In the `IA_Interact` asset, add a key mapping (e.g., “E” key) under **Mappings**.
    - In **Project Settings > Engine > Input**, under **Bindings**, assign the `IA_Interact` Input Action.
    - Ensure the project uses the Enhanced Input System:
        - In **Project Settings > Game > Default Classes**, set the **Default Pawn Class** to use a Blueprint with an **Enhanced Input Component** (or add it to your pawn).
        - In **Project Settings > Input > Default Input Component Class**, select `EnhancedInputComponent`.
    - In the pawn’s Blueprint:
        - Add an **Input Mapping Context** asset (e.g., create `IMC_Default` in `Content/Input`).
        - Map `IA_Interact` to the `IMC_Default` context in the **Input Mapping Context** asset.
        - On **Event BeginPlay**, call `Add Mapping Context` (from the Player Controller) to apply `IMC_Default`.
        - Bind the `IA_Interact` action to a function:
            - In the Blueprint graph, add an **Input Action** node for `IA_Interact` (using the **Enhanced Input Component**).
            - Connect the **Triggered** pin to call the `ToggleInteraction` function on `BP_InteractionComponent`.
    
![[InteractInput.png]]

6. **Test with Default Interactable Actors**:
    - Place an instance of `BP_Interactable` (included with the system) in the level. This actor is pre-configured with `BP_InteractionInterface` and a Widget Component for `WB_InteractableWidget`.
    - Ensure its collision settings respond to the `Interactable` object type.
    - Playtest to verify that the system detects the actor and displays the `WB_InteractableWidget` (e.g., "Press [E] to interact").

**Troubleshooting**:

- If interactables are not detected, verify that the `Interactable` object type is added in **Project Settings > Collision** and included in the `InteractableObjectTypes` property of `BP_InteractionComponent`.
- If the interaction widget doesn’t appear, ensure that `BP_Interactable` has a Widget Component with the Widget Class set to `WB_InteractableWidget`.
- If interactions don’t trigger, check that the `IA_Interact` Input Action is bound in the **Input Mapping Context** and that the Enhanced Input Component is set up correctly in the pawn.