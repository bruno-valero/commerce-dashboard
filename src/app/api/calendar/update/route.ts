import { ScheduleDataItemType } from '@/common.types';
import { NextResponse } from 'next/server';


export async function POST(req:Request) {
  const update:Array<ScheduleDataItemType> = await req.json();

  return NextResponse.json({ update });
};

export type ResponseCalendarUpdate = { update: Array<ScheduleDataItemType> }