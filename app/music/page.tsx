'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Music() {
  const router = useRouter()
  const [playing, setPlaying] = useState(0)
  const [freq, setFreq] = useState(2)

  const tracks = [
    {icon:'🌙',name:'Lunar Drift',hz:'528 Hz',dur:'20 min'},
    {icon:'☀️',name:'Solar Ignition',hz:'396 Hz',dur:'15 min'},
    {icon:'🌌',name:'Void Meditation',hz:'963 Hz',dur:'30 min'},
    {icon:'💎',name:'Crystal Resonance',hz:'741 Hz',dur:'25 min'},
    {icon:'🌿',name:'Earth Pulse',hz:'417 Hz',dur:'18 min'},
    {icon:'◎',name:'Crown Opening',hz:'963 Hz',dur:'22 min'},
    {icon:'🌊',name:'Deep Space Float',hz:'639 Hz',dur:'35 min'},
    {icon:'✦',name:'Starfield Drift',hz:'852 Hz',dur:'28 min'},
  ]

  const freqs = ['396 Hz','417 Hz','528 Hz','639 Hz','741 Hz','852 Hz','963 Hz']

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>✦ CelestiaSOUL</span>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>← Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>✦ SACRED SOUND ✦</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>CelestiaSOUL</h1>
        </div>

        <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.12),rgba(20,10,60,0.25))',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'24px',marginBottom:'22px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'16px'}}>
            <div style={{width:'70px',height:'70px',borderRadius:'12px',background:'radial-gradient(circle,#3A1080,#06050E)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'30px',border:'1px solid rgba(200,168,255,0.2)',flexShrink:0}}>{tracks[playing].icon}</div>
            <div style={{flex:1}}>
              <div style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'2px',color:'#E8E0FF',marginBottom:'4px'}}>{tracks[playing].name}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'11px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)',marginBottom:'6px'}}>CelestiaSOUL · Sacred Frequencies</div>
              <div style={{display:'flex',gap:'8px'}}>
                <span style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'2px',padding:'3px 9px',borderRadius:'10px',background:'rgba(255,214,160,0.1)',border:'1px solid rgba(255,214,160,0.25)',color:'rgba(255,214,160,0.7)'}}>{tracks[playing].hz}</span>
                <span style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'2px',padding:'3px 9px',borderRadius:'10px',background:'rgba(168,232,255,0.1)',border:'1px solid rgba(168,232,255,0.2)',color:'rgba(168,232,255,0.6)'}}>{tracks[playing].dur}</span>
              </div>
            </div>
          </div>

          <div style={{background:'rgba(255,255,255,0.05)',borderRadius:'4px',height:'3px',marginBottom:'14px',overflow:'hidden'}}>
            <div style={{height:'100%',background:'linear-gradient(90deg,#8A5AFF,#C8A8FF,#FFD6A0)',borderRadius:'4px',width:'35%'}}/>
          </div>

          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span style={{fontStyle:'italic',fontSize:'12px',color:'rgba(200,168,255,0.35)'}}>7:00</span>
            <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
              <button onClick={()=>setPlaying(p=>p>0?p-1:tracks.length-1)} style={{background:'none',border:'none',cursor:'pointer',fontSize:'20px',color:'rgba(200,168,255,0.5)'}}>⏮</button>
              <div style={{width:'50px',height:'50px',borderRadius:'50%',background:'radial-gradient(circle,#9B6FFF,#3A1580)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:'18px',color:'#fff',boxShadow:'0 0 20px rgba(138,90,255,0.45)'}}>▶</div>
              <button onClick={()=>setPlaying(p=>p<tracks.length-1?p+1:0)} style={{background:'none',border:'none',cursor:'pointer',fontSize:'20px',color:'rgba(200,168,255,0.5)'}}>⏭</button>
            </div>
            <span style={{fontStyle:'italic',fontSize:'12px',color:'rgba(200,168,255,0.35)'}}>{tracks[playing].dur}</span>
          </div>
        </div>

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'12px'}}>✦ Healing Frequencies ✦</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'7px',justifyContent:'center',marginBottom:'22px'}}>
          {freqs.map((f,i)=>(
            <div key={f} onClick={()=>setFreq(i)} style={{background:freq===i?'rgba(255,214,160,0.18)':'rgba(255,214,160,0.06)',border:`1px solid ${freq===i?'#FFD6A0':'rgba(255,214,160,0.18)'}`,borderRadius:'20px',padding:'5px 11px',fontSize:'10px',color:'#FFD6A0',cursor:'pointer',fontFamily:'sans-serif'}}>{f}</div>
          ))}
        </div>

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'12px'}}>✦ Sacred Playlist ✦</p>
        <div style={{marginBottom:'22px'}}>
          {tracks.map((t,i)=>(
            <div key={t.name} onClick={()=>setPlaying(i)} style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'12px',cursor:'pointer',marginBottom:'6px',background:playing===i?'rgba(138,90,255,0.14)':'rgba(255,255,255,0.02)',border:`1px solid ${playing===i?'rgba(200,168,255,0.25)':'rgba(200,168,255,0.06)'}`}}>
              <span style={{fontSize:'20px'}}>{t.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'1.5px',color:'#C8A8FF',marginBottom:'2px'}}>{t.name}</div>
                <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.38)',letterSpacing:'1px'}}>{t.hz}</div>
              </div>
              <span style={{fontStyle:'italic',fontSize:'12px',color:'rgba(255,214,160,0.45)'}}>{t.dur}</span>
            </div>
          ))}
        </div>

        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',padding:'14px 0 0',borderTop:'1px solid rgba(200,168,255,0.07)'}}>
          {[['✦','Home','/dashboard'],['༄','Breathe','/breathing'],['◎','Music','/music'],['☿','Reading','/reading'],['☽','Journal','/journal']].map(([icon,label,route])=>(
            <div key={label} onClick={()=>router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 12px'}}>
              <span style={{fontSize:'18px',color:route==='/music'?'#C8A8FF':'rgba(200,168,255,0.3)'}}>{icon}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:route==='/music'?'rgba(200,168,255,0.7)':'rgba(200,168,255,0.25)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}