# Overview

The Gameplay Camera System is a modular framework built in Unreal Engine to facilitate smooth, dynamic camera movements during gameplay. It employs a structured architecture that enables developers to define and manage camera behaviors efficiently, ensuring seamless transitions and precise control over camera positioning in response to runtime events.

# Key Components and Interactions

## Components:

- **Camera Mode**: A core object class responsible for orchestrating camera movement to a designated location over a specified duration. It utilizes a customizable animation curve to ensure smooth and natural transitions, allowing for tailored camera behavior to suit various gameplay contexts.
- **Camera Mode Component**: A manager component that oversees the lifecycle and application of Camera Mode objects for its owning actor. It handles the activation, updating, and deactivation of camera modes at runtime, enabling dynamic switching between different camera behaviors based on gameplay requirements.
- **Camera Properties Struct**: A data structure that encapsulates essential camera parameters, such as target location, rotation, and movement constraints. This struct provides the necessary information to guide the Camera Mode's movement logic, ensuring accurate and context-aware camera positioning during gameplay.
    

## Interactions:

The **Camera Mode Component** serves as the central coordinator, maintaining a collection of active **Camera Mode** objects and applying them as needed based on gameplay triggers or events. When a camera mode is activated, the component retrieves relevant data from the **Camera Properties Struct** to configure the mode’s behavior. The **Camera Mode** then executes the movement, interpolating the camera’s position and orientation over time using the defined animation curve. This modular interaction ensures that camera transitions are both responsive and visually polished, seamlessly integrating with the broader gameplay experience.

# Core Features

- **Smooth Camera Transitions**: Utilizes animation curves to deliver fluid and natural camera movements to specified locations over time.
    
- **Dynamic Camera Mode Management**: Enables runtime application and switching of camera modes via the Camera Mode Component for responsive gameplay integration.
    
- **Customizable Camera Properties**: Leverages a Camera Properties Struct to define and fine-tune camera parameters, such as target position and rotation, for precise control.
    
- **Modular Architecture**: Supports flexible and reusable camera behaviors, allowing developers to easily create and apply diverse camera modes for various gameplay scenarios.
    

# Setup

Add the `BP_CameraModeComponent` to your character blueprint by opening your character blueprint and navigating to components and selecting the + button to add a new component. Once added Initialize the camera system on begin play by getting a reference to the camera mode component and calling the function: `InitializeCameraSystemComponent()` feeding in the required data (Camera and Spring Arm reference).

![[InitializeCameraSystem.png]]

# Usage Guide

This guide outlines the process of creating and implementing a new camera mode within the Gameplay Camera System in Advanced ARPG Combat

## Creating a New Camera Mode

![[Aim Camera Mode Example 1.png]]

1. **Create a Camera Mode Object**:
    - In the Unreal Engine Content Browser, create a new Blueprint class with `BP_BaseCameraMode` as the parent class. This inherits essential functionality for interacting with the camera system.
    - Name the new Blueprint (e.g., `BP_MyCustomCameraMode`) to reflect its intended purpose.
        
2. **Access Camera Components**:
    - Within the new Blueprint, use the inherited access to the **Camera Mode Component** to reference critical components, such as:
        - Camera Component
        - Spring Arm Component
        - Target Arm Length
        - Socket Offset
        - Target Offset
    - These references provide the data needed to script custom camera movement logic.
        
3. **Implement Camera Movement Logic**:
    - Develop the logic for your camera movement based on your gameplay requirements. This logic is specific to each camera mode and must be scripted by the developer.
    - Reference the included `BP_AimCameraMode` as an example for structuring your movement logic.
    - Utilize the **Camera Curve** to control smooth transitions:
        - Override the On Camera Curve Updated event in your Blueprint to implement functionality that lerps the camera between positions based on the curve’s progression.
        - Assign a curve asset to the **Camera Curve** property in the Blueprint. You can use the default` BasicCameraCurve` or create a custom curve asset in the Content Browser for tailored movement timing.
            

## Applying the Camera Mode in Gameplay

![[Push Camera Mode.png]]

1. **Access the Camera Mode Component**:
- Identify the character or actor in your game that will use the camera mode.
- Obtain a reference to its **Camera Mode Component** (typically attached to the character Blueprint).

1. **Push the Camera Mode**:
    - Call the PushCameraMode function on the Camera Mode Component.
    - Specify the following inputs:
        - **Camera Class**: Select the custom camera mode Blueprint you created (e.g., BP_MyCustomCameraMode).
        - **Camera Mode Status**: Choose from:
            - Starting: Activates the camera mode to move the camera to its defined position.
            - Ending: Deactivates the camera mode.
            - Reversing: Reverses the camera mode to restore the camera to its original state.
    - Example: To apply your custom camera mode, select Starting. To revert to the default camera, call PushCameraMode again with the same camera class and select Reversing.
        

## Notes

- The BasicCameraCurve and BP_AimCameraMode assets are provided as defaults to help developers understand and prototype camera behaviors.
- Custom camera movement logic requires careful tuning to achieve the desired visual effect, often involving interpolation (lerping) of position, rotation, or other properties based on curve progression.
- Ensure the Camera Mode Component is properly set up on the target actor to manage camera modes effectively during gameplay.