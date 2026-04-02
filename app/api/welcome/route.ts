import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    await resend.emails.send({
      from: 'CelestiaSOUL <hello@celestiasoul.com>',
      to: email,
      subject: '✦ Welcome to CelestiaSOUL — Your Cosmic Journey Begins',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="background:#06050E;color:#E8E0FF;font-family:Georgia,serif;margin:0;padding:0;">
          <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
            
            <div style="text-align:center;margin-bottom:32px;">
              <p style="font-size:11px;letter-spacing:8px;color:rgba(200,168,255,0.5);margin-bottom:8px;">✦ CELESTIASOUL ✦</p>
              <h1 style="font-style:italic;font-weight:300;font-size:36px;letter-spacing:4px;background:linear-gradient(135deg,#DDD0FF,#FFE8C8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0;">Welcome, ${name || 'Beloved Soul'}</h1>
            </div>

            <div style="background:rgba(138,90,255,0.1);border:1px solid rgba(200,168,255,0.2);border-radius:16px;padding:28px;margin-bottom:24px;text-align:center;">
              <p style="font-style:italic;font-size:16px;color:rgba(220,210,255,0.8);line-height:1.9;margin:0;">
                "The cosmos has been waiting for you. Your soul's journey into sacred breath, cosmic alignment and divine healing begins now."
              </p>
            </div>

            <p style="font-style:italic;font-size:15px;color:rgba(220,210,255,0.7);line-height:1.9;">Dear ${name || 'Soul Seeker'},</p>
            <p style="font-style:italic;font-size:15px;color:rgba(220,210,255,0.7);line-height:1.9;">
              Welcome to CelestiaSOUL — your sacred cosmic sanctuary. You now have access to personalized AI astrology readings, healing Solfeggio frequencies, sacred breathwork and moon rituals.
            </p>

            <div style="margin:28px 0;">
              <p style="font-family:sans-serif;font-size:10px;letter-spacing:6px;color:rgba(200,168,255,0.5);margin-bottom:16px;">✦ WHAT AWAITS YOU ✦</p>
              ${[
                ['🌙', 'Daily AI Astrology Reading', 'Personalized to your natal birth chart'],
                ['༄', 'Sacred Breathwork', '6 techniques with healing frequencies'],
                ['◎', 'Solfeggio Music', '7 healing frequencies from 396 Hz to 963 Hz'],
                ['☽', 'Moon Journal', 'Track your soul journey with each lunar cycle'],
              ].map(([icon, title, desc]) => `
                <div style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid rgba(200,168,255,0.08);">
                  <span style="font-size:24px;">${icon}</span>
                  <div>
                    <div style="font-style:italic;font-size:15px;color:#C8A8FF;margin-bottom:2px;">${title}</div>
                    <div style="font-family:sans-serif;font-size:12px;color:rgba(200,168,255,0.5);">${desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="text-align:center;margin:32px 0;">
              <a href="https://celestiasoul.com/dashboard" style="display:inline-block;padding:16px 40px;background:rgba(138,90,255,0.4);border:1px solid rgba(200,168,255,0.4);border-radius:30px;font-style:italic;font-size:16px;letter-spacing:4px;color:#E8E0FF;text-decoration:none;">
                Enter My Sanctuary ✦
              </a>
            </div>

            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(200,168,255,0.08);border-radius:16px;padding:20px;text-align:center;margin-bottom:24px;">
              <p style="font-style:italic;font-size:10px;letter-spacing:4px;color:rgba(200,168,255,0.35);margin-bottom:8px;">✦ YOUR COSMIC AFFIRMATION ✦</p>
              <p style="font-style:italic;font-size:14px;color:rgba(220,210,255,0.65);line-height:1.8;margin:0;">"I am aligned with the universe. My soul is awakening to its highest purpose and divine light."</p>
            </div>

            <div style="text-align:center;padding-top:24px;border-top:1px solid rgba(200,168,255,0.08);">
              <p style="font-family:sans-serif;font-size:11px;color:rgba(200,168,255,0.3);letter-spacing:2px;">© 2026 CelestiaSOUL · celestiasoul.com</p>
              <p style="font-family:sans-serif;font-size:11px;color:rgba(200,168,255,0.2);">You received this email because you signed up for CelestiaSOUL.</p>
            </div>

          </div>
        </body>
        </html>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}