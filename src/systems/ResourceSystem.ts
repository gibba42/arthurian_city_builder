import { RESOURCE_TYPES, type ResourceAmounts, type ResourceCost, type ResourceType } from '../types/Resource';

export class ResourceSystem {
  private readonly amounts: ResourceAmounts;
  constructor(startingAmounts: ResourceAmounts) { this.amounts = { ...startingAmounts }; }
  get(resource: ResourceType): number { return this.amounts[resource]; }
  getAll(): Readonly<ResourceAmounts> { return { ...this.amounts }; }
  canAfford(cost: ResourceCost): boolean { return RESOURCE_TYPES.every((resource) => this.amounts[resource] >= (cost[resource] ?? 0)); }
  spend(cost: ResourceCost): boolean {
    if (!this.canAfford(cost)) return false;
    RESOURCE_TYPES.forEach((resource) => { this.amounts[resource] -= cost[resource] ?? 0; });
    return true;
  }
  add(resource: ResourceType, amount: number): void { this.amounts[resource] = Math.max(0, this.amounts[resource] + amount); }
}
