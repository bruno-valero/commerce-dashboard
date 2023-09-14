'use client'

import { useGlobalState } from '@/contexts/GlobalContext';
import { ColumnDirective, ColumnsDirective, ContextMenu, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Resize, Search, Sort, Toolbar } from '@syncfusion/ej2-react-grids';

interface EmployeesListProps {
  id?: string;
}

export default function EmployeesList({ }:EmployeesListProps) {
  const globalState = useGlobalState();
  const [globalData,] = globalState.data;
  const employees = globalData.employees;

  return (
    <GridComponent
    id={'gridcomp'}
    dataSource={employees.data}
    allowPaging
    allowSorting
    toolbar={['Search']}
    width='auto'
    >
      <ColumnsDirective>
        {employees.grid.map((employee, i) => (
          <ColumnDirective key={i + 1} {...employee} />
        ))}
      </ColumnsDirective>
      
      <Inject services={
        [Resize, Sort, ContextMenu, 
        Filter, Page, ExcelExport, Edit,
        PdfExport, Search, Toolbar]} />
        
    </GridComponent>
  );
};
