import { KanbanGridType } from './types';

export const kanbanGrid:KanbanGridType = [
  { headerText: 'A Fazer',
    keyField: 'Pendente',
    allowToggle: true,
  },

  { headerText: 'Em progresso',
    keyField: 'EmProgresso',
    allowToggle: true },

  { headerText: 'Testando',
    keyField: 'Revisar',
    allowToggle: true,
    isExpanded: false },

  { headerText: 'Concluído',
    keyField: 'Terminado',
    allowToggle: true },
];
