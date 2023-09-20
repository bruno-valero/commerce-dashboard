import { RegisteredDomains } from '@/app/functions/insertRegisteredDomains';
import { StaticImageData } from 'next/image';



export type OrdersDataItemType = {
  Id: number,
  CustomerName: string,
  TotalAmount: number,
  Name: string,
  Location: string,
  Status: 'pendente' | 'completo' | 'ativo' | 'cancelado' | 'rejeitado' ,
  StatusBg: string,
  Image: StaticImageData | string,
} & RegisteredDomains;

export type OrdersDataType = Array<OrdersDataItemType>;