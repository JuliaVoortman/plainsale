import { NextResponse } from 'next/server';
import { seedDemoData } from '@/lib/db/seed';

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not available in production', { status: 403 });
  }

  try {
    await seedDemoData();
    return NextResponse.json({ message: 'Demo data seeded successfully' });
  } catch (error) {
    console.error('Error seeding demo data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}