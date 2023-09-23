import { ResponseKanbanRemove, ResponseKanbanRemoveOk } from '@/app/api/kanban/remove/route';
import { RequestError } from '@/app/api/types';
import { BaseURLDataState, DataState } from '@/contexts/providers/GlobalProvider/types';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetState } from '@/contexts/types';
import { kanbanData } from '@/data/kanan/data';
import { KanbanDataItemType } from '@/data/kanan/types';
import fetchAuthJson from '@/dataFetching/fetchAuthJson';
import getKanban from '@/dataFetching/getKanban';
import { FetchAuthInit } from '@/dataFetching/types';
import deleteObjectArray from '@/utils/CRUD/deleteObjectArray';

export default async function onRemoveKanban({data, setInfo, baseURL, setGlobalData}:OnRemoveKanbanPropsType):Promise<void> {
  const newData = data;

  const updateURL:string = baseURL + '/api/kanban/remove'
  
  const requestInit:FetchAuthInit = {
    data: {id:'123456', user:'bruno', body:newData},
  };

  try {

    const response:ResponseKanbanRemove = await fetchAuthJson({input:updateURL, init:requestInit});
    if (!response) return;
    const error = response as RequestError;

    if (error.error) {
      delete requestInit.data.body;
      const databaseData = await getKanban({baseURL, init:requestInit});
      setGlobalData(prev => ({...prev, kanban:{...prev.kanban, data: databaseData} }));
      return alert(error.error);
    };
    
    const responseData = response as ResponseKanbanRemoveOk;
    console.log('responseData', responseData);
    
    const oneItem = responseData.remove.length === 1;
    const title = !oneItem ? 'Itens' : responseData.remove[0].Title;
    const text = !oneItem ? `${title} removidos com sucesso!` : `${title} removido com sucesso!`;

    let storageData = [];
    try {
      storageData = JSON.parse(localStorage.getItem('kanban') ?? `[]`);
    } catch(e) {
      storageData = kanbanData;
    };
    const change = deleteObjectArray(storageData, responseData.remove, 'Id', 'Id');
    localStorage.setItem('kanban', JSON.stringify(change));

    setInfo(prev => ({...prev, visible: false }));
    setInfo({visible: true, text, changed: true });

  } catch(e:any) {
    console.log('houve um erro:', e.message);    
  }
  
};


export type OnRemoveKanbanPropsType = {
  data: Array<KanbanDataItemType>,
  setGlobalData: SetState<DataState>,
  setInfo: SetState<Info>
} & BaseURLDataState;

export type OnRemoveKanbanType = (props:OnRemoveKanbanPropsType) => Promise<void>;