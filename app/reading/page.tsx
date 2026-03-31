'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Reading() {
  const router = useRouter()
  const [tab, setTab] = useState(0)
  const [reading, setReading] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const sunSign = 'Aries'
  const moonSign = 'Leo'
  const rising = 'Scorpio'

  const fetchReading = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/reading', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          sunSign,
          moonSign,
          rising,
          date: new Date().toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'})
        })
      })
      const data = await res.json()
      setReading(data)
    } catch(e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => { fetchReading() }, [])

  const tabs = ["Today's Reading", "Natal Blueprint", "Transits"]

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>✦ CelestiaSOUL</span>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>← Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>✦ YOUR COSMIC READING ✦</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>CelestiaSOUL</h1>
        </div>

        <div style={{display:'flex',marginBottom:'24px',background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'14px',padding:'4px'}}>
          {tabs.map((t,i)=>(
            <div key={t} onClick={()=>setTab(i)} style={{flex:1,fontStyle:'italic',fontSize:'12px',letterSpacing:'2px',color:tab===i?'#E8E0FF':'rgba(200,168,255,0.4)',cursor:'pointer',padding:'9px 4px',borderRadius:'10px',textAlign:'center',background:tab===i?'rgba(138,90,255,0.22)':'transparent',border:tab===i?'1px solid rgba(200,168,255,0.3)':'1px solid transparent'}}>{t}</div>
          ))}
        </div>

        {tab===0 && (
          <div>
            {loading && (
              <div style={{textAlign:'center',padding:'60px 20px'}}>
                <div style={{fontSize:'32px',marginBottom:'16px'}}>✦</div>
                <p style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'rgba(200,168,255,0.6)'}}>The stars are speaking...</p>
                <p style={{fontFamily:'sans-serif',fontSize:'11px',letterSpacing:'3px',color:'rgba(200,168,255,0.3)',marginTop:'8px'}}>Generating your personalized reading</p>
              </div>
            )}

            {!loading && reading && (
              <div>
                <div style={{background:'linear-gradient(135deg,rgba(255,214,160,0.08),rgba(138,90,255,0.06))',border:'1px solid rgba(255,214,160,0.15)',borderRadius:'14px',padding:'14px 18px',marginBottom:'16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                    <div style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'3px',color:'#FFD6A0'}}>{new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</div>
                    <div style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(255,214,160,0.5)',marginTop:'2px'}}>🌖 Waning Gibbous · Release Energy</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontStyle:'italic',fontSize:'13px',color:'#C8A8FF'}}>{sunSign} ☉ · {moonSign} ☽</div>
                    <div style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'2px',color:'rgba(200,168,255,0.4)'}}>{rising} Rising</div>
                  </div>
                </div>

                {[
                  {icon:'♀',title:'Love & Relationships',text:reading.love,color:'rgba(255,130,180,0.5)'},
                  {icon:'☿',title:'Career & Purpose',text:reading.career,color:'rgba(255,214,160,0.5)'},
                  {icon:'🌿',title:'Health & Body Wisdom',text:reading.health,color:'rgba(100,220,130,0.5)'},
                ].map(({icon,title,text,color})=>(
                  <div key={title} style={{background:'rgba(255,255,255,0.022)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'18px',marginBottom:'12px',borderLeft:`3px solid ${color}`}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}}>
                      <span style={{fontSize:'20px'}}>{icon}</span>
                      <span style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'2px',color:'#C8A8FF'}}>{title}</span>
                    </div>
                    <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'1px',color:'rgba(220,210,255,0.7)',lineHeight:1.9,margin:0}}>{text}</p>
                  </div>
                ))}

                <div style={{background:'linear-gradient(135deg,rgba(255,214,160,0.08),rgba(138,90,255,0.06))',border:'1px solid rgba(255,214,160,0.2)',borderRadius:'16px',padding:'18px',marginBottom:'12px',display:'flex',alignItems:'center',gap:'16px'}}>
                  <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'radial-gradient(circle,#FFD6A0,#8B4010)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>◎</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(255,214,160,0.45)',marginBottom:'3px'}}>✦ TODAY'S LUCKY FREQUENCY</div>
                    <div style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',color:'#FFD6A0',marginBottom:'3px'}}>{reading.frequency}</div>
                  </div>
                  <button onClick={()=>router.push('/music')} style={{fontStyle:'italic',fontSize:'12px',letterSpacing:'3px',color:'#E8E0FF',background:'rgba(255,214,160,0.15)',border:'1px solid rgba(255,214,160,0.3)',borderRadius:'20px',padding:'6px 14px',cursor:'pointer',flexShrink:0}}>Play ▶</button>
                </div>

                <div style={{background:'linear-gradient(135deg,rgba(168,232,255,0.06),rgba(60,40,160,0.12))',border:'1px solid rgba(168,232,255,0.15)',borderRadius:'16px',padding:'20px',marginBottom:'12px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
                    <span style={{fontSize:'28px'}}>🌖</span>
                    <div style={{fontStyle:'italic',fontSize:'17px',letterSpacing:'3px',color:'#A8E8FF'}}>Moon Ritual · Tonight</div>
                  </div>
                  <p style={{fontStyle:'italic',fontSize:'14px',color:'rgba(200,230,255,0.7)',lineHeight:1.9,margin:0}}>{reading.ritual}</p>
                </div>

                <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'16px',padding:'22px',textAlign:'center',marginBottom:'12px'}}>
                  <p style={{fontStyle:'italic',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.35)',marginBottom:'10px'}}>✦ TODAY'S AFFIRMATION ✦</p>
                  <p style={{fontStyle:'italic',fontWeight:300,fontSize:'16px',letterSpacing:'1.5px',color:'rgba(220,210,255,0.75)',lineHeight:1.8,margin:0}}>"{reading.affirmation}"</p>
                </div>

                <button onClick={fetchReading} style={{width:'100%',padding:'12px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'13px',fontStyle:'italic',fontSize:'14px',letterSpacing:'4px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>
                  ✦ Refresh My Reading ✦
                </button>
              </div>
            )}
          </div>
        )}

        {tab===1 && (
          <div>
            <div style={{background:'linear-gradient(145deg,rgba(138,90,255,0.12),rgba(20,10,60,0.28))',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'24px',marginBottom:'18px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'18px',marginBottom:'18px'}}>
                <div style={{width:'64px',height:'64px',borderRadius:'50%',background:'radial-gradient(circle,#C8A8FF,#3A1580)',border:'1px solid rgba(200,168,255,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',flexShrink:0}}>✦</div>
                <div>
                  <div style={{fontStyle:'italic',fontSize:'24px',letterSpacing:'4px',color:'#E8E0FF',marginBottom:'4px'}}>Emelda</div>
                  <div style={{fontFamily:'sans-serif',fontSize:'11px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)'}}>☉ Aries · ☽ Leo · ↑ Scorpio Rising</div>
                </div>
              </div>
              <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'1px',color:'rgba(220,210,255,0.65)',lineHeight:1.9,borderTop:'1px solid rgba(200,168,255,0.08)',paddingTop:'16px',margin:0}}>You are a soul forged in celestial fire — the bold pioneer of Aries, the radiant heart of Leo, and the penetrating depth of Scorpio Rising. You came into this life to lead, to love fiercely, and to transform everything you touch.</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'8px'}}>
              {[['☉','Sun','Aries'],['☽','Moon','Leo'],['↑','Rising','Scorpio'],['♀','Venus','Pisces'],['♂','Mars','Gemini'],['♃','Jupiter','Sagittarius'],['♄','Saturn','Capricorn'],['♅','Uranus','Aquarius'],['♆','Neptune','Capricorn'],['♇','Pluto','Scorpio']].map(([sym,name,sign])=>(
                <div key={name} style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'12px',padding:'11px 6px',textAlign:'center'}}>
                  <span style={{fontSize:'16px',display:'block',marginBottom:'4px'}}>{sym}</span>
                  <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.4)',marginBottom:'2px'}}>{name}</div>
                  <div style={{fontStyle:'italic',fontSize:'11px',color:'#C8A8FF'}}>{sign}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab===2 && (
          <div>
            {[
              {planet:'☉',title:'Sun conjunct natal Sun',desc:'Solar Return · Aries Season peak',effect:'Empowering',color:'rgba(100,220,130,0.7)'},
              {planet:'♀',title:'Venus trine natal Moon',desc:'Emotional harmony · Love opens',effect:'Flowing',color:'rgba(100,220,130,0.7)'},
              {planet:'☿',title:'Mercury direct in 10th House',desc:'Career clarity returns',effect:'Clearing',color:'rgba(100,220,130,0.7)'},
              {planet:'♂',title:'Mars square natal Venus',desc:'Tension in relationships possible',effect:'Challenging',color:'rgba(255,180,60,0.7)'},
              {planet:'♃',title:'Jupiter sextile natal Mars',desc:'Expansion · New opportunities',effect:'Expanding',color:'rgba(100,220,130,0.7)'},
              {planet:'♄',title:'Saturn opposite natal Moon',desc:'Emotional patterns being tested',effect:'Testing',color:'rgba(255,180,60,0.7)'},
              {planet:'♇',title:'Pluto trine natal Sun',desc:'Deep transformation · Power aligned',effect:'Transforming',color:'rgba(100,220,130,0.7)'},
            ].map(({planet,title,desc,effect,color})=>(
              <div key={title} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 0',borderBottom:'1px solid rgba(200,168,255,0.06)'}}>
                <span style={{fontSize:'18px',width:'28px',textAlign:'center',flexShrink:0}}>{planet}</span>
                <div style={{flex:1}}>
                  <div style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'1.5px',color:'#C8A8FF',marginBottom:'2px'}}>{title}</div>
                  <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.4)',letterSpacing:'1px'}}>{desc}</div>
                </div>
                <span style={{fontFamily:'sans-serif',fontSize:'10px',padding:'3px 10px',borderRadius:'10px',background:'rgba(100,220,130,0.08)',border:`1px solid ${color}`,color,flexShrink:0}}>{effect}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',padding:'24px 0 0',borderTop:'1px solid rgba(200,168,255,0.07)',marginTop:'16px'}}>
          {[['✦','Home','/dashboard'],['༄','Breathe','/breathing'],['◎','Music','/music'],['☿','Reading','/reading'],['☽','Journal','/journal']].map(([icon,label,route])=>(
            <div key={label} onClick={()=>router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 12px'}}>
              <span style={{fontSize:'18px',color:route==='/reading'?'#C8A8FF':'rgba(200,168,255,0.3)'}}>{icon}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:route==='/reading'?'rgba(200,168,255,0.7)':'rgba(200,168,255,0.25)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
