'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/signin')
      else setUser(user)
    }
    getUser()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          <button onClick={signOut} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Sign Out</button>
        </nav>

        <div style={{padding:'20px 0 24px'}}>
          <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'10px',letterSpacing:'6px',color:'rgba(200,168,255,0.4)',display:'block',marginBottom:'6px'}}>welcome back, beloved soul</span>
          <span style={{fontStyle:'italic',fontWeight:300,fontSize:'38px',letterSpacing:'4px',display:'block',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'6px'}}>
            {user?.user_metadata?.full_name || 'Soul Seeker'}
          </span>
          <span style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)'}}>
            {new Date().toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'})}
          </span>
        </div>

        <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.12),rgba(40,20,100,0.2))',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'16px',padding:'16px 20px',marginBottom:'22px',display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{fontSize:'32px'}}>🌖</span>
          <div style={{flex:1}}>
            <div style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'3px'}}>Waning Gibbous Moon</div>
            <div style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'11px',color:'rgba(200,168,255,0.5)',lineHeight:1.6}}>A powerful time for release and reflection. Let go of what no longer serves your highest path.</div>
          </div>
          <span style={{fontStyle:'italic',fontSize:'12px',color:'rgba(255,214,160,0.6)',textAlign:'right'}}>528 Hz<br/><span style={{fontSize:'9px',opacity:0.6}}>Recommended</span></span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'22px'}}>
          {[['14','Day Streak'],['38','Sessions'],['9.4h','Breathwork'],['7','Cycles']].map(([val,lbl]) => (
            <div key={lbl} style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'12px',padding:'14px 10px',textAlign:'center'}}>
              <span style={{fontStyle:'italic',fontSize:'26px',color:'#C8A8FF',display:'block',marginBottom:'3px'}}>{val}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:'rgba(200,168,255,0.35)',textTransform:'uppercase'}}>{lbl}</span>
            </div>
          ))}
        </div>

        <span style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',display:'block',marginBottom:'12px'}}>Today's Sacred Practice</span>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'22px'}}>
          {[
            {icon:'🌙',title:'4-7-8 Lunar Breath',desc:'Your Sun calls for the grounding lunar rhythm today.',meta:'20 min · 528 Hz',badge:'Ready',route:'/breathing'},
            {icon:'🌌',title:'Cosmic Soundbath',desc:'Deep immersion with Solfeggio tones.',meta:'30 min · 639 Hz',badge:'New',route:'/music'},
            {icon:'⭐',title:'Morning Reading',desc:'Your daily astrological insight has been delivered.',meta:'Completed at 7:14am',badge:'Done',route:'/reading'},
            {icon:'💎',title:'Crystal Heart Flow',desc:'Evening breathwork session.',meta:'15 min · 741 Hz',badge:'Ready',route:'/breathing'},
          ].map(({icon,title,desc,meta,badge,route}) => (
            <div key={title} onClick={() => router.push(route)} style={{background:'rgba(255,255,255,0.028)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'20px 16px',cursor:'pointer'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                <span style={{fontSize:'22px'}}>{icon}</span>
                <span style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'9px',letterSpacing:'2px',padding:'3px 8px',borderRadius:'10px',background:'rgba(168,232,255,0.1)',border:'1px solid rgba(168,232,255,0.25)',color:'rgba(168,232,255,0.7)'}}>{badge}</span>
              </div>
              <div style={{fontStyle:'italic',fontSize:'15px',letterSpacing:'2px',color:'#C8A8FF',marginBottom:'5px'}}>{title}</div>
              <div style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'11px',color:'rgba(200,168,255,0.45)',lineHeight:1.7,marginBottom:'8px'}}>{desc}</div>
              <div style={{fontStyle:'italic',fontSize:'11px',color:'rgba(255,214,160,0.5)'}}>{meta}</div>
            </div>
          ))}
        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'16px',padding:'22px 24px',textAlign:'center',marginBottom:'22px'}}>
          <span style={{fontStyle:'italic',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.35)',display:'block',marginBottom:'10px'}}>Your Cosmic Affirmation</span>
          <div style={{fontStyle:'italic',fontWeight:300,fontSize:'16px',letterSpacing:'1.5px',color:'rgba(220,210,255,0.75)',lineHeight:1.8}}>"I am the fire that illuminates the dark. I breathe in my divine power and exhale all that dims my light."</div>
        </div>

        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',padding:'14px 0 0',borderTop:'1px solid rgba(200,168,255,0.07)'}}>
          {[['Home','/dashboard'],['Breathe','/breathing'],['Music','/music'],['Reading','/reading'],['Journal','/journal']].map(([label,route]) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 12px',borderRadius:'10px'}}>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
