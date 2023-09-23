import { BaseURLDataState, DataState } from '@/contexts/providers/GlobalProvider/types';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetState } from '@/contexts/types';
import { KanbanDataItemType } from '@/data/kanan/types';
import { ActionEventArgs } from '@syncfusion/ej2-react-kanban/index';
import onRemoveKanban from './onRemoveKanban';
import onUpdateKanban from './onUpdateKanban';

export default async function onActionCompleteKanban({setInfo, baseURL, setGlobalData, changedRecords, requestType, deletedRecords}:onActionCompleteKanbanPropsType):Promise<void> {
  // console.log('action kanban', props);
  


  if (requestType === "cardChanged") {
    const data = changedRecords as Array<KanbanDataItemType>;
    console.log('changed', data);
    
    onUpdateKanban({data, baseURL, setInfo, setGlobalData})
    return;
  };

  if (requestType === "cardRemoved") {
    const data = deletedRecords as Array<KanbanDataItemType>;
    console.log('deleted', data);
    
    onRemoveKanban({ data, setInfo, baseURL, setGlobalData });
    return;
  };
  
};

export type onActionCompleteKanbanPropsType = {
  setInfo:SetState<Info>, 
  setGlobalData: SetState<DataState>,
} & ActionEventArgs & BaseURLDataState;

export type onActionCompleteKanbanType = (props:ActionEventArgs) => Promise<void>;