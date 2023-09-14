// import { BsCurrencyDollar } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go';

import Button from '@/components/Button';
import { earningData } from '@/data/dummyTSX';
import SparkLineRevenueChart from './components/SparkLineRevenueChart';
import StackedRevenueChart from './components/StackedRevenueChart';
import TotalRevenue from './components/TotalRevenue';
import negativeAndPositiveColor from './functions/negativeAndPositiveColor';

export default function Home() {
  return (
    <div className='mt-12'>
      <div className="flex flex-wrap justify-center">
        {/* Earnings sections (with the background image) */}
        <div className="dark:text-gray-200 dark:bg-blue-950 h-44 rounded-xl w-full max-sm:w-[80%] max-md:w-[70%] max-lg:w-[65%] lg:w-[85%] xl:w-[45%] p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center bg-[url('/data/welcome-bg.svg')]">
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-bold textgray-400'>Ganhos</p>
              <p className='text-xl'>63,448.78</p>
              <div className='mt-6'>
                <Button 
                bgColor='bg-blue-900 dark:bg-white' 
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
        {/* cards section */}
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map(item => (
            <div 
            key={item.title} 
            className="flex flex-col justify-center items-center bg-white dark:text-gray-200 dark:bg-blue-900 md:w-56 p-4 pt-9 rounded-2xl">
              <button 
              type='button' 
              style={{color: item.iconColor, backgroundColor: item.iconBg}}
              className='flex m-auto text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl dark:hover:shadow-md dark:hover:shadow-gray-200'
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                  {item.amount}
                </span>
                <span style={{color: negativeAndPositiveColor({num:item.percentage, model: '${num}%'})}} className={`text-s ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p>{item.title}</p>
            </div>
          ))}
        </div>  
      </div>
          {/* Grafcs section */}
      <div className='flex gap-10 flex-wrap justify-center mr-10'>
        <div className='bg-white dark:text-gray-200 dark:bg-blue-900 m-3 p-4 rounded-2xl md:w-[780px]'>
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
                bgColor='bg-blue-900 dark:bg-white' 
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
