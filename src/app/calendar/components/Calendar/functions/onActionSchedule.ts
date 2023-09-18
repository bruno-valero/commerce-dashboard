import { Info } from '@/app/calendar/page';
import { ScheduleDataItemType } from '@/common.types';
import { BaseURLDataState, SetState } from '@/contexts/providers/GlobalProvider';
import { ActionEventArgs } from '@syncfusion/ej2-react-schedule/index';
import onCreateSchedule from './onCreateSchedule';
import onRemoveSchedule from './onRemoveSchedule';
import onUpdateSchedule from './onUpdateSchedule';

export default async function onActionSchedule(props:ActionEventArgs & BaseURLDataState & {setInfo:SetState<Info>}):Promise<void> {
  const requestType = props.requestType;
  if (requestType === "eventChanged") {
    const data = props.changedRecords as Array<ScheduleDataItemType>;
    const baseURL = props.baseURL;
    const setInfo = props.setInfo;
    onUpdateSchedule({data, baseURL, setInfo})
    return;
  };

  if (requestType === "eventCreated") {
    const data = props.addedRecords as Array<ScheduleDataItemType>;
    const baseURL = props.baseURL;
    const setInfo = props.setInfo;
    onCreateSchedule({data, baseURL, setInfo});
    return;
  };

  if (requestType === "eventRemoved") {
    const data = props.deletedRecords as Array<ScheduleDataItemType>;
    const baseURL = props.baseURL;
    const setInfo = props.setInfo;
    onRemoveSchedule({data, baseURL, setInfo});
    return;
  };
  
};

export type OnActionScheduleType = (props:ActionEventArgs) => Promise<void>;