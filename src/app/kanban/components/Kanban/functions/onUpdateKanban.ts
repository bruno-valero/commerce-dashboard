import { ResponseKanbanUpdate, ResponseKanbanUpdateOk } from '@/app/api/kanban/update/route';
import { RequestError } from '@/app/api/types';
import { BaseURLDataState, DataState } from '@/contexts/providers/GlobalProvider/types';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetState } from '@/contexts/types';
import { kanbanData } from '@/data/kanan/data';
import { KanbanDataItemType } from '@/data/kanan/types';
import fetchAuthJson from '@/dataFetching/fetchAuthJson';
import getSchedule from '@/dataFetching/getSchedule';
import { FetchAuthInit } from '@/dataFetching/types';
import updateObjectArray from '@/utils/CRUD/updateObjectArray';

export default async function onUpdateKanban({data, setInfo, baseURL, setGlobalData}:OnUpdateKanbanPropsType):Promise<void> {
  const newData = data;

  const updateURL:string = baseURL + '/api/kanban/update'
  
  const requestInit:FetchAuthInit = {
    data: {id:'123456', user:'bruno', body:newData},
  };

  try {

    const response:ResponseKanbanUpdate = await fetchAuthJson({input:updateURL, init:requestInit}) ?? {};
    if (!response) return;
    const error = response as RequestError;
    
    if (error.error) {
      delete requestInit.data.body;
      const databaseData = await getSchedule({baseURL, init:requestInit}) ?? [];
      setGlobalData(prev => ({...prev, schedule:{...prev.schedule, data: databaseData} }));
      return alert(error.error);
    };
    
    const responseData = response as ResponseKanbanUpdateOk;
    console.log('responseData', responseData);
    
    const oneItem = responseData.update.length === 1;
    const title = !oneItem ? 'Itens' : responseData.update[0].Title;
    const text = !oneItem ? `${title} alterados com sucesso!` : `${title} alterado com sucesso!`
    
    let storageData = [];
    try {
      storageData = JSON.parse(localStorage.getItem('kanban') ?? '[]')
    } catch(e) {
      storageData = kanbanData;
    };
    const change = updateObjectArray(storageData, responseData.update, 'Id', 'Id');
    localStorage.setItem('kanban', JSON.stringify(change));

    setInfo(prev => ({...prev, visible: false }));
    setInfo({visible: true, text, changed: true });
    
  } catch(e:any) {
    console.log('houve um erro:', e.message);    
  }
  
};

export type OnUpdateKanbanPropsType = {
  data: Array<KanbanDataItemType>, 
  setInfo: SetState<Info>, 
  setGlobalData: SetState<DataState>
} & BaseURLDataState;
export type OnUpdateKanbanType = (props:OnUpdateKanbanPropsType) => Promise<void>;