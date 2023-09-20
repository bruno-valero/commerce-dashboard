'use client'

import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { ActionEventArgs, Agenda, Day, DragAndDrop, Inject, Month, MonthAgenda, Resize, ScheduleComponent, ViewDirective, ViewsDirective, Week, WorkWeek } from '@syncfusion/ej2-react-schedule';

import { useInfoState } from '@/contexts/providers/InfoProvider/InfoContext';
import { L10n, loadCldr } from '@syncfusion/ej2-base';
import pt from '@syncfusion/ej2-locale/src/pt.json';
import gregorian from 'cldr-data/main/pt/ca-gregorian.json';
import numbers from 'cldr-data/main/pt/numbers.json';
import timeZoneNames from 'cldr-data/main/pt/timeZoneNames.json';
import numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import onActionSchedule from './functions/onActionSchedule';

loadCldr(
  numberingSystems,
  gregorian,
  numbers,
  timeZoneNames,
);

pt.pt.schedule.save = 'Salvar';
pt.pt.schedule.saveButton = 'Salvar';
L10n.load(JSON.parse(JSON.stringify(pt)));

interface CalendarComponentProps {
}

export default function CalendarComponent({  }:CalendarComponentProps) {
  const globalState = useGlobalState();
  const [globalData, setGlobalData] = globalState.data;
  const schedule = globalData.schedule;
  const baseURL = globalData.baseURL; 

  const infoState = useInfoState();
  const [, setInfo] =  infoState.info;
  
  
  return (
    <ScheduleComponent
    height='650px'
    eventSettings={{dataSource: schedule.data}}    
    selectedDate={new Date(2021, 0, 10)}
    locale='pt'
    // dragStart={(event) => onDragStartSchedule({...event, baseURL})}
    // dragStop={(event) => onDragStopSchedule({...event, baseURL, setInfo})}
    // resizeStart={(event) => onResizeStartSchedule({...event, baseURL})}
    // resizeStop={(event) => onResizeStopSchedule({...event, baseURL, setInfo})}
    actionComplete={(event:ActionEventArgs) => onActionSchedule({...event, baseURL, setInfo, setGlobalData})}
    >
      <ViewsDirective>
        <ViewDirective option='Day' displayName='Dia' />
        <ViewDirective option='Week' isSelected />
        <ViewDirective option='WorkWeek' />
        <ViewDirective option='Month' />
        <ViewDirective option='MonthAgenda' />
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, MonthAgenda]} />
    </ScheduleComponent>
  );
};
