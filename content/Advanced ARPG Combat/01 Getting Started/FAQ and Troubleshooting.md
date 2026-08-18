---
title: FAQ & Troubleshooting
---
# FAQ & Troubleshooting Guide

> [!NOTE]
> This guide covers **Advanced ARPG Combat (AARPG) V3** on **Unreal Engine 5.3+**.
> It does **not** replace the system setup and usage guides. If you have not finished migration, start with [[Combat System Setup]].

> [!TIP]
> Most “nothing works after migrate” reports are missing **Gameplay Tags**, required **plugins**, or project **collision / surface** settings. Check those before posting a support topic.

---

## How to Report an Issue

### Where to get support

See [[How to Get Support]] for the full support system (forum, email, Discord, Helper role).

Quick version:

- **Fast developer response** → post in [Help](https://discuss.gamecodemastery.com/c/help/6) on the official forum, or email **support@gamecodemastery.com**
- **Discord** → still ask; the community can jump in, and Helpers flag questions that need a developer response
- **AARPG troubleshooting** → this page and [[Combat System Setup]] first

### Before you post

Ask yourself:

- What exactly is not working?
- Does the issue happen in the **included demo project**, or only after migrating into your project?
- Did it start after a project change, engine upgrade, or partial migration?
- Have you completed [[Combat System Setup]] (Gameplay Tags, plugins, Game Mode, Game Instance, surfaces, collision channels)?
- Did you search this page and the relevant system Setup / Usage guide?

### What to include in a report

A high-quality report is the fastest path to a useful answer. Include:

1. **Unreal Engine version** (e.g. 5.3, 5.4, 5.5)
2. **AARPG version / purchase build** (and roughly when you last updated)
3. **Fresh demo vs migrated project**
4. **Exact steps to reproduce**
5. **Expected vs actual behavior**
6. **Relevant Output Log excerpt** (not a full multi-megabyte dump)
7. Screenshots of **Project Settings** when relevant (Gameplay Tags, Collision, Plugins)
8. Whether the same flow works in the demo project

### Good vs vague reports

- **Good:** “UE 5.4, AARPG V3 demo migrated into a blank Third Person project. After migration, melee attacks play but never deal damage. Demo project works. `ANS_CollisionTrace` is on the montage; `Collision Target Tag` is `Collision.SwordTrace`. Output Log shows no hit events. Gameplay Tags tables are added.”
- **Vague:** “Combat is broken, please help.”

> [!WARNING]
> Vague reports with no engine version, no repro steps, and no demo-vs-migrated distinction are hard to answer accurately. Provide the checklist above.

---

## How to Gather Diagnostics

### 1. Confirm the setup gates first

Before deep debugging, verify [[Combat System Setup]]:

| Check | Where |
|-------|--------|
| `CommonUI` enabled | **Edit → Plugins** |
| Gameplay Tag Data Tables added | **Project Settings → Gameplay Tags** |
| Game Mode set or interface copied | **Project Settings → Maps & Modes** |
| Game Instance set or save interface copied | **Project Settings → Maps & Modes** |
| Surface type `Flesh` | **Project Settings → Physics → Physical Surface** |
| Object channel `Interactable` | **Project Settings → Collision** |
| Camera ignores Pawn / Character Mesh / Ragdoll | **Project Settings → Collision** presets |

> [!DANGER]
> The project will **not** function correctly unless required Gameplay Tags and plugins are configured. This is the single most common migration failure.

### 2. Capture version context

In your forum post, state:

- Engine version (**Help → About Unreal Editor**)
- Whether you are on the stock demo map or a custom map
- Whether Enhanced Input / CommonUI / Gameplay Tags plugins are enabled

### 3. Use the Output Log

1. Open **Window → Developer Tools → Output Log**
2. Reproduce the issue once
3. Filter for relevant keywords (`Error`, `Warning`, ability/tag names, asset names)
4. Copy only the relevant lines into your forum post (in a code block)

> [!TIP]
> If the demo project works and yours does not, the framework is usually fine — the issue is almost always project setup or integration. Bisect by comparing Project Settings and initialization order against the demo.

### 4. Demo-first isolation

When something fails in your project:

1. Reproduce in the **unmodified demo project**
2. If it fails there too → report as a likely product/engine issue (include steps)
3. If it only fails after migrate → treat as setup/integration (tags, interfaces, init order, missing channels)

### 5. Blueprint / component quick checks

For “component does nothing” issues, confirm on the owning pawn/actor:

- Component is present on the Blueprint (not only on a parent you are no longer using)
- `Initialize` (or equivalent) is called on **BeginPlay** where the docs require it
- Required interfaces are implemented (`BP_AbilitySystemInterface`, `BP_GameModeInterface`, `BP_SaveGameInterface`, etc.)
- Data assets (`Player Info` / `Enemy Info`) still point at valid soft references after migrate

---

## Installation & Migration

### The project does nothing after migrate / combat never starts

**Likely causes (in order):**

1. Required Gameplay Tag Data Tables not added
2. `CommonUI` (or other required plugins) not enabled — editor not restarted after enable
3. Game Mode / Game Instance not set to the included classes (or interfaces not copied into yours)
4. Partial migration missing core folders/dependencies

**Fix:**

1. Complete every step in [[Combat System Setup]]
2. Enable `CommonUI`, restart the editor
3. Add these Gameplay Tag Data Tables under **Project Settings → Gameplay Tags**:
   - `DT_CoreCombatGameplayTags`
   - `DT_MeleeCombatGameplayTags`
   - `DT_RangedCombatGameplayTags`
   - `DT_MagicCombatGameplayTags`
4. Set the included Game Mode and Game Instance, **or** implement the documented interfaces and copy the required logic into your classes
5. Open the demo map once and confirm default combat works before integrating into a custom character

**Related:** [[Combat System Setup]]

---

### Compile / plugin errors after adding the project

**Symptoms**

- Editor warns about missing plugins
- Common UI widgets fail to load
- Input-related nodes break

**Fix**

1. **Edit → Plugins** — enable `CommonUI` and any other plugins the demo enables
2. Restart the editor after enabling plugins
3. Confirm **Enhanced Input** is active (default in modern UE5 templates)
4. If you migrated into a template that still uses legacy input, switch that pawn/controller path to Enhanced Input as shown in the system setup guides

**Related:** [[Combat System Setup]] · [[Input Buffer Setup]]

---

### Impact sounds / FX don’t play on hit

**Symptoms**

- Hits register but flesh impact audio/FX are wrong or silent after migrate

**Cause**

- Destination project is missing the physical surface type used by the framework

**Fix**

1. **Project Settings → Physics → Physical Surface**
2. Add surface type `Flesh` (spelling and capitalization must match)
3. Re-open impact effect data assets (e.g. melee/ranged impact effects) and confirm the Flesh surface mapping is still valid

**Related:** [[Combat System Setup]]

---

### Interaction prompts never appear

**Symptoms**

- Looking at interactables does nothing
- No interact widget

**Cause**

- Missing `Interactable` object channel, component not initialized, or collision not set to the Interactable channel

**Fix**

1. **Project Settings → Collision → Object Channels** — add `Interactable`, default response **Block**
2. Ensure the pawn has `BP_InteractionComponent` and calls `Initialize` on BeginPlay
3. Ensure interactable actors use the `Interactable` object type and implement the interaction interface as documented
4. Temporarily enable interaction trace visualization while testing

**Related:** [[Interaction System Setup]] · [[Interaction System Usage Guide]]

---

### Camera clips into / is blocked by characters and corpses

**Symptoms**

- Spring arm / camera collision hits pawn mesh, character mesh, or ragdoll

**Fix**

1. **Project Settings → Engine → Collision**
2. Edit presets for **Pawn**, **Character Mesh**, and **Ragdoll**
3. Set them to **Ignore** the **Camera** channel

**Related:** [[Combat System Setup]] · [[Camera System]]

---

### Game Mode / respawn behavior missing in my project

**Symptoms**

- Player or AI does not respawn as in the demo
- Level flow tied to game mode never runs

**Fix**

1. If you do not have a custom game mode: set the included AARPG game mode in Project Settings
2. If you do: implement `BP_GameModeInterface` and copy the demo game mode events/variables that handle respawn and related flow

**Related:** [[Combat System Setup]]

---

### Save game never loads / progress resets

**Symptoms**

- Inventory, attributes, or combat state do not restore after death/reload

**Likely causes**

1. Save system still disabled (`bEnableSaveGameSystem` is false by default)
2. `InitializeSaveGame` not called
3. Wrong init order — save init must run **before** dependent component init
4. Save slot name mismatch with `BP_AdvancedGameInstance`

**Fix**

1. Enable the save game system flag as documented
2. Call `InitializeSaveGame` on BeginPlay in the player character **before** other component initialization that depends on loaded data
3. Confirm the save object / slot name matches the Game Instance settings
4. Confirm Game Instance is the included advanced instance or implements `BP_SaveGameInterface` correctly

**Related:** [[Save Game System]] · [[Combat System Setup]]

---

## Ability Framework

### Abilities never activate

**Symptoms**

- Input fires, montage/ability does not start
- Ability appears granted but never runs

**Likely causes**

1. `BP_AdvancedAbilitySystemComponent` not added or not `Initialize`d on BeginPlay
2. Pawn missing `BP_AbilitySystemInterface`
3. Ability never granted (standalone Default Abilities array, or Player/Enemy Info data asset in full AARPG)
4. Input Mapping Context not added / wrong Input Action binding
5. State / tag blocking activation

**Fix**

1. Follow [[Ability Framework Setup]] end-to-end on a test pawn
2. Call `Initialize` on the ability system component at BeginPlay
3. Implement `BP_AbilitySystemInterface` (`Get Ability System Component`, `IsAbilityStateActive`, etc.)
4. In full AARPG, confirm default abilities are listed on the Player/Enemy Info data asset (explicit `GiveAbility` is not always required in the default setup)
5. Confirm IMC is added on BeginPlay and the activate input reaches the ability system

**Related:** [[Ability Framework Setup]] · [[Ability Framework Usage Guide]] · [[Advanced Gameplay Ability]]

---

### Gameplay Cue actors pile up / linger in the world

**Symptoms**

- Cue actors remain after the effect
- Performance degrades over long play sessions

**Cause**

- Stateless cues use `Instance Per Execution` and are **not** auto-destroyed by the ability system

**Fix**

1. For one-shot cues: `Instancing Policy = Instance Per Execution`, then **explicitly `Destroy Actor`** when finished
2. For stateful/duration cues (poison, etc.): `Instancing Policy = Instance Per Actor`, prefer driving them from a duration gameplay effect so removal can track the effect
3. Remember: effects/cues without a duration need manual removal

**Related:** [[Gameplay Cue Actor]] · [[Ability Framework Usage Guide]]

---

### Ability tasks never clean up

**Cause**

- Tasks are not automatically ended/destroyed

**Fix**

- Call `EndTask` when the task is finished
- For persistent task actors, destroy them when no longer needed
- Review `Task Instancing Policy` if you are accidentally stacking instances

**Related:** [[Ability Task]]

---

## Collision & Damage

### Melee attacks play but never hit / never deal damage

**Symptoms**

- Animation plays, no hit result, no damage

**Likely causes**

1. Owning pawn missing `BP_CollisionComponent` / target types not configured
2. Weapon sockets not set (`SetCollisionProperties`)
3. `ANS_CollisionTrace` missing, wrong frames, or wrong `Collision Target Tag`
4. `Performing Actor` not set when adding weapon target types
5. Trace still active / wrong ignore lists filtering all targets

**Fix**

1. Confirm collision setup per [[Collision Manager Setup]]
2. Match `ANS_CollisionTrace` → `Collision Target Tag` to the registered target type tag
3. For weapons, set mesh + start/end sockets and `Performing Actor`
4. Enable draw-debug on the trace target while testing, then disable for shipping
5. Always deactivate traces when the window ends (`DeactivateCollisionByTag`)

**Related:** [[Collision Manager Setup]] · [[Collision Manager Usage Guide]]

---

### Hits register on the wrong actors (or self)

**Fix**

- Tighten `Collision Object Types`, ignore lists, and gameplay tags to ignore on the target type
- Prefer owner’s `BP_CollisionComponent` rather than putting collision components on every weapon unless needed (e.g. projectiles)
- Verify team/ally filtering logic in your damage application path

**Related:** [[Collision Manager Usage Guide]] · [[Target Type Class]]

---

## Input Buffer

### Inputs are not buffered during animations

**Likely causes**

1. `BP_InputBufferComponent` missing
2. Input actions still call combat logic directly instead of `Store Input In Buffer`
3. `ANS_InputBuffer` missing from the montage window
4. `bConsumeInputBuffer` set incorrectly on Pressed/Released

**Fix**

1. Route Pressed/Released through `Store Input In Buffer` with the correct `InputTag`
2. Set `bConsumeInputBuffer = true` only on the event that should actually consume/activate
3. Place `ANS_InputBuffer` on the montage frames where buffering should be allowed
4. Bind `On Input Buffer Consumed` and switch on the input tag to perform the action

**Related:** [[Input Buffer Setup]] · [[Input Buffer System Usage Guide]]

---

### Buffered input never fires after the window

**Fix**

- Confirm `On Input Buffer Consumed` is bound and handles that `InputTag`
- Confirm the montage with `ANS_InputBuffer` actually plays
- Ensure the pawn is in a valid state when the buffer is consumed (not dead, not hard-blocked)
- Remember: only the **last** queued input is kept — earlier inputs are overwritten by design

**Related:** [[Input Buffer Setup]]

---

## State Manager

### States never enter / transitions do nothing

**Likely causes**

1. `BP_StateManagerComponent` missing or not configured
2. Default state / state classes empty
3. In full AARPG, Player/Enemy Info data asset not driving defaults
4. State machine not started (`Run State Machine By Class` or equivalent demo path)

**Fix**

1. Follow [[State Manager Setup]]
2. In full AARPG, configure default states on Player Info / Enemy Info data assets
3. Verify state tags exist in your Gameplay Tags tables
4. Print/log state enter/exit while testing transitions

**Related:** [[State Manager Setup]] · [[State Manager Usage Guide]] · [[State Machine]]

---

## Attributes & UI

### Attributes don’t change / health bar never moves

**Likely causes**

1. `BP_AttributesComponent` not initialized on BeginPlay
2. Attribute tags missing from Gameplay Tags
3. In full AARPG, attributes not defined on Player/Enemy Info data asset
4. HUD bar not bound to the component / wrong attribute tags on the widget

**Fix**

1. Call `Initialize` on `BP_AttributesComponent`
2. Define attributes on the info data asset (full AARPG) or on the component attributes array (standalone)
3. For custom HUD: initialize `WB_AttributeProgressBar` with a valid component reference and matching `AttributeTag` / `MaxAttributeTag`
4. For default AARPG HUD: add bars under `AttributeBarsVerticalBox` as documented

**Related:** [[Attributes System Setup]] · [[Attributes System Usage Guide]] · [[Attribute Progress Bar Widget]]

---

### Attribute regeneration never ticks

**Fix**

- Confirm the attribute uses a regeneratable extended attribute class
- Check `RegenRate` and `RegenTickInterval`
- Confirm nothing is immediately overwriting the value every frame

**Related:** [[Extended Attributes]] · [[Attributes System Setup]]

---

## AI

### Enemies stand still / never enter combat

**Likely causes**

1. No Nav Mesh Bounds Volume (or mesh not built)
2. `EnemyInfo` not set on the enemy or spawner
3. Wrong AI controller class
4. Missing dependent systems (State Manager, Abilities, Attributes)
5. Behavior/patrol components missing after a partial migrate

**Fix**

1. Place and build nav mesh
2. Set `EnemyInfo` to a valid demo or custom `BP_EnemyInfo` asset
3. Confirm `AI Controller Class` is `BP_BaseAIController` (or your intended subclass)
4. Migrate AI folders **and** dependencies listed in [[AI System Setup]]
5. Test with a stock demo enemy before customizing behavior graphs

**Related:** [[AI System Setup]] · [[AI System Usage Guide]] · [[Enemy Info Data Asset]] · [[Combat Behavior State Machines]]

---

## Inventory & Equipment

### Inventory is empty / items don’t persist

**Fix**

- Initialize the inventory component on BeginPlay from the character Blueprint
- If using save game, confirm save system enablement and init order (save before dependent init)
- Verify item data assets migrated with valid references

**Related:** [[Inventory System Overview]] · [[Save Game System]]

---

### Equipment slots don’t exist at runtime

**Cause**

- Equipment / item slots are **not** generated automatically

**Fix**

- On the equipment component, manually add every equipment slot and item slot you intend to use
- Only slots present in the equipment slots array are available

**Related:** [[Equipment System Overview]] · [[Equipment Slots]]

---

### Inventory panels display incorrectly

**Fix**

- If using multiple inventory panels in the inventory array, leave **panels to display** blank as documented
- Confirm widget bindings match the panel setup in the demo

**Related:** [[Inventory Panels]]

---

## Targeting & Camera

### Soft/hard lock targeting doesn’t acquire targets

**Fix**

- Confirm targeting component setup and initialization from [[Targeting System Setup]]
- Verify collision channels / trace settings still match after migrate
- Confirm input bindings call into the targeting API
- Compare against demo player configuration

**Related:** [[Targeting System Overview]] · [[Targeting System Setup]] · [[Targeting System Usage Guide]]

---

### Camera mode doesn’t change / camera feels wrong after migrate

**Fix**

1. Ensure `BP_CameraModeComponent` is on the character
2. Call `InitializeCameraSystemComponent()` on BeginPlay with valid Camera + Spring Arm references
3. Apply the collision ignore fixes in [[#Camera clips into / is blocked by characters and corpses]]
4. Remember: per-mode movement logic is implemented per camera mode — blank modes will not “just work”

**Related:** [[Camera System]] · [[Combat System Setup]]

---

## General Questions

### What engine version does AARPG support?

**Unreal Engine 5.3 or later**, unless a specific marketplace build notes otherwise. Always match the engine version you develop on to a version you have verified with the demo project.

### Is this Blueprint or C++?

Advanced ARPG Combat is implemented in **Blueprints** as a modular combat framework. Comfort with Blueprints is strongly recommended before purchase and integration.

> [!IMPORTANT]
> This is **not** a plug-and-play prefab. It is a full combat framework. If you are new to Unreal, expect a learning curve — work through the demo and system guides before deep customization.

### Should I customize the demo character or migrate into my project?

Both are valid. Recommended path for fewer support issues:

1. Learn systems in the **demo project**
2. Complete [[Combat System Setup]] in the destination project
3. Migrate **one system at a time** (or whole framework, then re-wire your pawn to match demo initialization)
4. Diff your pawn’s BeginPlay/init order against the demo player when something silently fails

### Works in the demo, breaks in my project: is it a bug?

Usually **no**. That pattern almost always means:

- Project Settings mismatch (tags, collision, surfaces, plugins)
- Missing interface implementation on Game Mode / Game Instance / pawn
- Initialization order differences
- Broken soft references after migrate

Use the diagnostics section above and compare against the demo before filing as a defect.

### Where are the video tutorials?

See the product overview and YouTube tutorial playlist linked from [[Combat System Overview]].

### How do updates work?

After updating from Fab/Marketplace:

1. Read **Announcements** on the forum for any manual steps
2. Re-test the demo map
3. Re-check Project Settings if the update adds tags, channels, or plugins
4. Migrate carefully if you maintain a heavily modified copy — prefer merging known changed assets rather than blind overwrite when you have custom work on top

### Where should feature requests go?

Use the forum **Feedback** category rather than Help, so support threads stay focused on broken/setup issues.

---

## Best Practices

1. **Finish setup gates before custom work** — tags, plugins, game mode/instance, surfaces, collision channels.
2. **Demo first** — prove a behavior in the demo, then reproduce it in your project.
3. **Initialize explicitly** — ability system, attributes, interaction, inventory, save game, camera: if the docs say call `Initialize` on BeginPlay, do it.
4. **Prefer data assets in full AARPG** — Player Info / Enemy Info drive defaults for abilities, attributes, states, and collision configuration.
5. **Destroy what you spawn** — stateless gameplay cues and finished ability tasks are manual cleanup.
6. **Deactivate traces** — leaving collision traces active is a common performance footgun.
7. **Keep a clean repro project** — a minimal migrated project makes forum support much faster than a 50-plugin monolith.
8. **Search before posting** — this page, system guides, and the forum Help/FAQ categories.

---

## Still stuck?

1. Re-run the [[#How to Gather Diagnostics]] checklist  
2. Search [Help](https://discuss.gamecodemastery.com/c/help/6) and [FAQ and Tutorials](https://discuss.gamecodemastery.com/c/faq-and-tutorials/7)  
3. Open a new **Help** topic with the report template filled in  

Official support: [[How to Get Support]] — **[discuss.gamecodemastery.com](https://discuss.gamecodemastery.com/)**
