Equipment is created using equipment actors. These actors define the logic associated with a piece of equipment as well as the world representation of an item.

Every equipable item is a child of **BP_BaseEquipable** actor. The base equipable actor has generic and useful functionalities for all types of equipment actors.

# Setting World Mesh for Item

The base equipable has support for both a static mesh and a skeletal mesh. This can be chosen by opening the equipable actor for your item selecting either the item skeletal mesh or item static mesh and changing the mesh.
![[Item Skeletal Mesh.png]]

# Basic Usage

Here are the basic functionalities of the equipable actor:

1. **On Equipped** - As you might expect, this function is called when an item is equipped. This function can be overridden in child equipable classes in order to call item specific functionality whenever a particular piece of equipment is equipped.
2. **On Unequipped** - As you might expect, this function is called when an item is Unequipped. This function can be overridden in child equipable classes in order to call item specific functionality whenever a particular piece of equipment is Unequipped.
3. **Attach Actor** - This function will call functionality that attaches an actor to the equipping character. This function can be overridden in child classes if needed.
4. **Disabling Equipment** - Equipment can be equipped but not in use, this type of equipment might be considered “Disabled” which means that the item is equipped but is either in the sheathe (if the equipment is a weapon) or some other disabled equip socket.
5. **Is Active?** - Items can be equipped but not spawned in the world. By default, only the active item is spawned. If an item is not active then the actor may not be spawned. (This is a setting that can be changed. Inactive items can also be spawned).

# Tags

Gameplay Tags can be given to equipment to allow for searching for equipment by tag.
