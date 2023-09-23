// import { BsCurrencyDollar } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go';

import Button from '@/components/Button';
import EaringData from './components/EaringData/index';
import SparkLineRevenueChart from './components/SparkLineRevenueChart';
import StackedRevenueChart from './components/StackedRevenueChart';
import TotalEarnings from './components/TotalEarings/index';
import TotalRevenue from './components/TotalRevenue';

export default function Home() {
  return (
    <div className='mt-12'>
      <div className="flex flex-wrap justify-center">
        {/* Earnings sections (with the background image) */}
        <TotalEarnings />
        {/* cards section */}
        <EaringData />  
        
      </div>
          {/* Grafcs section */}
      <div className='flex gap-10 flex-wrap justify-center mr-10'>
        <div className='bg-gray-100 dark:text-gray-200 text-black dark:bg-gray-800 m-3 p-4 rounded-2xl md:w-[780px]'>
          <div className="flex justify-between">
            <p className='font-semibold text-xl'>
              Atualização de Renda              
            </p>
            <div className="flex items-center gap-4">
              
              <p className='flex items-center gap-2 text-gray-600 hover:drop-shadow-xl dark:text-gray-200'>
                <span>
                  <GoDotFill />
                </span>
                <span>Gasto</span>
              </p>

              
              <p className='flex items-center gap-2 text-green-600 hover:drop-shadow-xl dark:text-green-200'>
                <span>
                  <GoDotFill />
                </span>
                <span>Orçamento</span>
              </p>

            </div>
          </div>
          <div className="flex flex-wrap mt-10 gap-10 justify-center">
            <div className="border-r-1 border-gray-700 m-4 pr-10">
              
              <TotalRevenue />

              <SparkLineRevenueChart />
              
              <div className="mt-10">
                <Button 
                bgColor='bg-gray-800 dark:bg-white' 
                color='text-white dark:text-blue-900'
                text='Baixar Relatório'
                size='text-md'
                borderRadius='rounded-[10px]'
                className='px-3 py-1'
                />
              </div>

            </div>

            <StackedRevenueChart />

          </div>
        </div>
      </div>
      {/* end */}
    </div>
  )
}
