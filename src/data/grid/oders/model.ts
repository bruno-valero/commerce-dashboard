import { GridType } from '../types';
import { gridOrderImage, gridOrderStatus } from './components';

export const ordersGrid:GridType = [
  { type: 'checkbox', width: '50' },
  {
    field: 'Image',
    headerText: 'Imagem',
    template: gridOrderImage,
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'Name',
    headerText: 'Nome do Item',
    width: '150',
    editType: 'dropdownedit',
    textAlign: 'Center',
  },
  { field: 'CustomerName',
    headerText: 'Nome do Cliente',
    width: '150',
    textAlign: 'Center',
  },
  {
    field: 'TotalAmount',
    headerText: 'Quantia Total',
    format: 'C2',
    textAlign: 'Center',
    editType: 'numericedit',
    width: '150',
  },
  {
    field: 'Status',
    headerText: 'Status',
    template: gridOrderStatus,
    editType: 'dropdownedit',
    textAlign: 'Center',
    width: '120',
  },
  {
    field: 'Id',
    headerText: 'ID do Pedido',
    width: '120',
    textAlign: 'Center',
    allowEditing: false,
    isPrimaryKey: true,
  },

  {
    field: 'Location',
    headerText: 'Localização',
    width: '150',
    textAlign: 'Center',
  },
];