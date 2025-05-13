Essentially an **inventory panel** or **inventory slot** is a panel that has its own “inventory” of items and its own maximum amount of **item slots**. An **inventory panel** is essentially the same thing as an **inventory slot**. These terms can be used interchangeably.

The player’s inventory, for example, is divided into 6 **inventory panels** by default. Each item type can have its own **inventory panel** associated with it. So for example, you can have an **inventory panel** that stores weapons, an **inventory panel** that stores armor, shields, consumables, etc. Each different type of item can have its own **inventory panel**.

![[Multiple Inventory Panels.png]]

While the inventory system has the option to be divided into multiple **inventory panels**, using multiple **inventory panels** is not a requirement. One **inventory panel** can be used while retaining multiple **inventory categories** in the UI. So, you can still organize the UI based on item type without the need to divide the items into multiple panels.

If the **inventory panel** is not found the item will be added to the **Default Panel**.

# Using the Default Panel

One single **Inventory panel** can be used instead of multiple **inventory panels**. This gives you the option of either dividing the inventory into multiple **inventory panels** or using one **inventory panel** and having one inventory. All using the same inventory component.

To use one **inventory panel**, click on the component from the actor you’re using the inventory component from. Delete all other panels from the inventory slots array and use the **Default Inventory Panel** only. After that be sure to set the **active panel** to the **Default Panel**.

![[Using only the default panel.png]]

### Panels to Display:

In addition to the steps above, you might also want to display the items in **inventory categories** in the UI while still having only one inventory slot. To do this add all the inventory panels that you wish to display in the UI to the “Panels to Display” variable.

This variable is located in the inventory class defaults under the “initialization” category. The panels you add here will be displayed by the UI.

![[Panels to display.png]]

An example use case scenario of one **inventory panel** is a loot chest or a vendor. A loot chest only has a small number of items, so there is no need to divide the items into multiple panels. As for a vendor, they typically only have a small selection of items. Also, if there are multiple vendors in a city or town, all of which have multiple **inventory panels**, the performance cost on begin play to build all those slots will be higher than one inventory panel.

There are certain scenarios where only one **inventory panel** is needed, there are certain scenarios where multiple **inventory panels** are needed. The inventory component is flexible enough to work in both scenarios.


> [!NOTE] NOTE:
> The **panels to display** variable should be left blank if you are using multiple **inventory panels** in the inventory array.

# Changing Item Inventory Panels
To determine which **inventory panel** an item is stored in, go to the parent **Data Asset** for that item. Then under the item info category find “**item Panel**” and set the enum. For example, to change the **inventory panel** for weapons go to the WeaponItem **data asset** and set the “**Item Panel**” to whatever panel you would like.

![[Item panel.png]]

### How To Change The Inventory Panel Name

After that, you need to change the **inventory panel name**. To change the name for an **inventory panel**, you need to go to the details panel of the inventory component and find the variable called: “**Panel Name**”. There you can define the names of every **inventory panel**. These names will show up in the UI.

By default the panel names are:

**Default Panel** - Miscellaneous
**Panel 1** - Tools
**Panel 2** - Weapons
**Panel 3** - Shields
**Panel 4** - Armor
**Panel 5** - Ammo
**Panel 6** - Rings

![[Panel Name.png]]

Any of these **inventory panels** can be changed around or removed. Just be sure to change the **inventory panel** in the item **Data Asset**, change the **panel name** in the inventory component, or remove any panels you do not need.

# Changing the Order of Inventory UI Categories

Inventory UI categories follow the same order they are added into the **inventory slots array** (array variable located in the details panel of the inventory component). Each panel will be added & displayed in the same order you see in that array variable.

If you’re using only one **inventory panel**, while using multiple **inventory categories** in the UI (like for example with the vendor) then the order of the panels in the “**Panels to Display**” variable will determine the order that the categories are displayed in the UI.
