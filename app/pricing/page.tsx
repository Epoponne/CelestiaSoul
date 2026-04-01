'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Pricing() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const email = user?.email || 'test@celestiasoul.com'
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Error: ' + (data.error || 'Something went wrong'))
      }
    } catch(e: any) {
      alert('Error: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>
        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Dashboard</button>
        </nav>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Choose Your Path</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)'}}>Begin your 3-day free trial today</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'32px'}}>
          <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'20px',padding:'28px 20px'}}>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>FREE FOREVER</p>
            <h2 style={{fontStyle:'italic',fontSize:'28px',fontWeight:300,color:'#E8E0FF',marginBottom:'4px'}}>Seeker</h2>
            <p style={{fontStyle:'italic',fontSize:'32px',color:'#C8A8FF',marginBottom:'20px'}}>$0</p>
            <div style={{borderTop:'1px solid rgba(200,168,255,0.08)',paddingTop:'16px'}}>
              {['Daily affirmation','Solar Fire breathwork','Moon phase banner','396 Hz frequency'].map((item,i)=>(
                <p key={i} style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.6)',marginBottom:'8px'}}>+ {item}</p>
              ))}
              {['Full astrology reading','All 6 breath techniques','All 7 frequencies','Meditation music library'].map((item,i)=>(
                <p key={i} style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.25)',marginBottom:'8px'}}>- {item}</p>
              ))}
            </div>
            <button onClick={()=>router.push('/dashboard')} style={{width:'100%',marginTop:'16px',padding:'12px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>
              Continue Free
            </button>
          </div>
          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.15),rgba(40,20,100,0.25))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'20px',padding:'28px 20px',position:'relative'}}>
            <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#8A5AFF,#C8A8FF)',borderRadius:'20px',padding:'4px 16px',fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'#fff',whiteSpace:'nowrap'}}>MOST POPULAR</div>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(255,214,160,0.6)',marginBottom:'8px'}}>SOUL MEMBER</p>
            <h2 style={{fontStyle:'italic',fontSize:'28px',fontWeight:300,color:'#E8E0FF',marginBottom:'4px'}}>Sacred</h2>
            <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'4px'}}>
              <p style={{fontStyle:'italic',fontSize:'32px',color:'#FFD6A0',margin:0}}>$10</p>
              <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(255,214,160,0.5)',margin:0}}>/month</p>
            </div>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.5)',marginBottom:'20px'}}>3-day free trial</p>
            <div style={{borderTop:'1px solid rgba(200,168,255,0.08)',paddingTop:'16px'}}>
              {['Complete natal chart','AI daily readings','All 6 breath techniques','All 7 Solfeggio frequencies','Full meditation library','Moon phase rituals','Soul Dashboard','Sacred journal'].map((item,i)=>(
                <p key={i} style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.7)',marginBottom:'8px'}}>+ {item}</p>
              ))}
            </div>
            <button onClick={handleCheckout} disabled={loading} style={{width:'100%',marginTop:'16px',padding:'14px',background:'linear-gradient(135deg,rgba(138,90,255,0.5),rgba(100,60,200,0.4))',border:'1px solid rgba(200,168,255,0.5)',borderRadius:'12px',fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'#E8E0FF',cursor:'pointer'}}>
              {loading ? 'Loading...' : 'Start Free Trial'}
            </button>
          </div>
        </div>
        <div style={{textAlign:'center'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',letterSpacing:'2px'}}>Cancel anytime · Secure payment by Stripe · No hidden fees</p>
        </div>
      </div>
    </main>
  )
}
