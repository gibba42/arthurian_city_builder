export const RESOURCE_TYPES = ['wood', 'stone', 'food', 'faith', 'renown'] as const;
export type ResourceType = (typeof RESOURCE_TYPES)[number];
export type ResourceAmounts = Record<ResourceType, number>;
export type ResourceCost = Partial<ResourceAmounts>;
