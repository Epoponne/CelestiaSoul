import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    const unsubscribeUrl = `https://celestiasoul.com/unsubscribe?email=${encodeURIComponent(email)}`

    const { data, error } = await resend.emails.send({
      from: 'CelestiaSOUL <hello@celestiasoul.com>',
      to: email,
      subject: `Welcome to CelestiaSOUL ✦ Your Cosmic Journey Begins`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#0D0B1E ;font-family:Georgia,serif;">
          <div style="max-width:560px;margin:0 auto;padding:40px 24px;">

            <div style="text-align:center;margin-bottom:32px;">
              <p style="font-style:italic;font-size:24px;letter-spacing:4px;color:#C8A8FF;margin:0 0 8px;">✦ CelestiaSOUL</p>
              <p style="font-family:sans-serif;font-size:11px;letter-spacing:4px;color:rgba(200,168,255,0.4);margin:0;">WELCOME TO YOUR COSMIC SANCTUARY</p>
            </div>

            <div style="background:linear-gradient(135deg,rgba(138,90,255,0.15),rgba(40,20,100,0.25));border:1px solid rgba(200,168,255,0.2);border-radius:20px;padding:32px;margin-bottom:24px;text-align:center;">
              <p style="font-family:sans-serif;font-size:11px;letter-spacing:4px;color:rgba(200,168,255,0.5);margin:0 0 12px;">WELCOME, BELOVED SOUL</p>
              <p style="font-style:italic;font-size:28px;letter-spacing:4px;color:#E8E0FF;margin:0 0 8px;">${name || 'Soul Seeker'}</p>
              <p style="font-family:sans-serif;font-size:13px;color:rgba(200,168,255,0.5);line-height:1.8;margin:0;">The cosmos has been waiting for you. Your sacred journey begins now.</p>
            </div>

            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(200,168,255,0.12);border-radius:16px;padding:24px;margin-bottom:24px;">
              <p style="font-family:sans-serif;font-size:10px;letter-spacing:4px;color:rgba(200,168,255,0.4);margin:0 0 16px;">✦ WHAT AWAITS YOU</p>
              ${[
                ['🔮', 'Cosmic astrology Readings', 'Personalized daily readings based on your natal birth chart'],
                ['☀️', 'Sacred Breathwork', '6 techniques with healing Solfeggio frequencies'],
                ['🎵', 'Sound Healing', '7 frequencies from 396 Hz to 963 Hz'],
                ['📓', 'Moon Journal', 'Rituals and reflections aligned with lunar cycles'],
              ].map(([icon, title, desc]) => `
                <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:16px;">
                  <span style="font-size:22px;flex-shrink:0;">${icon}</span>
                  <div>
                    <p style="font-style:italic;font-size:15px;color:#C8A8FF;margin:0 0 4px;">${title}</p>
                    <p style="font-family:sans-serif;font-size:12px;color:rgba(200,168,255,0.5);margin:0;line-height:1.7;">${desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="text-align:center;margin-bottom:32px;">
              <a href="https://celestiasoul.com/dashboard" style="display:inline-block;padding:16px 48px;background:linear-gradient(135deg,rgba(138,90,255,0.6),rgba(100,60,200,0.5));border:1px solid rgba(200,168,255,0.4);border-radius:30px;font-style:italic;font-size:16px;letter-spacing:4px;color:#E8E0FF;text-decoration:none;">Enter My Sanctuary ✦</a>
            </div>

            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(200,168,255,0.08);border-radius:16px;padding:20px;text-align:center;margin-bottom:24px;">
              <p style="font-style:italic;font-size:11px;letter-spacing:4px;color:rgba(200,168,255,0.35);margin:0 0 10px;">✦ YOUR WELCOME AFFIRMATION ✦</p>
              <p style="font-style:italic;font-size:15px;color:rgba(220,210,255,0.7);line-height:1.8;margin:0;">"I am ready to align with the cosmos. My soul is awakening to its highest purpose."</p>
            </div>

            <div style="text-align:center;padding-top:24px;border-top:1px solid rgba(200,168,255,0.08);">
              <p style="font-style:italic;font-size:16px;letter-spacing:3px;color:#C8A8FF;margin:0 0 8px;">✦ CelestiaSOUL</p>
              <p style="font-family:sans-serif;font-size:11px;color:rgba(200,168,255,0.3);letter-spacing:2px;margin:0 0 16px;">sacred breath · cosmic alignment · soul awakening</p>
              <p style="font-family:sans-serif;font-size:11px;color:rgba(200,168,255,0.3);margin:0 0 8px;">You are receiving this email because you signed up for CelestiaSOUL.</p>
              <p style="font-family:sans-serif;font-size:10px;color:rgba(200,168,255,0.2);margin:0;">
                © 2026 CelestiaSOUL · 
                <a href="https://celestiasoul.com/privacy" style="color:rgba(200,168,255,0.3);text-decoration:none;">Privacy Policy</a> · 
                <a href="https://celestiasoul.com/terms" style="color:rgba(200,168,255,0.3);text-decoration:none;">Terms</a> · 
                <a href="${unsubscribeUrl}" style="color:rgba(200,168,255,0.3);text-decoration:underline;">Unsubscribe</a>
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    })

    if (error) return NextResponse.json({ error }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}