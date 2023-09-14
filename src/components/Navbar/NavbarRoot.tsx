'use client'

import { ReactNode } from 'react';

interface NavbarRootProps {
  children: ReactNode
}

export default function NavbarRoot({ children }:NavbarRootProps) {
  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      {children}
    </div>
  );
};
