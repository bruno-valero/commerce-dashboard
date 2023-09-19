import { SetBoolean } from '@/contexts/types';


export default function handleCloseSideBar(activeMenu:boolean, setActiveMenu:SetBoolean, screenSize:number) {
  if (activeMenu && screenSize <= 900) return setActiveMenu(false);
  
};

export type HandleCloseSideBar = (activeMenu:boolean, setActiveMenu:SetBoolean, screenSize:number) => void;