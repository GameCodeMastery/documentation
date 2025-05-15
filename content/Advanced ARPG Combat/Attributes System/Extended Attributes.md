The **Extended Attribute** (`BP_BaseExtendedAttribute`) in the Advanced Attributes System is a modular Blueprint class designed to provide additional behavior and logic to specific attributes managed by the `BP_AttributesComponent`. It enables attribute-driven gameplay logic such as regeneration, clamping, triggering abilities on depletion, and more.

This system allows developers to encapsulate unique logic for attributes without cluttering core components or character logic. It is extensible via inheritance and ideal for building reactive or automated behaviors.

---

## Basic Usage

To use an Extended Attribute:

1. **Create a Child Class**
    - Right-click `BP_BaseExtendedAttribute` and create a child Blueprint class.
    - Example: `BP_HealthExtendedAttribute`, `BP_StaminaExtendedAttribute`

2. **Implement Overridable Events**
    - `OnAttributeValueModified`
        - Called when the associated attribute value changes.
        - Example: Check if Health <= 0 to trigger death logic.
    - `OnCurrentAttributeValueUpdated`
        - Called when the attribute’s current value is explicitly updated (e.g., from save data).

3. **Attach to Actor**
    - Add the new class to the `ExtendedAttributes` array in the owning `BP_AttributesComponent`.
    - Alternatively, configure via a Player Info or Enemy Info Data Asset if using ARPG Combat.

4. **Associate Tags**
    - In Class Defaults, set `ExtendedAttributeTag` to the attribute this logic is meant to track (e.g., `Attribute.Health`).

---

## Key Properties

|Property Name|Purpose|
|---|---|
|`ExtendedAttributeTag`|The gameplay tag for the attribute this logic is bound to.|
|`bAutoInitialize`|Whether the extended attribute initializes itself on BeginPlay.|
|`AttributeComponent`|Reference to the owning `BP_AttributesComponent`. Automatically set at runtime.|

For subclasses like `BP_BaseRegeneratableAttribute`, additional configurable properties are available:

|Property|Purpose|
|---|---|
|`MaxAttributeTag`|Tag for the attribute representing the maximum value (used in regeneration).|
|`RegenCooldown`|Delay before regeneration begins after a value change.|
|`RegenTickInterval`|Time between regeneration ticks.|
|`InitialRegenRate`|Amount regenerated per tick.|

---

## Key Concepts

### Attribute-Specific Logic Encapsulation

Each `BP_BaseExtendedAttribute` instance is tied to a single attribute (via its tag), ensuring logic is decoupled and modular. This is ideal for implementing effects such as:

- Health triggers death event when reduced to zero.
- Stamina begins regenerating after cooldown.
- Mana burns out at zero and blocks spellcasting.

### Event-Based Response

Extended Attributes rely on dispatcher events from the owning component:

```blueprint
OnAttributeValueModified → OnAttributeValueModified(EventData)
OnCurrentAttributeValueUpdated → OnCurrentAttributeValueUpdated(EventData)
```

This ensures extended logic stays in sync with gameplay changes and UI updates.

### Regeneration Logic

The `BP_BaseRegeneratableAttribute` subclass includes built-in timers and tick logic for automated value restoration.

- Triggers `OnStartRegen` and `OnRegenFinished` as lifecycle hooks.
- Useful for stamina/mana or shield recharge systems.

### Initialization Workflow

Extended Attributes are initialized when:

- The `Initialize` function is called manually.
- Or `bAutoInitialize` is true and BeginPlay is triggered.

---

## Best Practices

- Derive one Extended Attribute per core behavior (e.g., Regen, Depletion Logic, Threshold Checks).
- Set tags clearly (e.g., `Attribute.Stamina`, `Attribute.StaminaMax`).
- Avoid duplicating logic already handled by gameplay effects unless needed for additional client-side events.
- Keep regeneration rates and cooldowns adjustable via exposed properties.
- Validate attribute values before performing expensive logic (e.g., ability triggering).

---

## Notes

- Extended Attributes are designed for Blueprint-only workflows.
- They are instantiated at runtime and persist per actor.
- Can be reused across multiple actors and systems.
- Seamlessly integrates with the `BP_AttributesComponent` lifecycle and attribute change events.

---