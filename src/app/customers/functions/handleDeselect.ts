import { nullish } from '@/common.types';
import { RowDeselectEventArgs } from '@syncfusion/ej2-react-grids/index';
import { Dispatch, SetStateAction } from 'react';
import { CheckedDataRow, CheckedItems } from '../components/CustomersList';
import getGridItemData from './getGridItemData';

export default function handleDeselect({ e, setCheckedItems }:HandleDeselectPropsType):void {
  const data = e.data as CheckedDataRow | nullish;
  if (!data) return;
  
  const itemData = getGridItemData(data);
  
  if (Array.isArray(itemData)) {
    return setCheckedItems(prev => prev.filter(item => !itemData.map(data => data.customerId).includes(item.customerId)));
  };
  
  setCheckedItems(prev => prev.filter(item => item.customerId !== itemData.customerId));
};


export type HandleDeselectPropsType = {
  e:RowDeselectEventArgs,
  setCheckedItems: Dispatch<SetStateAction<CheckedItems>>
};

export type HandleDeselectType = (props:HandleDeselectPropsType) => void;