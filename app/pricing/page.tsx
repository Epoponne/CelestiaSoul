'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Pricing() {
  const router = useRouter()
  const star = '\u2726'
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleCheckout = async () => {
    setLoading(true)
    try {
      if (!user) {
        router.push('/signin?redirect=pricing')
        return
      }
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email: user.email })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch(e) {
      console.error(e)
    }
    setLoading(false)
  }

  const freeFeatures = [
    {icon:'🌬️', title:'Solar Fire Breathwork', desc:'Our signature 6-count breathing technique'},
    {icon:'🎵', title:'396 Hz Sound Healing', desc:'Liberation frequency — free forever'},
    {icon:'💫', title:'Sacred Affirmations', desc:'Personalized daily affirmations'},
    {icon:'💎', title:'Crystal Healing Guide', desc:'Full guide to 12 sacred healing crystals'},
    {icon:'⬡', title:'Sacred Geometry', desc:'8 divine patterns with meditations'},
    {icon:'🔮', title:'Basic Astrology Reading', desc:'Daily sun sign reading'},
    {icon:'📓', title:'Moon Journal', desc:'Journal with lunar cycle guidance'},
  ]

  const paidFeatures = [
    {icon:'🌙', title:'Full Astrology Readings', desc:'Personalized readings using your full natal chart — sun, moon and rising'},
    {icon:'☀️', title:'All 6 Breathwork Techniques', desc:'4-7-8 Lunar, Box Sacred, Earth Root, Crystal Heart and Cosmos Deep'},
    {icon:'🎵', title:'Full Sound Healing Library', desc:'All 15 tracks — 396 Hz to 963 Hz plus combined Hz blends'},
    {icon:'🃏', title:'Daily Tarot Pull', desc:'Draw from the full Major Arcana with upright and reversed meanings'},
    {icon:'🌈', title:'Chakra Alignment Guide', desc:'All 7 chakras with healing frequencies and breathwork recommendations'},
    {icon:'💑', title:'Zodiac Compatibility', desc:'Deep cosmic compatibility readings for any two signs'},
    {icon:'🔵', title:'Birth Chart Wheel', desc:'Your full natal chart wheel with all planetary placements'},
    {icon:'🧘', title:'Meditation Timer', desc:'Sacred timer from 5 to 45 minutes with healing frequencies'},
    {icon:'🌙', title:'Real Moon Phase Daily', desc:'Live lunar cycle with personalized frequency recommendations'},
    {icon:'📊', title:'Progress Tracking', desc:'Track your streak, sessions, breathwork hours and cycles'},
    {icon:'✉️', title:'Daily Reading Emails', desc:'Your cosmic reading delivered to your inbox every morning'},
    {icon:'🔔', title:'Push Notifications', desc:'Daily reminders for your sacred morning practice'},
  ]

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
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
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Simple Pricing</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>Begin free. Unlock everything for $10/month.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'32px'}}>

          <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.12)',borderRadius:'20px',padding:'24px'}}>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(100,220,130,0.6)',marginBottom:'8px'}}>FREE FOREVER</p>
            <p style={{fontStyle:'italic',fontSize:'28px',color:'#E8E0FF',marginBottom:'4px'}}>$0</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',marginBottom:'20px',letterSpacing:'1px'}}>No credit card needed</p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
              {freeFeatures.map(({icon,title,desc})=>(
                <div key={title} style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
                  <span style={{fontSize:'16px',flexShrink:0}}>{icon}</span>
                  <div>
                    <div style={{fontStyle:'italic',fontSize:'12px',color:'#C8A8FF',marginBottom:'2px'}}>{title}</div>
                    <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.4)',lineHeight:1.5}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>router.push('/signin')} style={{width:'100%',padding:'12px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'rgba(200,168,255,0.6)',cursor:'pointer'}}>
              Start Free {star}
            </button>
          </div>

          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.15),rgba(40,20,100,0.25))',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',padding:'24px',position:'relative'}}>
            <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#8A5AFF,#6040C0)',borderRadius:'20px',padding:'4px 16px',fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'#E8E0FF',whiteSpace:'nowrap'}}>MOST POPULAR</div>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(255,214,160,0.6)',marginBottom:'8px'}}>SACRED ACCESS</p>
            <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'4px'}}>
              <p style={{fontStyle:'italic',fontSize:'28px',color:'#FFD6A0'}}>$10</p>
              <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.5)'}}>/month</p>
            </div>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',marginBottom:'8px',letterSpacing:'1px'}}>after 3-day free trial</p>
            <div style={{background:'rgba(100,220,130,0.08)',border:'1px solid rgba(100,220,130,0.2)',borderRadius:'8px',padding:'8px',marginBottom:'16px',textAlign:'center'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(100,220,130,0.7)',letterSpacing:'2px'}}>✦ 3-DAY FREE TRIAL ✦</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'24px'}}>
              {paidFeatures.map(({icon,title,desc})=>(
                <div key={title} style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
                  <span style={{fontSize:'16px',flexShrink:0}}>{icon}</span>
                  <div>
                    <div style={{fontStyle:'italic',fontSize:'12px',color:'#C8A8FF',marginBottom:'2px'}}>{title}</div>
                    <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.4)',lineHeight:1.5}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleCheckout} disabled={loading} style={{width:'100%',padding:'13px',background:'linear-gradient(135deg,rgba(138,90,255,0.5),rgba(100,60,200,0.4))',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'12px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer',opacity:loading?0.7:1}}>
              {loading ? 'Loading...' : `Start Free Trial ${star}`}
            </button>
          </div>

        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'16px',padding:'24px',marginBottom:'24px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'6px',color:'rgba(200,168,255,0.4)',textAlign:'center',marginBottom:'20px'}}>{star} FREQUENTLY ASKED {star}</p>
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            {[
              {q:'What makes readings personalized?',a:'Your readings are based on your natal birth chart — your sun sign, moon sign and rising sign — generating cosmic guidance uniquely tailored to your blueprint.'},
              {q:'Do I need a credit card for the free trial?',a:'No! You can start your 3-day free trial without entering any payment information. Only upgrade when you are ready.'},
              {q:'Can I cancel anytime?',a:'Yes absolutely. Cancel anytime with one click from your profile page. No penalties, no questions asked.'},
              {q:'What happens after my free trial?',a:'After 3 days you will be prompted to subscribe for $10/month to continue accessing all sacred features.'},
              {q:'Is my birth chart data secure?',a:'Yes. Your personal data is encrypted and stored securely. We never share or sell your information.'},
            ].map(({q,a})=>(
              <div key={q} style={{borderBottom:'1px solid rgba(200,168,255,0.06)',paddingBottom:'16px'}}>
                <p style={{fontStyle:'italic',fontSize:'14px',color:'#C8A8FF',marginBottom:'6px'}}>{q}</p>
                <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.5)',lineHeight:1.8}}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:'center'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.3)',letterSpacing:'1px',marginBottom:'8px'}}>Questions? We are here for you.</p>
          <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.4)'}}>support@celestiasoul.com</p>
        </div>

      </div>
    </main>
  )
}