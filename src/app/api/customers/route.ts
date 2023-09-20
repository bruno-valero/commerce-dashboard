import { customersData } from '@/data/grid/customers/data';
import { CustomersDataType } from '@/data/grid/customers/types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/calendar');

};

export async function POST(req:Request):Promise<NextResponse<CustomersDataType>> {  
  const data = await req.json();
  console.log('data on customers Post', data);
  const baseURL:string = process.env.BASE_URL as string;
  // redirect(baseURL + '/orders');
  return NextResponse.json(customersData);
};

export type ResponseCustomersRead = Promise<NextResponse<CustomersDataType>>;