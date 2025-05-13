Any State Can handle transitioning between a finite number of states. When you want to transition state, you can call the function “Run State Machine” from the state manager component. This will find a state machine by tag & execute the “Run State Machine” function within the state object class. This function is intended to be used when you want the actor to transition from one state to another.

The Run State Machine function can be overridden in any [[State Class]]. Which will allow you to build a finite state machine which manages the transition between states.

A good example use case of a state machine is for defining AI behavior, in the default project there is a state machine for the AI behavior which manages the behavior of the AI & how the AI will transition between states. Which will ultimately define the behavior of the AI. The Behavior State Machine can be modified to change the behavior of the AI.

This will enable a tun of power & modularity for defining really complex & advanced AI boss behavior.

![[Combat Behavior State Machine.png]]