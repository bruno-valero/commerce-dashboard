import { nullish, Obj } from '@/common.types';
import { DataState } from '@/contexts/providers/GlobalProvider/types';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetState } from '@/contexts/types';
import { customersData } from '@/data/grid/customers/data';
import { employeesData } from '@/data/grid/employees/data';
import { ordersData } from '@/data/grid/oders/data';
import { GridsDataItemTypes } from '@/data/grid/types';
import fetchAuthJson from '@/dataFetching/fetchAuthJson';
import { FetchAuthInit } from '@/dataFetching/types';
import createObjectArray from '@/utils/CRUD/createObjectArray';
import deleteObjectArray from '@/utils/CRUD/deleteObjectArray';
import updateObjectArray from '@/utils/CRUD/updateObjectArray';
import isObjectKeysNullish from '@/utils/objects/isObjectKeysNullish';
import { ActionEventArgs } from '@syncfusion/ej2-react-grids/index';
import { ResponseCustomersCreate, ResponseCustomersCreateOk } from '../api/customers/create/route';
import { ResponseCustomersRemove, ResponseCustomersRemoveOk } from '../api/customers/remove/route';
import { ResponseCustomersUpdate, ResponseCustomersUpdateOk } from '../api/customers/update/route';
import { ResponseEmployeesCreate, ResponseEmployeesCreateOk } from '../api/employees/create/route';
import { ResponseEmployeesRemove, ResponseEmployeesRemoveOk } from '../api/employees/remove/route';
import { ResponseEmployeesUpdate, ResponseEmployeesUpdateOk } from '../api/employees/update/route';
import { ResponseOrdersCreate, ResponseOrdersCreateOk } from '../api/orders/create/route';
import { ResponseOrdersRemove, ResponseOrdersRemoveOk } from '../api/orders/remove/route';
import { ResponseOrdersUpdate, ResponseOrdersUpdateOk } from '../api/orders/update/route';
import { RequestError } from '../api/types';
import insertRegisteredDomains, { InsertRegisteredDomainsReturnType } from './insertRegisteredDomains';

type ValidDomainProsType = { 
  data: GridsDataItemTypes & {registeredDomains: Array<string>},
  setNotRegisteredDomain: SetState<boolean>
 };

function validDomain({ data, setNotRegisteredDomain }:ValidDomainProsType):boolean{
  const registeredDomains = data.registeredDomains ?? [];
  if (registeredDomains.length === 0) {
    setNotRegisteredDomain(false);
    return true;
  };
  console.log('registeredDomains on validDomain', registeredDomains);
  
  if (typeof data['Image'] === 'string') {

    const currentDomain:string = (data['Image'] as string)?.split('//')?.[1]?.split('/')?.[0] ?? '';
    console.log('data on validDomain', data);
    console.log('currentDomain on validDomain', currentDomain);
    console.log('registeredDomains on validDomain', registeredDomains);
    
    
    if (registeredDomains.includes(currentDomain)){
      setNotRegisteredDomain(false);
      return true;
    };
    setNotRegisteredDomain(true);
    return false;
  };
  setNotRegisteredDomain(false);
  return true;
};

type GridCRUDRequestPropTypes = {
  data: GridsDataItemTypes & {registeredDomains: Array<string>},
  url: string,
  setInfo: SetState<Info>,
  gridType: 'employees' | 'orders'| 'customers',
  baseURL:string,
  setGlobalData: SetState<DataState>,
  registeredDomains:string,
}

async function gridCRUDRequest ({ data, url, setInfo, gridType, baseURL, setGlobalData, registeredDomains }:GridCRUDRequestPropTypes) {
  const newData = Array.isArray(data) ? data : [data] as Array<GridsDataItemTypes>;
  // const inserted = insertRegisteredDomains(newData, registeredDomains) as InsertRegisteredDomainsReturnType<GridsDataItemTypes>;
  const requestInit:FetchAuthInit = {
    data: {id:'123', user:'bruno', body:newData},
  };

  try {
    const reqType = url.split('/').slice(-1)[0];
    const reqTypes = ['create', 'update', 'remove']
    if (!reqTypes.includes(reqType)) return;

    type ResponseCreate = ResponseEmployeesCreate | ResponseOrdersCreate | ResponseCustomersCreate;
    type ResponseUpdate = ResponseEmployeesUpdate | ResponseOrdersUpdate | ResponseCustomersUpdate;
    type ResponseRemove = ResponseEmployeesRemove | ResponseOrdersRemove | ResponseCustomersRemove;

    type ResponseCreateOk = ResponseEmployeesCreateOk | ResponseOrdersCreateOk | ResponseCustomersCreateOk;
    type ResponseUpdateOk = ResponseEmployeesUpdateOk | ResponseOrdersUpdateOk | ResponseCustomersUpdateOk;
    type ResponseRemoveOk = ResponseEmployeesRemoveOk | ResponseOrdersRemoveOk | ResponseCustomersRemoveOk;
    
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
      responses.create = await fetchAuthJson({input:url, init:requestInit}) as ResponseCreate;
    };

    if ((reqTypeFiltered) === 'update') {
      responses.update = await fetchAuthJson({input:url, init:requestInit}) as ResponseUpdate;
    };

    if ((reqTypeFiltered) === 'remove') {
      responses.remove = await fetchAuthJson({input:url, init:requestInit}) as ResponseRemove;
    };

    const response  = responses[reqTypeFiltered] as ResponseCreate & ResponseUpdate & ResponseRemove | nullish;
    if (!response) return;
    const error = response as RequestError;
    if (error.error) return alert(error.error);
    const data = response as ResponseCreateOk & ResponseUpdateOk & ResponseRemoveOk;
    console.log('data', data);
    console.log('response', response);
    const texts = {
      create: `${data[reqTypeFiltered].length > 1 ? 'itens criados com sucesso!' : data[reqTypeFiltered][0].Name + ': criação bem sucedida!'}`, 
      update: `${data[reqTypeFiltered].length > 1 ? 'itens atualizados com sucesso!' : data[reqTypeFiltered][0].Name + ': atualização com sucesso!'}`, 
      remove: `${data[reqTypeFiltered].length > 1 ? 'itens removidos com sucesso!' : data[reqTypeFiltered][0].Name + ': remoção bem sucedida!'}`,
    }
    const text = texts[reqTypeFiltered];
    console.log('setando info', setInfo);
    let storageData:Array<GridsDataItemTypes> = [];
    try {
      storageData = (gridType === 'customers' ? customersData : gridType === 'employees' ? employeesData : ordersData) as Array<GridsDataItemTypes>;
    } catch(e) {
      storageData = (gridType === 'customers' ? customersData : gridType === 'employees' ? employeesData : ordersData) as Array<GridsDataItemTypes>;
    };
    console.log('storageData', storageData);
    console.log('newData', newData);
    console.log('storageData + newData', [...newData,...storageData]);
    
    if (reqTypeFiltered === 'create') {
      setGlobalData(prev => ({...prev, [gridType]:{...prev[gridType], data:[...storageData,...newData]}}));
    };

    if ((reqTypeFiltered) === 'create') {
      // const storageData = JSON.parse(localStorage.getItem(gridType) ?? `[]`)
      const change = createObjectArray(storageData, data.create);
      localStorage.setItem(gridType, JSON.stringify(change));
    };

    if ((reqTypeFiltered) === 'update') {
      // const storageData = JSON.parse(localStorage.getItem(gridType) ?? `[]`)
      const change = updateObjectArray(storageData, data.update, 'Id', 'Id');
      localStorage.setItem(gridType, JSON.stringify(change));
    };

    if ((reqTypeFiltered) === 'remove') {
      // const storageData = JSON.parse(localStorage.getItem(gridType) ?? `[]`)
      const change = deleteObjectArray(storageData, data.remove, 'Id', 'Id');
      localStorage.setItem(gridType, JSON.stringify(change));
    };
    

    setInfo(prev => ({...prev, visible: false }));
    setInfo({visible: true, text, changed: true });

  } catch(e:any) {
    console.log('houve um erro:', e.message);    
  };

};

export default async function gridActionComplete({ event, setNotRegisteredDomain, baseURL, gridType, setInfo, setGlobalData, registeredDomains }:GridActionCompletePropTypes) {
  const createURL:string = baseURL + '/api/' + gridType + '/create';
  const updateURL:string = baseURL + '/api/' + gridType + '/update';
  const deleteURL:string = baseURL + '/api/' + gridType + '/remove';

  const action:string | undefined = event.action;
  const requestType:string | undefined = event.requestType;
  if (!event.data) return;  
  const eventData = Array.isArray(event.data) ? event.data : [event.data] as Array<Obj<string, any>>;
  const inserted = insertRegisteredDomains(eventData, registeredDomains) as InsertRegisteredDomainsReturnType<GridsDataItemTypes>;
  // const data =  inserted;
  console.log('inserted', inserted);
  console.log('event', event);

  const addAction = (requestType === 'save') && (action === 'add');
  const editAction = (requestType === 'save') && (action === 'edit');
  const deleteAction = requestType === 'delete';
  if (!(addAction || editAction || deleteAction)) return;

  inserted.map(async(item) => {
    const data = {...item};
    if (isObjectKeysNullish({ obj:data })) {
      const {Id, ...dataWthoutID} = {...data};
      if (isObjectKeysNullish({ obj:dataWthoutID })) {
        // busca do local storage
        // const response = insertRegisteredDomains(JSON.parse(localStorage.getItem(gridType) ?? '[]'), registeredDomains) as InsertRegisteredDomainsReturnType<GridsDataItemTypes>;
        const response = insertRegisteredDomains((gridType === 'customers' ? customersData : gridType === 'employees' ? employeesData : ordersData) as Array<GridsDataItemTypes>, registeredDomains) as InsertRegisteredDomainsReturnType<GridsDataItemTypes>;
        setGlobalData(prev => ({...prev, [gridType]:{...prev[gridType], data:response}}));
        return alert('Insira todos os campos');
      } else 
      if ((addAction && !data['Id'])) {
        // busca do local storage
        // const response = insertRegisteredDomains(JSON.parse(localStorage.getItem(gridType) ?? '[]'), registeredDomains) as InsertRegisteredDomainsReturnType<GridsDataItemTypes>;
        const response = insertRegisteredDomains((gridType === 'customers' ? customersData : gridType === 'employees' ? employeesData : ordersData) as Array<GridsDataItemTypes>, registeredDomains) as InsertRegisteredDomainsReturnType<GridsDataItemTypes>;
        console.log('response on create grid', response);
        
        const graterID:number = Math.max(...response.map(item => item.Id));
        data['Id'] = graterID + 1;
      };
    };
  
    if (!validDomain({ data, setNotRegisteredDomain })) return  alert('Insira uma imagem válida!'); 
  
    if (addAction) {    
      gridCRUDRequest({data, url:createURL, setInfo, gridType, baseURL, setGlobalData, registeredDomains});
      return;
    };
  
    if (editAction) {
      gridCRUDRequest({data, url:updateURL, setInfo, gridType, baseURL, setGlobalData, registeredDomains});
      return;
    };
  
    if (deleteAction) {
      gridCRUDRequest({data, url:deleteURL, setInfo, gridType, baseURL, setGlobalData, registeredDomains});
      return;
    };

  });


};

export type GridActionCompletePropTypes = {
  event:ActionEventArgs,
  setNotRegisteredDomain: SetState<boolean>,
  baseURL: string,
  gridType: 'employees' | 'orders'| 'customers',
  setInfo: SetState<Info>,
  setGlobalData: SetState<DataState>,
  registeredDomains:string,
}