import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const getGenericPrompt = (theme: string): string => `
  あなたは日本語でクイズを作成するプロフェッショナルです。
  以下の条件に従って、"${theme}"に関する1問だけの4択クイズを作成してください：
  - "${theme}"に関連した知識を問う問題にしてください。
  - 問題は具体的で明確にしてください。
  - 必ず4つの選択肢を含め、そのうち1つを正解としてください。
  - 選択肢は紛らわしいものを含め、多様性を持たせてください。
  - 出力は必ず1問のみとし、複数の問題を含めないでください。
  出力フォーマットは以下の通り：
  問題: [ここに問題文]
  選択肢:
  1. [選択肢1]
  2. [選択肢2]
  3. [選択肢3]
  4. [選択肢4]
  正解: [正解の番号]
`;

const generateQuiz = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { theme } = req.body;

  if (!theme) {
    res.status(400).json({ error: "Theme is required" });
    return;
  }

  const prompt = getGenericPrompt(theme);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);

    const quiz = result?.response?.text() || "クイズの生成に失敗しました。";
    res.status(200).json({ quiz });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "クイズの生成に失敗しました。" });
  }
};

export default generateQuiz;
