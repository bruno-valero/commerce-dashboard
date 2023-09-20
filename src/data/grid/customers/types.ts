import { RegisteredDomains } from '@/app/functions/insertRegisteredDomains';
import { StaticImageData } from 'next/image';


export type CustomersDataItemType = {
  Id: number,
  Name: string,
  Email: string,
  Image: StaticImageData | string,
  ProjectName: string,
  Status: 'pendente' | 'completo' | 'ativo' | 'cancelado',
  StatusBg: string,
  Weeks: string,
  Budget: number,
  Location: string,
} & RegisteredDomains;

export type CustomersDataType = Array<CustomersDataItemType>