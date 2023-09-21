'use client'

import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { useInfoState } from '@/contexts/providers/InfoProvider/InfoContext';
import KanbanCard from '@/data/kanan/components';

import { ColumnDirective, ColumnsDirective, KanbanComponent } from '@syncfusion/ej2-react-kanban';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import AddItemDialog from './components/AddItemDialog';
import CustomButton from './components/CustomButton';

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

  const [visible, setVisible] = useState<boolean>(false)

  // const kanbanRef = useRef<Element>(null);
  
  // useEffect(() => {
  //   const kanban = document.querySelector('.e-kanban');
  //   console.log('kanban', kanban);
    
  //   const kanbanColumns = kanban?.querySelectorAll('.e-kanban .e-kanban-table.e-content-table .e-content-row:not(.e-swimlane-row) td');
  //   const kanbanColumnsTitleWrapper = kanban?.querySelectorAll('.e-kanban .e-kanban-table .e-header-cells');
  //   const kanbanColumnsTitle = kanban?.querySelectorAll('.e-kanban .e-kanban-table .e-header-cells .e-header-text');
  //   const kanbanColumnsItensCount = kanban?.querySelectorAll('.e-kanban .e-kanban-table .e-header-cells .e-item-count');
  //   const kanbanColumnsTitleWrapperClosed = kanban?.querySelectorAll('.e-kanban .e-kanban-header .e-header-cells.e-collapsed');
  //   const kanbanColumnsTitleClosedText = kanban?.querySelectorAll('.e-kanban .e-kanban-content .e-content-row .e-content-cells.e-collapsed .e-collapse-header-text');
  //   const kanbanColumnsTitleAndBodySections = kanban?.querySelectorAll('.e-kanban .e-kanban-table');
    
  //   const CustomKambanCard = document.querySelectorAll('.custom-kanban-card');
  //   const CustomKambanCardTitle = document.querySelectorAll('.custom-kanban-card-title');
  //   const CustomKambanCardSummary = document.querySelectorAll('.custom-kanban-card-summary');
    
  //   kanban?.classList.add(...`dark:bg-gray-800 bg-white rounded-lg`.split(' '))
  //   Array.from(kanbanColumns ?? []).map(item => item?.classList.add(...`dark:bg-gray-600 bg-gray-200 rounded-lg max-h-4`.split(' ')))
  //   Array.from(kanbanColumnsTitleWrapper ?? []).map(item => item?.classList.add(...`dark:bg-gray-600 dark:text-white bg-gray-200 text-white`.split(' ')))
  //   Array.from(kanbanColumnsTitle ?? []).map(item => item?.classList.add(...`dark:text-white text-black`.split(' ')))
  //   Array.from(kanbanColumnsItensCount ?? []).map(item => item?.classList.add(...`dark:text-gray-200 text-gray-800`.split(' ')))
  //   Array.from(kanbanColumnsTitleWrapperClosed ?? []).map(item => item?.classList.add(...`dark:bg-gray-600 dark:text-white bg-gray-200 text-white`.split(' ')))
  //   Array.from(kanbanColumnsTitleClosedText ?? []).map(item => item?.classList.add(...`dark:text-gray-200 text-gray-800`.split(' ')))
  //   Array.from(kanbanColumnsTitleAndBodySections ?? []).map(item => item?.classList.add(...`mt-2`.split(' ')))
  //   Array.from(CustomKambanCard ?? []).map(item => item?.classList.add(...`dark:bg-gray-500 bg-white p-5 rounded-lg`.split(' ')))
  //   Array.from(CustomKambanCardTitle ?? []).map(item => item?.classList.add(...`dark:text-white text-black`.split(' ')))
  //   Array.from(CustomKambanCardSummary ?? []).map(item => item?.classList.add(...`dark:text-gray-200 text-gray-800`.split(' ')))

  //   console.log('kanban', kanban)
  //   Array.from(kanbanColumns ?? []).map(item => console.log('kanbanColumns', item))
  //   Array.from(kanbanColumnsTitleWrapper ?? []).map(item => console.log('kanbanColumnsTitleWrapper', item))
  //   Array.from(kanbanColumnsTitle ?? []).map(item => console.log('kanbanColumnsTitle', item))
  //   Array.from(kanbanColumnsItensCount ?? []).map(item => console.log('kanbanColumnsItensCount', item))
  //   Array.from(kanbanColumnsTitleWrapperClosed ?? []).map(item => console.log('kanbanColumnsTitleWrapperClosed', item))
  //   Array.from(kanbanColumnsTitleClosedText ?? []).map(item => console.log('kanbanColumnsTitleClosedText', item))
  //   Array.from(kanbanColumnsTitleAndBodySections ?? []).map(item => console.log('kanbanColumnsTitleAndBodySections', item))
  //   Array.from(CustomKambanCard).map(item => console.log('CustomKambanCard', item))
  //   Array.from(CustomKambanCardTitle).map(item => console.log('CustomKambanCardTitle', item))
  //   Array.from(CustomKambanCardSummary).map(item => console.log('CustomKambanCardSummary', item))
    

  // }, []);
  
  return (
    <div className='dark:bg-gray-800 bg-white rounded-lg flex flex-col justify-center'>
      
      <CustomButton icon={<IoMdAdd />} text='Adicionar um item' onPress={() => setVisible(true)} />
      <AddItemDialog visible={visible} setVisible={setVisible} />

      <KanbanComponent
      id='kanban'
      height='auto'
      width='100%'
      dataSource={kanban.data}
      allowDragAndDrop
      cardSettings={{
        contentField:'Summary',
        headerField:'Id',
        template: KanbanCard,
      }}
      dialogSettings={{
        fields:[
          {
          key:'Title',
          text:'Título',
          type:'TextBox'
        },
          {
          key:'Summary',
          text:'Conteúdo',
          type:'TextBox'
        },
          {
          key:'Tags',
          text:'Tag',
          type:'TextBox'
        },
      ],
      
      }}
      // swimlaneSettings={{keyField:'Tags'}}
      keyField='Status'
      >
        <ColumnsDirective>
          {kanban.grid.map((item, i) => (
            <ColumnDirective key={i + 1} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};
