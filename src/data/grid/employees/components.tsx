import Image from 'next/image';
import { BiSolidUserCircle } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';
import { CustomersDataItemType } from '../customers/types';
import checkDomain from '../functions/checkDomain';
import { OrdersDataItemType } from '../oders/types';
import { EmployeesDataItemType } from './types';

export const gridEmployeeProfile = (props:EmployeesDataItemType) => {
  const domain:{isDomain?:boolean, valid?:boolean} = {};
  checkDomain({ domain, data:props as EmployeesDataItemType & OrdersDataItemType & CustomersDataItemType})


  if ((domain.isDomain && domain.valid) || !domain.isDomain) return (
    <div className="flex items-center gap-2">
      <Image
        className="rounded-full h-auto bg-contain"
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

export const gridEmployeeCountry = (props:EmployeesDataItemType) => (
  <div className="flex items-center justify-center gap-2">
    <GrLocation />
    <span>{props.Country}</span>
  </div>
);