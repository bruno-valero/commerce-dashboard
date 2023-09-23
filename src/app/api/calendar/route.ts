import { scheduleData } from '@/data/dummyTSX';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/calendar');

};

export async function POST(req:Request) {  
  const data = await req.json();
  console.log('data on calendar Post', data);
  
  return NextResponse.json(scheduleData);
}