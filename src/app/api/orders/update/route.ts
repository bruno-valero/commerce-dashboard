import { GridsDataItemTypes } from '@/data/grid/types';
import { SendAuthPostRequest } from '@/dataFetching/types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { RequestError } from '../../types';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/orders');

};

export async function POST(req:Request):Promise<NextResponse<ResponseOrdersUpdate>> {
  const { body:update, id, user } = (await req.json() as SendAuthPostRequest<Array<GridsDataItemTypes>>);
  if (!update) return NextResponse.json({ error:'Está faltando o body da requisição' });  
  console.log('data on orders update Post', update);
  return NextResponse.json({ update });
};

export type ResponseOrdersUpdateOk = { update: Array<GridsDataItemTypes> };
export type ResponseOrdersUpdate = ResponseOrdersUpdateOk | RequestError;