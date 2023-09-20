import { GridType } from '../types';
import { customerGridBudget, customerGridImage, customerGridStatus } from './components';

export const customersGrid:GridType = [

  { type: 'checkbox', width: '50' },

  { field: 'Image',    
    headerText: 'Foto',
    width: '150',
    template: customerGridImage,
    textAlign: 'Center' },

  { field: 'Name',
    headerText: 'Nome',
    width: '150',
    textAlign: 'Center' },

  { field: 'Email',
    headerText: 'Email',
    width: '150',
    textAlign: 'Center' },

  { field: 'ProjectName',
    headerText: 'Nome do Projeto',
    width: '150', 
    textAlign: 'Center' },

  { field: 'Status',
    headerText: 'Status',
    width: '130',
    format: 'yMd',
    textAlign: 'Center',
    editType: 'dropdownedit',
    template: customerGridStatus },

  {field: 'Weeks',
    headerText: 'Semanas',
    width: '100',
    format: 'C2',
    textAlign: 'Center' },

  { field: 'Budget',
    headerText: 'Budget',
    width: '100',
    format: 'C2',
    template: customerGridBudget,
    editType: 'numericedit',
    textAlign: 'Center' },

  { field: 'Location',
    headerText: 'Localização',
    width: '150',
    textAlign: 'Center' },

  { field: 'Id',
    headerText: 'ID do Cliente',
    width: '120',
    textAlign: 'Center',
    isPrimaryKey: true,
    allowEditing: false,
  },

];