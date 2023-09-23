import { ResponseCalendarCreate, ResponseCalendarCreateOk } from '@/app/api/calendar/create/route';
import { RequestError } from '@/app/api/types';
import { ScheduleDataItemType } from '@/common.types';
import { BaseURLDataState, DataState } from '@/contexts/providers/GlobalProvider/types';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetState } from '@/contexts/types';
import { scheduleData } from '@/data/dummyTSX';
import fetchAuthJson from '@/dataFetching/fetchAuthJson';
import getSchedule from '@/dataFetching/getSchedule';
import { FetchAuthInit } from '@/dataFetching/types';
import createObjectArray from '@/utils/CRUD/createObjectArray';
import tsUTCToDateTime from '@/utils/dateTime/tsUTCToDateTime';

export default async function onCreateSchedule({data, setInfo, baseURL, setGlobalData}:OnCreateSchedulePropsType):Promise<void> {
  const newData = data.map(item => {
    item.StartTime = tsUTCToDateTime({ts: item.StartTime as unknown as number});
    item.EndTime = tsUTCToDateTime({ts: item.StartTime as unknown as number});
    return item;
  });

  const updateURL:string = baseURL + '/api/calendar/create'
  
  const requestInit:FetchAuthInit = {
    data: {id:'123456', user:'bruno', body:newData},
  };

  try {

    const response:ResponseCalendarCreate = await fetchAuthJson({input:updateURL, init:requestInit}) ?? {};
    if (!response) return;
    const error = response as RequestError;
    
    if (error.error) {
      const databaseData = await getSchedule({baseURL, init:requestInit}) ?? [];
      delete requestInit.data.body;
      setGlobalData(prev => ({...prev, schedule:{...prev.schedule, data: databaseData} }));
      return alert(error.error);
    };
    
    const responseData = response as ResponseCalendarCreateOk;
    console.log('responseData', responseData);
    
    const oneItem = responseData.create.length === 1;
    const subject = !oneItem ? 'Itens' : responseData.create[0].Subject;
    const text = !oneItem ? `${subject} criados com sucesso!` : `${subject} criado com sucesso!`;
    
    let storageData = [];
    try {
      storageData = JSON.parse(localStorage.getItem('schedule') ?? '[]')
    } catch(e) {
      storageData = scheduleData
    };
    const change = createObjectArray(storageData, responseData.create);
    localStorage.setItem('schedule', JSON.stringify(change));
    
    setInfo(prev => ({...prev, visible: false }));
    setInfo({visible: true, text, changed: true });

  } catch(e:any) {
    console.log('houve um erro:', e.message);    
  }
  
};


export type OnCreateSchedulePropsType = {
  data: Array<ScheduleDataItemType>,
  setGlobalData: SetState<DataState>,
  setInfo: SetState<Info>,
} & BaseURLDataState;

export type OnCreateScheduleType = (props:OnCreateSchedulePropsType) => Promise<void>;