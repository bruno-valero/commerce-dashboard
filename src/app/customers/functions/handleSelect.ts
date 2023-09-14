import { nullish } from '@/common.types';
import { RowSelectEventArgs } from '@syncfusion/ej2-react-grids/index';
import { Dispatch, SetStateAction } from 'react';
import { CheckedDataRow, CheckedItems } from '../components/CustomersList';
import getGridItemData from './getGridItemData';

export default function handleSelect({ e, setCheckedItems }:HandleSelectPropsType):void {
  const data = e.data as CheckedDataRow | nullish;
  if (!data) return;
  
  const itemData = getGridItemData(data);

  if (Array.isArray(itemData)) {
    return setCheckedItems(prev => [...prev, ...itemData]);
  };
  
  setCheckedItems(prev => [...prev, itemData]);
};


export type HandleSelectPropsType = {
  e:RowSelectEventArgs,
  setCheckedItems: Dispatch<SetStateAction<CheckedItems>>
};

export type HandleSelectType = (props:HandleSelectPropsType) => void;