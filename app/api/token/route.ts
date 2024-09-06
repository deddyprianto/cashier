import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const cookieStore = cookies();
  const token = cookieStore.get('myToken');

  if (!token?.value) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
  }

  return NextResponse.json({ token: token.value });
}
