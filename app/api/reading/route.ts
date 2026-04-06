import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const { sunSign, moonSign, rising, date } = await request.json()

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are CelestiaSOUL, a sacred astrology AI. Generate a deeply personalized daily reading for someone with:
- Sun Sign: ${sunSign}
- Moon Sign: ${moonSign}  
- Rising Sign: ${rising}
- Date: ${date}

Respond ONLY with a JSON object in this exact format, no other text:
{
  "love": "2-3 sentence personalized love reading",
  "career": "2-3 sentence personalized career reading", 
  "health": "2-3 sentence personalized health reading",
  "ritual": "1-2 sentence moon ritual for tonight",
  "affirmation": "one powerful personalized affirmation",
  "frequency": "one of: 396 Hz, 417 Hz, 528 Hz, 639 Hz, 741 Hz, 852 Hz, 963 Hz",
  "frequency_reason": "1-2 sentences explaining why this frequency is perfect for their chart today",
  "recommended_technique": "one of: Solar Fire, 4-7-8 Lunar, Box Sacred, Earth Root, Crystal Heart, Cosmos Deep",
  "technique_reason": "1-2 sentences explaining why this breathwork technique suits their energy today"
}`
        }
      ]
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const clean = text.replace(/```json|```/g, '').trim()
    const data = JSON.parse(clean)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}