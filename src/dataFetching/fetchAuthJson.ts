import insertRegisteredDomains, { InsertRegisteredDomainsReturnType } from '@/app/functions/insertRegisteredDomains';
import { Obj } from '@/common.types';
import { GridsDataItemTypes } from '@/data/grid/types';
import sendAuthPost from './sendAuthPost';
import { FetchAuthProps } from './types';

export default async function fetchAuthJson({ input, init, registeredDomains }:FetchAuthJsonPropsType):Promise<any | InsertRegisteredDomainsReturnType<GridsDataItemTypes | null>> {
  const response = await (await sendAuthPost({ input, init}))?.json() ?? null as Obj<any>[] | any[] | null;
  if (registeredDomains) {
    const insertedDomains = insertRegisteredDomains(response ?? [], registeredDomains) as InsertRegisteredDomainsReturnType<GridsDataItemTypes>
    return insertedDomains;
  }
  return response;
}

type FetchAuthJsonPropsType = FetchAuthProps;