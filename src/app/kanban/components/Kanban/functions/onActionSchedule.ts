import { ScheduleDataItemType } from '@/common.types';
import { BaseURLDataState, DataState } from '@/contexts/providers/GlobalProvider/types';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetState } from '@/contexts/types';
import { ActionEventArgs } from '@syncfusion/ej2-react-schedule/index';
import onCreateSchedule from './onCreateSchedule';
import onRemoveSchedule from './onRemoveSchedule';
import onUpdateSchedule from './onUpdateSchedule';

export default async function onActionSchedule({requestType, changedRecords, baseURL, setInfo, addedRecords, deletedRecords, setGlobalData}:OnActionSchedulePropsType):Promise<void> {
  


  if (requestType === "eventChanged") {
    const data = changedRecords as Array<ScheduleDataItemType>;
    onUpdateSchedule({data, baseURL, setInfo, setGlobalData})
    return;
  };

  if (requestType === "eventCreated") {
    const data = addedRecords as Array<ScheduleDataItemType>;
    onCreateSchedule({data, baseURL, setInfo, setGlobalData});
    return;
  };

  if (requestType === "eventRemoved") {
    const data = deletedRecords as Array<ScheduleDataItemType>;
    onRemoveSchedule({data, baseURL, setInfo, setGlobalData});
    return;
  };
  
};

export type OnActionSchedulePropsType = {
  setInfo:SetState<Info>, 
  setGlobalData: SetState<DataState>,
} & ActionEventArgs & BaseURLDataState;

export type OnActionScheduleType = (props:ActionEventArgs) => Promise<void>;