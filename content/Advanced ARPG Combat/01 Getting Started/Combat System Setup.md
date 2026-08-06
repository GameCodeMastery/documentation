1. **Prerequisites**:
    - Unreal Engine 5.3 or later.
    - `CommonUI` plugin enabled.
	    - Go to Plugins, search for CommonUI and enable it if it's not enabled already
	    - If you enabled the plugin close the editor and open it again
    - Required Gameplay Tags.
	    - In Projects Settings > Project > Gameplay Tags add the following Gameplay Tag Data Tables:
		    - `DT_CoreCombatGameplayTags`
		    - `DT_MeleeCombatGameplayTags`
		    - `DT_RangedCombatGameplayTags`
		    - `DT_MagicCombatGameplayTags`

> [!NOTE] IMPORTANT NOTE:
> THE PROJECT WILL NOT FUNCTION UNLESS YOU ADD THE REQUIRED GAMEPLAY TAGS AND REQUIRED PLUGINS

![[Required Gameplay Tags.png]]

This project makes use of gameplay tags, it is required that you add the gameplay tags into your project to get this combat framework to function. To do this, go to project settings and select gameplay tags.

2. **Game Mode:**
	* After migrating the combat system to a new project, you will either need to set the game mode or copy the code from game mode into your projects game mode.
	* If you do not have your own game mode you can simply set the included one in project settings.

![[Pasted image 20250506201746.png]]

* If you do have your own game mode, you will need to copy/paste some functionality into your game mode. The game mode handles things like respawning the player & respawning the AI on the level. This is done with an interface so you should be able to easily implement `BP_GameModeInterface` into your game mode & copy/paste the events & variables to get the game mode functionality working in your project.

3. **Game Instance:**
	- After migrating the combat system to a new project, you will either need to set the game instance or copy the code from game instance into your projects game instance.
	- If you do not have your own game instance you can simply set the included one in project settings.

![[Advanced Game Instance.png]]

 - If you already have an existing game mode in your project, you will need to copy/paste some functionality into your game mode. The game instance handles the save game functionality. This is done with an interface so you should be able to easily implement `BP_SaveGameInterface` into your game mode & copy/paste the events & variables to get the game mode functionality working in your project.

4. **Surface Types:** 
	* After migrating the combat system to a new project, the impact sounds may not work correctly. This is due to the new project not having the surface types used in this combat system.
	* To fix this issue, go to project settings and add the following surface types to your project. Make sure the spelling and capital letters are the same:
		* `Flesh` 

![[SurfaceTypes.png]]

- After adding this to your project you may need to open the “MeleeImpactEffect” and “RangedImpactEffect” data assets to ensure the effect sound has the flesh surface type set.

5. **Interactable Actors:**
	- Add Interactable object type to project settings 
	- go to Project Settings > Collision and create a new object type. Leave the default response to Block and name the object channel as Interactable.

![[Interactable types.png]]

6. **Fixing Camera Behavior:**
	- You might notice odd camera behavior such as pawns or character meshes blocking the camera collision.
	- Go to Project Settings > Engine - Collision and edit the collision presets of Pawn, Character Mesh, & Ragdoll to ignore the camera. 

![[Pawn collision settings.png]]



