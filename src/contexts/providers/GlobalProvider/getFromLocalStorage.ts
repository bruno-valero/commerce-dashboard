import { InsertRegisteredDomainsReturnType } from '@/app/functions/insertRegisteredDomains';
import { EarningDataType, RevenueReport, ScheduleDataType } from '@/common.types';
import { CustomersDataItemType } from '@/data/grid/customers/types';
import { EmployeesDataItemType } from '@/data/grid/employees/types';
import { OrdersDataItemType } from '@/data/grid/oders/types';
import { KanbanDataType } from '@/data/kanan/types';
import { DataToStorage } from './types';

export default function getFromLocalStorage(data:DataToStorage):DataToStorage {
  const appData: {
    customers?: InsertRegisteredDomainsReturnType<CustomersDataItemType>,
    orders?: InsertRegisteredDomainsReturnType<OrdersDataItemType>,
    employees?: InsertRegisteredDomainsReturnType<EmployeesDataItemType>,
    kanban?: KanbanDataType,
    earning?: EarningDataType,
    revenueReport?: RevenueReport,
    schedule?: ScheduleDataType,
  } = {};
  try {
    appData.customers = localStorage.getItem('customers') ? JSON.parse(localStorage.getItem('customers') ?? '[]') : null
    appData.orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders') ?? '[]') : null
    appData.employees = localStorage.getItem('employees') ? JSON.parse(localStorage.getItem('employees') ?? '[]') : null
    appData.kanban = localStorage.getItem('kanban') ? JSON.parse(localStorage.getItem('kanban') ?? '[]') : null
    appData.earning = localStorage.getItem('earning') ? JSON.parse(localStorage.getItem('earning') ?? '[]') : null
    appData.revenueReport = localStorage.getItem('revenueReport') ? JSON.parse(localStorage.getItem('revenueReport') ?? '{}') : null
    appData.schedule = localStorage.getItem('schedule') ? JSON.parse(localStorage.getItem('schedule') ?? '[]') : null
  } catch(e) {
    console.log('erro ao buscar os dados do localStorage na funcao: getFromLocalStorage', e);
    
  }

  const result:DataToStorage = {
    customers: appData.customers ?? localStorage.setItem('customers', JSON.stringify(data.customers)) ?? data.customers,
    orders: appData.orders ?? localStorage.setItem('orders', JSON.stringify(data.orders)) ?? data.orders,
    employees: appData.employees ?? localStorage.setItem('employees', JSON.stringify(data.employees)) ?? data.employees,
    kanban: appData.kanban ?? localStorage.setItem('kanban', JSON.stringify(data.kanban)) ?? data.kanban,
    earning: appData.earning ?? localStorage.setItem('earning', JSON.stringify(data.earning)) ?? data.earning,
    revenueReport: appData.revenueReport ?? localStorage.setItem('revenueReport', JSON.stringify(data.revenueReport)) ?? data.revenueReport,
    schedule: appData.schedule ?? localStorage.setItem('schedule', JSON.stringify(data.schedule)) ?? data.schedule,
  };

  return result;

}