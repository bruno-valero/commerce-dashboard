'use client'

import { nullish } from '@/common.types';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import GlobalContext from './GlobalContext';

import { LastYearReport } from '@/app/functions/makeEaringData';
import { Envs, FetchDataState } from '@/app/layout';
import { UseState } from '@/contexts/types';
import { customersGrid } from '@/data/grid/customers/model';
import { employeesGrid } from '@/data/grid/employees/model';
import { ordersGrid } from '@/data/grid/oders/model';
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
  
  const [data, setData] = useState<DataState>({
    customers: {grid: customersGrid, data: globalData.customers.data},
    orders: {grid: ordersGrid, data: globalData.orders.data},
    employees: {grid: employeesGrid, data: globalData.employees.data},
    finances: {
      earning: globalData.finances.earning,
      revenueReport: globalData.finances.revenueReport,
      lastYearReport: [lastYearReport, setLastYearReport],
    },
    schedule: {data: globalData.schedule.data},
    baseURL: globalData.baseURL,
    envs,
  });

  // const oi:GlobalContextStates = {
  //   pathname,
  // }

  const context:GlobalContextStates = {
    pathname,
    chat: [chat, setChat],
    cart: [cart, setCart],
    userProfile: [userProfile, setUserProfile],
    notification: [notification, setNotification],
    activeMenu: [activeMenu, setActiveMenu],
    screenSize: [screenSize, setScreenSize],
    data: [data, setData],
    notRegisteredDomain: [notRegisteredDomain, setNotRegisteredDomain],
  } as GlobalContextStates;
  return (
    <GlobalContext.Provider value={context}>
      {children}
    </GlobalContext.Provider>
  );
};

