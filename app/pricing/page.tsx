'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Pricing() {
  const router = useRouter()
  const star = '\u2726'
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch(e) {
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <main style={{background:'#0D0B1E ',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'56px',height:'56px',borderRadius:'50%',objectFit:'cover',boxShadow:'0 0 16px rgba(200,168,255,0.5)',border:'1px solid rgba(200,168,255,0.25)'}}/>
            <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          </div>
          <button onClick={()=>router.push('/')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Home</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} SACRED ACCESS {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'48px',letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Choose Your Path</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>Begin your cosmic journey today</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'32px'}}>
          <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'20px',padding:'28px'}}>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>FREE</p>
            <p style={{fontStyle:'italic',fontSize:'32px',color:'#C8A8FF',marginBottom:'4px'}}>$0</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',marginBottom:'20px',letterSpacing:'1px'}}>Forever free</p>
            {[
              "Today's AI Reading",
              '396 Hz Liberation',
              'Solar Fire Breathwork',
              'Moon Journal',
            ].map(f=>(
              <div key={f} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
                <span style={{color:'rgba(200,168,255,0.5)',fontSize:'12px'}}>✓</span>
                <span style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.6)'}}>{f}</span>
              </div>
            ))}
            <button onClick={()=>router.push('/signin')} style={{width:'100%',marginTop:'20px',padding:'12px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>
              Get Started
            </button>
          </div>

          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.15),rgba(40,20,100,0.25))',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',padding:'28px',position:'relative'}}>
            <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#8A5AFF,#C8A8FF)',borderRadius:'20px',padding:'4px 16px',fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'#fff',whiteSpace:'nowrap'}}>MOST POPULAR</div>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(255,214,160,0.6)',marginBottom:'12px'}}>SACRED</p>
            <p style={{fontStyle:'italic',fontSize:'32px',color:'#FFD6A0',marginBottom:'4px'}}>$10</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.5)',marginBottom:'20px',letterSpacing:'1px'}}>per month · 3-day free trial</p>
            {[
              'Everything in Free',
              'All 6 Breathwork Techniques',
              'All 7 Healing Frequencies',
              'Natal Blueprint Reading',
              'Planetary Transits',
              'Combined Hz Tracks',
              'Priority Support',
            ].map(f=>(
              <div key={f} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
                <span style={{color:'rgba(255,214,160,0.7)',fontSize:'12px'}}>{star}</span>
                <span style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(220,210,255,0.7)'}}>{f}</span>
              </div>
            ))}
            <button onClick={handleCheckout} disabled={loading} style={{width:'100%',marginTop:'20px',padding:'14px',background:'linear-gradient(135deg,rgba(138,90,255,0.5),rgba(100,60,200,0.4))',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'12px',fontStyle:'italic',fontSize:'15px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer'}}>
              {loading ? 'Loading...' : `Start Free Trial ${star}`}
            </button>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.3)',textAlign:'center',marginTop:'10px',letterSpacing:'1px'}}>Cancel anytime · No commitment</p>
          </div>
        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',textAlign:'center',marginBottom:'20px'}}>{star} FREQUENTLY ASKED QUESTIONS {star}</p>
          {[
            {q:'How does the free trial work?',a:'Your 3-day free trial gives you full Sacred access with no charge. After 3 days, you will be billed $10/month unless you cancel.'},
            {q:'Can I cancel anytime?',a:'Yes! You can cancel your subscription at any time with no penalties or fees. Your access continues until the end of the billing period.'},
            {q:'What makes readings personalized?',a:'Our AI uses your natal birth chart — sun sign, moon sign, and rising sign — to generate readings uniquely tailored to your cosmic blueprint.'},
            {q:'Are the healing frequencies safe?',a:'Yes! Solfeggio frequencies are gentle sound healing tones used for centuries. Always consult a doctor if you have medical concerns.'},
          ].map(({q,a})=>(
            <div key={q} style={{marginBottom:'16px',paddingBottom:'16px',borderBottom:'1px solid rgba(200,168,255,0.06)'}}>
              <p style={{fontStyle:'italic',fontSize:'14px',color:'#C8A8FF',marginBottom:'6px'}}>{q}</p>
              <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.5)',lineHeight:1.8,margin:0}}>{a}</p>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center',padding:'24px',borderTop:'1px solid rgba(200,168,255,0.08)'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.3)',letterSpacing:'2px',marginBottom:'12px'}}>© 2026 CelestiaSOUL</p>
          <div style={{display:'flex',gap:'20px',justifyContent:'center'}}>
            <span onClick={()=>router.push('/privacy')} style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',cursor:'pointer',textDecoration:'underline'}}>Privacy Policy</span>
            <span onClick={()=>router.push('/terms')} style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',cursor:'pointer',textDecoration:'underline'}}>Terms of Service</span>
            <span onClick={()=>router.push('/contact')} style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',cursor:'pointer',textDecoration:'underline'}}>Contact</span>
          </div>
        </div>

      </div>
    </main>
  )
}
