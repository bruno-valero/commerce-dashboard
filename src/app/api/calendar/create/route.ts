import { ScheduleDataItemType } from '@/common.types';
import { NextResponse } from 'next/server';


export async function POST(req:Request) {
  const create:Array<ScheduleDataItemType> = await req.json();

  return NextResponse.json({ create });
};

export type ResponseCalendarCreate = { create: Array<ScheduleDataItemType> }