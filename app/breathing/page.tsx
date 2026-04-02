'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function Breathing() {
  const router = useRouter()
  const star = '\u2726'
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState('tap to begin')
  const [count, setCount] = useState<any>(star)
  const [scale, setScale] = useState(1)
  const [cycles, setCycles] = useState(0)
  const [tech, setTech] = useState(0)
  const [freq, setFreq] = useState(2)
  const phaseR = useRef<any>(null)
  const countR = useRef<any>(null)

  const techniques = [
    {name:'4-7-8 Lunar',icon:'🌙',i:4,h:7,o:8,h2:0},
    {name:'Box Sacred',icon:'◈',i:4,h:4,o:4,h2:4},
    {name:'Solar Fire',icon:'☀️',i:6,h:0,o:6,h2:0},
    {name:'Earth Root',icon:'🌿',i:5,h:2,o:7,h2:0},
    {name:'Crystal Heart',icon:'💎',i:3,h:3,o:6,h2:3},
    {name:'Cosmos Deep',icon:'🌌',i:8,h:8,o:8,h2:0},
  ]

  const freqs = ['396 Hz','417 Hz','528 Hz','639 Hz','741 Hz','852 Hz','963 Hz']
  const t = techniques[tech]

  const getPhases = () => {
    const p:any[] = [{l:'inhale',d:t.i},{l:'hold',d:t.h},{l:'exhale',d:t.o}]
    if(t.h2>0) p.push({l:'hold',d:t.h2})
    return p.filter(x=>x.d>0)
  }

  const runPhase = (idx:number, cc:number) => {
    const ps = getPhases()
    if(idx>=ps.length){setCycles(cc+1);runPhase(0,cc+1);return}
    const p = ps[idx]
    setPhase(p.l)
    if(p.l==='inhale') setScale(1.4)
    else if(p.l==='exhale') setScale(1)
    else setScale(1.15)
    let c = p.d
    setCount(c)
    clearInterval(countR.current)
    countR.current = setInterval(()=>{c--;setCount(c<=0?star:c);if(c<=0)clearInterval(countR.current)},1000)
    phaseR.current = setTimeout(()=>runPhase(idx+1,cc),p.d*1000)
  }

  const start = () => {
    setCycles(0)
    setRunning(true)
    runPhase(0,0)
  }

  const stop = () => {
    setRunning(false)
    clearTimeout(phaseR.current)
    clearInterval(countR.current)
    setPhase('tap to begin')
    setCount(star)
    setScale(1)
    setCycles(0)
  }

  useEffect(()=>{if(cycles>=3&&running)stop()},[cycles])

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{star} CelestiaSOUL</span>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} SACRED BREATH {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>CelestiaSOUL</h1>
        </div>

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'12px'}}>{star} Choose Your Technique {star}</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'9px',marginBottom:'24px'}}>
          {techniques.map((tc,i)=>(
            <div key={tc.name} onClick={()=>!running&&setTech(i)} style={{background:tech===i?'rgba(138,90,255,0.15)':'rgba(255,255,255,0.03)',border:`1px solid ${tech===i?'rgba(200,168,255,0.45)':'rgba(200,168,255,0.1)'}`,borderRadius:'13px',padding:'13px 8px',textAlign:'center',cursor:'pointer'}}>
              <span style={{fontSize:'20px',display:'block',marginBottom:'5px'}}>{tc.icon}</span>
              <div style={{fontStyle:'italic',fontSize:'12px',color:'#C8A8FF',marginBottom:'3px'}}>{tc.name}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(180,160,220,0.45)'}}>{tc.i}·{tc.h||'-'}·{tc.o}{tc.h2?`·${tc.h2}`:''}</div>
            </div>
          ))}
        </div>

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'12px'}}>{star} Healing Frequency {star}</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'7px',justifyContent:'center',marginBottom:'28px'}}>
          {freqs.map((f,i)=>(
            <div key={f} onClick={()=>setFreq(i)} style={{background:freq===i?'rgba(255,214,160,0.18)':'rgba(255,214,160,0.06)',border:`1px solid ${freq===i?'#FFD6A0':'rgba(255,214,160,0.18)'}`,borderRadius:'20px',padding:'5px 11px',fontSize:'10px',color:'#FFD6A0',cursor:'pointer',fontFamily:'sans-serif'}}>{f}</div>
          ))}
        </div>

        <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'28px'}}>
          <div style={{position:'relative',width:'220px',height:'220px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'12px'}}>
            {[100,78,56].map((s,i)=>(
              <div key={i} style={{position:'absolute',width:`${s}%`,height:`${s}%`,borderRadius:'50%',border:'1px solid rgba(200,168,255,0.1)'}}/>
            ))}
            <div onClick={()=>running?stop():start()} style={{width:'125px',height:'125px',borderRadius:'50%',background:'radial-gradient(circle at 38% 32%,#9B6FFF,#3A1580)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'0 0 30px rgba(138,90,255,0.45)',transform:`scale(${scale})`,transition:'transform 0.8s ease',position:'relative',zIndex:2}}>
              <p style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(255,255,255,0.85)',fontStyle:'italic',margin:'0 0 2px'}}>{phase}</p>
              <p style={{fontSize:'30px',color:'#fff',fontWeight:300,margin:0}}>{count}</p>
            </div>
          </div>
          <p style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'#C8A8FF',margin:0}}>{running?`${freqs[freq]} · Cycle ${cycles}`:`${freqs[freq]} · Ready`}</p>
        </div>

        <div style={{background:'rgba(255,255,255,0.05)',borderRadius:'4px',height:'2px',marginBottom:'18px',overflow:'hidden'}}>
          <div style={{height:'100%',background:'linear-gradient(90deg,#8A5AFF,#A8E8FF,#FFD6A0)',borderRadius:'4px',width:`${Math.min((cycles/3)*100,100)}%`,transition:'width 1s linear'}}/>
        </div>

        <button onClick={()=>running?stop():start()} style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.25),rgba(255,214,160,0.1))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'13px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',marginBottom:'14px'}}>
          {running?'End Session':'Begin Sacred Breath'}
        </button>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'13px',padding:'16px 20px',textAlign:'center'}}>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(155,143,191,0.65)',marginBottom:'8px'}}>{star} Today's Affirmation {star}</p>
          <p style={{fontStyle:'italic',fontSize:'14px',color:'#C8A8FF',lineHeight:1.8,margin:0}}>Each breath fans the flame of your divine courage and unstoppable will.</p>
        </div>

        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',padding:'24px 0 0',borderTop:'1px solid rgba(200,168,255,0.07)',marginTop:'24px'}}>
          {[[star,'Home','/dashboard'],['༄','Breathe','/breathing'],['◎','Music','/music'],['☿','Reading','/reading'],['☽','Journal','/journal']].map(([icon,label,route]) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 12px'}}>
              <span style={{fontSize:'18px',color:'rgba(200,168,255,0.5)'}}>{icon}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:'rgba(200,168,255,0.35)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
