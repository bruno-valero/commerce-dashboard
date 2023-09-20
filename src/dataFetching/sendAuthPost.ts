import { Obj } from '@/common.types';

export default async function sendAuthPost({ input, init }:SendAuthPostPropsType):Promise<any> {
  const initBody = init?.data?.body;
  const id = init?.data.id;
  const user = init?.data.user;
  const body = JSON.stringify({body:initBody, id, user});
  const method = 'POST';  
  const options = { ...init, body, method };
  const response = await fetch(input, options);
  return response;
}

type SendAuthPostPropsType = { input: RequestInfo | URL, init?: RequestInit & {data: {id:string, user:string, body?:Obj<any>}} }