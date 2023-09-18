import { BaseURLDataState } from '@/contexts/providers/GlobalProvider';
import tsUTCToDateTime from '@/utils/dateTime/tsUTCToDateTime';
import { DragEventArgs } from '@syncfusion/ej2-react-schedule/index';

export default async function onDragStartSchedule(props:DragEventArgs & BaseURLDataState):Promise<void> {
  const data = {...props.data}
  data.StartTime = tsUTCToDateTime({ts: data.StartTime});
  data.EndTime = tsUTCToDateTime({ts: data.EndTime});
  console.log('drag start', data);
  
};

export type OnDragStartScheduleType = (props:DragEventArgs) => Promise<void>;