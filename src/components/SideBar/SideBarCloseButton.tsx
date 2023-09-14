'use client'

import { MdOutlineCancel } from 'react-icons/md';
import ToolTipClientComponent from '../ToolTipClientComponent';

interface SideBarCloseButtonProps {
  prop?: any;
}

export default function SideBarCloseButton({ prop }:SideBarCloseButtonProps) {
  return (
    <div>
      <ToolTipClientComponent content='Fechar' position='BottomCenter'
      className='absolute top-4 right-4'
      >
        <button className='text-xl rounded-full p-3 hover:bg-gray-300 mt-4 block md:hidden'>
          <MdOutlineCancel />
        </button>
      </ToolTipClientComponent>
    </div>
  );
};
