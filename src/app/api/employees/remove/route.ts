import { GridsDataItemTypes } from '@/app/functions/gridActionComplete';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';


export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/employees');

};

export async function POST(req:Request):Promise<NextResponse<ResponseEmployeesRemove>> {
  const remove:Array<GridsDataItemTypes> = await req.json();

  return NextResponse.json({ remove });
};


export type ResponseEmployeesRemove = { remove: Array<GridsDataItemTypes> }