'use client'

import { ResponseKanbanCreateOk } from '@/app/api/kanban/create/route';
import { Obj } from '@/common.types';
import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { DataState } from '@/contexts/providers/GlobalProvider/types';
import { SetBoolean, SetState } from '@/contexts/types';
import { KanbanDataItemType } from '@/data/kanan/types';
import fetchAuthJson from '@/dataFetching/fetchAuthJson';
import getKanban from '@/dataFetching/getKanban';
import { FetchAuthInit } from '@/dataFetching/types';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useEffect, useMemo, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import CustomButton from './CustomButton';


interface AddItemDialogProps {
  visible?:boolean;
  setVisible:SetBoolean;
}

export default function AddItemDialog({ visible, setVisible }:AddItemDialogProps) {
  const globalState = useGlobalState();
  const [globalData, setGlobalData] = globalState.data;
  const kanban = globalData.kanban;
  const baseURL = globalData.baseURL; 

  const [changes, setChanges] = useState<KanbanDataItemType>({
    Id: 1,
    Title: '',
    Status: '',
    Summary: '',
    Type: '',
    Priority: '',
    Tags: '',
    Estimate: '' as unknown as number,
    Assignee: '',
    RankId: 1,
  });

  const [opacity, setOpacity] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  
  
  
  type FieldsKey = {title:string, required:boolean, dropdown?:string[]};
  
  type Fields = {
    Title: FieldsKey,
    Status: FieldsKey,
    Summary: FieldsKey,
    Type: FieldsKey,
    Priority: FieldsKey,
    Tags: FieldsKey,
    Assignee: FieldsKey,
  }

  type FieldsKeys = 'Title' | 'Status' | 'Summary' | 'Type' | 'Priority' | 'Tags' | 'Assignee' ;

  const fields:Fields = {
    Title: {title: 'Título', required:true},
    Status: {title: 'Coluna', required:true, dropdown:['Pendente', 'Revisar', 'Terminado']},
    Summary: {title: 'Conteúdo', required:true},
    Type: {title: 'Tipo', required:false, dropdown:['História', 'Melhorias', 'Outros', 'Erro', 'Épico']},
    Priority: {title: 'Prioridade', required:false, dropdown:['Baixa', 'Média', 'Alta', 'Crítica']},
    Tags: {title: 'Tag', required:false},
    Assignee: {title: 'Responsável', required:false},
  };

  
  type ValidFieldsPropsType = {
    fields:Fields,
    changes:KanbanDataItemType,
  }
  
  function validFields({ fields,  changes}:ValidFieldsPropsType):boolean {
    const fieldsKeys = Object.keys(fields) as FieldsKeys[];
    const faults = [];
    fieldsKeys.map(key => {
      const field = fields[key] as FieldsKey;
      if (field.required && !changes[key]) {
        faults.push(key);
      };
    });
    return faults.length === 0;
  };

  const allowSend = useMemo(() => {
    return validFields({fields, changes});
  }, [fields, changes]);
  
  type sendPropsType = {
    baseURL:string;
    changes:KanbanDataItemType,
    setGlobalData:SetState<DataState>,
    setChanges:SetState<KanbanDataItemType>,
    setVisible:SetBoolean,
    setOpacity:SetBoolean,
    setHidden:SetBoolean,
  }
  
  async function send({ changes, baseURL, setGlobalData, setChanges, setVisible, setOpacity, setHidden }:sendPropsType) {

    const init:FetchAuthInit = {
      data: {id: '123456', user:'bruno'}
    };
    const newData = {
      Id: Math.max(...(await getKanban({ baseURL, init })).map(item => item.Id) as Array<number>) + 1,
      Title:changes['Title'],
      Status:changes['Status'],
      Summary:changes['Summary'],
      Type:changes['Type'] ?? 'Outros',
      Priority:changes['Priority'] ?? 'Baixa',
      Tags:changes['Tags'] ?? 'qualquer',
      Estimate:changes['Estimate'] ?? 3,
      Assignee:changes['Assignee'] ?? 'qualquer',
      RankId:changes['RankId'] ?? '1',
    };

    const createUrl = baseURL + '/api/kanban/create'
    const response:ResponseKanbanCreateOk = await fetchAuthJson({input:createUrl, init:{...init, data:{id: '123456', user:'bruno', body:[newData]}}});
    setGlobalData(prev => ({...prev, kanban:{...prev.kanban, data: [...prev.kanban.data, ...response.create]}}))
    setChanges({
      Id: 1,
      Title: '',
      Status: '',
      Summary: '',
      Type: '',
      Priority: '',
      Tags: '',
      Estimate: '' as unknown as number,
      Assignee: '',
      RankId: 1,
    })
    setVisible(false);
    setOpacity(false); 
    setHidden(true);
  };

  type Styles = {
    visible: {
      wrapper: 'top-[50%] bottom-[50%] left-[50%] right-[50%] h-0 w-0 opacity-0',
      external: 'opacity-0 h-0 w-0',
    },
    transition: 'ease-in-out duration-500'
  }
  const styles:Styles = {
    visible: {
      wrapper: 'top-[50%] bottom-[50%] left-[50%] right-[50%] h-0 w-0 opacity-0',
      external: 'opacity-0 h-0 w-0',
    },
    transition: 'ease-in-out duration-500'
  }

  useEffect(() => {
    const time:Obj<any> = {}
    if (!visible) {
      
      setOpacity(true);      
      if (opacity) {
        time['hidden'] = setTimeout(() => {
          setHidden(true);          
        }, 1500);
      }
    } else {
      setHidden(false); 
      time['opacity'] = setTimeout(() => {
        setOpacity(false);   
      }, 50);   

    }

    return () => {
      clearTimeout(time['opacity']);
      clearTimeout(time['hidden']);
    }
  }, [visible, opacity]);

  return (
    <div className={twMerge('dark:bg-gray-800 bg-white absolute max-xl:top-[10%] max-xl:bottom-[10%] max-sm:top-[20%] max-sm:bottom-[20%] top-[5%] bottom-[5%] max-xl:left-[5%] max-xl:right-[5%] left-[25%] right-[25%] z-50 rounded-lg flex justify-center items-center', styles.transition, opacity && styles.visible.wrapper, hidden && 'hidden')}>
      <div className={twMerge('dark:bg-gray-700 bg-g`ray-200 flex flex-col gap-3 w-[80%] self-center h-[90%] items-center justify-center rounded-lg', styles.transition, opacity && styles.visible.external, hidden && 'hidden')}>
        <h2 className={twMerge('font-extrabold text-3xl dark:text-white text-black', opacity && 'hidden')}>Adicionar um item</h2>
        {(Object.keys(fields) as FieldsKeys[]).map((field, i:number) => (
          <div key={i + 1} className='w-[50%] flex self-center flex-col gap-1' >
            {fields[field].required && <span className={twMerge('text-red-600', opacity && 'hidden')}>* Obrigatório</span>}
            {(fields[field]?.dropdown ?? false) ? (
              <DropDownListComponent 
              dataSource={fields[field].dropdown} 
              className={twMerge('dropdown-kanban w-full rounded-lg px-3 py-2 pl-3 dark:bg-gray-500 bg-gray-200 dark:text-white placeholder:text-gray-800 placeholder:text-[15px] dark:placeholder:text-gray-200 dark:placeholder:text-[17px] text-black outline-none', opacity && 'hidden')} 
              placeholder={fields[field].title}
              onChange={(e:any) => setChanges(prev => ({...prev, [field]:e.target.value}))}
              value={changes[field]}
              />
            ) : field === 'Summary' ? (
              <textarea
              title={fields[field].title} 
              placeholder={fields[field].title}
              className={twMerge('w-full rounded-lg px-3 py-2 dark:bg-gray-500 bg-gray-200 dark:text-white dark:placeholder:text-gray-200 text-black outline-none', opacity && 'hidden')}
              onChange={(e) => setChanges(prev => ({...prev, [field]:e.target.value}))}
              value={changes[field]}
              />
            ) : (
              <input 
              type="text" 
              title={fields[field].title} 
              placeholder={fields[field].title} 
              className={twMerge('w-full rounded-lg px-3 py-2 dark:bg-gray-500 bg-gray-200 dark:text-white dark:placeholder:text-gray-200 text-black outline-none', opacity && 'hidden')}
              onChange={(e) => setChanges(prev => ({...prev, [field]:e.target.value}))}
              value={changes[field]}
              />
            )}
          </div>
        ))}

        <div className={twMerge('flex flex-row gap-3', opacity && 'hidden')}>
          <CustomButton 
          disabled={!allowSend} 
          toolTip={!allowSend ? 'Insira os campos obrigatórios': ''} 
          className={!allowSend ? 'dark:bg-red-800 dark:hover:bg-red-600 bg-red-500 hover:bg-red-200': ''} 
          onPress={() => send({ changes, baseURL, setGlobalData, setChanges, setVisible, setOpacity, setHidden })} 
          text='Criar' icon={<IoMdAdd />} />
          <CustomButton 
          onPress={() => {setVisible(false), setOpacity(false); setHidden(true)}} 
          text='Cancelar' 
          icon={<MdOutlineCancelPresentation />} 
          />
        </div>
        
      </div>
    </div>
  );

};
