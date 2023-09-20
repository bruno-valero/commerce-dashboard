'use client'

import gridActionComplete from '@/app/functions/gridActionComplete';
import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { useInfoState } from '@/contexts/providers/InfoProvider/InfoContext';
import { ColumnDirective, ColumnsDirective, ContextMenu, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';

interface EmployeesListProps {
  id?: string;
}

export default function EmployeesList({ }:EmployeesListProps) {
  const globalState = useGlobalState();
  const [globalData, setGlobalData] = globalState.data;
  const employees = globalData.employees;
  const [, setNotRegisteredDomain] = globalState.notRegisteredDomain
  const baseURL = globalData.envs.baseURL;
  const registeredDomains = globalData.envs.registeredDomains;

  const infoState = useInfoState();
  const [, setInfo] =  infoState.info;

  return (
    <GridComponent
    id={'gridcomp'}
    dataSource={employees.data}
    allowPaging
    allowSorting
    toolbar={['Search', 'Delete', 'Add']}
    editSettings={{allowDeleting: true, allowEditing: true, allowAdding: true}}
    width='auto'    
    actionComplete={(event) => gridActionComplete({ event, setNotRegisteredDomain, baseURL, gridType:'employees', setInfo, setGlobalData, registeredDomains })}
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