import { InsertRegisteredDomainsReturnType } from '@/app/functions/insertRegisteredDomains';
import { OrdersDataItemType } from '@/data/grid/oders/types';
import fetchAuthJson from './fetchAuthJson';
import { FetchAuthInit, FetchAuthInput } from './types';

export default async function getOrders({ baseURL, init, registeredDomains }:GetOrdersPropsType):Promise<InsertRegisteredDomainsReturnType<OrdersDataItemType> | null> {
  const input:FetchAuthInput = baseURL + '/api/orders';
  const response = await fetchAuthJson({ input, init, registeredDomains}) as Promise<InsertRegisteredDomainsReturnType<OrdersDataItemType> | null>;
  return response;
}

type GetOrdersPropsType = { baseURL:string, init: FetchAuthInit, registeredDomains:string }