# Codex Instructions

This project is a browser-based Arthurian village builder using TypeScript, Vite, and Phaser.

## Main Goal

Build a small playable prototype first.

The prototype should prove this loop:

grid placement → resources → monastery research → knight training → mythical enemy attack → renown reward

## Technical Stack

- TypeScript
- Vite
- Phaser
- HTML/CSS
- No backend for the prototype
- No multiplayer
- No React unless explicitly requested later

## Architecture Rules

Keep the game split into clear systems.

Use this structure:

```text
src/
  main.ts
  game/
    Game.ts
    scenes/
      BootScene.ts
      PreloadScene.ts
      VillageScene.ts
      UIScene.ts
  systems/
    GridSystem.ts
    BuildingSystem.ts
    ResourceSystem.ts
    ResearchSystem.ts
    UnitSystem.ts
    EnemySystem.ts
    CombatSystem.ts
    SaveSystem.ts
  data/
    buildings.ts
    resources.ts
    research.ts
    units.ts
    enemies.ts
  types/
    Building.ts
    Resource.ts
    Research.ts
    Unit.ts
    Enemy.ts
    Grid.ts
  ui/
    Hud.ts
    BuildMenu.ts
    ResearchPanel.ts
  utils/
    coordinates.ts
    pathfinding.ts
    random.ts
