'use client'

import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { useInfoState } from '@/contexts/providers/InfoProvider/InfoContext';

import { ColumnDirective, ColumnsDirective, KanbanComponent } from '@syncfusion/ej2-react-kanban';

// import { L10n, loadCldr } from '@syncfusion/ej2-base';
// import pt from '@syncfusion/ej2-locale/src/pt.json';
// import gregorian from 'cldr-data/main/pt/ca-gregorian.json';
// import numbers from 'cldr-data/main/pt/numbers.json';
// import timeZoneNames from 'cldr-data/main/pt/timeZoneNames.json';
// import numberingSystems from 'cldr-data/supplemental/numberingSystems.json';

// loadCldr(
//   numberingSystems,
//   gregorian,
//   numbers,
//   timeZoneNames,
// );

// pt.pt.schedule.save = 'Salvar';
// pt.pt.schedule.saveButton = 'Salvar';
// L10n.load(JSON.parse(JSON.stringify(pt)));

interface KanbanCompProps {
}

export default function KanbanComp({  }:KanbanCompProps) {
  const globalState = useGlobalState();
  const [globalData, setGlobalData] = globalState.data;
  const kanban = globalData.kanban;
  const baseURL = globalData.baseURL; 

  console.log('kanban.data', kanban.data);
  

  const infoState = useInfoState();
  const [, setInfo] =  infoState.info;
  
  
  return (
    <KanbanComponent 
    id='kanban'
    height='650px'
    dataSource={kanban.data}
    cardSettings={{
      contentField:'Summary',
      headerField:'Id',
    }}
    keyField='Status'
    >
      <ColumnsDirective>
        {kanban.grid.map((item, i) => (
          <ColumnDirective key={i + 1} {...item} />
        ))}
      </ColumnsDirective>
    </KanbanComponent>
  );
};
