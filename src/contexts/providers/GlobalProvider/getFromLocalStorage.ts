import { InsertRegisteredDomainsReturnType } from '@/app/functions/insertRegisteredDomains';
import { EarningDataType, RevenueReport, ScheduleDataType } from '@/common.types';
import { CustomersDataItemType } from '@/data/grid/customers/types';
import { EmployeesDataItemType } from '@/data/grid/employees/types';
import { OrdersDataItemType } from '@/data/grid/oders/types';
import { KanbanDataType } from '@/data/kanan/types';
import { DataToStorage } from './types';

export default function getFromLocalStorage(data:DataToStorage):DataToStorage {
  
  const customers:InsertRegisteredDomainsReturnType<CustomersDataItemType> = localStorage.getItem('customers') ? JSON.parse(localStorage.getItem('customers') as string) : null
  const orders:InsertRegisteredDomainsReturnType<OrdersDataItemType> = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders') as string) : null
  const employees:InsertRegisteredDomainsReturnType<EmployeesDataItemType> = localStorage.getItem('employees') ? JSON.parse(localStorage.getItem('employees') as string) : null
  const kanban:KanbanDataType = localStorage.getItem('kanban') ? JSON.parse(localStorage.getItem('kanban') as string) : null
  const earning:EarningDataType = localStorage.getItem('earning') ? JSON.parse(localStorage.getItem('earning') as string) : null
  const revenueReport:RevenueReport = localStorage.getItem('revenueReport') ? JSON.parse(localStorage.getItem('revenueReport') as string) : null
  const schedule:ScheduleDataType = localStorage.getItem('schedule') ? JSON.parse(localStorage.getItem('schedule') as string) : null

  const result:DataToStorage = {
    customers: customers ?? localStorage.setItem('customers', JSON.stringify(data.customers)) ?? data.customers,
    orders: orders ?? localStorage.setItem('orders', JSON.stringify(data.orders)) ?? data.orders,
    employees: employees ?? localStorage.setItem('employees', JSON.stringify(data.employees)) ?? data.employees,
    kanban: kanban ?? localStorage.setItem('kanban', JSON.stringify(data.kanban)) ?? data.kanban,
    earning: earning ?? localStorage.setItem('earning', JSON.stringify(data.earning)) ?? data.earning,
    revenueReport: revenueReport ?? localStorage.setItem('revenueReport', JSON.stringify(data.revenueReport)) ?? data.revenueReport,
    schedule: schedule ?? localStorage.setItem('schedule', JSON.stringify(data.schedule)) ?? data.schedule,
  };

  return result;

}