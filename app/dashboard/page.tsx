'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { getMoonPhase } from '../../lib/moonPhase'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({sessions:0, cycles:0, streak:0, hours:0})
  const [recommendation, setRecommendation] = useState<any>(null)
  const [loadingRec, setLoadingRec] = useState(false)
  const [notifAsked, setNotifAsked] = useState(false)
  const star = '\u2726'
  const moonData = getMoonPhase()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/signin')
      else {
        setUser(user)
        loadStats(user.id)
        loadRecommendation(user.id)
        registerServiceWorker()
        checkNotificationPermission()
      }
    }
    getUser()
  }, [])

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js')
      } catch(e) { console.log('SW error:', e) }
    }
  }

  const checkNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      setNotifAsked(false)
    }
  }

  const requestNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        setNotifAsked(true)
        new Notification('CelestiaSOUL ✦', {
          body: 'You will now receive your daily cosmic reading reminders!',
          icon: '/icon-192.png'
        })
      } else {
        setNotifAsked(true)
      }
    }
  }

  const sendTestEmail = async () => {
    if (!user) return
    await fetch('/api/notify', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: user.email,
        name: user.user_metadata?.full_name || 'Soul Seeker',
        moonPhase: moonData.phase,
        frequency: recommendation?.frequency || moonData.frequency,
      })
    })
  }

  const loadStats = async (userId: string) => {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (data) {
      const sessions = data.length
      const cycles = data.reduce((acc, s) => acc + (s.cycles || 0), 0)
      const hours = Math.round((data.reduce((acc, s) => acc + (s.duration_seconds || 0), 0) / 3600) * 10) / 10
      const dates = [...new Set(data.map(s => new Date(s.created_at).toDateString()))]
      let streak = 0
      const today = new Date()
      for (let i = 0; i < dates.length; i++) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        if (dates.includes(d.toDateString())) streak++
        else break
      }
      setStats({sessions, cycles, streak, hours})
    }
  }

  const loadRecommendation = async (userId: string) => {
    setLoadingRec(true)
    try {
      const { data: chart } = await supabase
        .from('birth_charts')
        .select('*')
        .eq('user_id', userId)
        .single()
      const res = await fetch('/api/reading', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          sunSign: chart?.sun_sign || 'Aries',
          moonSign: chart?.moon_sign || 'Leo',
          rising: chart?.rising_sign || 'Scorpio',
          date: new Date().toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'})
        })
      })
      const data = await res.json()
      setRecommendation(data)
    } catch(e) { console.error(e) }
    setLoadingRec(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = [
    {label:'Home', route:'/dashboard', emoji:'🏠'},
    {label:'Breathe', route:'/breathing', emoji:'🌬️'},
    {label:'Music', route:'/music', emoji:'🎵'},
    {label:'Reading', route:'/reading', emoji:'🔮'},
    {label:'Journal', route:'/journal', emoji:'📓'},
  ]

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 100px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'56px',height:'56px',borderRadius:'50%',objectFit:'cover',boxShadow:'0 0 16px rgba(200,168,255,0.5)',border:'1px solid rgba(200,168,255,0.25)'}}/>
            <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button onClick={()=>router.push('/profile')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Profile</button>
            <button onClick={signOut} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Sign Out</button>
          </div>
        </nav>

        <div style={{padding:'20px 0 24px'}}>
          <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'10px',letterSpacing:'6px',color:'rgba(200,168,255,0.4)',display:'block',marginBottom:'6px'}}>{star} welcome back, beloved soul {star}</span>
          <span style={{fontStyle:'italic',fontWeight:300,fontSize:'38px',letterSpacing:'4px',display:'block',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'6px'}}>
            {user?.user_metadata?.full_name || 'Soul Seeker'}
          </span>
          <span style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)'}}>
            {new Date().toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'})}
          </span>
        </div>

        {!notifAsked && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default' && (
          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.15),rgba(255,214,160,0.05))',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'16px',padding:'16px 20px',marginBottom:'22px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
            <div>
              <p style={{fontStyle:'italic',fontSize:'14px',color:'#C8A8FF',marginBottom:'4px'}}>{star} Daily Reading Reminders</p>
              <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.5)'}}>Get notified when your cosmic reading is ready each morning!</p>
            </div>
            <div style={{display:'flex',gap:'8px',flexShrink:0}}>
              <button onClick={()=>setNotifAsked(true)} style={{padding:'6px 12px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',fontStyle:'italic',fontSize:'11px',color:'rgba(200,168,255,0.4)',cursor:'pointer'}}>Later</button>
              <button onClick={requestNotifications} style={{padding:'6px 12px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',fontStyle:'italic',fontSize:'11px',color:'#E8E0FF',cursor:'pointer'}}>Allow {star}</button>
            </div>
          </div>
        )}

        <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.12),rgba(40,20,100,0.2))',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'16px',padding:'16px 20px',marginBottom:'22px',display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{fontSize:'32px'}}>{moonData.emoji}</span>
          <div style={{flex:1}}>
            <div style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'3px'}}>{moonData.phase} Moon</div>
            <div style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'11px',color:'rgba(200,168,255,0.5)',lineHeight:1.6}}>{moonData.description}</div>
          </div>
          <span style={{fontStyle:'italic',fontSize:'12px',color:'rgba(255,214,160,0.6)',textAlign:'right'}}>
            {recommendation?.frequency || moonData.frequency}<br/>
            <span style={{fontSize:'9px',opacity:0.6}}>Recommended</span>
          </span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'22px'}}>
          {[
            [stats.streak.toString(),'Day Streak'],
            [stats.sessions.toString(),'Sessions'],
            [stats.hours.toString(),'Breathwork'],
            [stats.cycles.toString(),'Cycles']
          ].map(([val,lbl]) => (
            <div key={lbl} style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'12px',padding:'14px 10px',textAlign:'center'}}>
              <span style={{fontStyle:'italic',fontSize:'26px',color:'#C8A8FF',display:'block',marginBottom:'3px'}}>{val}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:'rgba(200,168,255,0.35)',textTransform:'uppercase'}}>{lbl}</span>
            </div>
          ))}
        </div>

        {loadingRec && !recommendation && (
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'16px',padding:'22px',textAlign:'center',marginBottom:'22px'}}>
            <p style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)'}}>{star} The stars are aligning your path...</p>
          </div>
        )}

        {recommendation && (
          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.1),rgba(255,214,160,0.05))',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'16px',padding:'18px',marginBottom:'22px'}}>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'6px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>{star} TODAY'S COSMIC RECOMMENDATION {star}</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              <div style={{background:'rgba(255,214,160,0.06)',border:'1px solid rgba(255,214,160,0.15)',borderRadius:'12px',padding:'14px'}}>
                <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'3px',color:'rgba(255,214,160,0.5)',marginBottom:'6px'}}>HEALING FREQUENCY</p>
                <p style={{fontStyle:'italic',fontSize:'18px',color:'#FFD6A0',marginBottom:'6px'}}>{recommendation.frequency}</p>
                <p style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(255,214,160,0.5)',lineHeight:1.6}}>{recommendation.frequency_reason}</p>
                <button onClick={()=>router.push(`/music?freq=${encodeURIComponent(recommendation.frequency)}`)} style={{marginTop:'10px',padding:'6px 14px',background:'rgba(255,214,160,0.15)',border:'1px solid rgba(255,214,160,0.3)',borderRadius:'20px',fontStyle:'italic',fontSize:'11px',letterSpacing:'2px',color:'#FFD6A0',cursor:'pointer'}}>Play Now</button>
              </div>
              <div style={{background:'rgba(138,90,255,0.08)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'12px',padding:'14px'}}>
                <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',marginBottom:'6px'}}>BREATHWORK</p>
                <p style={{fontStyle:'italic',fontSize:'16px',color:'#C8A8FF',marginBottom:'6px'}}>{recommendation.recommended_technique}</p>
                <p style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.5)',lineHeight:1.6}}>{recommendation.technique_reason}</p>
                <button onClick={()=>router.push('/breathing')} style={{marginTop:'10px',padding:'6px 14px',background:'rgba(138,90,255,0.2)',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',fontStyle:'italic',fontSize:'11px',letterSpacing:'2px',color:'#C8A8FF',cursor:'pointer'}}>Begin</button>
              </div>
            </div>
          </div>
        )}

        <span style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',display:'block',marginBottom:'12px'}}>{star} Today's Sacred Practice {star}</span>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'22px'}}>
          {[
            {icon:'🌙',title:'Sacred Breathwork',desc:'Choose your technique and healing frequency.',meta:'Begin your session',badge:'Ready',route:'/breathing'},
            {icon:'🌌',title:'Cosmic Soundbath',desc:'Deep immersion with Solfeggio tones.',meta:recommendation?.frequency || moonData.frequency,badge:'New',route:`/music?freq=${encodeURIComponent(recommendation?.frequency || moonData.frequency)}`},
            {icon:'⭐',title:'Morning Reading',desc:'Your daily astrological insight awaits.',meta:'Tap to read',badge:'Ready',route:'/reading'},
            {icon:'📓',title:'Soul Journal',desc:'Reflect on your cosmic journey today.',meta:'Write your truth',badge:'Ready',route:'/journal'},
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
          <span style={{fontStyle:'italic',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.35)',display:'block',marginBottom:'10px'}}>{star} Your Cosmic Affirmation {star}</span>
          <div style={{fontStyle:'italic',fontWeight:300,fontSize:'16px',letterSpacing:'1.5px',color:'rgba(220,210,255,0.75)',lineHeight:1.8}}>
            {recommendation?.affirmation || '"I am aligned with the cosmos. My soul is awakening to its highest purpose."'}
          </div>
        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'16px',padding:'18px 20px',marginBottom:'22px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <p style={{fontStyle:'italic',fontSize:'13px',color:'#C8A8FF',marginBottom:'4px'}}>{star} Daily Reading Email</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)'}}>Send today's cosmic reading to your inbox</p>
          </div>
          <button onClick={sendTestEmail} style={{padding:'8px 16px',background:'rgba(138,90,255,0.2)',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',fontStyle:'italic',fontSize:'12px',letterSpacing:'2px',color:'#C8A8FF',cursor:'pointer',flexShrink:0}}>Send {star}</button>
        </div>

        <div onClick={()=>router.push('/pricing')} style={{background:'linear-gradient(135deg,rgba(138,90,255,0.2),rgba(255,214,160,0.08))',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'16px',padding:'16px 20px',marginBottom:'22px',textAlign:'center',cursor:'pointer'}}>
          <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'4px'}}>{star} Unlock Full Sacred Access {star}</p>
          <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.6)',letterSpacing:'2px'}}>$10/month · 3-day free trial</p>
        </div>

      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(6,5,14,0.95)',borderTop:'1px solid rgba(200,168,255,0.12)',padding:'12px 0',zIndex:100}}>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',maxWidth:'680px',margin:'0 auto'}}>
          {navItems.map(({label,route,emoji}) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 16px',borderRadius:'10px'}}>
              <span style={{fontSize:'20px'}}>{emoji}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:route==='/dashboard'?'rgba(200,168,255,0.9)':'rgba(200,168,255,0.4)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}