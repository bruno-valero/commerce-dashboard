
import Header from '@/components/Header';
import InfoRequest from '@/components/InfoRequest/index';
import InfoProvider from '@/contexts/providers/InfoProvider/index';
import CalendarComponent from './components/Calendar/index';

interface CalendarProps {
  
}

export default function Calendar({  }:CalendarProps) {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 dark:bg-blue-900 bg-white rounded-3xl relative'>
      <InfoProvider>
        <Header category='página' title='Calendário' />
        <InfoRequest />
        <CalendarComponent />
      </InfoProvider>
    </div>
  );
};
