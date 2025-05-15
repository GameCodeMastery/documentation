The **Collision Trace Target (`BP_TraceTarget`)** is a collision handler class used within the Advanced Collision Manager System. It is designed for real-time hit detection using trace-based collision logic. As a child of `BP_TargetType`, it performs continuous traces using **collision primitive components** rather than sockets. This makes it ideal for simple, actor-centric collision detection scenarios, such as projectile impacts or radial trace detection from static components.

Its extended variant, the **Sweeping Socket Trace Target (`BP_SweepingSocketTraceTarget`)**, is specialized for sweeping melee-style attacks. This class is **socket-based**, using defined socket names on a skeletal mesh to perform precise trace sweeps and optionally render trail visuals.

---

## Basic Usage

### Common Functions (inherited and extended)

1. **CollisionTrace**
    - Performs trace logic during each tick while the collision is active.
    - Used to detect and record hits against valid targets.

2. **OnHit**
    - Called when the trace collides with a valid target.
    - Override this to apply damage, play VFX, or handle impact logic.

3. **ActivateCollision / DeactivateCollision**
    - Begin or stop the trace activity. Use during animation windows or ability activation periods.
4. **StartTrail / EndTrail**
    - Optional hooks to start or end a trail visual effect, often tied to socket motion.

5. **SetCollisionProperties**
    - For `BP_SweepingSocketTraceTarget`, configure the skeletal mesh and socket setup used for tracing.

---

## Key Properties

|Property|Purpose|
|---|---|
|CollisionRadius|Radius of the trace for hit detection.|
|CollisionObjectTypes|List of object types this trace can interact with.|
|CollisionProfileNamesToIgnore|Profiles to ignore during trace evaluation.|
|GameplayTagsToIgnore|Tags that cause actors to be ignored during collision.|
|ActorClassesToIgnore|Specific actor classes to ignore during trace.|
|DrawDebugType|Whether to show visual debug lines during tracing.|

### Additional Properties (Sweeping Socket Trace Target Only)

|Property|Purpose|
|---|---|
|CollisionTrail|Optional trail particle or ribbon system for visualizing trace movement.|
|TrailStartSocket|Name of the start socket for the collision trail.|
|TrailEndSocket|Name of the end socket for the collision trail.|

---

## Key Concepts

### Primitive-Based Tracing (BP_TraceTarget)

The `BP_TraceTarget` uses **collision primitive components** (such as spheres or capsules) to define trace origins and destinations. This enables flexible trace setups without requiring skeletal mesh sockets.

- Example: Use a series of capsule components to define the arc of a radial attack.
- Practical for actor-centric tracing such as projectiles, stationary AOEs, or radial explosions.

### Socket-Based Tracing (BP_SweepingSocketTraceTarget)

The `BP_SweepingSocketTraceTarget` uses **socket-based tracing** between a start and end socket on a skeletal mesh. This allows for:

- Precise hit detection based on skeletal mesh movement
- Accurate representation of melee weapon paths (e.g., swords, claws)
- Example: `StartSocket = "Tip"`, `EndSocket = "Base"` traces a line between these sockets each frame.

### Real-Time Collision Execution

Once activated, the trace component performs collision checks every frame until deactivated. This is particularly effective for:

- Melee weapon swings
- Combo chains with different hit windows
- Abilities with dynamic AOE sweep zones

### Visual Trails

In the `BP_SweepingSocketTraceTarget`, trail effects can be used to visually enhance attacks. These trails are:

- Optional (defined by `CollisionTrail`)
- Socket-driven (start/end defined by `TrailStartSocket` and `TrailEndSocket`)

Use this for stylized combat feedback, such as:

- Sword swipes
- Energy arcs
- Weapon trails in cinematic attacks

---

## Best Practices

- For `BP_TraceTarget`, ensure collision primitives are well-positioned and scaled for your trace design.
- For `BP_SweepingSocketTraceTarget`, skeletal meshes must have properly named and placed sockets.
- Minimize trace interval times for accurate high-speed actions.
- Use debug trace visuals during testing to fine-tune collision windows.
- Always call `DeactivateCollision` to stop tracing and avoid unnecessary overhead.
- Avoid duplicating trace targets—reuse with tags where possible.

---

## Notes

- Fully Blueprint-based; extendable through Blueprint child classes.
- `BP_TraceTarget` is **not socket-based**, making it suitable for radial or actor-relative traces using primitive components.
- `BP_SweepingSocketTraceTarget` is **socket-based**, ideal for weapon tracing synchronized with animation.
- Integrates seamlessly with the Advanced Combat and Ability systems.

---