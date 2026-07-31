
---

## `DESIGN.md`

This is the actual game design spine. It tells Codex what the game should become.

```md
# Game Design Document

## Working Title

Arthurian Village Builder

## High Concept

A browser-based city builder set in mythic Arthurian Britain.

The player manages a vulnerable village, gathers resources, builds structures, trains knights, researches monastery-based knowledge, and defends against mythical creatures.

## Player Fantasy

The player is the founder or steward of a small Arthurian settlement.

They are not simply building a town. They are turning a fragile village into a place of legend: defended by knights, guided by monastic learning, and tested by monsters from Britain’s mythic past.

## Core Loop

1. Place buildings.
2. Generate resources.
3. Spend resources to expand.
4. Build monasteries to generate faith.
5. Spend faith on research.
6. Train knights.
7. Defend against mythical creatures.
8. Earn renown.
9. Use renown and research to unlock stronger options.

## Resources

### Wood

Used for basic buildings, early defences, and expansion.

### Stone

Used for stronger buildings, monasteries, walls, towers, and advanced structures.

### Food

Used to support villagers and train units.

### Faith

Generated mainly by monasteries and religious buildings. Used for research and spiritual upgrades.

### Renown

Earned through victories, survival, quests, and heroic deeds. Used for advanced unlocks and knightly improvements.

## Buildings

### Village Hall

The centre of the village. If destroyed, the player loses.

Functions:

- stores resources
- acts as the main base
- may unlock basic buildings

### Woodcutter

Generates wood over time.

### Quarry

Generates stone over time.

### Farm

Generates food over time.

Not required for the earliest prototype, but should be planned.

### Monastery

Generates faith and unlocks research.

This is the centre of the research system.

### Barracks

Trains knights.

### Watchtower

Basic defensive building.

May attack nearby enemies or increase sight range.

## Units

### Knight

A trained military unit used to defend the village.

Initial stats:

- health
- attack
- defence
- movement speed
- attack range
- attack cooldown

Knights should be expensive enough to feel valuable.

## Enemies

Enemies are mythical creatures that attack the village.

Possible enemy types:

- wolf pack
- goblin raiders
- fae tricksters
- giant
- wyrm
- undead knight
- corrupted stag
- dragon, late game only

For the prototype, use one simple creature that walks toward the Village Hall and attacks it.

## Research

Research is framed as monastery-based learning rather than modern technology.

Possible research branches:

### Monastic Records

Improves storage, administration, and village efficiency.

### Crop Rotation

Improves food production.

### Sacred Smithing

Improves knight attack or armour.

### Bestiary Studies

Improves damage against mythical creatures.

### Herbal Lore

Improves healing or recovery.

### Royal Charters

Unlocks advanced buildings or increases renown gain.

## Tone and Theme

The game should feel:

- mythic
- muddy
- sacred
- dangerous
- early medieval
- hopeful but threatened

Avoid making the world feel too clean, modern, or generic fantasy.

Use terms like:

- faith
- renown
- oath
- relic
- abbey
- monastery
- scripture
- bestiary
- charter
- blessed blade
- mead hall
- palisade
- wyrm
- fae

Avoid terms like:

- science points
- tech lab
- factory
- production chain optimiser
- DPS machine
- upgrade currency

## MVP Definition

The MVP is complete when the player can:

1. See a grid.
2. Place a Woodcutter.
3. Generate wood.
4. Place a Quarry.
5. Generate stone.
6. Place a Monastery.
7. Generate faith.
8. Unlock one research upgrade.
9. Place a Barracks.
10. Train one Knight.
11. Survive one enemy attack.
12. Earn renown.

## Long-Term Ideas

These are not part of the MVP:

- named knights
- king favour system
- Camelot diplomacy
- relic quests
- seasonal events
- roads
- villagers with jobs
- morale
- plague
- raiding parties
- monster lairs
- campaign map
- multiple settlements
- Arthur/Merlin/Morgan-style legendary figures
