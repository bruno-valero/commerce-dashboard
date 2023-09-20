import { ScheduleDataItemType } from '@/common.types';
import { SendAuthPostRequest } from '@/dataFetching/types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { RequestError } from '../../types';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/calendar');

};

export async function POST(req:Request):Promise<NextResponse<ResponseCalendarUpdate>> {
  const { body:update, id, user } = (await req.json() as SendAuthPostRequest<Array<ScheduleDataItemType>>);
  if (!update) return NextResponse.json({ error:'Está faltando o body da requisição' });
  console.log('data on calendar update Post', update);
  return NextResponse.json({ update });
};

export type ResponseCalendarUpdateOk = { update: Array<ScheduleDataItemType> };
export type ResponseCalendarUpdate = ResponseCalendarUpdateOk | RequestError;