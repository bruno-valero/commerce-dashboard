import { createContext, useContext } from 'react';
import { InfoContextStates } from './types';

const InfoContext = createContext<Record<string, any> | {} | any>({});

export const useInfoState = ():InfoContextStates => useContext<InfoContextStates>(InfoContext);

export default InfoContext;