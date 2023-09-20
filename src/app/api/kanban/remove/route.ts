import { GridsDataItemTypes } from '@/data/grid/types';
import { SendAuthPostRequest } from '@/dataFetching/types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { RequestError } from '../../types';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/kanban');

};

export async function POST(req:Request):Promise<NextResponse<ResponseKanbanRemove>> {
  const { body:remove, id, user } = (await req.json() as SendAuthPostRequest<Array<GridsDataItemTypes>>);
  if (!remove) return NextResponse.json({ error:'Está faltando o body da requisição' });
  console.log('data on kanban remove Post', remove);
  return NextResponse.json({ remove });
};

export type ResponseKanbanRemoveOk = { remove: Array<GridsDataItemTypes> };
export type ResponseKanbanRemove = ResponseKanbanRemoveOk | RequestError;