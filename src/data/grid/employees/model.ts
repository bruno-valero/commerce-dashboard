import { GridType } from '../types';
import { gridEmployeeCountry, gridEmployeeProfile } from './components';

export const employeesGrid:GridType = [
  
  { type: 'checkbox', width: '50' },

  { field: 'Image',
    headerText: 'Foto',
    width: '150',
    template: gridEmployeeProfile,
    textAlign: 'Center' },

  { field: 'Name',
    headerText: 'Nome',
    width: '170',
    textAlign: 'Left',
  },

  { field: 'Title',
    headerText: 'Qualificação',
    width: '170',
    textAlign: 'Center',
  },

  { field: 'Country',
    headerText: 'País',
    width: '120',
    textAlign: 'Center',
    template: gridEmployeeCountry },

  { field: 'HireDate',
    headerText: 'Data de Admissão',
    width: '135',
    format: 'yMd',
    textAlign: 'Center' },

  { field: 'ReportsTo',
    headerText: 'Responde a',
    width: '120',
    textAlign: 'Center' },

  { field: 'Id',
    headerText: 'ID do Funcionário',
    width: '125',
    textAlign: 'Center',
    allowEditing: false,
    isPrimaryKey: true,
  },
];