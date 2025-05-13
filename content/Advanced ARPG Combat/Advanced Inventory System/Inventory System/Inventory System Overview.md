The _**Inventory Component**_ stores all item classes the player is currently holding in his inventory. The _**inventory component**_ has basic functions such as add, remove, use, & drop items.

## How inventory items are stored:
Each item in the inventory is internally stored by the inventory component as a struct _**ItemSlot_Struct.**_
![[ItemSlot_Struct.png]]

This structure contains the item Data Asset, the amount of this item that is held, the inventory index location of this item, a boolean to indicate if that item is equipped or not, & a unique guid.

**Inventory Slots:**

These **item slots** are stored as an array inside the **InventorySlot_Struct**. This is known as the **items array**. The inventory system is divided into multiple **inventory slots**. An **inventory slot** is not the same thing as an **item slot**. An **item slot** is how the item data is stored (as described above). An **inventory slot** is a structure that stores different kinds of information such as the items that are stored in that **inventory slot**.
![[InventorySlot_Struct.png]]

his structure contains the **inventory panel** associated with this **inventory slot**, the **maximum item slots** allowed for the **inventory slot**, and the **item slots** (where the items in **inventory slots** are stored).

# Initializing Inventory
The inventory system must be initialized on begin play from the character BP that is using the inventory component.
![[Initialize Inventory.png]]

# Starting Items
To define the starting items, open the character blueprint for the character that you want to define the starting items for, then select on the InventoryComponent. Once you have that selected go to the details panel & under the inventory category, you will see the **inventory array** for that character. Here you can easily define starting items by expanding the **inventory slots** & clicking the “+” icon for the **item slots**. You can add as many starting items as you like for each **inventory panel**.
![[Define starting items.png]]

After adding an array element to the **item slots array** for the proper **inventory panel**, the only things you need to define are the item data asset and the amount of that item.


> [!NOTE] IMPORTANT:
> _Do_ NOT add an item to the **item slots** in the wrong panel. To check which panel an item uses, open the item data asset and check what the **item panel** is set to. For more information check the page about [[Inventory Panels]]
