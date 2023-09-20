import { CustomersDataItemType } from '@/data/grid/customers/types';
import { OrdersDataItemType } from '@/data/grid/oders/types';
import negativeAndPositiveColor from '@/utils/styles/negativeAndPositiveColor';
import { InsertRegisteredDomainsReturnType } from './insertRegisteredDomains';


export type LastYearReport = {
  customerProfit:number,
  ordersProfit:number,
  ordersExpense:number,
};

interface MakeEaringDataProps {
  iconColor?:string;
  iconBg?:string;
  title?:string;
  lastYearReport:LastYearReport;
  customers:InsertRegisteredDomainsReturnType<CustomersDataItemType>;
  orders:InsertRegisteredDomainsReturnType<OrdersDataItemType>;
};



type MakeEaringDataReturnItemType = {
  amount: number,
  percentage: number,
  title: string,
  iconColor: string,
  iconBg: string,
  pcColor: string,
};

type MakeEaringDataReturnDetailsType = {
  customerProfit:number,
  customerExpense:number,
  ordersProfit:number,
  ordersExpense:number,
};
type MakeEaringDataReturnType = {
  Customers:MakeEaringDataReturnItemType,
  Products:MakeEaringDataReturnItemType,
  Sales:MakeEaringDataReturnItemType,
  Refunds:MakeEaringDataReturnItemType,
  Details: MakeEaringDataReturnDetailsType
};

export default function makeEaringData({ iconColor, iconBg, title, lastYearReport, customers, orders}:MakeEaringDataProps):MakeEaringDataReturnType {

  type OrderStatus = Array<'pendente' | 'completo' | 'ativo' | 'cancelado' | 'rejeitado'>;
  const orderGoodStatus:OrderStatus = ['completo', 'ativo'];
  const orderBadStatus:OrderStatus = ['pendente', 'cancelado', 'rejeitado'];

  type CustomerStatus = Array<'pendente' | 'completo' | 'ativo' | 'cancelado'>;
  const customerGoodStatus:CustomerStatus = ['completo', 'ativo'];
  const customerBadStatus:CustomerStatus = ['pendente', 'cancelado'];

  const goodOrders = orders.filter(order => orderGoodStatus.includes(order.Status));
  const badOrders = orders.filter(order => orderBadStatus.includes(order.Status));

  const goodCustomers = customers.filter(customer => customerGoodStatus.includes(customer.Status));
  const badCustomers = customers.filter(customer => customerBadStatus.includes(customer.Status));

  // console.log('goodOrders on makeEaringData', goodOrders);
  // console.log('badOrders on makeEaringData', badOrders);
  // console.log('goodCustomers on makeEaringData', goodCustomers);
  

  const customerProfit = goodCustomers.reduce((acc, customer) => {
    acc += customer.Budget;
    return acc;
  }, 0);

  const customerExpense = badCustomers.reduce((acc, customer) => {
    acc += customer.Budget;
    return acc;
  }, 0);

  const ordersProfit = goodOrders.reduce((acc, order) => {
    acc += order.TotalAmount;
    return acc;
  }, 0);

  const ordersExpense = badOrders.reduce((acc, order) => {
    acc += order.TotalAmount;
    return acc;
  }, 0);

  // console.log('customerProfit on makeEaringData', customerProfit, lastYearReport.customerProfit);
  // console.log('ordersProfit on makeEaringData', ordersProfit, lastYearReport.ordersProfit);
  // console.log('ordersExpense on makeEaringData', ordersExpense, lastYearReport.ordersExpense);
  console.log('ordersExpenseComparision on makeEaringData', ordersProfit + ', ', lastYearReport.ordersProfit + ', ', ordersProfit - lastYearReport.ordersProfit);


  const customerProfitComparision = (((customerProfit - lastYearReport.customerProfit)/ customerProfit) * 100);
  const ordersProfitComparision = (((ordersProfit - lastYearReport.ordersProfit)/ ordersProfit) * 100);
  const ordersExpenseComparision = (((lastYearReport.ordersExpense - ordersExpense)/ ordersExpense) * 100);

  const sales = ordersProfit + ordersExpense;
  const salesLatYear = lastYearReport.ordersProfit + lastYearReport.ordersExpense;
  const salesComparision = (((sales - salesLatYear)/ sales) * 100);
  
  const earinigData = {
    Customers: {
      amount: customerProfit,
      percentage: customerProfitComparision,
      title: title ?? 'Customers',
      iconColor: iconColor ?? '#03C9D7',
      iconBg: iconBg ?? '#E5FAFB',
      pcColor: negativeAndPositiveColor({num: Number(customerProfitComparision)}), // se negativo vermelho, se posistivo verde
    },
    Products: {
      amount: ordersProfit,
      percentage: ordersProfitComparision,
      title: title ?? 'Products',
      iconColor: iconColor ?? '#03C9D7',
      iconBg: iconBg ?? '#E5FAFB',
      pcColor: negativeAndPositiveColor({num: Number(ordersProfitComparision)}), // se negativo vermelho, se posistivo verde
    },
    Sales: {
      amount: sales,
      percentage: salesComparision,
      title: title ?? 'Sales',
      iconColor: iconColor ?? '#03C9D7',
      iconBg: iconBg ?? '#E5FAFB',
      pcColor: negativeAndPositiveColor({num: Number(salesComparision)}), // se negativo vermelho, se posistivo verde
    },
    Refunds: {
      amount: ordersExpense,
      percentage: ordersExpenseComparision,
      title: title ?? 'Refunds',
      iconColor: iconColor ?? '#03C9D7',
      iconBg: iconBg ?? '#E5FAFB',
      pcColor: negativeAndPositiveColor({num: Number(ordersExpenseComparision)}), // se negativo vermelho, se posistivo verde
    },
    Details: {
      customerProfit,
      customerExpense,
      ordersProfit,
      ordersExpense,
    }
  }


  return earinigData as MakeEaringDataReturnType;
};