'use client'

import gridActionComplete from '@/app/functions/gridActionComplete';
import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { useInfoState } from '@/contexts/providers/InfoProvider/InfoContext';
import { ColumnDirective, ColumnsDirective, ContextMenu, Edit, ExcelExport, Filter, GridComponent, Inject, Page, PdfExport, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';

interface CustomersListProps {
  id?: string;
}

export default function CustomersList({ }:CustomersListProps) {
  const globalState = useGlobalState();
  const [, setNotRegisteredDomain] = globalState.notRegisteredDomain
  const [globalData, setGlobalData] = globalState.data;
  const customers = globalData.customers;
  const baseURL = globalData.envs.baseURL;
  const registeredDomains = globalData.envs.registeredDomains;

  const infoState = useInfoState();
  const [, setInfo] =  infoState.info;

  return (
    <GridComponent
    id={'gridcomp'}
    dataSource={customers.data}
    allowPaging
    allowSorting
    toolbar={['Search', 'Delete', 'Add']}
    editSettings={{allowDeleting: true, allowEditing: true, allowAdding:true}}
    width='auto'  
    actionComplete={(event) => gridActionComplete({ event, setNotRegisteredDomain, baseURL, gridType:'customers', setInfo, setGlobalData, registeredDomains })}
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