import { ResponseCalendarUpdate } from '@/app/api/calendar/update/route';
import { Info } from '@/app/calendar/page';
import { BaseURLDataState } from '@/common.types';
import { SetState } from '@/contexts/providers/GlobalProvider';
import tsUTCToDateTime from '@/utils/dateTime/tsUTCToDateTime';
import { ResizeEventArgs } from '@syncfusion/ej2-react-schedule/index';

export default async function onResizeStopSchedule(props:ResizeEventArgs & BaseURLDataState & {setInfo: SetState<Info>}):Promise<void> {
  const data = {...props.data}
  data.StartTime = tsUTCToDateTime({ts: data.StartTime});
  data.EndTime = tsUTCToDateTime({ts: data.EndTime});
  // console.log('resize stop', data);

  const baseURL:string = props.baseURL
  const updateURL:string = baseURL + '/api/calendar/update'
  
  const requestOptions:RequestInit = {
    method: 'POST',
    // headers: {'content-type': 'application/json'},
    body: JSON.stringify([data]),
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

export type OnResizeStopScheduleType = (props:ResizeEventArgs) => Promise<void>;