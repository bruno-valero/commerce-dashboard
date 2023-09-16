'use client'

import { useGlobalState } from '@/contexts/GlobalContext';
import { Agenda, Day, DragAndDrop, Inject, Month, Resize, ScheduleComponent, Week, WorkWeek } from '@syncfusion/ej2-react-schedule';

import { L10n, loadCldr } from '@syncfusion/ej2-base';
import pt from '@syncfusion/ej2-locale/src/pt.json';
import gregorian from 'cldr-data/main/pt/ca-gregorian.json';
import numbers from 'cldr-data/main/pt/numbers.json';
import timeZoneNames from 'cldr-data/main/pt/timeZoneNames.json';
import numberingSystems from 'cldr-data/supplemental/numberingSystems.json';

loadCldr(
  numberingSystems,
  gregorian,
  numbers,
  timeZoneNames,
);


L10n.load(JSON.parse(JSON.stringify(pt)));



export default function CalendarComponent() {
  const globalState = useGlobalState();
  const [globalData,] = globalState.data;
  const schedule = globalData.schedule;
  

  
  return (
    <ScheduleComponent
    height='650px'
    eventSettings={{dataSource: schedule.data}}    
    selectedDate={new Date(2021, 0, 10)}
    locale='pt'
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
    </ScheduleComponent>
  );
};
