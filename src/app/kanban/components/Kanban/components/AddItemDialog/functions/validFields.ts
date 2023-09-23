import { KanbanDataItemType } from '@/data/kanan/types';
import { Fields, FieldsKey, FieldsKeys } from '../types';

export type ValidFieldsPropsType = {
  fields:Fields,
  changes:KanbanDataItemType,
}

export default function validFields({ fields,  changes}:ValidFieldsPropsType):boolean {
  const fieldsKeys = Object.keys(fields) as FieldsKeys[];
  const faults = [];
  fieldsKeys.map(key => {
    const field = fields[key] as FieldsKey;
    if (field.required && !changes[key]) {
      faults.push(key);
    };
  });
  return faults.length === 0;
};