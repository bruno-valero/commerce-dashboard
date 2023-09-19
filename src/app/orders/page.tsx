import Header from '@/components/Header';
import InfoRequest from '@/components/InfoRequest/index';
import InfoProvider from '@/contexts/providers/InfoProvider/index';
import { ReactNode } from 'react';
import OrdersList from './components/OrdersList';

interface OrdersProps {
  children?: ReactNode
}

export default async function Orders() {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 dark:bg-blue-900 bg-white rounded-3xl relative'>
      <InfoProvider>
        <Header category='página' title='Orders' />
        <InfoRequest />
        <OrdersList />
      </InfoProvider>
    </div>
  );
};
