'use client'

import { useGlobalState } from '@/contexts/GlobalContext';
import { ColumnDirective, ColumnsDirective, ContextMenu, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Resize, Sort } from '@syncfusion/ej2-react-grids';

interface OrdersListProps {
  id?: string;
}

export default function OrdersList({ }:OrdersListProps) {
  const globalState = useGlobalState();
  const [globalData,] = globalState.data;
  const orders = globalData.orders

  return (
    <GridComponent
    id={'gridcomp'}
    dataSource={orders.data}
    allowPaging
    allowSorting
    >
      <ColumnsDirective>
        {orders.grid.map((order, i) => (
          <ColumnDirective key={i + 1} {...order} />
        ))}
      </ColumnsDirective>
      
      <Inject services={
        [Resize, Sort, ContextMenu, 
        Filter, Page, ExcelExport, Edit,
        PdfExport]} />
        
    </GridComponent>
  );
};
