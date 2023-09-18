import { ScheduleDataItemType } from '@/common.types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/calendar');

};

export async function POST(req:Request) {
  const remove:Array<ScheduleDataItemType> = await req.json();

  return NextResponse.json({ remove });
};


export type ResponseCalendarRemove = { remove: Array<ScheduleDataItemType> }