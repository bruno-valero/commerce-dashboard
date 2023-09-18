import { GridsDataItemTypes } from '@/app/functions/gridActionComplete';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/customer');

};

export async function POST(req:Request):Promise<NextResponse<ResponseCustomersUpdate>> {
  const update:Array<GridsDataItemTypes> = await req.json();

  return NextResponse.json({ update });
};

export type ResponseCustomersUpdate = { update: Array<GridsDataItemTypes> }