'use client'

import { useGlobalState } from '@/contexts/GlobalContext';
import Link from 'next/link';
import { SiShopware } from 'react-icons/si';
import { HandleCloseSideBar } from '../Menu/functions/handleCloseSideBar';

interface SideBarLogoProps {
  href: string;
  text: string;
  handleCloseSideBar: HandleCloseSideBar;
}

export default function SideBarLogo({ href, text, handleCloseSideBar }:SideBarLogoProps) {
  const globalState = useGlobalState();
  const [activeMenu, setActiveMenu ] = globalState.activeMenu;
  const [screenSize, setScreenSize] = globalState.screenSize;

  return (
    <div onClick={() => handleCloseSideBar(activeMenu, setActiveMenu, screenSize)}>
      <Link 
      href={href}
      className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold dark:text-white text-slate-900'
      >
        <SiShopware /> 
        <span>{text}</span>
      </Link>
    </div>
  );
};
