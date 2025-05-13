The _**Equipment Component**_ stores and manages all equipment the owner of the component currently has equipped. The _**Equipment component**_ has basic functions such Equip, Unequip, Quickslots, Use item, item quantities, etc

**How Equipped items are stored:**

Each equipped item is internally stored by the equipment component as **item slots**. These **item slots** are stored as an array inside the **EquipmentSlot** structure. This is known as the **equipped items array**. The equipment system is divided into multiple **Equipment Slots**. An **Equipment Slot** is not the same thing as an **item slot**. An item slot is how the item data is stored. An **Equipment Slot** is a structure that stores different kinds of information such as the items that are equipped in that **Equipment Slot**.

![[EquipmentSlot.png]]

This structure contains the Equipment Slot Type associated with this Equipment Slot, Equip Spawn Setting, bool that determines if the equipment slot is disabled, the active equipped item index, the equipped item slots and equipped actors.

# Starting Equipment
The starting equipment can be defined in one of two ways. By default you define the starting equipment by opening the actor holding the component and selecting the equipment component from the details panel. Here you can easily define starting equipment. Note that for the player character, this is a bit different. You will need to adjust the starting equipment for the player character in the pawn info data asset for the player character you want to define the starting items for. Scroll down until you find the starting equipment array.


> [!NOTE] IMPORTANT:
> _You must build the equipment slots by selecting the + icon and adding all the equipment slots and item slots you intend to use. Equipment / item slots will NOT be generated at runtime. Only the equipment and item slots added to the equipment slots array will be available._

