import { ResponseCalendarUpdate, ResponseCalendarUpdateOk } from '@/app/api/calendar/update/route';
import { RequestError } from '@/app/api/types';
import { ScheduleDataItemType } from '@/common.types';
import { BaseURLDataState, DataState } from '@/contexts/providers/GlobalProvider/types';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetState } from '@/contexts/types';
import fetchAuthJson from '@/dataFetching/fetchAuthJson';
import getSchedule from '@/dataFetching/getSchedule';
import { FetchAuthInit } from '@/dataFetching/types';
import tsUTCToDateTime from '@/utils/dateTime/tsUTCToDateTime';

export default async function onUpdateSchedule({data, setInfo, baseURL, setGlobalData}:OnUpdateSchedulePropsType):Promise<void> {
  const newData = data.map(item => {
    item.StartTime = tsUTCToDateTime({ts: item.StartTime as unknown as number});
    item.EndTime = tsUTCToDateTime({ts: item.StartTime as unknown as number});
    return item;
  });

  const updateURL:string = baseURL + '/api/calendar/update'
  
  const requestInit:FetchAuthInit = {
    data: {id:'123456', user:'bruno', body:newData},
  };

  try {

    const response:ResponseCalendarUpdate = await fetchAuthJson({input:updateURL, init:requestInit});
    if (!response) return;
    const error = response as RequestError;
    
    if (error.error) {
      delete requestInit.data.body;
      const databaseData = await getSchedule({baseURL, init:requestInit});
      setGlobalData(prev => ({...prev, schedule:{...prev.schedule, data: databaseData} }));
      return alert(error.error);
    };
    
    const responseData = response as ResponseCalendarUpdateOk;
    console.log('responseData', responseData);
    
    const oneItem = responseData.update.length === 1;
    const subject = !oneItem ? 'Itens' : responseData.update[0].Subject;
    const text = !oneItem ? `${subject} alterados com sucesso!` : `${subject} alterado com sucesso!`
    setInfo(prev => ({...prev, visible: false }));
    setInfo({visible: true, text, changed: true });
    
  } catch(e:any) {
    console.log('houve um erro:', e.message);    
  }
  
};

export type OnUpdateSchedulePropsType = {
  data: Array<ScheduleDataItemType>, 
  setInfo: SetState<Info>, 
  setGlobalData: SetState<DataState>
} & BaseURLDataState;
export type OnUpdateScheduleType = (props:OnUpdateSchedulePropsType) => Promise<void>;