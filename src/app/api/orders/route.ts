import { ordersData } from '@/data/grid/oders/data';
import { OrdersDataType } from '@/data/grid/oders/types';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/calendar');

};

export async function POST(req:Request):Promise<NextResponse<OrdersDataType>> {  
  const data = await req.json();
  console.log('data', data);
  const baseURL:string = process.env.BASE_URL as string;
  // redirect(baseURL + '/orders');
  return NextResponse.json(ordersData);
}
export type ResponseOrdersRead = Promise<NextResponse<OrdersDataType>>;