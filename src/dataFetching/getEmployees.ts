import { InsertRegisteredDomainsReturnType } from '@/app/functions/insertRegisteredDomains';
import { EmployeesDataItemType } from '@/data/grid/employees/types';
import fetchAuthJson from './fetchAuthJson';
import { FetchAuthInit, FetchAuthInput } from './types';

export default async function getEmployees({ baseURL, init, registeredDomains }:GetEmployeesPropsType):Promise<InsertRegisteredDomainsReturnType<EmployeesDataItemType> | null> {
  const input:FetchAuthInput = baseURL + '/api/employees';
  const response = await fetchAuthJson({ input, init, registeredDomains}) as Promise<InsertRegisteredDomainsReturnType<EmployeesDataItemType> | null>;
  return response;
}

type GetEmployeesPropsType = { baseURL:string, init: FetchAuthInit, registeredDomains:string }