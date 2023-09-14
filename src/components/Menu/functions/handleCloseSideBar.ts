import { SetBoolean } from '@/contexts/providers/GlobalProvider';

export default function handleCloseSideBar(activeMenu:boolean, setActiveMenu:SetBoolean, screenSize:number) {
  if (activeMenu && screenSize <= 900) return setActiveMenu(false);
  
};

export type HandleCloseSideBar = (activeMenu:boolean, setActiveMenu:SetBoolean, screenSize:number) => void;