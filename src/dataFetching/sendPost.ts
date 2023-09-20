export default async function sendPost({ input, init }:SendPostPropsType):Promise<any> {
  const body = JSON.stringify(init?.body);
  const method = 'POST';  
  const options = { ...init, body, method };
  const response = await fetch(input, options);
  return response;
}

type SendPostPropsType = { input: RequestInfo | URL, init?: RequestInit }