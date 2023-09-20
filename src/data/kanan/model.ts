import { KanbanGridType } from './types';


export const kanbanGrid:KanbanGridType = [
  { headerText: 'To Do',
    keyField: 'Open',
    allowToggle: true,
  },

  { headerText: 'In Progress',
    keyField: 'InProgress',
    allowToggle: true },

  { headerText: 'Testing',
    keyField: 'Testing',
    allowToggle: true,
    isExpanded: false },

  { headerText: 'Done',
    keyField: 'Close',
    allowToggle: true },
];
