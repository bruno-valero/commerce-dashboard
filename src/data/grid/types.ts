import { GridColumnModel } from '@syncfusion/ej2-react-grids/index';
import { CustomersDataItemType } from './customers/types';
import { EmployeesDataItemType } from './employees/types';
import { OrdersDataItemType } from './oders/types';

export type GridType = Array<GridColumnModel>;
export type GridsDataItemTypes = EmployeesDataItemType & OrdersDataItemType & CustomersDataItemType;
export type GridsDataTypes = Array<GridsDataItemTypes>;