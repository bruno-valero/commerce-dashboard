import Header from '@/components/Header';
import InfoRequest from '@/components/InfoRequest/index';
import InfoProvider from '@/contexts/providers/InfoProvider/index';
import { ReactNode } from 'react';
import EmployeesList from './components/EmployeesList';

interface EmployeesProps {
  children?: ReactNode
}

export default async function Employees() {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 dark:bg-blue-900 bg-white rounded-3xl relative'>
      <InfoProvider>
        <Header category='página' title='Empregados' />
        <InfoRequest />
        <EmployeesList />
      </InfoProvider>
    </div>
  );
};
