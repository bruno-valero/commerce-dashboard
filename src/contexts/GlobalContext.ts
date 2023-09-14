import { createContext, useContext } from 'react';
import { GlobalState } from './providers/GlobalProvider';

const GlobalContext = createContext<Record<string, any> | {} | any>({});

export const useGlobalState:() => GlobalState = () => useContext<GlobalState>(GlobalContext);

export default GlobalContext;