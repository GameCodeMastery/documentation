The Advanced Attributes System is a robust and modular Blueprint-based system designed for Unreal Engine 5 projects, specifically tailored for Action RPGs (ARPGs). Its primary purpose is to manage, calculate, and modify gameplay-related floating-point values (Attributes) that define traits of actors, such as health, movement speed, or experience points. Integrated within the Advanced ARPG Combat framework, this system provides a flexible solution for handling dynamic actor properties and their interactions.

The system addresses the need for a scalable and customizable attributes framework that supports complex gameplay mechanics, such as character progression, stat modification, and UI integration. It is particularly suited for game developers working on RPGs or other genres requiring detailed stat management. A standout feature is the **Associated Attributes System**, which allows attributes to govern others using curve-based calculations, enabling souls-like leveling mechanics with designer-friendly controls for balancing and diminishing returns.

---

## System Architecture

The Advanced Attributes System is built entirely in Blueprints, leveraging Unreal Engine 5’s Blueprint system for accessibility and ease of customization. The architecture centers around the **Attributes Component**, which manages an actor’s attributes and their interactions with other systems, such as Gameplay Effects or UI elements. Data flows from the Attributes Component to associated Extended Attributes and UI widgets, with dispatchers notifying other systems of changes.

### Key Blueprint Classes and Their Roles

- **BP_AttributesComponent**: An Actor Component that manages an array of `F_Attribute` structs for an owning actor. It handles attribute modification, retrieval, and extended attribute management.
- **F_Attribute (Struct)**: A data structure storing attribute values (e.g., current value, base value, multiplier) and associated attributes for governance relationships.
- **BP_BaseExtendedAttribute**: A UObject class providing extended functionality for attributes, such as regeneration or custom logic (e.g., triggering death when health reaches zero).
- **BP_BaseRegeneratableAttribute**: A child of `BP_BaseExtendedAttribute` specialized for attributes that regenerate over time, such as stamina or mana.
- **WB_AttributeProgressBar**: A User Widget for displaying attribute values on the HUD as progress bars, with support for lerp animations to visualize changes.

### Data Flow

- **Attributes Component**: Stores and manages `F_Attribute` structs, processes modifications, and dispatches updates via events like `OnAttributeValueModified`.
- **Extended Attributes**: Handle specialized logic for specific attributes and respond to value changes through functions like `OnAttributeValueModified`.
- **UI (WB_AttributeProgressBar)**: Reads attribute values from the Attributes Component and updates visual progress bars on the HUD.
- **Associated Attributes**: Uses curve tables to adjust governed attributes based on the value of a governing attribute, managed within the `F_Attribute` struct.

---

## Core Features

- **Attribute Management**: Stores and modifies gameplay-related values (e.g., health, stamina, XP) for actors, with support for base, current, multiplier, and percent values.
    - **Benefit**: Provides a centralized system for dynamic stat tracking and modification, simplifying gameplay logic.
- **Extended Attributes**: Enables custom functionality for attributes, such as regeneration or conditional logic (e.g., triggering death at zero health).
    - **Benefit**: Allows developers to extend attributes without modifying core system logic, enhancing flexibility.
- **Regeneratable Attributes**: Supports attributes that regenerate over time, with customizable properties like regen rate, tick interval, and cooldown.
    - **Benefit**: Simplifies implementation of common RPG mechanics like stamina or mana regeneration.
- **Associated Attributes System**: Allows attributes to govern others using curve-based calculations, enabling souls-like leveling mechanics (e.g., Endurance increasing Stamina).
    - **Benefit**: Provides designer-friendly tools for balancing progression without complex math, using curve tables for diminishing returns.
- **HUD Integration**: Displays attribute values as progress bars on the HUD via `WB_AttributeProgressBar`, with lerp animations for smooth visual updates.
    - **Benefit**: Enhances player feedback by visually representing stat changes in real-time.
- **Event Dispatchers**: Notifies other systems of attribute changes through dispatchers like `OnAttributeValueModified` and `OnCurrentAttributeValueUpdated`.
    - **Benefit**: Facilitates integration with other gameplay systems, such as Gameplay Effects or AI logic.


