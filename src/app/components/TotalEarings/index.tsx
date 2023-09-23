'use client'

import makeEaringData from '@/app/functions/makeEaringData';
import Button from '@/components/Button';
import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { useMemo } from 'react';

interface TotalEarningsProps {

}

export default function TotalEarnings({  }:TotalEarningsProps) {

  const globalState = useGlobalState();
  const [openTheme, setOpenTheme ] = globalState.openTheme;
  const [globalData, ] = globalState.data;
  const customers = globalData.customers.data;
  const orders = globalData.orders.data;
  const [lastYearReport,] = globalData.finances.lastYearReport;

  const data = useMemo(() => {
    return makeEaringData({ lastYearReport, customers, orders});
  }, [globalData.customers.data, globalData.orders.data, lastYearReport]);

  const details = data.Details;
  const earnings = (details.customerProfit + details.ordersProfit).toLocaleString();
  

  
  return (
    <div className="dark:text-gray-200 text-black dark:bg-gray-800 bg-gray-300 h-44 rounded-xl w-full max-sm:w-[80%] max-md:w-[70%] max-lg:w-[65%] lg:w-[85%] xl:w-[45%] p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center bg-[url('/data/welcome-bg.svg')]">
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-bold textgray-400'>Ganhos</p>
          <p className='text-xl'>{earnings}</p>
          <div className='mt-6'>
            <Button 
            bgColor='bg-gray-800 dark:bg-white' 
            color='text-white dark:text-blue-900'
            size={'text-md'} 
            text={'Download'} 
            borderRadius={'rounded-[10px]'}
            className='px-3 py-1'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
