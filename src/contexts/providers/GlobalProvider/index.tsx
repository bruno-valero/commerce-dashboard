'use client'

import { nullish } from '@/common.types';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import GlobalContext from './GlobalContext';

import { LastYearReport } from '@/app/functions/makeEaringData';
import { Envs, FetchDataState } from '@/app/layout';
import { OpenTheme } from '@/components/ThemeSettings/type';
import { UseState } from '@/contexts/types';
import { customersGrid } from '@/data/grid/customers/model';
import { employeesGrid } from '@/data/grid/employees/model';
import { ordersGrid } from '@/data/grid/oders/model';
import { kanbanGrid } from '@/data/kanan/model';
import { registerLicense } from '@syncfusion/ej2-base';
import { DataState, GlobalContextStates } from './types';

interface GlobalProviderProps {
  children: ReactNode;
  syncfusionRegisterLicence: string | nullish;
  globalData: FetchDataState;
  envs:Envs;
}

export default function GlobalProvider({ children, syncfusionRegisterLicence, globalData, envs }:GlobalProviderProps) {
  registerLicense(envs.syncfusionRegisterLicence);
  console.log('syncfusionRegisterLicence', envs.syncfusionRegisterLicence);
  

  const pathname:string = usePathname();
  const [chat, setChat]:UseState<boolean> = useState<boolean>(false);
  const [cart, setCart]:UseState<boolean> = useState<boolean>(false);
  const [openTheme, setOpenTheme]:UseState<OpenTheme> = useState<OpenTheme>({
    open:false,
    currentColor:'#FF5C8E',
    currentMode:'Dark',
  } as OpenTheme);
  const [userProfile, setUserProfile]:UseState<boolean> = useState<boolean>(false);
  const [notification, setNotification]:UseState<boolean> = useState<boolean>(false);
  const [activeMenu, setActiveMenu]:UseState<boolean> = useState<boolean>(true);
  const [screenSize, setScreenSize]:UseState<number> = useState<number>(300);
  const [notRegisteredDomain, setNotRegisteredDomain]:UseState<boolean> = useState<boolean>(false);
  const [lastYearReport, setLastYearReport]:UseState<LastYearReport> = useState<LastYearReport>({
    customerProfit:100000,
    ordersProfit:1800,
    ordersExpense:1480,
  });

  const dataToStorage = {
    customers: globalData.customers.data,
    orders: globalData.orders.data,
    employees: globalData.employees.data,
    kanban: globalData.kanban.data,
    earning: globalData.finances.earning,
    revenueReport: globalData.finances.revenueReport,
    schedule: globalData.schedule.data,
  };
  
  
  
  const [data, setData] = useState<DataState>({
    customers: {grid: customersGrid, data: dataToStorage.customers},
    orders: {grid: ordersGrid, data: dataToStorage.orders},
    employees: {grid: employeesGrid, data: dataToStorage.employees},
    kanban: {grid: kanbanGrid, data: dataToStorage.kanban},
    finances: {
      earning: globalData.finances.earning,
      revenueReport: dataToStorage.revenueReport,
      lastYearReport: [lastYearReport, setLastYearReport],
    },
    schedule: {data: dataToStorage.schedule},
    baseURL: globalData.baseURL,
    envs,
  });

  const context:GlobalContextStates = {
    pathname,
    chat: [chat, setChat],
    cart: [cart, setCart],
    openTheme: [openTheme, setOpenTheme],
    userProfile: [userProfile, setUserProfile],
    notification: [notification, setNotification],
    activeMenu: [activeMenu, setActiveMenu],
    screenSize: [screenSize, setScreenSize],
    data: [data, setData],
    notRegisteredDomain: [notRegisteredDomain, setNotRegisteredDomain],
  } as GlobalContextStates;

  useEffect(() => {
    // const storageData = getFromLocalStorage(dataToStorage);
    const storageData = dataToStorage;
    const color = localStorage.getItem('themeColor');
    const mode = localStorage.getItem('themeMode');

    setOpenTheme(prev => ({
      ...prev, 
      currentColor: color ?? prev.currentColor,
      currentMode: mode as "Dark" | "Light" ?? prev.currentMode,
    }));

    setData(prev => ({...prev,
      customers: {...prev.customers, data:storageData.customers},
      orders: {...prev.orders, data:storageData.orders},
      employees: {...prev.employees, data:storageData.employees},
      kanban: {...prev.kanban, data:storageData.kanban},
      schedule: {...prev.schedule, data:storageData.schedule},
      finances: {...prev.finances, revenueReport:storageData.revenueReport}
    }))
  },[]);

  return (
    <GlobalContext.Provider value={context}>
      <div className={`${openTheme.currentMode === 'Dark' ? 'dark' : ''}`}>
        {children}
      </div>
    </GlobalContext.Provider>
  );
};

