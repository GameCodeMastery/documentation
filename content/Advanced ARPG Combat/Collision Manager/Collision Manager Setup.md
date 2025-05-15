### Prerequisites

- Unreal Engine 5.3+

### Integration Steps

1. **Migrate the System**
    - Copy the `CollisionSystem` folder into your project.

2. **Add Collision Component**
    - Attach `BP_CollisionComponent` to any actor requiring collision detection.

3. **Define Target Types**
    - In the component's Details panel, populate `DefaultTargetTypes` or `DefaultTargetTypeMap` with the relevant TargetType classes and tags.

4. **Create Custom Trace Classes (Optional)**
    - Derive from `BP_TargetType`, `BP_TraceTarget`, or `BP_SweepingSocketTraceTarget` depending on your needs.

5. **Set Collision Properties**
    - If using socket-based collision, call `SetCollisionProperties` to define the mesh and sockets.
    - Ensure the collision mesh has the sockets needed for collision

6. **Add Animation Notifies**
    - Use `ANS_CollisionTrace` in your animation timeline to activate/deactivate hitboxes during combat animations.

### Troubleshooting

- Ensure target tags match between animation notifies and defined TargetTypes.
- Validate that your actor has the correct mesh and that the mesh has the correct socket names if using socket tracing.
- Confirm trace filtering settings (e.g., collision channels, ignore lists) for expected behavior.
