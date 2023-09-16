import { SeriesModel } from '@syncfusion/ej2-react-charts/index';
import { GridColumnModel } from '@syncfusion/ej2-react-grids/index';
import { StaticImageData } from 'next/image';
import { ReactElement } from 'react';

export type nullish = null | undefined;

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
}

export type CustomersDataType = Array<CustomersDataItemType>

export type OrdersDataType = Array<{
  OrderID: number,
  CustomerName: string,
  TotalAmount: number,
  OrderItems: string,
  Location: string,
  Status: string,
  StatusBg: string,
  ProductImage: StaticImageData | string,
}>

export type EmployeesDataType = Array<{
    EmployeeID: number,
    Name: string,
    Title: string,
    HireDate: string,
    Country: string,
    ReportsTo: string,
    EmployeeImage: StaticImageData | string
}>

// -----------------------------------------------------
// schedule types
export type ScheduleDataItemType = {
  Id: number,
  Subject: string,
  Location: string,
  StartTime: string,
  EndTime: string,
  CategoryColor: string,
};

export type ScheduleDataType = Array<ScheduleDataItemType>;


// -----------------------------------------------------
// Global States
export type CustomerState = {grid: GridType, data: CustomersDataType}
export type OrderState = {grid: GridType, data: OrdersDataType}
export type EmployeeState = {grid: GridType, data: EmployeesDataType}

export type DataState = {
  customers: CustomerState,
  orders: OrderState,
  employees: EmployeeState,
  finances: {
    earning: EarningDataType,
    revenueReport: RevenueReport,
  },
  schedule: {data: ScheduleDataType}
};