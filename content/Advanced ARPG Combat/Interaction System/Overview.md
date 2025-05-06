The Advanced Interaction System is a versatile and generic interaction framework designed for Unreal Engine 5 projects, integrated within the Advanced ARPG Combat system. Its primary purpose is to facilitate interactions between actors, enabling an interactor (e.g., a player character) to search for and interact with interactable actors (e.g., loot chests, NPCs, or environmental objects). The system addresses the need for a flexible, reusable mechanism to handle interaction events, such as triggering animations, opening menus, or activating abilities. It is targeted at game developers working on action RPGs, adventure games, or any genre requiring robust actor-to-actor interactions. Unique features include a modular interface-based design, customizable interaction tracing, and support for context-sensitive interaction actions.

---

## System Architecture

The Advanced Interaction System is built entirely in Blueprints, using a component- and interface-based architecture to ensure flexibility and ease of integration. The system revolves around a core interaction component, an interface for defining interactable actors, and supporting assets for visual feedback and animation integration. Key components and their interactions are as follows:

- **BP_InteractionComponent**: A component attached to the interactor (e.g., player pawn) that manages interaction logic, including searching for interactable actors via capsule traces, toggling interaction states, and sending interaction events to target actors.
- **BP_InteractionInterface**: An interface implemented by interactable actors to handle interaction events (e.g., starting or ending interactions, toggling widget visibility) and define custom interaction behavior, including context-sensitive actions triggered by other systems.
- **BP_Interactable**: A Blueprint actor class serving as a default example of an interactable actor, implementing `BP_InteractionInterface` with basic interaction functionality.
- **WB_InteractableWidget**: A widget Blueprint providing a default interaction message (e.g., "Press [E] to interact") displayed on interactable actors via a widget component.
- **ANS_Interact**: An animation notify state that applies an interaction status to an animating actor for the duration of the notify, enabling animation-driven interactions.

**Data Flow**: The `BP_InteractionComponent` performs periodic capsule traces to identify interactable actors based on the `Interactable` object type. When an interactable is found, it triggers `ToggleInteractableMessage` on the actor’s `BP_InteractionInterface` to show/hide the interaction widget. Upon interaction, the component sends `Interact` to initiate actions like animations or abilities (with a reference to the caller) or `EndInteraction` to clean up. Later, other systems (e.g., a menu) can call `StartInteractableAction` on the interactable actor to trigger context-specific actions, such as a bonfire respawning enemies.

---

## Core Features

- **Interaction Toggling**: Enables players to start or end interactions with a single input, streamlining interaction workflows.
- **Interactable Search**: Uses capsule traces to detect nearby interactable actors, with configurable search intervals and object types.
- **Interaction Events**: Sends generic events (e.g., `Interact`, `EndInteraction`) to interactable actors, allowing behaviors like playing animations or opening menus, with `Interact` providing a caller reference for initiator-driven actions.
- **Interaction Widget**: Displays a customizable interaction message (e.g., "Press [E] to Open Loot Chest") to guide players.
- **Context-Sensitive Actions**: Supports specific actions on interactable actors (e.g., a bonfire respawning enemies when a "Rest" button is pressed in a menu) triggered via `StartInteractableAction` by other systems.
- **Animation Integration**: Leverages `ANS_Interact` to synchronize interaction states with animations, ensuring smooth visual feedback.