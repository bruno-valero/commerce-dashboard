import { nullish } from '@/common.types';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetState } from '@/contexts/types';
import { CustomersDataItemType } from '@/data/grid/customers/types';
import { EmployeesDataItemType } from '@/data/grid/employees/types';
import { OrdersDataItemType } from '@/data/grid/oders/types';
import { ActionEventArgs } from '@syncfusion/ej2-react-grids/index';
import { ResponseCustomersCreate } from '../api/customers/create/route';
import { ResponseCustomersRemove } from '../api/customers/remove/route';
import { ResponseCustomersUpdate } from '../api/customers/update/route';
import { ResponseEmployeesCreate } from '../api/employees/create/route';
import { ResponseEmployeesRemove } from '../api/employees/remove/route';
import { ResponseEmployeesUpdate } from '../api/employees/update/route';
import { ResponseOrdersCreate } from '../api/orders/create/route';
import { ResponseOrdersRemove } from '../api/orders/remove/route';
import { ResponseOrdersUpdate } from '../api/orders/update/route';

export type GridsDataItemTypes = EmployeesDataItemType & OrdersDataItemType & CustomersDataItemType;

type ValidDomainProsType = { 
  data: GridsDataItemTypes,
  setNotRegisteredDomain: SetState<boolean>
 };

function validDomain({ data, setNotRegisteredDomain }:ValidDomainProsType):boolean{
  const registeredDomains = data.registeredDomains ?? [];
  if (typeof data['Image'] === 'string') {

    const currentDomain:string = (data['Image'] as string)?.split('//')?.[1]?.split('/')?.[0] ?? '';
    
    if (registeredDomains.includes(currentDomain)){
      setNotRegisteredDomain(false);
      return true;
    }
    setNotRegisteredDomain(true);
    return false;
  };
  setNotRegisteredDomain(false);
  return true;
};

type GridCRUDRequestPropTypes = {
  data: GridsDataItemTypes | Array<GridsDataItemTypes>,
  url: string,
  setInfo: SetState<Info>,
  gridType: 'employees' | 'orders'| 'customers',
}

async function gridCRUDRequest ({ data, url, setInfo, gridType }:GridCRUDRequestPropTypes) {
  const newData = Array.isArray(data) ? data : [data] as Array<GridsDataItemTypes>;
  const requestOptions:RequestInit = {
    method: 'POST',
    // headers: {'content-type': 'application/json'},
    body: JSON.stringify(newData),
  };

  try {
    const reqType = url.split('/').slice(-1)[0];
    const reqTypes = ['create', 'update', 'remove']
    if (!reqTypes.includes(reqType)) return;

    type ResponseCreate = ResponseEmployeesCreate | ResponseOrdersCreate | ResponseCustomersCreate;
    type ResponseUpdate = ResponseEmployeesUpdate | ResponseOrdersUpdate | ResponseCustomersUpdate;
    type ResponseRemove = ResponseEmployeesRemove | ResponseOrdersRemove | ResponseCustomersRemove;
    
    type Responses = {
      create: null | ResponseCreate, 
      update: null | ResponseUpdate, 
      remove: null | ResponseRemove,
    }

    const responses:Responses = {
      create: null, 
      update: null, 
      remove: null,
    }

    const reqTypeFiltered = reqType as 'create' | 'update' | 'remove';

    if ((reqTypeFiltered) === 'create') {
      responses.create = await (await fetch(url, requestOptions)).json() as ResponseCreate;
    };

    if ((reqTypeFiltered) === 'update') {
      responses.update = await (await fetch(url, requestOptions)).json() as ResponseUpdate;
    };

    if ((reqTypeFiltered) === 'remove') {
      responses.remove = await (await fetch(url, requestOptions)).json() as ResponseRemove;
    };

    const response  = responses[reqTypeFiltered] as ResponseCreate & ResponseUpdate & ResponseRemove | nullish;

    if (!response) return;
    console.log('response', response);
    const texts = {
      create: `${response[reqTypeFiltered].length > 1 ? 'itens criados com sucesso!' : response[reqTypeFiltered][0].Name + ': criação bem sucedida!'}`, 
      update: `${response[reqTypeFiltered].length > 1 ? 'itens atualizados com sucesso!' : response[reqTypeFiltered][0].Name + ': atualização com sucesso!'}`, 
      remove: `${response[reqTypeFiltered].length > 1 ? 'itens removidos com sucesso!' : response[reqTypeFiltered][0].Name + ': remoção bem sucedida!'}`,
    }
    const text = texts[reqTypeFiltered] ;
    console.log('setando info', setInfo);
    
    setInfo(prev => ({...prev, visible: false }));
    setInfo({visible: true, text, changed: true });

  } catch(e:any) {
    console.log('houve um erro:', e.message);    
  };

};

export default async function gridActionComplete({ event, setNotRegisteredDomain, baseURL, gridType, setInfo }:GridActionCompletePropTypes) {
  const createURL:string = baseURL + '/api/' + gridType + '/create';
  const updateURL:string = baseURL + '/api/' + gridType + '/update';
  const deleteURL:string = baseURL + '/api/' + gridType + '/remove';

  const action:string | undefined = event.action;
  const requestType:string | undefined = event.requestType;
  const data:GridsDataItemTypes | Array<GridsDataItemTypes> | undefined = event.data as GridsDataItemTypes | undefined;
  console.log('data', data);
  console.log('event', event);
  
  if (!data) return;
  
  const isValidDomain = validDomain({ data, setNotRegisteredDomain });
  if (!isValidDomain){    
    alert('Insira uma imagem válida!');
    return;
  };

  if ((requestType === 'save') && (action === 'add')) {    
    gridCRUDRequest({data, url:createURL, setInfo, gridType});
    return;
  };

  if ((requestType === 'save') && (action === 'edit')) {
    gridCRUDRequest({data, url:updateURL, setInfo, gridType});
    return;
  };

  if (requestType === 'delete') {
    gridCRUDRequest({data, url:deleteURL, setInfo, gridType});
    return;
  };

};

export type GridActionCompletePropTypes = {
  event:ActionEventArgs,
  setNotRegisteredDomain: SetState<boolean>,
  baseURL: string,
  gridType: 'employees' | 'orders'| 'customers',
  setInfo: SetState<Info>,
}