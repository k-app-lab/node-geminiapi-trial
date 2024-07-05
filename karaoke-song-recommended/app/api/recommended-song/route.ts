import { FavoriteSongType, RecommendedSongList } from '@/types/types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const favoriteSong: FavoriteSongType = await request.json();

  const recommendedSongs: RecommendedSongList = await createRecommendedSong(favoriteSong);

  return NextResponse.json(recommendedSongs);
}

async function createRecommendedSong(favoriteSong: FavoriteSongType): Promise<RecommendedSongList> {
  const { GoogleGenerativeAI } = require('@google/generative-ai');

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `カラオケで歌う曲を以下の好みに基づいて推薦してください。
- 好きなジャンル: ${favoriteSong.genre}
- 好きなアーティスト: ${favoriteSong.artists}
- 雰囲気: ${favoriteSong.atmosphere}
- 今まで歌ったことのある曲: ${favoriteSong.songHistory}

回答は以下のJSON形式でrecommendedSongsの配列要素に5つ回答してください。
また、そのままJSONに変換できるようにJSON文字列のみで回答してください。

[回答形式]
{
  "recommendedSongs": [
    {
      "title": "string",  // 曲の名称を出力してください
      "artistName": "string",  // アーティスト名を出力してください
      "description": "string",  // 曲の説明を100字以内で出力してください
      "referenceURL": "string"  // 参考URLは曲をGoogleで検索したときのURLとしてください
    }
  ]
}
`;

  const result = await model.generateContentStream(prompt);

  let text = '';
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }

  return JSON.parse(text);
}
