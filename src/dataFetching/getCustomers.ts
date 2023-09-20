import { InsertRegisteredDomainsReturnType } from '@/app/functions/insertRegisteredDomains';
import { CustomersDataItemType } from '@/data/grid/customers/types';
import fetchAuthJson from './fetchAuthJson';
import { FetchAuthInit, FetchAuthInput } from './types';

export default async function getCustomers({ baseURL, init, registeredDomains }:GetCustomersPropsType):Promise<InsertRegisteredDomainsReturnType<CustomersDataItemType>> {
  const input:FetchAuthInput = baseURL + '/api/customers';
  const response = await fetchAuthJson({ input, init, registeredDomains}) as Promise<InsertRegisteredDomainsReturnType<CustomersDataItemType>>;
  return response;
};

type GetCustomersPropsType = { baseURL:string, init: FetchAuthInit, registeredDomains:string }