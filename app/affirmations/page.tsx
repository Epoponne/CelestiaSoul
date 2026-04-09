'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Affirmations() {
  const router = useRouter()
  const star = '\u2726'
  const [affirmation, setAffirmation] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('general')

  const categories = [
    {id:'general',label:'General',emoji:'✨'},
    {id:'love',label:'Love',emoji:'💕'},
    {id:'abundance',label:'Abundance',emoji:'💰'},
    {id:'healing',label:'Healing',emoji:'🌿'},
    {id:'confidence',label:'Confidence',emoji:'👑'},
    {id:'spiritual',label:'Spiritual',emoji:'🌙'},
  ]

  const generateAffirmation = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/affirmation', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ category })
      })
      const data = await res.json()
      setAffirmation(data)
    } catch(e) {
      console.error(e)
    }
    setLoading(false)
  }

  const navItems = [
    {label:'Home', route:'/dashboard', emoji:'🏠'},
    {label:'Breathe', route:'/breathing', emoji:'🌬️'},
    {label:'Music', route:'/music', emoji:'🎵'},
    {label:'Reading', route:'/reading', emoji:'🔮'},
    {label:'Journal', route:'/journal', emoji:'📓'},
  ]

  return (
    <main style={{background:'#0D0B1E ',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 100px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'56px',height:'56px',borderRadius:'50%',objectFit:'cover',boxShadow:'0 0 16px rgba(200,168,255,0.5)',border:'1px solid rgba(200,168,255,0.25)'}}/>
            <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          </div>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} SACRED AFFIRMATIONS {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Daily Affirmations</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>AI-powered affirmations for your soul</p>
        </div>

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'12px'}}>{star} Choose Your Intention {star}</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',marginBottom:'28px'}}>
          {categories.map(c=>(
            <div key={c.id} onClick={()=>setCategory(c.id)} style={{background:category===c.id?'rgba(138,90,255,0.2)':'rgba(255,255,255,0.025)',border:`1px solid ${category===c.id?'rgba(200,168,255,0.4)':'rgba(200,168,255,0.08)'}`,borderRadius:'12px',padding:'12px',textAlign:'center',cursor:'pointer'}}>
              <span style={{fontSize:'22px',display:'block',marginBottom:'4px'}}>{c.emoji}</span>
              <span style={{fontStyle:'italic',fontSize:'12px',color:category===c.id?'#C8A8FF':'rgba(200,168,255,0.5)'}}>{c.label}</span>
            </div>
          ))}
        </div>

        {affirmation && !loading && (
          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.12),rgba(40,20,100,0.2))',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'32px',marginBottom:'24px',textAlign:'center'}}>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'6px',color:'rgba(200,168,255,0.4)',marginBottom:'20px'}}>{star} YOUR AFFIRMATION {star}</p>
            <p style={{fontStyle:'italic',fontSize:'22px',letterSpacing:'2px',color:'#E8E0FF',lineHeight:1.8,marginBottom:'20px'}}>"{affirmation.affirmation}"</p>
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'12px',padding:'16px',marginBottom:'16px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>WHY THIS SPEAKS TO YOU</p>
              <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(220,210,255,0.7)',lineHeight:1.9,margin:0}}>{affirmation.explanation}</p>
            </div>
            <div style={{background:'rgba(255,214,160,0.06)',border:'1px solid rgba(255,214,160,0.15)',borderRadius:'12px',padding:'16px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(255,214,160,0.5)',marginBottom:'8px'}}>PRACTICE THIS TODAY</p>
              <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(255,214,160,0.7)',lineHeight:1.9,margin:0}}>{affirmation.practice}</p>
            </div>
          </div>
        )}

        {loading && (
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'20px',padding:'48px',textAlign:'center',marginBottom:'24px'}}>
            <div style={{fontSize:'32px',marginBottom:'16px'}}>✨</div>
            <p style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'rgba(200,168,255,0.6)'}}>The universe is speaking...</p>
          </div>
        )}

        <button onClick={generateAffirmation} disabled={loading} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,rgba(138,90,255,0.3),rgba(100,60,200,0.2))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'13px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',marginBottom:'16px'}}>
          {loading ? 'Channeling...' : `${star} Generate Affirmation ${star}`}
        </button>

        {affirmation && (
          <div style={{display:'flex',gap:'10px'}}>
            <button onClick={()=>router.push('/journal')} style={{flex:1,padding:'12px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>
              Save to Journal
            </button>
            <button onClick={generateAffirmation} style={{flex:1,padding:'12px',background:'rgba(138,90,255,0.15)',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'#C8A8FF',cursor:'pointer'}}>
              New Affirmation
            </button>
          </div>
        )}

      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(6,5,14,0.95)',borderTop:'1px solid rgba(200,168,255,0.12)',padding:'12px 0',zIndex:100}}>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',maxWidth:'680px',margin:'0 auto'}}>
          {navItems.map(({label,route,emoji}) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 16px',borderRadius:'10px'}}>
              <span style={{fontSize:'20px'}}>{emoji}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:'rgba(200,168,255,0.4)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}