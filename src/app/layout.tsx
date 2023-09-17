import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { CustomersDataType, EarningDataType, EmployeesDataType, OrdersDataType, RevenueReport, ScheduleDataType } from '@/common.types';
import Menu from '@/components/Menu/index';
import ToolTipClientComponent from '@/components/ToolTipClientComponent';
import GlobalProvider from '@/contexts/providers/GlobalProvider';
import { customersData, earningData, employeesData, ordersData, stackedChartData } from '@/data/dummyTSX';
import { ReactNode } from 'react';
import { FiSettings } from 'react-icons/fi';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Visão geral do negócio',
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }:RootLayoutProps) {
  
  const baseURL:string = 'http://localhost:3000';
  const scheduleURL:string = baseURL + '/api/calendar';
  
  const revalidate = 10;
  const schedule:ScheduleDataType = await (await fetch(scheduleURL, {
    next: {revalidate},
    method: 'POST',
    body: JSON.stringify({password: '123456'}),
  })).json();
  console.log('requisições diárias', (3600 * 24) / revalidate);
  

  const data:FetchDataState = {
    customers: {data: customersData},
    orders: {data: ordersData},
    employees: {data: employeesData},
    finances: {
      earning: earningData,
      revenueReport: stackedChartData,
    },
    schedule: {data: schedule},
    baseURL: baseURL,
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider syncfusionRegisterLicence={process.env.SYNCFUSION_REGISTER_LICENCE} globalData={data} >
          <main className="flex relative dark:bg-blue-950 min-h-[100vh]">
            <div className="fixed right-4 bottom-4 z-50">
                <ToolTipClientComponent content='Opções' position='TopCenter' >
                  <button type='button' className='text-3xl p-3 hover:drop-shadow-xl hover:bg-gray-300 text-white bg-blue-500 rounded-[50%]'>
                    <FiSettings />
                  </button>
                </ToolTipClientComponent>
            </div>
            
            <Menu>
              {children}
            </Menu>
                        
          </main>        
        </GlobalProvider>
      </body>
    </html>
  )
};

export type FetchDataState = {
  customers: {data: CustomersDataType},
  orders: {data: OrdersDataType},
  employees: {data: EmployeesDataType},
  finances: {
    earning: EarningDataType,
    revenueReport: RevenueReport,
  },
  schedule: {data: ScheduleDataType},
  baseURL: string,
};
