import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { resetDb, initDb } from '@/lib/db';

export async function POST() {
  try {
    await initDb();
    await resetDb();
    return NextResponse.json({ success: true, message: 'Database reset to defaults' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
