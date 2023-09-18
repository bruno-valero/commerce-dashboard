import { ScheduleDataItemType } from '@/common.types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/calendar');

};

export async function POST(req:Request):Promise<NextResponse<ResponseCalendarCreate>> {
  const create:Array<ScheduleDataItemType> = await req.json();

  return NextResponse.json({ create });
};

export type ResponseCalendarCreate = { create: Array<ScheduleDataItemType> }