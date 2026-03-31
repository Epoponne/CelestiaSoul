import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { sunSign, moonSign, rising, date } = await request.json()

  const prompt = `You are CelestiaSOUL, a sacred astrology guide. Generate a personalized daily reading for today ${date}.

The person's chart:
- Sun Sign: ${sunSign}
- Moon Sign: ${moonSign}  
- Rising Sign: ${rising}

Write a beautiful, mystical, personalized daily reading with these 5 sections. Return ONLY valid JSON, no markdown, no extra text:

{
  "love": "2-3 sentences about love and relationships today",
  "career": "2-3 sentences about career and purpose today", 
  "health": "2-3 sentences about health and body wisdom today",
  "frequency": "528 Hz · DNA Repair",
  "ritual": "3-4 sentences describing a moon ritual for tonight",
  "affirmation": "One powerful affirmation for today"
}`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await response.json()
  const text = data.content[0].text
  const clean = text.replace(/```json|```/g, '').trim()
  const reading = JSON.parse(clean)

  return NextResponse.json(reading)
}