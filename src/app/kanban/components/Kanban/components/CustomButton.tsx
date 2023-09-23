'use client'

import ToolTipClientComponent from '@/components/ToolTipClientComponent';
import { ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

interface CustomButtonProps {
  icon?: ReactElement;
  text:string;
  className?:string;
  toolTip?:string;
  disabled?:boolean;
  onPress?:() => void;
}

export default function CustomButton({ icon, text, onPress, disabled, className, toolTip }:CustomButtonProps) {
  return (
    toolTip ? (
    <ToolTipClientComponent content={toolTip} position='BottomCenter'  height={30} >
      <button disabled={disabled} onClick={onPress} className={twMerge('dark:bg-gray-800 dark:hover:bg-gray-600 bg-gray-100 hover:bg-gray-300 dark:text-white text-[16px] text-black font-inter rounded-lg flex self-center my-5', className)}>
        <div className='my-2 mx-5 flex justify-center items-center gap-2'>
          {icon && (<span>{icon}</span>)}
          <span>
            {text}          
          </span>
        </div>
      </button>
    </ToolTipClientComponent>
    ) : (
      <button disabled={disabled} onClick={onPress} className={twMerge('dark:bg-gray-800 dark:hover:bg-gray-600 bg-white hover:bg-gray-200 dark:text-white text-[16px] text-black font-inter rounded-lg flex self-center my-5', className)}>
        <div className='my-2 mx-5 flex justify-center items-center gap-2'>
          {icon && (<span>{icon}</span>)}
          <span>
            {text}          
          </span>
        </div>
      </button>
    )
  );
};
