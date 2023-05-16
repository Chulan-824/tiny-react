export type Flags = number;

export const NoFlags = 0b0000000;
export const Placement = 0b0000001;
export const Update = 0b0000010;
export const ChildDeletion = 0b0000100;

export const PassiveEffect = 0b0001000; // 当前 fiber 上存在本次更新存在副作用 (具体什么副作用根据 hookEffectTags 里的类型判断)

export const MutationMask = Placement | Update | ChildDeletion;

export const PassiveMask = PassiveEffect | ChildDeletion;
