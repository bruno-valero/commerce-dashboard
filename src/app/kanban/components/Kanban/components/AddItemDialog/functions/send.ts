import { ResponseKanbanCreateOk } from '@/app/api/kanban/create/route';
import { DataState } from '@/contexts/providers/GlobalProvider/types';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetBoolean, SetState } from '@/contexts/types';
import { kanbanData } from '@/data/kanan/data';
import { KanbanDataItemType } from '@/data/kanan/types';
import fetchAuthJson from '@/dataFetching/fetchAuthJson';
import getKanban from '@/dataFetching/getKanban';
import { FetchAuthInit } from '@/dataFetching/types';
import createObjectArray from '@/utils/CRUD/createObjectArray';

type sendPropsType = {
  baseURL:string;
  changes:KanbanDataItemType,
  setGlobalData:SetState<DataState>,
  setChanges:SetState<KanbanDataItemType>,
  setVisible:SetBoolean,
  setOpacity:SetBoolean,
  setHidden:SetBoolean,
  setInfo:SetState<Info>
}

export default async function send({ changes, baseURL, setGlobalData, setChanges, setVisible, setOpacity, setHidden, setInfo }:sendPropsType) {

  const init:FetchAuthInit = {
    data: {id: '123456', user:'bruno'}
  };
  const newData = {
    Id: Math.max(...(await getKanban({ baseURL, init })).map(item => item.Id) as Array<number>) + 1,
    Title:changes['Title'],
    Status:changes['Status'],
    Summary:changes['Summary'],
    Type:changes['Type'] ?? 'Outros',
    Priority:changes['Priority'] ?? 'Baixa',
    Tags:changes['Tags'] ?? 'qualquer',
    Estimate:changes['Estimate'] ?? 3,
    Assignee:changes['Assignee'] ?? 'qualquer',
    RankId:changes['RankId'] ?? '1',
  };

  const createUrl = baseURL + '/api/kanban/create'
  const response:ResponseKanbanCreateOk = await fetchAuthJson({input:createUrl, init:{...init, data:{id: '123456', user:'bruno', body:[newData]}}});
  setGlobalData(prev => ({...prev, kanban:{...prev.kanban, data: [...prev.kanban.data, ...response.create]}}))
  setChanges({
    Id: 1,
    Title: '',
    Status: '',
    Summary: '',
    Type: '',
    Priority: '',
    Tags: '',
    Estimate: '' as unknown as number,
    Assignee: '',
    RankId: 1,
  })
  const text = `${response.create[0].Title} criado com sucesso!`
  setVisible(false);
  setOpacity(false); 
  setHidden(true);

  let storageData = [];
    try {
      storageData = kanbanData
    } catch(e) {
      storageData = kanbanData;
    };
  const change = createObjectArray(storageData, response.create);
  localStorage.setItem('kanban', JSON.stringify(change));

  setInfo(prev => ({...prev, visible: false }));
  setInfo({visible: true, text, changed: true });
};