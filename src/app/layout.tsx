import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { CustomersDataItemType, EarningDataType, EmployeesDataItemType, OrdersDataItemType, RevenueReport, ScheduleDataType } from '@/common.types';
import Menu from '@/components/Menu/index';
import ToolTipClientComponent from '@/components/ToolTipClientComponent';
import GlobalProvider from '@/contexts/providers/GlobalProvider';
import { customersData, earningData, employeesData, ordersData, stackedChartData } from '@/data/dummyTSX';
import { ReactNode } from 'react';
import { FiSettings } from 'react-icons/fi';
import insertRegisteredDomains, { InsertRegisteredDomainsReturnType } from './functions/insertRegisteredDomains';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Visão geral do negócio',
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }:RootLayoutProps) {
  
  const baseURL:string = process.env.BASE_URL as string;
  const scheduleURL:string = baseURL + '/api/calendar';
  
  const revalidate = 10;
  const schedule:ScheduleDataType = await (await fetch(scheduleURL, {
    next: {revalidate},
    method: 'POST',
    body: JSON.stringify({password: '123456'}),
  })).json();
  console.log('requisições diárias', (3600 * 24) / revalidate);
  

  const data:FetchDataState = {    
    customers: {data: insertRegisteredDomains(customersData, process.env.REGISTERED_DOMAINS as string) as InsertRegisteredDomainsReturnType<CustomersDataItemType>},    
    orders: {data: insertRegisteredDomains(ordersData, process.env.REGISTERED_DOMAINS as string) as InsertRegisteredDomainsReturnType<OrdersDataItemType>},    
    employees: {data: insertRegisteredDomains(employeesData, process.env.REGISTERED_DOMAINS as string) as InsertRegisteredDomainsReturnType<EmployeesDataItemType>},
    finances: {
      earning: earningData,
      revenueReport: stackedChartData,
    },
    schedule: {data: schedule},
    baseURL: baseURL,
  };

  const envs:Envs = {
    syncfusionRegisterLicence: process.env.SYNCFUSION_REGISTER_LICENCE as string,
    registeredDomains: process.env.REGISTERED_DOMAINS as string,
    baseURL: process.env.BASE_URL as string,
  };
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider syncfusionRegisterLicence={process.env.SYNCFUSION_REGISTER_LICENCE} globalData={data} envs={envs} >
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
  customers: {data: InsertRegisteredDomainsReturnType<CustomersDataItemType>},
  orders: {data: InsertRegisteredDomainsReturnType<OrdersDataItemType>},
  employees: {data: InsertRegisteredDomainsReturnType<EmployeesDataItemType>},
  finances: {
    earning: EarningDataType,
    revenueReport: RevenueReport,
  },
  schedule: {data: ScheduleDataType},
  baseURL: string,
};

export type Envs = {
  syncfusionRegisterLicence: string,
  registeredDomains: string,
  baseURL: string,
}
