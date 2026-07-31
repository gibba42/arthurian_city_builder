import { describe, expect, it } from 'vitest';
import { ResourceSystem } from './ResourceSystem';
import { ResearchSystem } from './ResearchSystem';
import { UnitSystem } from './UnitSystem';

const createSystems = (faith: number) => {
  const resources = new ResourceSystem({ wood: 0, stone: 0, food: 0, faith, renown: 0 });
  const research = new ResearchSystem(resources);
  return { resources, research, units: new UnitSystem(research) };
};

describe('ResearchSystem', () => {
  it('spends faith to unlock research', () => {
    const { resources, research } = createSystems(10);
    expect(research.unlock('monasticRecords')).toEqual({ ok: true });
    expect(research.isUnlocked('monasticRecords')).toBe(true);
    expect(resources.get('faith')).toBe(0);
  });

  it('enforces prerequisites without spending faith', () => {
    const { resources, research } = createSystems(30);
    expect(research.unlock('sacredSmithing')).toEqual({ ok: false, reason: 'Monastic Records is required first.' });
    expect(resources.get('faith')).toBe(30);
  });

  it('applies Sacred Smithing to knight attack', () => {
    const { research, units } = createSystems(30);
    expect(units.getAttack('knight')).toBe(5);
    research.unlock('monasticRecords');
    research.unlock('sacredSmithing');
    expect(units.getAttack('knight')).toBe(7);
  });
});
