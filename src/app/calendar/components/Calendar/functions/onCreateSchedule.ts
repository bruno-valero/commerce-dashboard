import { ResponseCalendarCreate } from '@/app/api/calendar/create/route';
import { Info } from '@/app/calendar/page';
import { BaseURLDataState, ScheduleDataItemType } from '@/common.types';
import { SetState } from '@/contexts/providers/GlobalProvider';
import tsUTCToDateTime from '@/utils/dateTime/tsUTCToDateTime';

export default async function onCreateSchedule(props:OnCreateSchedulePropsType):Promise<void> {
  const data = props.data.map(item => {
    item.StartTime = tsUTCToDateTime({ts: item.StartTime as unknown as number});
    item.EndTime = tsUTCToDateTime({ts: item.StartTime as unknown as number});
    return item;
  });

  const baseURL:string = props.baseURL
  const updateURL:string = baseURL + '/api/calendar/create'
  
  const requestOptions:RequestInit = {
    method: 'POST',
    // headers: {'content-type': 'application/json'},
    body: JSON.stringify(data),
  };

  try {

    const response:ResponseCalendarCreate = await (await fetch(updateURL, requestOptions)).json();
    if (!response) return;
    console.log('response', response);
    
    const oneItem = response.create.length === 1;
    const subject = !oneItem ? 'Itens' : response.create[0].Subject;
    const text = !oneItem ? `${subject} criados com sucesso!` : `${subject} criado com sucesso!`;
    props.setInfo(prev => ({...prev, visible: false }));
    props.setInfo({visible: true, text, changed: true });

  } catch(e:any) {
    console.log('houve um erro:', e.message);    
  }
  
};


export type OnCreateSchedulePropsType = {data: Array<ScheduleDataItemType>} & BaseURLDataState & {setInfo: SetState<Info>};
export type OnCreateScheduleType = (props:OnCreateSchedulePropsType) => Promise<void>;