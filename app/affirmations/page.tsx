import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json()

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are CelestiaSOUL, a sacred spiritual wellness AI. Generate a powerful personalized affirmation for the category: ${category}.

Respond ONLY with a JSON object in this exact format, no other text:
{
  "affirmation": "A powerful, deeply personal affirmation of 1-2 sentences that feels cosmic and sacred",
  "explanation": "2-3 sentences explaining why this affirmation is powerful and how it will transform the user",
  "practice": "1-2 sentences describing a simple daily practice to embody this affirmation"
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