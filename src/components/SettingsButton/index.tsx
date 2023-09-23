'use client'

import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { FiSettings } from 'react-icons/fi';
import ToolTipClientComponent from '../ToolTipClientComponent';

interface SettingsButtonProps {
  
}

export default function SettingsButton({  }:SettingsButtonProps) {
  const globalState = useGlobalState();
  const [openTheme, setOpenTheme ] = globalState.openTheme;

  return (
    <ToolTipClientComponent content='Opções' position='TopCenter' >
      <button 
      type='button' 
      style={{backgroundColor:openTheme.currentColor}}
      className={`text-3xl p-3 hover:drop-shadow-xl hover:bg-gray-300 text-white rounded-[50%]`}
      onClick={() => setOpenTheme(prev => ({...prev, open:true}))}
      >
        <FiSettings />        
      </button>
    </ToolTipClientComponent>
  );
};
