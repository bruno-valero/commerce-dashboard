'use client'

import Image from 'next/image';
import { ReactNode } from 'react';
import ToolTipClientComponent from '../ToolTipClientComponent';

interface NavbarProfileProps {
  title: string;
  icon: ReactNode;
  color: string;
  dotColor?: string;
  customFunc: () => void;
}

export default function NavbarProfile({ title, icon, color, dotColor, customFunc }:NavbarProfileProps) {
  return (
    <ToolTipClientComponent content={title} position='BottomCenter' >
      <div onClick={customFunc} className={`${color} relative flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-300 rounded-lg`} >
        {/* {dotColor && <span className={`${dotColor} absolute inline-flex rounded-full h-[.8rem] w-[.8rem] top-2 right-2`}></span>} */}
          <Image src={'/data/avatar.jpg'} alt='perfil' width={100} height={100} className='rounded-lg w-14 h-14' />
          <p>
            <span className='text-gray-500 text-lg'>
              Olá, 
            </span> {' '}
            <span className='text-gray-500 text-lg font-bold ml-1'>
              Bruno
            </span>
          </p>
          {icon}
      </div>
    </ToolTipClientComponent>
  );
};
