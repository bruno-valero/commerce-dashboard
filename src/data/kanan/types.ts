// import { GridColumnModel } from '@syncfusion/ej2-react-grids/index';
// import { CustomersDataItemType } from './customers/types';
// import { EmployeesDataItemType } from './employees/types';
// import { OrdersDataItemType } from './oders/types';

import { ColumnsModel } from '@syncfusion/ej2-react-kanban/index';

// export type GridType = Array<GridColumnModel>;
// export type GridsDataItemTypes = EmployeesDataItemType & OrdersDataItemType & CustomersDataItemType;
// export type GridsDataTypes = Array<GridsDataItemTypes>;

export type KanbanDataItemType = {
  Id: number,
  Title: string,
  Status: string,
  Summary: string,
  Type: string,
  Priority: string,
  Tags: string,
  Estimate: number,
  Assignee: string,
  RankId: number,
  Color: string,
  ClassName: string,
};

export type KanbanDataType = Array<KanbanDataItemType>

export type KanbanGridItemType = ColumnsModel
export type KanbanGridType = Array<KanbanGridItemType>