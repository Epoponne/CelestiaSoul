'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Journal() {
  const router = useRouter()
  const star = '\u2726'
  const [intention, setIntention] = useState('')
  const [entry, setEntry] = useState('')
  const [release1, setRelease1] = useState('')
  const [release2, setRelease2] = useState('')
  const [release3, setRelease3] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pastEntries, setPastEntries] = useState<any[]>([])
  const [showPast, setShowPast] = useState(false)

  useEffect(()=>{ loadEntries() },[])

  const loadEntries = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)
    if (data) setPastEntries(data)
  }

  const save = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/signin'); return }
    await supabase.from('journal_entries').insert({
      user_id: user.id,
      moon_phase: 'Waning Gibbous',
      entry_text: entry,
      intentions: [intention, release1, release2, release3].filter(Boolean),
    })
    setSaved(true)
    setTimeout(()=>setSaved(false), 3000)
    loadEntries()
    setLoading(false)
  }

  const prompts = [
    "What is your soul wanting to express today?",
    "What energy are you calling in this moon cycle?",
    "Where have you felt most aligned this week?",
    "What old story are you ready to release?",
    "What does your highest self want you to know today?"
  ]

  const todayPrompt = prompts[new Date().getDay() % prompts.length]

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{star} CelestiaSOUL</span>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} SOUL JOURNAL {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>CelestiaSOUL</h1>
        </div>

        <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.08),rgba(40,20,100,0.14))',border:'1px solid rgba(200,168,255,0.12)',borderRadius:'14px',padding:'14px 18px',marginBottom:'22px',display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'28px'}}>🌖</span>
          <div>
            <div style={{fontStyle:'italic',fontSize:'15px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'2px'}}>Waning Gibbous · Release & Reflect</div>
            <div style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.45)'}}>{new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
          </div>
        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'22px',marginBottom:'16px'}}>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'6px'}}>{star} TODAY'S SOUL PROMPT {star}</p>
          <p style={{fontStyle:'italic',fontSize:'15px',color:'rgba(220,210,255,0.7)',lineHeight:1.8,marginBottom:'16px'}}>{todayPrompt}</p>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'10px'}}>{star} TODAY'S INTENTION {star}</p>
          <input
            type="text"
            placeholder="I intend to..."
            value={intention}
            onChange={e=>setIntention(e.target.value)}
            style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontStyle:'italic',fontFamily:'Georgia,serif',letterSpacing:'1px',display:'block'}}
          />
        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'22px',marginBottom:'16px'}}>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>{star} SOUL REFLECTION {star}</p>
          <textarea
            placeholder="Write freely, beloved soul. Let the words flow without judgment..."
            value={entry}
            onChange={e=>setEntry(e.target.value)}
            rows={7}
            style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontStyle:'italic',fontFamily:'Georgia,serif',letterSpacing:'1px',lineHeight:1.9,resize:'none',display:'block'}}
          />
        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'22px',marginBottom:'22px'}}>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'6px'}}>{star} I AM RELEASING {star}</p>
          <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',marginBottom:'14px',letterSpacing:'1px'}}>Under this Waning Gibbous Moon, what are you letting go of?</p>
          {[
            {val:release1,set:setRelease1,ph:'A fear that no longer serves me...'},
            {val:release2,set:setRelease2,ph:'A habit I am ready to transform...'},
            {val:release3,set:setRelease3,ph:'A belief I am letting go of...'},
          ].map(({val,set,ph},i)=>(
            <input
              key={i}
              type="text"
              placeholder={ph}
              value={val}
              onChange={e=>set(e.target.value)}
              style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'11px 16px',color:'#E8E0FF',fontSize:'13px',outline:'none',fontStyle:'italic',fontFamily:'Georgia,serif',marginBottom:'10px',display:'block'}}
            />
          ))}
        </div>

        {saved && (
          <div style={{background:'rgba(100,220,130,0.1)',border:'1px solid rgba(100,220,130,0.25)',borderRadius:'10px',padding:'12px',marginBottom:'14px',textAlign:'center',fontStyle:'italic',fontSize:'14px',color:'rgba(100,220,130,0.8)',letterSpacing:'2px'}}>
            {star} Your soul's words have been saved {star}
          </div>
        )}

        <button onClick={save} disabled={loading} style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.25),rgba(255,214,160,0.1))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'13px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',marginBottom:'22px'}}>
          {loading ? 'Saving...' : `Save My Reflection ${star}`}
        </button>

        {pastEntries.length > 0 && (
          <div style={{marginBottom:'22px'}}>
            <div onClick={()=>setShowPast(!showPast)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer',marginBottom:'12px'}}>
              <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)'}}>{star} PAST REFLECTIONS {star}</p>
              <span style={{fontSize:'12px',color:'rgba(200,168,255,0.4)'}}>{showPast?'Hide':'Show'}</span>
            </div>
            {showPast && pastEntries.map((e,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'12px',padding:'16px',marginBottom:'10px'}}>
                <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'2px',color:'rgba(200,168,255,0.35)',marginBottom:'8px'}}>{new Date(e.created_at).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</p>
                <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(220,210,255,0.6)',lineHeight:1.8,margin:0}}>{e.entry_text}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',padding:'14px 0 0',borderTop:'1px solid rgba(200,168,255,0.07)'}}>
          {[[star,'Home','/dashboard'],['༄','Breathe','/breathing'],['◎','Music','/music'],['☿','Reading','/reading'],['☽','Journal','/journal']].map(([icon,label,route]) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 12px'}}>
              <span style={{fontSize:'18px',color:route==='/journal'?'#C8A8FF':'rgba(200,168,255,0.3)'}}>{icon}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:route==='/journal'?'rgba(200,168,255,0.7)':'rgba(200,168,255,0.35)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}