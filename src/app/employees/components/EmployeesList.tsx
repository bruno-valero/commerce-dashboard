'use client'

import { Info } from '@/app/calendar/page';
import gridActionComplete from '@/app/functions/gridActionComplete';
import { useGlobalState } from '@/contexts/GlobalContext';
import { ColumnDirective, ColumnsDirective, ContextMenu, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import { useState } from 'react';

interface EmployeesListProps {
  id?: string;
}

export default function EmployeesList({ }:EmployeesListProps) {
  const globalState = useGlobalState();
  const [globalData,] = globalState.data;
  const employees = globalData.employees;
  const [, setNotRegisteredDomain] = globalState.notRegisteredDomain
  const baseURL = globalData.envs.baseURL;

  const [, setInfo] = useState<Info>({
    visible: false,
    text: '',
    changed: false,
})

  return (
    <GridComponent
    id={'gridcomp'}
    dataSource={employees.data}
    allowPaging
    allowSorting
    toolbar={['Search', 'Delete', 'Add']}
    editSettings={{allowDeleting: true, allowEditing: true, allowAdding: true}}
    width='auto'    
    actionComplete={(event) => gridActionComplete({event, setNotRegisteredDomain, baseURL, gridType:'employees', setInfo})}
    >
      <ColumnsDirective>
        {employees.grid.map((employee, i) => (
          <ColumnDirective key={i + 1} {...employee} />
        ))}
      </ColumnsDirective>
      
      <Inject services={
        [Resize, Sort, ContextMenu, 
        Filter, Page, ExcelExport, Edit,
        PdfExport, Search, Toolbar, Selection]} />
        
    </GridComponent>
  );
};