## Overview

The State Manager System is a modular Blueprint-based system designed for Unreal Engine 5, enabling developers to manage and control the states of game characters or objects in complex Action RPGs. Its purpose is to provide a robust framework for defining multiple states (e.g., idle, attacking, stunned), handling transitions between them, and executing state-specific logic, making it easy to implement dynamic behaviors like AI decision-making or player character states.

This system addresses the need for a flexible, scalable state management solution that simplifies the creation and modification of state-driven gameplay mechanics. It is targeted at game developers and designers working on projects requiring intricate state interactions, particularly Action RPGs with advanced AI or player systems. Standout features include its modular state design, support for state machines to manage transitions, and the ability to use states without predefined classes, enhancing flexibility and ease of use.

---

## System Architecture

The State Manager System is organized around a central component and supporting State Classes, all implemented as Blueprints for designer-friendly customization. The system uses Gameplay Tags for state identification and transition logic, integrating seamlessly with the Advanced Abilities System (see Advanced Abilities System Documentation).

### Key Blueprint Classes

- **BP_StateManagerComponent**: A Blueprint Actor Component that manages states for an owning actor. It handles state activation, transitions, and input processing, serving as the core of the system.
- **BP_BaseState**: A `UObject`-derived Blueprint that defines the logic for entering, executing, and ending a state. It supports modular state behavior and optional state machine functionality for transitions.
- **BP_StateMachine**: A `UObject`-derived Blueprint, inheriting from `BP_BaseState`, that represents a finite state machine. It manages transitions between states in response to events or inputs, ideal for complex behaviors like AI.

### Data Flow

- **State Management**: The `BP_StateManagerComponent` is added to an actor (e.g., a player pawn or AI character) and maintains a list of available states (State Classes) and the current state (Default State). It activates states via `Enter State By Tag` or `Enter State By Class` and processes inputs via Input Atom objects.

- **State Execution**: When a state is entered, `BP_BaseState` (or `BP_StateMachine`) executes its `EnterState` logic, tracks active time (if enabled), and handles transitions via `Run State Machine`.

- **Transitions**: `BP_StateMachine` uses `Run State Machine` to evaluate conditions and call Enter State on the desired state, with `OnStateBegin` and `OnStateEnd` dispatchers notifying the system of state changes.


### Diagram (Text)

```
[Actor] <--> [BP_StateManagerComponent]
                |       |
                v       v
       [BP_BaseState]  [BP_StateMachine]
                |            |
                v            v
           [State Logic]  [Transition Logic]
                ^            ^
                |            |
            [Input Atom]  [Gameplay Tags]
```

- The Actor owns the `BP_StateManagerComponent`, which interacts with `BP_BaseState` or `BP_StateMachine` to execute state logic or manage transitions.

- `Input Atom` objects feed data to the state machine, and Gameplay Tags identify states and trigger transitions.


---

## Core Features

- **Modular State Management**: Define custom states with `BP_BaseState` to encapsulate logic for entering, executing, and ending states, enabling reusable and replaceable state behaviors.

- **State Transitions via State Machines**: Use `BP_StateMachine` to manage transitions between states based on events or inputs, ideal for complex AI behaviors or player state flows.

- **Dynamic State Creation**: Activate states without predefined classes by calling Enter State with a Gameplay Tag, with runtime state creation and dispatcher-based functionality.
    
- **Input Processing**: Process inputs as Input Atom objects, allowing fine-grained control over state machine decisions.

- **State Time Tracking**: Track the duration a state has been active with `bTrackStateActiveTime`, useful for timed behaviors like stuns or buffs.

- **Dispatcher Notifications**: Use On State Begin and On State End dispatchers to notify other systems (e.g., UI, abilities) of state changes, enhancing integration.