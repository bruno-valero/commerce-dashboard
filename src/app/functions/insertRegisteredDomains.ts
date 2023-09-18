import { Object } from '@/common.types';

export default function insertRegisteredDomains(data:Array<Object>, envDomains:string) {
    const newData = data.map(item => {  
    const registeredDomains:Array<string> = envDomains.split(',');
    return {...item, registeredDomains};
  });

  return newData;
};

export type InsertRegisteredDomainsReturnType<T> = Array<T & {registeredDomains:Array<string>}>;
export type RegisteredDomains = {registeredDomains?:Array<string>};