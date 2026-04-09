'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { getMoonPhase } from '../../lib/moonPhase'

export default function Journal() {
  const router = useRouter()
  const star = '\u2726'
  const [entry, setEntry] = useState('')
  const [entries, setEntries] = useState<any[]>([])
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const moonData = getMoonPhase()

  useEffect(() => { loadEntries() }, [])

  const loadEntries = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)
    if (data) setEntries(data)
  }

  const saveEntry = async () => {
    if (!entry.trim()) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('journal_entries').insert({
        user_id: user.id,
        content: entry,
        moon_phase: moonData.phase,
        created_at: new Date().toISOString()
      })
      setEntry('')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      loadEntries()
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

  const prompts = [
    'What is your soul calling you toward today?',
    'Where do you feel resistance and what is it teaching you?',
    'What are you ready to release under this moon?',
    'How is the universe supporting your growth right now?',
    'What would your highest self say to you today?',
  ]

  const [prompt] = useState(prompts[Math.floor(Math.random() * prompts.length)])

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

        <div style={{textAlign:'center',marginBottom:'28px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} SACRED JOURNAL {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>Soul Journal</h1>
        </div>

        <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.12),rgba(40,20,100,0.2))',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'16px',padding:'16px 20px',marginBottom:'22px',display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{fontSize:'28px'}}>{moonData.emoji}</span>
          <div>
            <div style={{fontStyle:'italic',fontSize:'15px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'3px'}}>{moonData.phase} Moon</div>
            <div style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.5)'}}>{moonData.description}</div>
          </div>
        </div>

        <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'24px',marginBottom:'22px'}}>
          <p style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',marginBottom:'16px'}}>{star} Today's Soul Prompt</p>
          <p style={{fontStyle:'italic',fontSize:'15px',color:'rgba(220,210,255,0.75)',lineHeight:1.9,marginBottom:'20px'}}>"{prompt}"</p>
          <textarea
            value={entry}
            onChange={e=>setEntry(e.target.value)}
            placeholder="Pour your soul onto the page..."
            rows={8}
            style={{width:'100%',background:'rgba(138,90,255,0.05)',border:'1px solid rgba(200,168,255,0.12)',borderRadius:'12px',padding:'16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif',resize:'none',lineHeight:1.9}}
          />
          {saved && (
            <div style={{background:'rgba(100,220,130,0.1)',border:'1px solid rgba(100,220,130,0.25)',borderRadius:'10px',padding:'10px',marginTop:'12px',textAlign:'center',fontStyle:'italic',fontSize:'13px',color:'rgba(100,220,130,0.8)'}}>
              {star} Your soul's words have been saved {star}
            </div>
          )}
          <button onClick={saveEntry} disabled={loading} style={{width:'100%',marginTop:'14px',padding:'14px',background:'linear-gradient(135deg,rgba(138,90,255,0.3),rgba(100,60,200,0.2))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'12px',fontStyle:'italic',fontSize:'15px',letterSpacing:'4px',color:'#E8E0FF',cursor:'pointer'}}>
            {loading?'Saving...': `Save Entry ${star}`}
          </button>
        </div>

        {entries.length > 0 && (
          <div>
            <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',marginBottom:'16px'}}>{star} Past Entries {star}</p>
            {entries.map((e,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.022)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'14px',padding:'18px',marginBottom:'12px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                  <span style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'2px',color:'rgba(200,168,255,0.4)'}}>
                    {new Date(e.created_at).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}
                  </span>
                  {e.moon_phase && <span style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.3)'}}>{e.moon_phase} Moon</span>}
                </div>
                <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(220,210,255,0.65)',lineHeight:1.9,margin:0}}>{e.content}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(6,5,14,0.95)',borderTop:'1px solid rgba(200,168,255,0.12)',padding:'12px 0',zIndex:100}}>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',maxWidth:'680px',margin:'0 auto'}}>
          {navItems.map(({label,route,emoji}) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 16px',borderRadius:'10px'}}>
              <span style={{fontSize:'20px'}}>{emoji}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:route==='/journal'?'rgba(200,168,255,0.9)':'rgba(200,168,255,0.4)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}
