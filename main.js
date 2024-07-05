const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `カラオケで歌う曲を以下の好みに基づいて推薦してください。
- 好きなジャンル: 1980年代のロック
- 好きなアーティスト: クイーン、エアロスミス
- 雰囲気: みんなで盛り上がれる曲
- 過去の選曲: 

回答は以下のJSON形式でrecommendedSongsの配列要素に10個回答してください。

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
}

run();