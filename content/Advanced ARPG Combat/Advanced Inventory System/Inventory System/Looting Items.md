The **inventory component** supports things such as loot chests and pickup actors, the player can interact with a loot chest or pickup actor to loot items.

## Loot Chest
The base actor class for loot chests is **BP_BaseLootChest**. To create additional loot chests, you can place them in the world and define the data in the **BP_BaseLootChest** class defaults. Or you can create a child class from the **BP_BaseLootChest** parent class and define the data.

Simply placing the **BP_BaseLootChest** actor in the world & defining the **class defaults** from there is the recommended method with loot chests. This way you don’t have to worry about creating child classes.

![[Loot chest UI.png]]

### Defining Loot Chest Data
You can change the open/close animations, & chest skeletal mesh from the loot chest class defaults by clicking on it in the world & setting the variables.

![[Loot chest details.png]]

You can change the items stored in the chest by clicking on the **BP_BaseLootChest** in the world, then clicking on the inventory component & defining the items.

![[Adding items to loot chest.png]]

## Pickup Actor
**BP_PickUpActor** is a class that the player can interact with and loot items from. However, unlike a loot chest, a pickup actor is rather simple and does not require an inventory component. Similar to loot chests, the items held in a pickup actor can be defined by placing the **BP_PickUpActor** in the world, clicking on it in the world & adding items to an array.

![[Pickup Actor.png]]

The pickup actor is also used as a place to store dropped items whenever a character drops an item using the DropItem function from the inventory component. Recently dropped items will be dropped in a recently spawned pickup actor.

![[Pickup Actor class defaults.png]]