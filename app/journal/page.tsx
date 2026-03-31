'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Journal() {
  const router = useRouter()
  const [entry, setEntry] = useState('')
  const [intention, setIntention] = useState('')
  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)
    setTimeout(()=>setSaved(false),3000)
  }

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>✦ CelestiaSOUL</span>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>← Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>✦ SOUL JOURNAL ✦</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>CelestiaSOUL</h1>
        </div>

        <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.08),rgba(40,20,100,0.14))',border:'1px solid rgba(200,168,255,0.12)',borderRadius:'14px',padding:'14px 18px',marginBottom:'22px',display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'24px'}}>🌖</span>
          <div>
            <div style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'2px'}}>Waning Gibbous · Release & Reflect</div>
            <div style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.45)'}}>{new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
          </div>
        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'22px',marginBottom:'16px'}}>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>✦ TODAY'S INTENTION ✦</p>
          <input
            type="text"
            placeholder="Set your sacred intention for today..."
            value={intention}
            onChange={e=>setIntention(e.target.value)}
            style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontStyle:'italic',fontFamily:'Georgia,serif',letterSpacing:'1px'}}
          />
        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'22px',marginBottom:'16px'}}>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>✦ SOUL REFLECTION ✦</p>
          <textarea
            placeholder="What is your soul wanting to express today? What are you releasing under this Waning Gibbous Moon? Write freely, beloved..."
            value={entry}
            onChange={e=>setEntry(e.target.value)}
            rows={8}
            style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontStyle:'italic',fontFamily:'Georgia,serif',letterSpacing:'1px',lineHeight:1.8,resize:'none'}}
          />
        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'22px',marginBottom:'22px'}}>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'14px'}}>✦ I AM RELEASING ✦</p>
          {['A fear that no longer serves me','A habit I am ready to transform','A belief I am letting go'].map((placeholder,i)=>(
            <input
              key={i}
              type="text"
              placeholder={placeholder}
              style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'11px 16px',color:'#E8E0FF',fontSize:'13px',outline:'none',fontStyle:'italic',fontFamily:'Georgia,serif',marginBottom:'10px',display:'block'}}
            />
          ))}
        </div>

        {saved && (
          <div style={{background:'rgba(100,220,130,0.1)',border:'1px solid rgba(100,220,130,0.25)',borderRadius:'10px',padding:'12px',marginBottom:'14px',textAlign:'center',fontStyle:'italic',fontSize:'14px',color:'rgba(100,220,130,0.8)',letterSpacing:'2px'}}>
            ✦ Your soul's words have been received ✦
          </div>
        )}

        <button onClick={save} style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.25),rgba(255,214,160,0.1))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'13px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',marginBottom:'22px'}}>
          Save My Reflection
        </button>

        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',padding:'14px 0 0',borderTop:'1px solid rgba(200,168,255,0.07)'}}>
          {[['✦','Home','/dashboard'],['༄','Breathe','/breathing'],['◎','Music','/music'],['☿','Reading','/reading'],['☽','Journal','/journal']].map(([icon,label,route])=>(
            <div key={label} onClick={()=>router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 12px'}}>
              <span style={{fontSize:'18px',color:route==='/journal'?'#C8A8FF':'rgba(200,168,255,0.3)'}}>{icon}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:route==='/journal'?'rgba(200,168,255,0.7)':'rgba(200,168,255,0.25)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
