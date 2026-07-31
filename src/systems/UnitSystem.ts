import { UNITS } from '../data/units';
import type { UnitType } from '../types/Unit';
import { ResearchSystem } from './ResearchSystem';

export const SACRED_SMITHING_KNIGHT_ATTACK_BONUS = 2;

export class UnitSystem {
  constructor(private readonly research: ResearchSystem) {}

  getAttack(type: UnitType): number {
    const researchBonus = type === 'knight' && this.research.isUnlocked('sacredSmithing')
      ? SACRED_SMITHING_KNIGHT_ATTACK_BONUS
      : 0;
    return UNITS[type].attack + researchBonus;
  }
}
