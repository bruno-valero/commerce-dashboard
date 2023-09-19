import { CustomersDataItemType } from '../customers/types';
import { EmployeesDataItemType } from '../employees/types';
import { OrdersDataItemType } from '../oders/types';

export type CheckDomainProps = {
  domain:{isDomain?:boolean, valid?:boolean},
  data: EmployeesDataItemType & OrdersDataItemType & CustomersDataItemType;
};