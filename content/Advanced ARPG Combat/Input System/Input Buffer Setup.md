1. **Enable Required Plugins**:
    - Ensure `Enhanced Input` and `Gameplay Tags` are enabled (default in UE5.3+).

2. **Add Input Buffer Component**:
    - In your Pawn/Character Blueprint:
        - Click **Add Component** and choose `InputBufferComponent`.

3. **Define Gameplay Tags**:
    - In the Gameplay Tag Manager, create input tags like:
        - `InputTag.Dodge`
        - `InputTag.Sprint`

4. **Implement Enhanced Input Actions**:
    - Add Input Actions to your `Input Mapping Context`, e.g., `IA_Dodge`.

5. **Blueprint Setup for Input Event**:
    - In your Pawn:
```blueprint
OnDodgePressed:
  -> StoreInputInBuffer(InputTag.Dodge, true, Press)

OnDodgeReleased:
  -> StoreInputInBuffer(InputTag.Dodge, false, Release)
```

6. **Add `ANS_InputBuffer` to Animation**:
    - Open an Animation Montage.
    - Add `ANS_InputBuffer` to indicate when input buffering is active.
    - On end of Notify State, the last input is consumed.

**Troubleshooting**:

- _Nothing happens on input?_ Check the notify is firing and the input tag matches.
- _Input consumed too early?_ Adjust the notify state duration.

---