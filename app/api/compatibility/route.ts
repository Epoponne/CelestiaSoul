import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const { sign1, sign2 } = await request.json()

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are CelestiaSOUL, a sacred astrology AI. Generate a detailed zodiac compatibility reading for ${sign1} and ${sign2}.

Respond ONLY with a JSON object in this exact format, no other text:
{
  "score": a number between 60 and 99,
  "title": "A romantic 2-4 word title for this pairing like 'Twin Flame Connection' or 'Cosmic Soulmates'",
  "overview": "2-3 sentences describing the overall energy of this pairing",
  "love": "2-3 sentences about their romantic and physical connection",
  "communication": "2-3 sentences about how they communicate and understand each other",
  "challenges": "2-3 sentences about the challenges they may face together",
  "growth": "2-3 sentences about how they help each other grow and evolve"
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