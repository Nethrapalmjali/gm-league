import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getAllData, seedData, initDb } from '@/lib/db';
import { AppData } from '@/lib/types';

export async function GET() {
  try {
    const data = getAllData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data: AppData = await req.json();
    seedData(data); // Using seedData as a "sync entire data" helper for simplicity
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
