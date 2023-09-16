import Header from '@/components/Header';
import { ReactNode } from 'react';
import CalendarComponent from './components/Calendar';

interface CalendarProps {
  children?: ReactNode
}

export default async function Calendar() {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 dark:bg-blue-900 bg-white rounded-3xl'>
      
      <Header category='página' title='Calendário' />
      <CalendarComponent />
    </div>
  );
};
