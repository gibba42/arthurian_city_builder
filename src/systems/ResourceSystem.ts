import { RESOURCE_TYPES, type ResourceAmounts, type ResourceCost, type ResourceType } from '../types/Resource';

export type ResourceChangeListener = (amounts: Readonly<ResourceAmounts>) => void;

export class ResourceSystem {
  private readonly amounts: ResourceAmounts;
  private readonly changeListeners = new Set<ResourceChangeListener>();

  constructor(startingAmounts: ResourceAmounts) { this.amounts = { ...startingAmounts }; }
  get(resource: ResourceType): number { return this.amounts[resource]; }
  getAll(): Readonly<ResourceAmounts> { return { ...this.amounts }; }
  canAfford(cost: ResourceCost): boolean { return RESOURCE_TYPES.every((resource) => this.amounts[resource] >= (cost[resource] ?? 0)); }
  spend(cost: ResourceCost): boolean {
    if (!this.canAfford(cost)) return false;
    let changed = false;
    RESOURCE_TYPES.forEach((resource) => {
      const amount = cost[resource] ?? 0;
      this.amounts[resource] -= amount;
      changed ||= amount !== 0;
    });
    if (changed) this.notifyChange();
    return true;
  }
  add(resource: ResourceType, amount: number): void {
    const nextAmount = Math.max(0, this.amounts[resource] + amount);
    if (nextAmount === this.amounts[resource]) return;
    this.amounts[resource] = nextAmount;
    this.notifyChange();
  }
  onChange(listener: ResourceChangeListener): () => void {
    this.changeListeners.add(listener);
    return () => this.changeListeners.delete(listener);
  }
  private notifyChange(): void {
    const amounts = this.getAll();
    this.changeListeners.forEach((listener) => listener(amounts));
  }
}
