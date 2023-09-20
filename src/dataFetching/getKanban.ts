import { KanbanDataType } from '@/data/kanan/types';
import fetchAuthJson from './fetchAuthJson';
import { FetchAuthInit, FetchAuthInput } from './types';

export default async function getKanban({ baseURL, init }:GetKanbanPropsType):Promise<KanbanDataType> {
  const input:FetchAuthInput = baseURL + '/api/kanban';
  const response:KanbanDataType = await fetchAuthJson({ input, init});
  return response;
}

type GetKanbanPropsType = { baseURL:string, init: FetchAuthInit }