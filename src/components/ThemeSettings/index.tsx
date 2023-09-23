'use client'

import { useGlobalState } from '@/contexts/providers/GlobalProvider/GlobalContext';
import { themeColors } from '@/data/dummyTSX';
import { ChangeEvent } from 'react';
import { BsCheck } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import ToolTipClientComponent from '../ToolTipClientComponent';


interface ThemeSettingsProps {

}

export default function ThemeSettings({  }:ThemeSettingsProps) {
  const globalState = useGlobalState();
  const [openTheme, setOpenTheme ] = globalState.openTheme;

  function setColor(color:string) {
    localStorage.setItem('themeColor', color);
    setOpenTheme(prev => ({...prev, currentColor: color, open:false}))
  }

  function setMode(e:ChangeEvent<HTMLInputElement>) {
    console.log('event', e);
    
    localStorage.setItem('themeMode', e.target.value);
    setOpenTheme(prev => ({...prev, currentMode: e.target.value as 'Light' | 'Dark', open:false}))
  }

  return (
    <div className={`dark:bg-[rgba(0,0,0,.7)] bg-[rgba(255,255,255,.5)] w-screen fixed top-0 right-0 z-50 ${openTheme.open ? 'block' : 'hidden'}`}>
      <div className='float-right h-screen bg-white dark:bg-gray-900 dark:text-gray-200 dark:[rgba(0,0,0,.5)] w-[400px]'>
        <div className='flex justify-between items-center p-4 ml-4'>
          <p className='font-semibold text-xl dark:text-white text-black'>Opções</p>
          <ToolTipClientComponent position='BottomCenter' content='Fechar'>
            <button 
            className='dark:text-[rgb(153,171,180)] text-[rgb(50,50,50)] rounded-full text-2xl p-3 hover:text-[rgb(50,70,80)] hover:bg-[rgb(200,200,200)]'
            onClick={() => setOpenTheme(prev => ({...prev, open:false}))}
            >
              <MdOutlineCancel />
            </button>
          </ToolTipClientComponent>
        </div>

          <div className='flex-col border-t-[1px] dark:border-gray-200 border-gray-900 p-4 ml-4'>
            <p className='font-semibold text-lg dark:text-white text-black'>
              Opções do Tema
            </p>            
          </div>

          <div className='ml-4'>
            <div className='mt-4'>
              <input 
              type="radio" 
              id='light' 
              name='theme'
              value='Light'
              className='cursor-pointer'
              onChange={setMode}
              checked={openTheme.currentMode === 'Light'}
              />
              <label 
              htmlFor="light"
              className='ml-2 text-base cursor-pointer dark:text-white text-black'
              >
                Light
              </label>
            </div>

            <div className='mt-4'>
              <input 
              type="radio" 
              id='dark' 
              name='theme' 
              value='Dark'          
              className='cursor-pointer'
              onChange={setMode}
              checked={openTheme.currentMode === 'Dark'}
              />
              <label 
              htmlFor="dark"
              className='ml-2 text-base cursor-pointer dark:text-white text-black'
              >
                Dark
              </label>
            </div>
          </div>

          <div className='flex-col border-t-[1px] dark:border-gray-200 border-gray-900 p-4 ml-4'>
            <p className='font-semibold text-lg'>
              Cores do Tema
            </p>    
            <div className='flex gap-3'>
              {themeColors.map((color, i) => (
                <ToolTipClientComponent key={i + 1} content={color.name} position='BottomCenter' >
                  <div className='relative mt-2 cursor-pointer gap-5 items-center'>
                    <button 
                    type='button'
                    className='h-10 w-10 rounded-full cursor-pointer'
                    style={{backgroundColor:color.color}}
                    onClick={() => setColor(color.color)}
                    >
                      <BsCheck className={`ml-2 text-2xl text-white ${color.color === openTheme.currentColor ? 'block' : 'hidden'}`} />
                    </button>
                  </div>
                </ToolTipClientComponent>
              ))}
            </div>        
          </div>
          
      </div>
    </div>
  );
};
