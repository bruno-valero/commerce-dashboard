'use client'

import { useGlobalState } from '@/contexts/GlobalContext';
import { CheckBoxChangeEventArgs, ColumnDirective, ColumnsDirective, ContextMenu, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Resize, RowDeselectEventArgs, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import { MouseEvent, useEffect, useState } from 'react';
import handleDeselect from '../functions/handleDeselect';
import handleItemClick from '../functions/handleItemClick';
import handleSelect from '../functions/handleSelect';

interface CustomersListProps {
  id?: string;
}

export default function CustomersList({ }:CustomersListProps) {
  const globalState = useGlobalState();
  const [globalData,] = globalState.data;
  const customers = globalData.customers;

  const [checkedItems, setCheckedItems] = useState<CheckedItems>([]);

  useEffect(() => {
    console.log(checkedItems);    
  }, [checkedItems])

  return (
    <GridComponent
    id={'gridcomp'}
    dataSource={customers.data}
    allowPaging
    allowSorting
    toolbar={['Search', 'Delete']}
    editSettings={{allowDeleting: true, allowEditing: true}}
    width='auto'
    onClick={(e:MouseEvent) => handleItemClick({ e, setCheckedItems, checkedItems })}
    checkBoxChange={(e:CheckBoxChangeEventArgs) => {}}    
    rowSelected={(e:RowDeselectEventArgs) => handleSelect({ e, setCheckedItems })}
    rowDeselected={(e:RowDeselectEventArgs) => handleDeselect({ e, setCheckedItems })}
    rowDrop={(e) => console.log('drop')}
    batchDelete={(e) => console.log('delete')}
    
    >
      <ColumnsDirective>
        {customers.grid.map((employee, i) => (
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


// tipo unico do estado que contem os itens selecionados do GridComponent
export type CheckedItem = {
  name:string,
  email:string,
  projectName:string,
  status:string,
  weeks:string,
  budget:string,
  location:string,
  customerId:number,
};
// tipo bruto do estado que contem os itens selecionados do GridComponent
export type CheckedItems = Array<CheckedItem>;


// tipo unico da variavel data que provem do evento de selecao ou descelecao de linhas do GridComponent
export type CheckedData = {
  Budget : string,
  CustomerEmail : string,
  CustomerID : number,
  CustomerImage : {src: string, height: number, width: number, blurDataURL: string, blurWidth: number, blurHeight: number },
  CustomerName : string,
  Location : string,
  ProjectName : string,
  Status : string,
  StatusBg : string,
  Weeks : string,
};

// tipo quase bruto da variavel data que provem do evento de selecao ou descelecao de linhas do GridComponent
export type CheckedDataRow = CheckedData | Array<CheckedData>;