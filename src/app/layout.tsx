import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';


import { EarningDataType, RevenueReport, ScheduleDataType } from '@/common.types';
import Menu from '@/components/Menu/index';
import SettingsButton from '@/components/SettingsButton/index';
import GlobalProvider from '@/contexts/providers/GlobalProvider';
import { earningData, scheduleData, stackedChartData } from '@/data/dummyTSX';
import { customersData } from '@/data/grid/customers/data';
import { CustomersDataItemType, CustomersDataType } from '@/data/grid/customers/types';
import { employeesData } from '@/data/grid/employees/data';
import { EmployeesDataItemType, EmployeesDataType } from '@/data/grid/employees/types';
import { ordersData } from '@/data/grid/oders/data';
import { OrdersDataItemType, OrdersDataType } from '@/data/grid/oders/types';
import { kanbanData } from '@/data/kanan/data';
import { KanbanDataType } from '@/data/kanan/types';
import getCustomers from '@/dataFetching/getCustomers';
import getEmployees from '@/dataFetching/getEmployees';
import getKanban from '@/dataFetching/getKanban';
import getOrders from '@/dataFetching/getOrders';
import getSchedule from '@/dataFetching/getSchedule';
import { ReactNode } from 'react';
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
  const customersURL:string = baseURL + '/api/customers';
  const ordersURL:string = baseURL + '/api/orders';
  const employeesURL:string = baseURL + '/api/employees';
  
  // const revalidate = 10;
  const requesOptions = {
    // next: {revalidate},
    data: {id: '123456', user:'bruno'},
  };

  const dataItems:{
    schedule?: ScheduleDataType,
    customers?: CustomersDataType,
    orders?: OrdersDataType,
    employees?: EmployeesDataType,
    kanban?: KanbanDataType,
  } = {};

  try {

  dataItems['schedule'] = await getSchedule({ baseURL, init:requesOptions}) ?? [];
  dataItems['customers'] = await getCustomers({ baseURL, init:requesOptions, registeredDomains: process.env.REGISTERED_DOMAINS as string}) ?? [];
  dataItems['orders'] = await getOrders({ baseURL, init:requesOptions, registeredDomains: process.env.REGISTERED_DOMAINS as string}) ?? [];
  dataItems['employees'] = await getEmployees({ baseURL, init:requesOptions, registeredDomains: process.env.REGISTERED_DOMAINS as string}) ?? [];
  dataItems['kanban'] = await getKanban({ baseURL, init:requesOptions}) ?? [];
  
  } catch(e) {
    // insertRegisteredDomains
    dataItems['schedule'] = scheduleData;  
    dataItems['customers'] = insertRegisteredDomains(customersData, process.env.REGISTERED_DOMAINS as string) as InsertRegisteredDomainsReturnType<CustomersDataItemType>;
    dataItems['orders'] = insertRegisteredDomains(ordersData, process.env.REGISTERED_DOMAINS as string) as InsertRegisteredDomainsReturnType<OrdersDataItemType>;
    dataItems['employees'] = insertRegisteredDomains(employeesData, process.env.REGISTERED_DOMAINS as string) as InsertRegisteredDomainsReturnType<EmployeesDataItemType>;
    dataItems['kanban'] = kanbanData;
  }
  
  // console.log('requisições diárias', (3600 * 24) / revalidate);
  // console.log('kanban on layout', kanban);

  const data:FetchDataState = {    
    customers: {data: dataItems['customers'] as InsertRegisteredDomainsReturnType<CustomersDataItemType>},
    orders: {data: dataItems['orders'] as InsertRegisteredDomainsReturnType<OrdersDataItemType>},
    employees: {data: dataItems['employees'] as InsertRegisteredDomainsReturnType<EmployeesDataItemType>},
    kanban: {data: dataItems['kanban']},
    finances: {
      earning: earningData,
      revenueReport: stackedChartData,
    },
    schedule: {data: dataItems['schedule']},
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
          <main className="flex relative dark:bg-gray-900 bg-white min-h-[100vh]">
            <div className="fixed right-4 bottom-4 z-50">
                <SettingsButton />
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
