import { KanbanDataItemType } from './types';

export default function KanbanCard(props:KanbanDataItemType) {
  return (
    <div className='custom-kanban-card'>
      <h3 className='custom-kanban-card-title'>
        {props.Title}
      </h3>
      <p className='custom-kanban-card-summary'>
        {props.Summary}
      </p>
    </div>
  )
}

export function KanbanColumn(props:any) {

  return (
    <div style={{backgroundColor:'rgba(255,255,255,.8)', padding:15, borderRadius:10, width:'100%'}}>
      <h2 style={{color:'black'}}>
        {props.headerText}
      </h2>
    </div>
  )
}