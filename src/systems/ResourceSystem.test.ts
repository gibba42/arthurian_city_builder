import { describe, expect, it, vi } from 'vitest';
import type { ResourceAmounts } from '../types/Resource';
import { ResourceSystem } from './ResourceSystem';

const startingResources = (): ResourceAmounts => ({
  wood: 100,
  stone: 50,
  food: 25,
  faith: 0,
  renown: 0,
});

describe('ResourceSystem', () => {
  it('checks costs and spends affordable resources', () => {
    const resources = new ResourceSystem(startingResources());

    expect(resources.canAfford({ wood: 40, stone: 20 })).toBe(true);
    expect(resources.spend({ wood: 40, stone: 20 })).toBe(true);
    expect(resources.getAll()).toEqual({ wood: 60, stone: 30, food: 25, faith: 0, renown: 0 });
  });

  it('does not alter resources when a cost cannot be afforded', () => {
    const resources = new ResourceSystem(startingResources());

    expect(resources.spend({ wood: 101 })).toBe(false);
    expect(resources.getAll()).toEqual(startingResources());
  });

  it('adds resources and does not allow a balance below zero', () => {
    const resources = new ResourceSystem(startingResources());

    resources.add('faith', 5);
    resources.add('wood', -150);

    expect(resources.get('faith')).toBe(5);
    expect(resources.get('wood')).toBe(0);
  });

  it('notifies listeners when resources change and supports unsubscribing', () => {
    const resources = new ResourceSystem(startingResources());
    const listener = vi.fn();
    const unsubscribe = resources.onChange(listener);

    resources.add('wood', 4);
    expect(listener).toHaveBeenLastCalledWith({ wood: 104, stone: 50, food: 25, faith: 0, renown: 0 });

    unsubscribe();
    resources.add('stone', 3);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
