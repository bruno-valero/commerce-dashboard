import { Obj } from '@/common.types';

export default async function sendAuthPost({ input, init }:SendAuthPostPropsType):Promise<Response | null> {
  const initBody = init?.data?.body;
  const id = init?.data.id;
  const user = init?.data.user;
  const body = JSON.stringify({body:initBody, id, user});
  const method = 'POST'; 
  const headers = {
    'Content-Type': 'application/json',
  };
  const options = { ...init, body, method, headers };
  const response = await fetch(input, options);
  if (!response.ok) return null;
  return response;
}

type SendAuthPostPropsType = { input: RequestInfo | URL, init?: RequestInit & {data: {id:string, user:string, body?:Obj<any>}} }