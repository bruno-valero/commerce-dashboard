'use client'

import { CustomersDataItemType, EarningDataType, EmployeesDataItemType, GridType, nullish, OrdersDataItemType, RevenueReport, ScheduleDataType } from '@/common.types';
import { customersGrid, employeesGrid, ordersGrid } from '@/data/dummyTSX';
import { usePathname } from 'next/navigation';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import GlobalContext from '../GlobalContext';

import { InsertRegisteredDomainsReturnType } from '@/app/functions/insertRegisteredDomains';
import { Envs, FetchDataState } from '@/app/layout';
import { registerLicense } from '@syncfusion/ej2-base';

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
  
  const [data, setData] = useState<DataState>({
    customers: {grid: customersGrid, data: globalData.customers.data},
    orders: {grid: ordersGrid, data: globalData.orders.data},
    employees: {grid: employeesGrid, data: globalData.employees.data},
    finances: {
      earning: globalData.finances.earning,
      revenueReport: globalData.finances.revenueReport,
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

// -----------------------------------------------------
// GlobalState Fields
export type PathnameState = {pathname: string};
export type ChatState = {chat: UseState<boolean>};
export type CartState = {cart: UseState<boolean>};
export type UserProfileState = {userProfile: UseState<boolean>};
export type NotificationState = {notification: UseState<boolean>};
export type ScreenSizeState = {screenSize: UseState<number>};
export type ActiveMenuState = {activeMenu: UseState<boolean>};
export type ContextDataState = {data: UseState<DataState>};
export type NotRegisteredDomainState = {notRegisteredDomain: UseState<boolean>}

export type GlobalContextStates = PathnameState & ChatState & CartState & UserProfileState & NotificationState & ActiveMenuState & ScreenSizeState & ContextDataState & NotRegisteredDomainState;

// -----------------------------------------------------
// Global States
export type CustomerState = {grid: GridType, data: InsertRegisteredDomainsReturnType<CustomersDataItemType>};
export type OrderState = {grid: GridType, data: InsertRegisteredDomainsReturnType<OrdersDataItemType>};
export type EmployeeState = {grid: GridType, data: InsertRegisteredDomainsReturnType<EmployeesDataItemType>};
export type FinancesState = { earning: EarningDataType, revenueReport: RevenueReport };
export type ScheduleState = {data: ScheduleDataType};
export type BaseURLState = string;
export type EnvsState = Envs;

export type CustomerDataState = {customers: CustomerState}
export type OrderDataState = {orders: OrderState}
export type EmployeeDataState = {employees: EmployeeState}
export type FinancesDataState = {finances: FinancesState}
export type ScheduleDataState = {schedule: ScheduleState}
export type BaseURLDataState = {baseURL: BaseURLState}
export type EnvsDataState = {envs: EnvsState}

export type DataState = 
CustomerDataState & 
OrderDataState & 
EmployeeDataState & 
FinancesDataState & 
ScheduleDataState & 
BaseURLDataState &
EnvsDataState;

// -----------------------------------------------------
// SetVariabels Types
export type SetState<T> = Dispatch<SetStateAction<T>>;
export type UseState<T> = [T, SetState<T>];
export type SetBoolean = SetState<boolean>;
export type SetNumber = SetState<number>;
export type SetString = SetState<string>;

// -----------------------------------------------------
// GlobalState
export type GlobalState = GlobalContextStates;