import { CheckedDataRow, CheckedItem } from '../components/CustomersList';

export default function getGridItemData(data:CheckedDataRow):GetGridItemDataReturnType {
  if (Array.isArray(data)) {
    const gridItems:Array<CheckedItem> = data.map(item => ({
      name: item.CustomerName,
      email: item.CustomerEmail,
      projectName:item.ProjectName,
      status:item.Status,
      weeks:item.Weeks,
      budget:item.Budget,
      location:item.Location,
      customerId:item.CustomerID,
    }));
    return gridItems;
  };

  const gridItem:CheckedItem = {
    name: data.CustomerName,
    email: data.CustomerEmail,
    projectName:data.ProjectName,
    status:data.Status,
    weeks:data.Weeks,
    budget:data.Budget,
    location:data.Location,
    customerId:data.CustomerID,
  };
  return gridItem;
  
};


export type GetGridItemDataReturnType = CheckedItem | Array<CheckedItem>;

export type GetGridItemDataType = (data:CheckedDataRow) => GetGridItemDataReturnType;