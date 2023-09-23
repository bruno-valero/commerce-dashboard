


// -----------------------------------------------------

import { InsertRegisteredDomainsReturnType } from '@/app/functions/insertRegisteredDomains';
import { LastYearReport } from '@/app/functions/makeEaringData';
import { Envs } from '@/app/layout';
import { EarningDataType, RevenueReport, ScheduleDataType } from '@/common.types';
import { OpenTheme } from '@/components/ThemeSettings/type';
import { UseState } from '@/contexts/types';
import { CustomersDataItemType } from '@/data/grid/customers/types';
import { EmployeesDataItemType } from '@/data/grid/employees/types';
import { OrdersDataItemType } from '@/data/grid/oders/types';
import { GridType } from '@/data/grid/types';
import { KanbanDataType, KanbanGridType } from '@/data/kanan/types';

// GlobalState Fields
export type PathnameState = {pathname: string};
export type ChatState = {chat: UseState<boolean>};
export type CartState = {cart: UseState<boolean>};
export type OpenThemeState = {openTheme: UseState<OpenTheme>};
export type UserProfileState = {userProfile: UseState<boolean>};
export type NotificationState = {notification: UseState<boolean>};
export type ScreenSizeState = {screenSize: UseState<number>};
export type ActiveMenuState = {activeMenu: UseState<boolean>};
export type ContextDataState = {data: UseState<DataState>};
export type NotRegisteredDomainState = {notRegisteredDomain: UseState<boolean>}

export type GlobalContextStates = PathnameState & ChatState & CartState & OpenThemeState & UserProfileState & NotificationState & ActiveMenuState & ScreenSizeState & ContextDataState & NotRegisteredDomainState;

// -----------------------------------------------------
// Global States
export type CustomerState = {grid: GridType, data: InsertRegisteredDomainsReturnType<CustomersDataItemType>};
export type OrderState = {grid: GridType, data: InsertRegisteredDomainsReturnType<OrdersDataItemType>};
export type EmployeeState = {grid: GridType, data: InsertRegisteredDomainsReturnType<EmployeesDataItemType>};
export type FinancesState = { earning: EarningDataType, revenueReport: RevenueReport, lastYearReport:UseState<LastYearReport> };
export type ScheduleState = {data: ScheduleDataType};
export type KanbanState = {grid: KanbanGridType, data: KanbanDataType};
export type BaseURLState = string;
export type EnvsState = Envs;



export type CustomerDataState = {customers: CustomerState}
export type OrderDataState = {orders: OrderState}
export type EmployeeDataState = {employees: EmployeeState}
export type FinancesDataState = {finances: FinancesState}
export type ScheduleDataState = {schedule: ScheduleState}
export type KanbanDataState = {kanban: KanbanState}
export type BaseURLDataState = {baseURL: BaseURLState}
export type EnvsDataState = {envs: EnvsState}

export type DataState = 
CustomerDataState & 
OrderDataState & 
EmployeeDataState & 
FinancesDataState & 
ScheduleDataState & 
KanbanDataState & 
BaseURLDataState &
EnvsDataState;


export type DataToStorage = {
  customers: InsertRegisteredDomainsReturnType<CustomersDataItemType>,
  orders: InsertRegisteredDomainsReturnType<OrdersDataItemType>,
  employees: InsertRegisteredDomainsReturnType<EmployeesDataItemType>,
  kanban: KanbanDataType,
  earning: EarningDataType,
  revenueReport: RevenueReport,
  schedule: ScheduleDataType,
}

// -----------------------------------------------------
// GlobalState
export type GlobalState = GlobalContextStates;