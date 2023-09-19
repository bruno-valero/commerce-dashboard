import { UseState } from '@/contexts/types';

export type Info = {visible:boolean, text:string, changed:boolean}

export type InfoContextStates = {
  info:UseState<Info>;
};