import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { getAllData, seedData, initDb } from '@/lib/db';
import { AppData } from '@/lib/types';
import { validateAppData } from '@/lib/validate';

export async function GET() {
  try {
    await initDb();
    const data = await getAllData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    let data: AppData;
    try {
      data = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    // Reject malformed payloads before seedData() deletes existing rows
    const invalid = validateAppData(data);
    if (invalid) return NextResponse.json({ error: invalid }, { status: 400 });
    await initDb();
    await seedData(data); // Using seedData as a "sync entire data" helper for simplicity
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
