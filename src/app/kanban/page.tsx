
import Header from '@/components/Header';
import InfoRequest from '@/components/InfoRequest/index';
import InfoProvider from '@/contexts/providers/InfoProvider/index';
import KanbanComp from './components/Kanban/index';

interface KanbanProps {
  
}

export default function Kanban({  }:KanbanProps) {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 dark:bg-blue-900 bg-white rounded-3xl relative'>
      <InfoProvider>
        <Header category='página' title='Calendário' />
        <InfoRequest />
        <KanbanComp />
      </InfoProvider>
    </div>
  );
};
