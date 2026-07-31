import { RESEARCH } from '../data/research';
import type { ResearchId } from '../types/Research';
import { ResourceSystem } from './ResourceSystem';

export type ResearchResult = { ok: true } | { ok: false; reason: string };
export type ResearchChangeListener = (unlocked: ReadonlySet<ResearchId>) => void;

export class ResearchSystem {
  private readonly unlocked = new Set<ResearchId>();
  private readonly changeListeners = new Set<ResearchChangeListener>();

  constructor(private readonly resources: ResourceSystem) {}

  isUnlocked(id: ResearchId): boolean { return this.unlocked.has(id); }
  getUnlocked(): ReadonlySet<ResearchId> { return new Set(this.unlocked); }

  unlock(id: ResearchId): ResearchResult {
    const definition = RESEARCH[id];
    if (this.isUnlocked(id)) return { ok: false, reason: `${definition.name} is already known.` };
    const missing = definition.prerequisites.find((prerequisite) => !this.isUnlocked(prerequisite));
    if (missing) return { ok: false, reason: `${RESEARCH[missing].name} is required first.` };
    if (!this.resources.spend(definition.cost)) return { ok: false, reason: `Not enough faith for ${definition.name}.` };
    this.unlocked.add(id);
    this.notifyChange();
    return { ok: true };
  }

  onChange(listener: ResearchChangeListener): () => void {
    this.changeListeners.add(listener);
    return () => this.changeListeners.delete(listener);
  }

  private notifyChange(): void {
    const unlocked = this.getUnlocked();
    this.changeListeners.forEach((listener) => listener(unlocked));
  }
}
