'use client'

import { Obj } from '@/common.types';
import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { Info } from '@/contexts/providers/InfoProvider/types';
import { SetBoolean, SetState } from '@/contexts/types';
import { KanbanDataItemType } from '@/data/kanan/types';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useEffect, useMemo, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import CustomButton from '../CustomButton';
import send from './functions/send';
import validFields from './functions/validFields';
import { Fields, FieldsKeys, Styles } from './types';


interface AddItemDialogProps {
  visible?:boolean;
  setVisible:SetBoolean;
  setInfo:SetState<Info>;
}

export default function AddItemDialog({ visible, setVisible, setInfo }:AddItemDialogProps) {
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

  const [opacity, setOpacity] = useState<boolean>(true);
  const [hidden, setHidden] = useState<boolean>(true);  

  const fields:Fields = {
    Title: {title: 'Título', required:true},
    Status: {title: 'Coluna', required:true, dropdown:['Pendente', 'Revisar', 'Terminado']},
    Summary: {title: 'Conteúdo', required:true},
    Type: {title: 'Tipo', required:false, dropdown:['História', 'Melhorias', 'Outros', 'Erro', 'Épico']},
    Priority: {title: 'Prioridade', required:false, dropdown:['Baixa', 'Média', 'Alta', 'Crítica']},
    Tags: {title: 'Tag', required:false},
    Assignee: {title: 'Responsável', required:false},
  };

  const allowSend = useMemo(() => {
    return validFields({fields, changes});
  }, [fields, changes]);
  
  
  const styles:Styles = {
    visible: {
      wrapper: 'dark:bg-gray-800 bg-white absolute rounded-lg flex justify-center items-center max-xl:top-[10%] max-xl:bottom-[10%] max-sm:top-[20%] max-sm:bottom-[20%] top-[5%] bottom-[5%] max-xl:left-[5%] max-xl:right-[5%] left-[25%] right-[25%] z-50 opacity-100',
      external: 'dark:bg-gray-700 bg-g`ray-200 flex flex-col gap-3 items-center justify-center rounded-lg w-[80%] self-center h-[90%] opacity-100',
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

  useEffect(() => {
    
  }, [])

  return (
    <div className={twMerge(styles.transition, opacity && 'top-[50%] bottom-[50%] left-[50%] right-[50%] h-0 w-0 opacity-0', !opacity && styles.visible.wrapper, hidden && 'hidden')}>
      <div className={twMerge(styles.transition,opacity && 'opacity-0 h-0 w-0', !opacity && styles.visible.external, hidden && 'hidden')}>
        <h2 className={twMerge('font-extrabold text-3xl dark:text-white text-black', opacity && 'hidden')}>Adicionar um item</h2>
        {(Object.keys(fields) as FieldsKeys[]).map((field, i:number) => (
          <div key={i + 1} className='w-[50%] flex self-center flex-col gap-1' >
            {fields[field].required && <span className={twMerge('text-red-600 hidden', !opacity && 'flex')}>* Obrigatório</span>}
            {(fields[field]?.dropdown ?? false) ? (
              <DropDownListComponent 
              dataSource={fields[field].dropdown} 
              className={twMerge('dropdown-kanban w-full rounded-lg px-3 py-2 pl-3 dark:bg-gray-500 bg-gray-200 dark:text-white placeholder:text-gray-800 placeholder:text-[15px] dark:placeholder:text-gray-200 dark:placeholder:text-[17px] text-black outline-none hidden', !opacity && 'flex')} 
              placeholder={fields[field].title}
              onChange={(e:any) => setChanges(prev => ({...prev, [field]:e.target.value}))}
              value={changes[field]}
              text={changes[field]}
              
              />
            ) : field === 'Summary' ? (
              <textarea
              title={fields[field].title} 
              placeholder={fields[field].title}
              className={twMerge('w-full rounded-lg px-3 py-2 dark:bg-gray-500 bg-gray-200 dark:text-white dark:placeholder:text-gray-200 text-black outline-none hidden', !opacity && 'flex')}
              onChange={(e) => setChanges(prev => ({...prev, [field]:e.target.value}))}
              value={changes[field]}
              />
            ) : (
              <input 
              type="text" 
              title={fields[field].title} 
              placeholder={fields[field].title} 
              className={twMerge('w-full rounded-lg px-3 py-2 dark:bg-gray-500 bg-gray-200 dark:text-white dark:placeholder:text-gray-200 text-black outline-none hidden', !opacity && 'flex')}
              onChange={(e) => setChanges(prev => ({...prev, [field]:e.target.value}))}
              value={changes[field]}
              />
            )}
          </div>
        ))}

        <div className={twMerge('flex-row gap-3 hidden', !opacity && 'flex')}>
          <CustomButton 
          disabled={!allowSend} 
          toolTip={!allowSend ? 'Insira os campos obrigatórios': ''} 
          className={!allowSend ? 'dark:bg-red-800 dark:hover:bg-red-600 bg-red-500 hover:bg-red-200': ''} 
          onPress={() => send({ changes, baseURL, setGlobalData, setChanges, setVisible, setOpacity, setHidden, setInfo })} 
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
