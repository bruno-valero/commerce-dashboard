'use client'

import { SetState } from '@/contexts/providers/GlobalProvider';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Info } from '../../page';

interface InfoCalendarProps {
  visible: boolean;
  text:string;
  changed:boolean;
  setInfo: SetState<Info>;
}

export default function InfoCalendar({ visible, text, changed, setInfo }:InfoCalendarProps) {
  const [hidden, setHidden] = useState<string>(visible ? '' : 'hidden');
  const [opacity, setOpacity] = useState<string>(visible ? 'opacity-100' : 'opacity-0');
  const [mouseOver, setMouseOver] = useState<boolean>(false);


  useEffect(() => {
    console.log('text.length', text.length);
    
    const time:Record<string, any> = {}
    if (visible) {
      setHidden('');    
      
      time['opacity'] = setTimeout(() => {
        setOpacity('opacity-100');
      }, 100);

      time['visible'] = setTimeout(() => {
        setInfo(prev => ({...prev, visible:false}));
      }, 1500);

    } else {
      if (changed) return setInfo(prev => ({...prev, changed:false, visible:true }));;
      if (mouseOver) return;

      setOpacity('opacity-0');

      time['hidden'] = setTimeout(() => {
        setHidden('hidden');
      }, 1000);  
      

    };




    return () => {

      if (time['opacity']) {
        clearTimeout(time['opacity']);
      };

      if (time['visible']) {
        clearTimeout(time['visible']);
      };

      if (time['hidden']) {
        clearTimeout(time['hidden']);
      };

    };
  }, [visible, changed, mouseOver, text]);

  return (
    <div 
    className={twMerge('absolute z-50 top-[3.7rem] left-60 bg-green-500 rounded-lg ease-in-out duration-500 cursor-default max-w-[500px]', hidden, opacity, mouseOver && 'bg-green-700', text.length >= 60 && 'top-[3rem]', text.length >= 120 && 'top-[2rem]')}
    onMouseOver={() => setMouseOver(true)}
    onMouseLeave={() => setMouseOver(false)}
    onTouchStart={() => setMouseOver(true)}
    onTouchEnd={() => setMouseOver(false)}
    >
      <p className='mx-5 my-2'>
        {text}       
      </p>
    </div>
  );
};
