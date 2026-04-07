'use client'
import { useRouter } from 'next/navigation'

export default function Privacy() {
  const router = useRouter()
  const star = '\u2726'

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{star} CelestiaSOUL</span>
          <button onClick={()=>router.push('/')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Home</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} LEGAL {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Privacy Policy</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.4)',letterSpacing:'2px'}}>Last updated: April 7, 2026</p>
        </div>

        {[
          {
            title:'1. Information We Collect',
            content:`When you create a CelestiaSOUL account, we collect your name, email address, and birth chart information (date, time, and location of birth) that you voluntarily provide. We also collect usage data such as breathing sessions completed, journal entries, and app activity to personalize your experience.`
          },
          {
            title:'2. How We Use Your Information',
            content:`We use your information to provide personalized AI-powered astrology readings, recommend healing frequencies and breathwork techniques based on your natal chart, process subscription payments securely through Stripe, send welcome and account-related emails through Resend, and improve our services.`
          },
          {
            title:'3. Birth Chart & Astrological Data',
            content:`Your birth chart data including sun sign, moon sign, rising sign, birth date, time, and location is used exclusively to generate personalized spiritual wellness recommendations. This data is stored securely in our database and is never sold to third parties.`
          },
          {
            title:'4. Payment Information',
            content:`All payment processing is handled securely by Stripe. CelestiaSOUL does not store your credit card numbers or banking information. Stripe's privacy policy governs the handling of your payment data. Your subscription can be cancelled at any time.`
          },
          {
            title:'5. Data Storage & Security',
            content:`Your data is stored securely using Supabase, a trusted cloud database provider. We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction.`
          },
          {
            title:'6. Third-Party Services',
            content:`CelestiaSOUL uses the following trusted third-party services: Supabase for database storage, Stripe for payment processing, Resend for email delivery, and Anthropic Claude API for AI-powered readings. Each service has its own privacy policy governing their data practices.`
          },
          {
            title:'7. Your Rights',
            content:`You have the right to access, update, or delete your personal information at any time. You may cancel your subscription at any time through your account settings. To request deletion of your account and all associated data, please contact us at support@celestiasoul.com.`
          },
          {
            title:'8. Cookies',
            content:`CelestiaSOUL uses essential cookies to maintain your login session and app preferences. We do not use advertising cookies or tracking pixels. You may disable cookies in your browser settings, though this may affect app functionality.`
          },
          {
            title:'9. Children\'s Privacy',
            content:`CelestiaSOUL is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.`
          },
          {
            title:'10. Contact Us',
            content:`If you have any questions about this Privacy Policy or how we handle your data, please contact us at support@celestiasoul.com. We are committed to protecting your privacy and will respond to all inquiries within 48 hours.`
          },
        ].map(({title,content})=>(
          <div key={title} style={{marginBottom:'28px',paddingBottom:'28px',borderBottom:'1px solid rgba(200,168,255,0.08)'}}>
            <h2 style={{fontStyle:'italic',fontSize:'18px',letterSpacing:'2px',color:'#C8A8FF',marginBottom:'12px',fontWeight:300}}>{title}</h2>
            <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(220,210,255,0.65)',lineHeight:1.9,margin:0}}>{content}</p>
          </div>
        ))}

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'16px',padding:'22px',textAlign:'center',marginTop:'20px'}}>
          <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(200,168,255,0.5)',marginBottom:'16px'}}>Questions about your privacy?</p>
          <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.4)',letterSpacing:'1px',marginBottom:'16px'}}>support@celestiasoul.com</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={()=>router.push('/terms')} style={{padding:'8px 20px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',fontStyle:'italic',fontSize:'12px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>Terms of Service</button>
            <button onClick={()=>router.push('/')} style={{padding:'8px 20px',background:'rgba(138,90,255,0.2)',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',fontStyle:'italic',fontSize:'12px',letterSpacing:'2px',color:'#C8A8FF',cursor:'pointer'}}>Back to CelestiaSOUL</button>
          </div>
        </div>

      </div>
    </main>
  )
}