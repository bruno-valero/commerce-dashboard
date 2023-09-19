'use client'

import { UseState } from '@/contexts/types';
import { ReactNode, useState } from 'react';
import InfoContext from './InfoContext';
import { Info, InfoContextStates } from './types';

interface InfoProviderProps {
  children: ReactNode
}

export default function InfoProvider({ children }:InfoProviderProps) {
  const [info, setInfo]:UseState<Info> = useState<Info>({visible:false, text:'', changed: false});
  const context:InfoContextStates = {
    info:[info, setInfo],
  }
  return (
    <InfoContext.Provider value={context}>
      {children}
    </InfoContext.Provider>
  );
};
