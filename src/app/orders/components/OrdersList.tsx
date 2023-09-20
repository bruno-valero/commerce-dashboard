'use client'

import gridActionComplete from '@/app/functions/gridActionComplete';
import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { useInfoState } from '@/contexts/providers/InfoProvider/InfoContext';
import { ColumnDirective, ColumnsDirective, ContextMenu, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';

interface OrdersListProps {
  id?: string;
}

export default function OrdersList({ }:OrdersListProps) {
  const globalState = useGlobalState();
  const [, setNotRegisteredDomain] = globalState.notRegisteredDomain
  const [globalData, setGlobalData] = globalState.data;
  const orders = globalData.orders
  const baseURL = globalData.envs.baseURL;
  const registeredDomains = globalData.envs.registeredDomains;

  const infoState = useInfoState();
  console.log('infoState.info', infoState.info);
  
  const [, setInfo] =  infoState.info;

  return (
    <GridComponent
    id={'gridcomp'}
    dataSource={orders.data}
    allowPaging
    allowSorting
    toolbar={['Search', 'Delete', 'Add']}
    editSettings={{allowDeleting: true, allowEditing: true, allowAdding: true}}
    actionComplete={(event) => gridActionComplete({ event, setNotRegisteredDomain, baseURL, gridType:'orders', setInfo, setGlobalData, registeredDomains })}
    >
      <ColumnsDirective>
        {orders.grid.map((order, i) => (
          <ColumnDirective key={i + 1} {...order} />
        ))}
      </ColumnsDirective>
      
      <Inject services={
        [Resize, Sort, ContextMenu, 
        Filter, Page, ExcelExport, Edit,
        PdfExport, Search, Toolbar, Selection]} />
        
    </GridComponent>
  );
};
