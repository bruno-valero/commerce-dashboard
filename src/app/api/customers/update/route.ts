import { GridsDataItemTypes } from '@/data/grid/types';
import { SendAuthPostRequest } from '@/dataFetching/types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { RequestError } from '../../types';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/customer');

};

export async function POST(req:Request):Promise<NextResponse<ResponseCustomersUpdate>> {
  const { body:update, id, user } = (await req.json() as SendAuthPostRequest<Array<GridsDataItemTypes>>);
  if (!update) return NextResponse.json({ error:'Está faltando o body da requisição' });
  console.log('data on customers update Post', update);
  return NextResponse.json({ update });
};

export type ResponseCustomersUpdateOk = { update: Array<GridsDataItemTypes> };
export type ResponseCustomersUpdate = ResponseCustomersUpdateOk | RequestError;