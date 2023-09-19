import { createContext, useContext } from 'react';
import { GlobalState } from './types';

const GlobalContext = createContext<Record<string, any> | {} | any>({});

export const useGlobalState:() => GlobalState = () => useContext<GlobalState>(GlobalContext);

export default GlobalContext;