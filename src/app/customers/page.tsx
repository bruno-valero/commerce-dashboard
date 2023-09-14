import Header from '@/components/Header';
import { ReactNode } from 'react';
import CustomersList from './components/CustomersList';

interface CustomersProps {
  children?: ReactNode
}

export default async function Customers({ children }:CustomersProps) {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 dark:bg-blue-900 bg-white rounded-3xl'>
      {/* @ts-expect-error Server Component */}
      <Header category='página' title='Empregados' />
      <CustomersList />
    </div>
  );
};
