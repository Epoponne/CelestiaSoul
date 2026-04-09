import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, name, moonPhase, frequency } = await request.json()

    const unsubscribeUrl = `https://celestiasoul.com/unsubscribe?email=${encodeURIComponent(email)}`

    const { data, error } = await resend.emails.send({
      from: 'CelestiaSOUL <hello@celestiasoul.com>',
      to: email,
      subject: `${moonPhase} Moon · Your Daily Cosmic Reading is Ready`,
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
              <p style="font-family:sans-serif;font-size:11px;letter-spacing:4px;color:rgba(200,168,255,0.4);margin:0;">SACRED DAILY READING</p>
            </div>

            <div style="background:linear-gradient(135deg,rgba(138,90,255,0.15),rgba(40,20,100,0.25));border:1px solid rgba(200,168,255,0.2);border-radius:20px;padding:32px;margin-bottom:24px;text-align:center;">
              <p style="font-family:sans-serif;font-size:11px;letter-spacing:4px;color:rgba(200,168,255,0.5);margin:0 0 12px;">GOOD MORNING, BELOVED SOUL</p>
              <p style="font-style:italic;font-size:28px;letter-spacing:4px;color:#E8E0FF;margin:0 0 8px;">${name || 'Soul Seeker'}</p>
              <p style="font-family:sans-serif;font-size:12px;color:rgba(200,168,255,0.5);margin:0;">${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
            </div>

            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(200,168,255,0.12);border-radius:16px;padding:24px;margin-bottom:24px;">
              <p style="font-family:sans-serif;font-size:10px;letter-spacing:4px;color:rgba(200,168,255,0.4);margin:0 0 16px;">✦ TODAY'S MOON ENERGY</p>
              <p style="font-style:italic;font-size:20px;letter-spacing:3px;color:#C8A8FF;margin:0 0 8px;">${moonPhase} Moon</p>
              <p style="font-family:sans-serif;font-size:13px;color:rgba(200,168,255,0.5);line-height:1.8;margin:0;">Your cosmic energy is calling you to align with the universe today. Your personalized reading is ready and waiting for you.</p>
            </div>

            <div style="background:linear-gradient(135deg,rgba(255,214,160,0.08),rgba(138,90,255,0.06));border:1px solid rgba(255,214,160,0.2);border-radius:16px;padding:24px;margin-bottom:24px;text-align:center;">
              <p style="font-family:sans-serif;font-size:10px;letter-spacing:4px;color:rgba(255,214,160,0.5);margin:0 0 8px;">TODAY'S HEALING FREQUENCY</p>
              <p style="font-style:italic;font-size:28px;letter-spacing:3px;color:#FFD6A0;margin:0 0 8px;">${frequency || '528 Hz'}</p>
              <p style="font-family:sans-serif;font-size:12px;color:rgba(255,214,160,0.5);margin:0;">Your soul's recommended frequency for today</p>
            </div>

            <div style="text-align:center;margin-bottom:32px;">
              <a href="https://celestiasoul.com/reading" style="display:inline-block;padding:16px 48px;background:linear-gradient(135deg,rgba(138,90,255,0.6),rgba(100,60,200,0.5));border:1px solid rgba(200,168,255,0.4);border-radius:30px;font-style:italic;font-size:16px;letter-spacing:4px;color:#E8E0FF;text-decoration:none;">Read My Cosmic Reading ✦</a>
            </div>

            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(200,168,255,0.08);border-radius:16px;padding:20px;text-align:center;margin-bottom:24px;">
              <p style="font-style:italic;font-size:11px;letter-spacing:4px;color:rgba(200,168,255,0.35);margin:0 0 10px;">✦ TODAY'S AFFIRMATION ✦</p>
              <p style="font-style:italic;font-size:15px;color:rgba(220,210,255,0.7);line-height:1.8;margin:0;">"I am aligned with the cosmos. My soul is awakening to its highest purpose today."</p>
            </div>

            <div style="background:linear-gradient(135deg,rgba(138,90,255,0.08),rgba(40,20,100,0.15));border:1px solid rgba(200,168,255,0.1);border-radius:16px;padding:20px;margin-bottom:24px;">
              <p style="font-family:sans-serif;font-size:11px;letter-spacing:3px;color:rgba(200,168,255,0.4);margin:0 0 12px;">✦ QUICK LINKS</p>
              <div style="display:flex;gap:12px;flex-wrap:wrap;">
                <a href="https://celestiasoul.com/reading" style="font-style:italic;font-size:13px;color:#C8A8FF;text-decoration:none;padding:8px 16px;border:1px solid rgba(200,168,255,0.2);border-radius:20px;">🔮 My Reading</a>
                <a href="https://celestiasoul.com/breathing" style="font-style:italic;font-size:13px;color:#C8A8FF;text-decoration:none;padding:8px 16px;border:1px solid rgba(200,168,255,0.2);border-radius:20px;">☀️ Breathwork</a>
                <a href="https://celestiasoul.com/music" style="font-style:italic;font-size:13px;color:#C8A8FF;text-decoration:none;padding:8px 16px;border:1px solid rgba(200,168,255,0.2);border-radius:20px;">🎵 Music</a>
                <a href="https://celestiasoul.com/journal" style="font-style:italic;font-size:13px;color:#C8A8FF;text-decoration:none;padding:8px 16px;border:1px solid rgba(200,168,255,0.2);border-radius:20px;">📓 Journal</a>
              </div>
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