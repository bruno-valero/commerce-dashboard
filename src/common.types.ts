import { SeriesModel } from '@syncfusion/ej2-react-charts/index';
import { ReactElement } from 'react';

export type nullish = null | undefined;
export type Obj<K extends string | number | symbol = string, V=any> = Record<K, V>;

export type MonthNamesShort = 'Jan' | 'Fev' | 'Mar' | 'Abr' | 'Mai' | 'Jun' | 'Jul' | 'Ago' | 'Set' | 'Out' | 'Nov' | 'Dez';
export type MonthNamesLong = 'Janeiro'| 'Fevereiro'| 'Março'| 'Abril'| 'Maio'| 'Junho'| 'Julho'| 'Agosto'| 'Setembro'| 'Outubro'| 'Novembro'| 'Dezembro';
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