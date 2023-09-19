import { RegisteredDomains } from '@/app/functions/insertRegisteredDomains';
import { StaticImageData } from 'next/image';


export type EmployeesDataItemType = {
  Id: number,
  Name: string,
  Title: string,
  HireDate: string,
  Country: string,
  ReportsTo: string,
  Image: StaticImageData | string
} & RegisteredDomains;

export type EmployeesDataType = Array<EmployeesDataItemType>;