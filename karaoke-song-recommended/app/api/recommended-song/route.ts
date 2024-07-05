import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { genre } = await request.json();
  console.log(genre);
  return NextResponse.json({ message: `Hello!` });
}
