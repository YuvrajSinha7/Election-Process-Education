import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, mode } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY missing - using fallback response');
      return NextResponse.json({
        reply: "I am currently in demo mode. Please configure the GEMINI_API_KEY to enable live AI responses.",
        fallback: true
      });
    }

    const systemPrompt = mode === 'eli5' 
      ? "Explain the following election concept to a 10-year-old child: "
      : "Provide a professional, nonpartisan summary of the following election topic: ";

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt} ${message}` }] }]
      })
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json({ error: 'System Error' }, { status: 500 });
  }
}
