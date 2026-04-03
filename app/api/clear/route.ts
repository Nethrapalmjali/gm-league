import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { clearDb, initDb } from '@/lib/db';

export async function POST() {
  try {
    await initDb();
    await clearDb();
    return NextResponse.json({ success: true, message: 'All leaderboard data deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
