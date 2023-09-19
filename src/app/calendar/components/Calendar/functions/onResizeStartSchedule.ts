import { BaseURLDataState } from '@/contexts/providers/GlobalProvider/types';
import tsUTCToDateTime from '@/utils/dateTime/tsUTCToDateTime';
import { ResizeEventArgs } from '@syncfusion/ej2-react-schedule/index';

export default async function onResizeStartSchedule(props:ResizeEventArgs & BaseURLDataState):Promise<void> {
  const data = {...props.data}
  data.StartTime = tsUTCToDateTime({ts: data.StartTime});
  data.EndTime = tsUTCToDateTime({ts: data.EndTime});
  console.log('resize start', data);
  
};

export type OnResizeStartScheduleType = (props:ResizeEventArgs) => Promise<void>;