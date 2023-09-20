import Image from 'next/image';
import { BiSolidUserCircle } from 'react-icons/bi';
import { CustomersDataItemType } from '../customers/types';
import { EmployeesDataItemType } from '../employees/types';
import checkDomain from '../functions/checkDomain';
import { OrdersDataItemType } from './types';

export const gridOrderImage = (props:OrdersDataItemType) => {
  const domain:{isDomain?:boolean, valid?:boolean} = {};
  checkDomain({domain, data:props as EmployeesDataItemType & OrdersDataItemType & CustomersDataItemType})


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

export const gridOrderStatus = (props:OrdersDataItemType) => {
  const status = props.Status;

  const colors = {
    pendente: '#8BE78B',
    completo: '#FB9678',
    ativo: '#03C9D7',
    cancelado: '#FF5C8E',
    rejeitado: 'red',
  }
  return (
    <button
      type="button"
      style={{ background: colors[status] }}
      className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    >
      {status}
    </button>
  );
};

export const gridOrderAmount = (props:OrdersDataItemType) => {

  return (
    <p>
      ${props.TotalAmount}
    </p>
  );
};