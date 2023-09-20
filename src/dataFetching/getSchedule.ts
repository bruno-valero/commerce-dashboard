import { ScheduleDataType } from '@/common.types';
import fetchAuthJson from './fetchAuthJson';
import { FetchAuthInit, FetchAuthInput } from './types';

export default async function getSchedule({ baseURL, init }:GetSchedulePropsType):Promise<ScheduleDataType> {
  const input:FetchAuthInput = baseURL + '/api/calendar';
  const response:ScheduleDataType = await fetchAuthJson({ input, init});
  return response;
}

type GetSchedulePropsType = { baseURL:string, init: FetchAuthInit }