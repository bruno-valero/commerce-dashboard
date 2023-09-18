import { CustomersDataItemType, EmployeesDataItemType, nullish, OrdersDataItemType } from '@/common.types';
import { SetState } from '@/contexts/providers/GlobalProvider';
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
import { Info } from '../calendar/page';

export type GridsDataItemTypes = EmployeesDataItemType & OrdersDataItemType & CustomersDataItemType;

type ValidDomainProsType = { 
  data: GridsDataItemTypes,
  imagePath: 'ProductImage' | 'CustomerImage'| 'EmployeeImage', 
  setNotRegisteredDomain: SetState<boolean>
 };

function validDomain({ data, imagePath, setNotRegisteredDomain }:ValidDomainProsType):boolean{
  const registeredDomains = data.registeredDomains ?? [];
  if (typeof data[imagePath] === 'string') {

    const currentDomain:string = (data[imagePath] as string).split('//')[1].split('/')[0];
    
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
}

async function gridCRUDRequest ({ data, url, setInfo }:GridCRUDRequestPropTypes) {
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

    if ((reqType as 'create' | 'update' | 'remove') === 'create') {
      responses.create = await (await fetch(url, requestOptions)).json() as ResponseCreate;
    };

    if ((reqType as 'create' | 'update' | 'remove') === 'update') {
      responses.update = await (await fetch(url, requestOptions)).json() as ResponseUpdate;
    };

    if ((reqType as 'create' | 'update' | 'remove') === 'remove') {
      responses.remove = await (await fetch(url, requestOptions)).json() as ResponseRemove;
    };

    const response  = responses[reqType as 'create' | 'update' | 'remove'] as ResponseCreate | ResponseUpdate |ResponseRemove | nullish;
    if (!response) return;
    console.log('response', response);
    const texts = {
      create: `item criado com sucesso!`, 
      update: `item atualizado com sucesso!`, 
      remove: `item removido com sucesso!`,
    }
    const text = texts[reqType as 'create' | 'update' | 'remove'] ;
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

  if (!data) return;
  
  const imageType = {
    employees:'EmployeeImage',
    orders:'ProductImage',
    customers:'CustomerImage',
  }

  const imagePath = imageType[gridType] as "ProductImage" | "CustomerImage" | "EmployeeImage";
  
  const isValidDomain = validDomain({ data, imagePath, setNotRegisteredDomain });
  if (!isValidDomain) return;

  if ((requestType === 'save') && (action === 'add')) {    
    gridCRUDRequest({data, url:createURL, setInfo});
    return;
  };

  if ((requestType === 'save') && (action === 'edit')) {
    gridCRUDRequest({data, url:updateURL, setInfo});
    return;
  };

  if (requestType === 'delete') {
    gridCRUDRequest({data, url:deleteURL, setInfo});
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