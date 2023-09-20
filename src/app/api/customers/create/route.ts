import { GridsDataItemTypes } from '@/data/grid/types';
import { SendAuthPostRequest } from '@/dataFetching/types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { RequestError } from '../../types';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/customers');

};

export async function POST(req:Request):Promise<NextResponse<ResponseCustomersCreate>> {
  const { body:create, id, user } = (await req.json() as SendAuthPostRequest<Array<GridsDataItemTypes>>);
  if (!create) return NextResponse.json({ error:'Está faltando o body da requisição' });  
  console.log('data on customers create Post', create);

  return NextResponse.json({ create });
};

export type ResponseCustomersCreateOk = { create: Array<GridsDataItemTypes> };
export type ResponseCustomersCreate = ResponseCustomersCreateOk | RequestError;