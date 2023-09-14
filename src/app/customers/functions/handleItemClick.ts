import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { CheckedItems } from '../components/CustomersList';
import deleteCustommers from './deleteCustommers';

export default function handleItemClick({ e, setCheckedItems, checkedItems }:HandleItemClickPropsType):void {
  // @ts-expect-error
  if (!e.target.parentElement) return;
  const element = e.target as HTMLElement;
  // console.log(element);
  
  const isSpan = element.tagName === 'SPAN';
  const delClassName = element.classList.contains('e-tbar-btn-text') || element.classList.contains('e-delete');
  const delText = element.innerText === 'Delete';
  if ((isSpan && delClassName) || (isSpan && delClassName && delText)) {
    deleteCustommers({ checkedItems })
    
    return;
  };
  
  if (/Go to /g.test(element.title) || /Goto page/g.test(element.getAttribute('name') ?? '')) {
    setCheckedItems([]);
  };  
};


export type HandleItemClickPropsType = {
  e: MouseEvent,
  setCheckedItems: Dispatch<SetStateAction<CheckedItems>>,
  checkedItems: CheckedItems,
};

export type HandleItemClickType = (props:HandleItemClickPropsType) => void;