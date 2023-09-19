
// -----------------------------------------------------

import { Dispatch, SetStateAction } from 'react';

// SetVariabels Types
export type SetState<T> = Dispatch<SetStateAction<T>>;
export type UseState<T> = [T, SetState<T>];
export type SetBoolean = SetState<boolean>;
export type SetNumber = SetState<number>;
export type SetString = SetState<string>;