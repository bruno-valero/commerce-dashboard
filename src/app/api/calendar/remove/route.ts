import { ScheduleDataItemType } from '@/common.types';
import { NextResponse } from 'next/server';


export async function POST(req:Request) {
  const remove:Array<ScheduleDataItemType> = await req.json();

  return NextResponse.json({ remove });
};


export type ResponseCalendarRemove = { remove: Array<ScheduleDataItemType> }