import { ResponseCalendarRemove } from '@/app/api/calendar/remove/route';
import { Info } from '@/app/calendar/page';
import { BaseURLDataState, ScheduleDataItemType } from '@/common.types';
import { SetState } from '@/contexts/providers/GlobalProvider';
import tsUTCToDateTime from '@/utils/dateTime/tsUTCToDateTime';

export default async function onRemoveSchedule(props:OnRemoveSchedulePropsType):Promise<void> {
  const data = props.data.map(item => {
    item.StartTime = tsUTCToDateTime({ts: item.StartTime as unknown as number});
    item.EndTime = tsUTCToDateTime({ts: item.StartTime as unknown as number});
    return item;
  });

  const baseURL:string = props.baseURL
  const updateURL:string = baseURL + '/api/calendar/remove'
  
  const requestOptions:RequestInit = {
    method: 'POST',
    // headers: {'content-type': 'application/json'},
    body: JSON.stringify(data),
  };

  try {

    const response:ResponseCalendarRemove = await (await fetch(updateURL, requestOptions)).json();
    if (!response) return;
    console.log('response', response);
    
    const oneItem = response.remove.length === 1;
    const subject = !oneItem ? 'Itens' : response.remove[0].Subject;
    const text = !oneItem ? `${subject} removidos com sucesso!` : `${subject} removido com sucesso!`;
    props.setInfo(prev => ({...prev, visible: false }));
    props.setInfo({visible: true, text, changed: true });

  } catch(e:any) {
    console.log('houve um erro:', e.message);    
  }
  
};


export type OnRemoveSchedulePropsType = {data: Array<ScheduleDataItemType>} & BaseURLDataState & {setInfo: SetState<Info>};
export type OnRemoveScheduleType = (props:OnRemoveSchedulePropsType) => Promise<void>;