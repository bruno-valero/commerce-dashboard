import { ColumnsModel } from '@syncfusion/ej2-react-kanban/index';


export type KanbanDataItemType = {
  Id: number | string,
  Title: string,
  Status: string,
  Summary: string,
  Type: string,
  Priority: string,
  Tags?: string,
  Estimate: number,
  Assignee: string,
  RankId: number,
  Color?: string,
  ClassName?: string,
};

export type KanbanDataType = Array<KanbanDataItemType>

export type KanbanGridItemType = ColumnsModel
export type KanbanGridType = Array<KanbanGridItemType>