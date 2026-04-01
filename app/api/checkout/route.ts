import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'CelestiaSOUL Soul Member',
              description: '3 Days Free Trial - Then $10/month. Full access to astrology readings, breathwork, healing frequencies & meditation',
            },
            unit_amount: 1000,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 3,
      },
      success_url: 'https://celestiasoul.com/dashboard?success=true',
      cancel_url: 'https://celestiasoul.com/pricing?canceled=true',
    })
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
