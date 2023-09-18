import { SeriesModel } from '@syncfusion/ej2-react-charts/index';
import { GridColumnModel } from '@syncfusion/ej2-react-grids/index';
import { StaticImageData } from 'next/image';
import { ReactElement } from 'react';
import { RegisteredDomains } from './app/functions/insertRegisteredDomains';

export type nullish = null | undefined;
export type Object<K extends string | number | symbol = string, V=any> = Record<K, V>;

export type MonthNamesShort = 'Jan' | 'Fev' | 'Mar' | 'Abr' | 'Mai' | 'Jun' | 'Jul' | 'Ago' | 'Set' | 'Out' | 'Nov' | 'Dez';
export type RevenueReportItem = {x:MonthNamesShort, y:number};
export type RevenueReport = {
  budget: Array<RevenueReportItem>,
  expense: Array<RevenueReportItem>,
};

export type EarningDataType = Array<{
  icon: ReactElement,
  amount: string,
  percentage: string,
  title: string,
  iconColor: string,
  iconBg: string,
  pcColor: string,
}>

export type SparklineAreaDataType = Array<{x:number | string, yval:number}>;

export type StackedChartDataItemType = Array<{x:string, y:number}>;

export type StackedChartDataType = Array<StackedChartDataItemType>;

export type StackedCustomSeriesType = Array<SeriesModel>;

export type GridType = Array<GridColumnModel>

export type CustomersDataItemType = {
  CustomerID: number,
  CustomerName: string,
  CustomerEmail: string,
  CustomerImage: StaticImageData | string,
  ProjectName: string,
  Status: string,
  StatusBg: string,
  Weeks: string,
  Budget: string,
  Location: string,
} & RegisteredDomains;

export type CustomersDataType = Array<CustomersDataItemType>

export type OrdersDataItemType = {
  OrderID: number,
  CustomerName: string,
  TotalAmount: number,
  OrderItems: string,
  Location: string,
  Status: 'pending' | 'complete' | 'active' | 'canceled' | 'rejected' ,
  StatusBg: string,
  ProductImage: StaticImageData | string,
} & RegisteredDomains;

export type OrdersDataType = Array<OrdersDataItemType>

export type EmployeesDataItemType = {
    EmployeeID: number,
    Name: string,
    Title: string,
    HireDate: string,
    Country: string,
    ReportsTo: string,
    EmployeeImage: StaticImageData | string
} & RegisteredDomains;

export type EmployeesDataType = Array<EmployeesDataItemType>

// -----------------------------------------------------
// schedule types
export type ScheduleDataItemType = {
  Id: number,
  Subject: string,
  StartTime: string,
  StartTimezone?: string | nullish,
  EndTime: string,
  EndTimezone?:string | nullish,
  Guid?:string,
  Description?:string,
  Location?: string,
  IsAllDay?:boolean,
  RecurrenceRule?:string,
  RecurrenceID?:number,
  IsReadonly?:boolean,
  CategoryColor?: string,
};

export type ScheduleDataType = Array<ScheduleDataItemType>;