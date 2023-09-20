import { Obj } from '@/common.types';

export type FetchAuthInit = RequestInit & {data: {id:string, user:string, body?:Obj<any>}};
export type FetchAuthInput = RequestInfo | URL;
export type FetchAuthProps = { input: FetchAuthInput, init: FetchAuthInit, registeredDomains?:string };

export type SendAuthPostRequest<T> = {body?:T, id:string, user:string};