import { ResponseCalendarUpdate } from '@/app/api/calendar/update/route';
import { ScheduleDataItemType } from '@/common.types';
import { BaseURLDataState } from '@/contexts/providers/GlobalProvider/types';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetState } from '@/contexts/types';
import tsUTCToDateTime from '@/utils/dateTime/tsUTCToDateTime';

export default async function onUpdateSchedule(props:OnUpdateSchedulePropsType):Promise<void> {
  const data = props.data.map(item => {
    item.StartTime = tsUTCToDateTime({ts: item.StartTime as unknown as number});
    item.EndTime = tsUTCToDateTime({ts: item.StartTime as unknown as number});
    return item;
  });

  const baseURL:string = props.baseURL
  const updateURL:string = baseURL + '/api/calendar/update'
  
  const requestOptions:RequestInit = {
    method: 'POST',
    // headers: {'content-type': 'application/json'},
    body: JSON.stringify(data),
  };

  try {

    const response:ResponseCalendarUpdate = await (await fetch(updateURL, requestOptions)).json();
    if (!response) return;
    console.log('response', response);
    
    const oneItem = response.update.length === 1;
    const subject = !oneItem ? 'Itens' : response.update[0].Subject;
    const text = !oneItem ? `${subject} alterados com sucesso!` : `${subject} alterado com sucesso!`
    props.setInfo(prev => ({...prev, visible: false }));
    props.setInfo({visible: true, text, changed: true });
    
  } catch(e:any) {
    console.log('houve um erro:', e.message);    
  }
  
};

export type OnUpdateSchedulePropsType = {data: Array<ScheduleDataItemType>} & BaseURLDataState & {setInfo: SetState<Info>};
export type OnUpdateScheduleType = (props:OnUpdateSchedulePropsType) => Promise<void>;