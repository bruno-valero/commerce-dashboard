


// -----------------------------------------------------

import { InsertRegisteredDomainsReturnType } from '@/app/functions/insertRegisteredDomains';
import { Envs } from '@/app/layout';
import { EarningDataType, RevenueReport, ScheduleDataType } from '@/common.types';
import { UseState } from '@/contexts/types';
import { CustomersDataItemType } from '@/data/grid/customers/types';
import { EmployeesDataItemType } from '@/data/grid/employees/types';
import { OrdersDataItemType } from '@/data/grid/oders/types';
import { GridType } from '@/data/grid/types';

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
// GlobalState
export type GlobalState = GlobalContextStates;