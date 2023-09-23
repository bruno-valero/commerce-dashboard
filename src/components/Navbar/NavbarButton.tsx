'use client'

import { CSSProperties, ReactNode } from 'react';
import ToolTipClientComponent from '../ToolTipClientComponent';

interface NavbarButtonProps {
  title: string;
  icon: ReactNode;
  color?: string;
  dotColor?: string;
  customFunc: () => void;
  style?:CSSProperties;
}

export default function NavbarButton({ title, icon, color, dotColor, customFunc, style }:NavbarButtonProps) {
  return (
    <ToolTipClientComponent content={title} position='BottomCenter' className='my-auto' >
      <button type='button' onClick={customFunc} style={style} className={`${color ?? ''} relative text-xl rounded-full p-3 hover:bg-gray-600`} >
        {dotColor && <span className={`${dotColor} absolute inline-flex rounded-full h-[.8rem] w-[.8rem] top-2 right-2`} />}
          {icon}
      </button>
    </ToolTipClientComponent>
  );
};
