import { GridsDataItemTypes } from '@/app/functions/gridActionComplete';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/employees');

};

export async function POST(req:Request):Promise<NextResponse<ResponseEmployeesUpdate>> {
  const update:Array<GridsDataItemTypes> = await req.json();
  console.log('/employees/update', update);
  
  return NextResponse.json({ update });
};

export type ResponseEmployeesUpdate = { update: Array<GridsDataItemTypes> }