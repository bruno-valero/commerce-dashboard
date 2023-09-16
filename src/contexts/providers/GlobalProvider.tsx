'use client'

import { DataState, nullish } from '@/common.types';
import { customersData, customersGrid, earningData, employeesData, employeesGrid, ordersData, ordersGrid, scheduleData, stackedChartData } from '@/data/dummyTSX';
import { usePathname } from 'next/navigation';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import GlobalContext from '../GlobalContext';

import { registerLicense } from '@syncfusion/ej2-base';

interface GlobalProviderProps {
  children: ReactNode;
  syncfusionRegisterLicence: string | nullish;
}

export default function GlobalProvider({ children, syncfusionRegisterLicence }:GlobalProviderProps) {
  registerLicense(syncfusionRegisterLicence as string);
  console.log('syncfusionRegisterLicence', syncfusionRegisterLicence);
  

  const pathname:string = usePathname();
  const [chat, setChat] = useState<boolean>(false);
  const [cart, setCart] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number>(300);
  
  const [data, setData] = useState<DataState>({
    customers: {grid: customersGrid, data: customersData},
    orders: {grid: ordersGrid, data: ordersData},
    employees: {grid: employeesGrid, data: employeesData},
    finances: {
      earning: earningData,
      revenueReport: stackedChartData,
    },
    schedule: {data: scheduleData},
  });

  const context:Pathname | States | ScreenSize | ContextDataState = {
    pathname,
    chat: [chat, setChat],
    cart: [cart, setCart],
    userProfile: [userProfile, setUserProfile],
    notification: [notification, setNotification],
    activeMenu: [activeMenu, setActiveMenu],
    screenSize: [screenSize, setScreenSize],
    data: [data, setData],
  }
  return (
    <GlobalContext.Provider value={context}>
      {children}
    </GlobalContext.Provider>
  );
};

// GlobalState Fields
export type Pathname = {pathname: string};
export type ScreenSize = {screenSize: [number, Dispatch<SetStateAction<number>>]};
export type States = Record<string, [boolean, Dispatch<SetStateAction<boolean>>]>;
export type ContextDataState = {data: [DataState, Dispatch<SetStateAction<DataState>>]};


// SetVariabels Types
export type SetBoolean = Dispatch<SetStateAction<boolean>>
export type SetNumber = Dispatch<SetStateAction<number>>
export type SetString = Dispatch<SetStateAction<string>>


// GlobalState
export type GlobalState = Pathname & ScreenSize & States & ContextDataState;