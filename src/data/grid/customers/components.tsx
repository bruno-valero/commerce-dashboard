import { Obj } from '@/common.types';
import Image from 'next/image';
import { BiSolidUserCircle } from 'react-icons/bi';
import { EmployeesDataItemType } from '../employees/types';
import checkDomain from '../functions/checkDomain';
import { OrdersDataItemType } from '../oders/types';
import { CustomersDataItemType } from './types';

export const customerGridImage = (props:CustomersDataItemType) => {
  const domain:{isDomain?:boolean, valid?:boolean} = {};
  checkDomain({ domain, data:props as EmployeesDataItemType & OrdersDataItemType & CustomersDataItemType})


  if ((domain.isDomain && domain.valid) || !domain.isDomain) return (
    <div className="flex items-center gap-2">
      <Image
        className="rounded-full w-10 h-10 bg-contain"
        src={props['Image']}
        alt="employee"
        width={50}
        height={50}
      />
    </div>
  );

  if (domain.isDomain && !domain.valid) return (
    <div className="flex items-center gap-2">
      <div className='w-10 h-10'>
        <BiSolidUserCircle size={60} />
      </div>
    </div>
  );
};

export const customerGridStatus = (props:CustomersDataItemType) => {
  const status = props.Status as 'Ativo' | 'Pendente' | 'Cancelado' | 'Completado';
  const colors = {
    Ativo:'#8BE78B',
    Pendente:'#FEC90F',
    Cancelado:'red',
    Completado:'#8BE78B',
  };
  return (
    <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
      <div style={{backgroundColor: colors[status]}} className={`p-1 rounded-full`} />
      <p>{status}</p>
    </div>
  );
};

export const customerGridBudget = (props:CustomersDataItemType) => {
  const budget = props.Budget;
  const text = {} as Obj<any>;
  if (budget < 100) {
    text.mask = `$${budget},00`;
  } else {
    text.mask = `$${(budget / 1000).toFixed(1)}K`;
  }
  return (
      <p>
        {text.mask}
      </p>

  );
};