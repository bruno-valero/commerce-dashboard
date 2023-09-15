'use client'

import { ReactNode } from 'react';

import { useGlobalState } from '@/contexts/GlobalContext';
import tsToMask from '@/utils/dateTime/tsToMask';
import { Agenda, Day, DragAndDrop, Inject, Month, Resize, ScheduleComponent, Week, WorkWeek } from '@syncfusion/ej2-react-schedule';

interface CalendarComponentProps {
  children?: ReactNode
}

export default function CalendarComponent({ children }:CalendarComponentProps) {
  const globalState = useGlobalState();
  const [globalData,] = globalState.data;
  const schedule = globalData.schedule;

  console.log(tsToMask({format:['day', 'month', 'year'], seps: ['/','*']}));
  
  return (
    <ScheduleComponent
    height='650px'
    eventSettings={{dataSource: schedule.data}}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
    </ScheduleComponent>
  );
};
