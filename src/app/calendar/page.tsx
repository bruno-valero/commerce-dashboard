'use client'

import Header from '@/components/Header';
import { ReactNode, useState } from 'react';
import CalendarComponent from './components/Calendar/index';
import InfoCalendar from './components/InfoCalendar/index';

interface CalendarProps {
  children?: ReactNode
}

export default function Calendar() {
  const [info, setInfo] = useState<Info>({visible:false, text:'', changed: false});
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 dark:bg-blue-900 bg-white rounded-3xl relative'>
      
      <Header category='página' title='Calendário' />
      <InfoCalendar visible={info.visible} text={info.text} changed={info.changed} setInfo={setInfo} />
      <CalendarComponent setInfo={setInfo} />
      
    </div>
  );
};

export type Info = {visible:boolean, text:string, changed:boolean}
