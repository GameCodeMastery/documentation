The **Associated Attributes** feature in the Advanced Attributes System allows one attribute to dynamically govern or influence the value of one or more other attributes. This relationship is defined using curves, enabling designers to model progression systems (such as stat-based scaling or level-up systems) without writing complex formulas.

This mechanism is ideal for action RPGs or stat-driven systems where an attribute like Vitality might increase MaxHealth or Endurance might increase Stamina.

![[Attribute Curve.png]]

---

## Basic Usage

To use Associated Attributes:

1. **Define the Parent and Child Attribute Tags**
    - Example:
        - Parent: `Attribute.Vitality`
        - Child: `Attribute.HealthMax`

2. **Create a Curve**
    - Use a `CurveFloat` asset to represent the relationship.
    - X-axis: Value of the parent attribute.
    - Y-axis: Resulting value to apply to the child attribute.

3. **Assign the Association**
    - In the `Attributes` array on your `BP_AttributesComponent`, find the parent attribute.
    - Open its `Associated Attributes` map.
    - Add a new entry with:
        - Key: `Attribute.HealthMax`
        - Value: the desired curve (e.g., `Curve_VitalityToHealthMax`)

4. **Update Behavior**
    - When the parent attribute is updated, the child attribute is automatically recalculated using the curve.

---

## Key Properties

|Property|Purpose|
|---|---|
|`Associated Attributes`|A `Map<FGameplayTag, CurveFloat>` within the `F_Attribute` struct. Defines child attributes to auto-update.|
|Curve Asset|Represents the mathematical relationship between the parent and each child attribute.|
|X-Axis (Input)|The value of the parent attribute (e.g., Vitality).|
|Y-Axis (Output)|The resulting value for the child attribute (e.g., MaxHealth).|

---

## Key Concepts

### Curve-Driven Stat Progression

Using a `CurveFloat` gives designers precise control over how attributes scale. This removes the need to hardcode stat equations and allows for easily editable balance adjustments.

- Example: A Vitality curve might scale from 100 to 250 health over 99 levels, with diminishing returns starting at level 50.

### Modular Design

Because each `F_Attribute` can have its own `Associated Attributes` map, multiple parent-child relationships can coexist independently. For example:

- Endurance → Stamina
- Strength → AttackPower
- Intelligence → ManaMax

This makes the system highly modular and reusable across characters or archetypes.

### Designer Accessibility

No Blueprint scripting or programming is required. By adjusting curves in the Content Browser, designers can fine-tune how attributes influence each other, achieving desired gameplay feel and balance.

- **How It Works**: A Curve Table row (e.g., `EnduranceToStamina`) maps the governing attribute’s value to the governed attribute’s value. For example, a curve might define `Attribute.Stamina` as 50 at `Attribute.Endurance = 0`, 150 at `Endurance = 50`, and 180 at `Endurance = 100` for diminishing returns.
- **Customization**: Modify Curve Table rows to adjust progression. For example, flatten the curve at higher values to limit stamina growth:

    ```blueprint
    // Curve Table: EnduranceToStamina
    // X=0, Y=50; X=50, Y=140; X=100, Y=160
    ```

- **Use Cases**: Create balanced leveling systems where attributes scale appropriately, avoiding overpowered stats at high levels.
- **Best Practices**: Start with simple linear curves for initial testing, then refine with non-linear curves. Use small increments when testing to ensure smooth progression.

### Real-Time Synchronization

Whenever a parent attribute's base value is modified, the attribute system evaluates its associated attributes and updates them in real-time. This ensures the child values always reflect the parent’s current state.

- Example:
    ```blueprint
    ModifyAttributeValue("Attribute.Endurance", +1)
    → Auto-updates Attribute.Stamina via Curve_EnduranceToStamina
    ```


---

## Best Practices

- Name curves clearly to match their relationship (e.g., `Curve_StrengthToAttack`).
- Use smooth curve tangents to avoid unnatural stat jumps.
- Avoid circular associations (e.g., A → B and B → A) to prevent unintended behavior.
- Always test values at min/max extremes of the parent stat.
- Keep parent-child mappings organized by gameplay tag structure.

---

## Notes

- Associated Attributes require no custom Blueprint logic to function.
- The feature is embedded directly in the `F_Attribute` struct.
- All updates are handled automatically by the attribute component.
- Particularly useful for Souls-like progression systems or class-based stat boosts.

---