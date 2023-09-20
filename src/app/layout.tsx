import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';


import { EarningDataType, RevenueReport, ScheduleDataType } from '@/common.types';
import Menu from '@/components/Menu/index';
import ToolTipClientComponent from '@/components/ToolTipClientComponent';
import GlobalProvider from '@/contexts/providers/GlobalProvider';
import { earningData, stackedChartData } from '@/data/dummyTSX';
import { CustomersDataItemType } from '@/data/grid/customers/types';
import { EmployeesDataItemType } from '@/data/grid/employees/types';
import { OrdersDataItemType } from '@/data/grid/oders/types';
import { KanbanDataType } from '@/data/kanan/types';
import getCustomers from '@/dataFetching/getCustomers';
import getEmployees from '@/dataFetching/getEmployees';
import getKanban from '@/dataFetching/getKanban';
import getOrders from '@/dataFetching/getOrders';
import getSchedule from '@/dataFetching/getSchedule';
import { ReactNode } from 'react';
import { FiSettings } from 'react-icons/fi';
import { InsertRegisteredDomainsReturnType } from './functions/insertRegisteredDomains';


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
  const customersURL:string = baseURL + '/api/customers';
  const ordersURL:string = baseURL + '/api/orders';
  const employeesURL:string = baseURL + '/api/employees';
  
  const revalidate = 10;
  const requesOptions = {
    next: {revalidate},
    data: {id: '123456', user:'bruno'},
  };

  const schedule:ScheduleDataType = await getSchedule({ baseURL, init:requesOptions});  
  const customers = await getCustomers({ baseURL, init:requesOptions, registeredDomains: process.env.REGISTERED_DOMAINS as string});
  const orders = await getOrders({ baseURL, init:requesOptions, registeredDomains: process.env.REGISTERED_DOMAINS as string});
  const employees = await getEmployees({ baseURL, init:requesOptions, registeredDomains: process.env.REGISTERED_DOMAINS as string});
  const kanban = await getKanban({ baseURL, init:requesOptions});
  
  console.log('requisições diárias', (3600 * 24) / revalidate);
  // console.log('kanban on layout', kanban);

  const data:FetchDataState = {    
    customers: {data: customers},
    orders: {data: orders},
    employees: {data: employees},
    kanban: {data: kanban},
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
  kanban: {data: KanbanDataType},
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
