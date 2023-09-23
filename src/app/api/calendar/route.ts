import { redirect } from 'next/navigation';

export async function GET(req:Request):Promise<void> {
  const baseURL:string = process.env.BASE_URL as string;
  redirect(baseURL + '/calendar');

};

export async function POST(req:Request) {  
  throw new Error('Este e um erro do calendario que o Bruno criou!')
  // const data = await req.json();
  // console.log('data on calendar Post', data);
  
  // return NextResponse.json(scheduleData);
}