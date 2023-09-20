import insertRegisteredDomains, { InsertRegisteredDomainsReturnType } from '@/app/functions/insertRegisteredDomains';
import { GridsDataItemTypes } from '@/data/grid/types';
import sendAuthPost from './sendAuthPost';
import { FetchAuthProps } from './types';

export default async function fetchAuthJson({ input, init, registeredDomains }:FetchAuthJsonPropsType):Promise<any | InsertRegisteredDomainsReturnType<GridsDataItemTypes>> {
  const response = await (await sendAuthPost({ input, init})).json();
  if (registeredDomains) {
    const insertedDomains = insertRegisteredDomains(response, registeredDomains) as InsertRegisteredDomainsReturnType<GridsDataItemTypes>
    return insertedDomains;
  }
  return response;
}

type FetchAuthJsonPropsType = FetchAuthProps;