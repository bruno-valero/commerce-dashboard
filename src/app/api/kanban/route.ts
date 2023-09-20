import { kanbanData } from '@/data/kanan/data';
import { KanbanDataType } from '@/data/kanan/types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/kanban');

};

export async function POST(req:Request):Promise<NextResponse<KanbanDataType>> {  
  const baseURL:string = process.env.BASE_URL as string;
  const data = await req.json();
  console.log('data on kanban Post', data);
  // redirect(baseURL + '/orders');
  return NextResponse.json(kanbanData);
}

export type ResponseKanbanRead = Promise<NextResponse<KanbanDataType>>;