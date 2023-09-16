import Header from '@/components/Header';
import { ReactNode } from 'react';
import OrdersList from './components/OrdersList';

interface OrdersProps {
  children?: ReactNode
}

export default async function Orders() {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 dark:bg-blue-900 bg-white rounded-3xl'>

      <Header category='página' title='Orders' />
      <OrdersList />
    </div>
  );
};
