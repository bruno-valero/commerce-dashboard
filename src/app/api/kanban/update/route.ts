import { KanbanDataItemType } from '@/data/kanan/types';
import { SendAuthPostRequest } from '@/dataFetching/types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { RequestError } from '../../types';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/kanban');

};

export async function POST(req:Request):Promise<NextResponse<ResponseKanbanUpdate>> {
  const { body:update, id, user } = (await req.json() as SendAuthPostRequest<Array<KanbanDataItemType>>);
  if (!update) return NextResponse.json({ error:'Está faltando o body da requisição' });  
  console.log('data on kanban update Post', update);
  return NextResponse.json({ update });
};

export type ResponseKanbanUpdateOk = { update: Array<KanbanDataItemType> };
export type ResponseKanbanUpdate = ResponseKanbanUpdateOk | RequestError;