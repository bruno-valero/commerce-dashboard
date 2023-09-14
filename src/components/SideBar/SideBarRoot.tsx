'use client'

import { ReactNode } from 'react';

interface SideBarRootProps {
  children: ReactNode
}

export default function SideBarRoot({ children }:SideBarRootProps) {
  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-[10rem]'>
      {children}
    </div>
  );
};
