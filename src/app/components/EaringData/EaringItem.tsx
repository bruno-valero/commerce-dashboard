'use client'

import makeEaringData from '@/app/functions/makeEaringData';
import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { ReactElement, useMemo } from 'react';

interface EarningItemProps {
  type: "Customers" | "Products" | "Sales" | "Refunds";
  title?:string;
  iconColor?:string;
  iconBg?:string;
  icon:ReactElement;
}

export default function EarningItem({ type, title, icon, iconColor, iconBg }:EarningItemProps) {
  const globalState = useGlobalState();
  const [globalData, ] = globalState.data;
  const customers = globalData.customers.data;
  const orders = globalData.orders.data;
  const [lastYearReport,] = globalData.finances.lastYearReport;

  const data = useMemo(() => {
    return makeEaringData({ iconColor, iconBg, title, lastYearReport, customers, orders})[type];
  }, [globalData.customers.data, globalData.orders.data, lastYearReport]);


  return (
    <div
    className="flex flex-col justify-center items-center bg-gray-300 dark:text-gray-200 text-black dark:bg-gray-800 md:w-56 p-4 pt-9 rounded-2xl">
      <button 
      type='button' 
      style={{color: data.iconColor, backgroundColor: data.iconBg}}
      className='flex m-auto text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl dark:hover:shadow-md dark:hover:shadow-gray-200'
      >
        {icon}
      </button>
      <p className="mt-3">
        <span className="text-lg font-semibold">
          {data.amount.toLocaleString()}
        </span>
        <span style={{color: data.pcColor === 'rgba(40,250,40,.8)' ? 'rgba(40,180,40,.9)' : data.pcColor}} className={`text-s ml-2`}>
          {`${data.percentage.toFixed(2)}%`}
        </span>
      </p>
      <p>{data.title}</p>
    </div>
  );
};
