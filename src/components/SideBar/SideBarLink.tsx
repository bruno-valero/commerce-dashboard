'use client'

import { useGlobalState } from '@/contexts/GlobalContext';
import Link from 'next/link';
import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';
import { HandleCloseSideBar } from '../Menu/functions/handleCloseSideBar';

interface SideBarLinkProps {
  href: string;
  text: string;
  icon: ReactNode;
  handleCloseSideBar: HandleCloseSideBar;
}

export default function SideBarLink({ href, text, icon, handleCloseSideBar }:SideBarLinkProps) {
  const globalState = useGlobalState();
  const pathname = globalState.pathname;
  const [activeMenu, setActiveMenu ] = globalState.activeMenu;
  const [screenSize, setScreenSize] = globalState.screenSize;
  
  
  return (
    <div onClick={() => handleCloseSideBar(activeMenu, setActiveMenu, screenSize)}>
      <Link 
      href={href}
      className={twMerge(`items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold dark:text-white dark:hover:bg-gray-600 hover:bg-gray-300 hover:py-2 hover:px-2 ease-in duration-200 rounded-lg text-slate-900 pl-2 w-[85%]`, `${pathname === href ? 'dark:bg-white dark:hover:bg-gray-50 py-2 px-2 dark:text-black bg-black hover:bg-gray-100 text-white' : ''}`)}
      >
      {icon}  
      <span>
        {text}
      </span>
      </Link>
    </div>
  );
};
