import { CheckedItems } from '../components/CustomersList';

export default async function deleteCustommers({ checkedItems }:DeleteCustommersPropsType):Promise<void> {
  alert('deletando ' + checkedItems.map(item => [item.name, item.customerId].join(': ')).join(', '));
  
};

export type  DeleteCustommersPropsType = {
  checkedItems: CheckedItems,
};

export type  DeleteCustommersType = (props:DeleteCustommersPropsType) => Promise<void>;