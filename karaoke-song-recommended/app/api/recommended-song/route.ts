import { RecommendedSongType } from '@/types/types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { genre } = await request.json();
  console.log(genre);

  const recommendedSongs: RecommendedSongType[] = [
    {
      title: 'Titile',
      artistName: 'artistName',
      description: 'description',
      referenceURL: 'referenceURL',
    },
    {
      title: 'Titile',
      artistName: 'string',
      description: 'string',
      referenceURL: 'string',
    },
  ];

  return NextResponse.json({ recommendedSongs });
}
