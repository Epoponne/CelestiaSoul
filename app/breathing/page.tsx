'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useSubscription } from '../../lib/useSubscription'

export default function Breathing() {
  const router = useRouter()
  const star = '\u2726'
  const { isPaid, loading } = useSubscription()
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState('tap to begin')
  const [count, setCount] = useState<any>(star)
  const [scale, setScale] = useState(1)
  const [cycles, setCycles] = useState(0)
  const [tech, setTech] = useState(0)
  const [freq, setFreq] = useState(0)
  const phaseR = useRef<any>(null)
  const countR = useRef<any>(null)

  const allTechniques = [
    {name:'Solar Fire',icon:'☀️',i:6,h:0,o:6,h2:0,free:true},
    {name:'4-7-8 Lunar',icon:'🌙',i:4,h:7,o:8,h2:0,free:false},
    {name:'Box Sacred',icon:'◈',i:4,h:4,o:4,h2:4,free:false},
    {name:'Earth Root',icon:'🌿',i:5,h:2,o:7,h2:0,free:false},
    {name:'Crystal Heart',icon:'💎',i:3,h:3,o:6,h2:3,free:false},
    {name:'Cosmos Deep',icon:'🌌',i:8,h:8,o:8,h2:0,free:false},
  ]

  const allFreqs = [
    {name:'396 Hz',free:true},
    {name:'417 Hz',free:false},
    {name:'528 Hz',free:false},
    {name:'639 Hz',free:false},
    {name:'741 Hz',free:false},
    {name:'852 Hz',free:false},
    {name:'963 Hz',free:false},
  ]

  const navItems = [
    {label:'Home', route:'/dashboard', emoji:'🏠'},
    {label:'Breathe', route:'/breathing', emoji:'🌬️'},
    {label:'Music', route:'/music', emoji:'🎵'},
    {label:'Reading', route:'/reading', emoji:'🔮'},
    {label:'Journal', route:'/journal', emoji:'📓'},
  ]

  const t = allTechniques[tech]

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

  const handleTechClick = (i: number) => {
    if (running) return
    if (!allTechniques[i].free && !isPaid) {
      router.push('/pricing')
      return
    }
    setTech(i)
  }

  const handleFreqClick = (i: number) => {
    if (!allFreqs[i].free && !isPaid) {
      router.push('/pricing')
      return
    }
    setFreq(i)
  }

  useEffect(()=>{if(cycles>=3&&running)stop()},[cycles])

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 100px'}}>

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
          {allTechniques.map((tc,i)=>(
            <div key={tc.name} onClick={()=>handleTechClick(i)} style={{background:tech===i?'rgba(138,90,255,0.15)':'rgba(255,255,255,0.03)',border:`1px solid ${tech===i?'rgba(200,168,255,0.45)':'rgba(200,168,255,0.1)'}`,borderRadius:'13px',padding:'13px 8px',textAlign:'center',cursor:'pointer',position:'relative',opacity:(!tc.free && !isPaid)?0.5:1}}>
              {!tc.free && !isPaid && (
                <div style={{position:'absolute',top:'6px',right:'6px',fontSize:'10px'}}>🔒</div>
              )}
              <span style={{fontSize:'20px',display:'block',marginBottom:'5px'}}>{tc.icon}</span>
              <div style={{fontStyle:'italic',fontSize:'12px',color:'#C8A8FF',marginBottom:'3px'}}>{tc.name}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(180,160,220,0.45)'}}>{tc.i}·{tc.h||'-'}·{tc.o}{tc.h2?`·${tc.h2}`:''}</div>
            </div>
          ))}
        </div>

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'12px'}}>{star} Healing Frequency {star}</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'7px',justifyContent:'center',marginBottom:'28px'}}>
          {allFreqs.map((f,i)=>(
            <div key={f.name} onClick={()=>handleFreqClick(i)} style={{background:freq===i?'rgba(255,214,160,0.18)':'rgba(255,214,160,0.06)',border:`1px solid ${freq===i?'#FFD6A0':'rgba(255,214,160,0.18)'}`,borderRadius:'20px',padding:'5px 11px',fontSize:'10px',color:'#FFD6A0',cursor:'pointer',fontFamily:'sans-serif',opacity:(!f.free && !isPaid)?0.4:1,position:'relative'}}>
              {!f.free && !isPaid && <span style={{marginRight:'4px'}}>🔒</span>}
              {f.name}
            </div>
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
          <p style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'#C8A8FF',margin:0}}>{running?`${allFreqs[freq].name} · Cycle ${cycles}`:`${allFreqs[freq].name} · Ready`}</p>
        </div>

        <div style={{background:'rgba(255,255,255,0.05)',borderRadius:'4px',height:'2px',marginBottom:'18px',overflow:'hidden'}}>
          <div style={{height:'100%',background:'linear-gradient(90deg,#8A5AFF,#A8E8FF,#FFD6A0)',borderRadius:'4px',width:`${Math.min((cycles/3)*100,100)}%`,transition:'width 1s linear'}}/>
        </div>

        <button onClick={()=>running?stop():start()} style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.25),rgba(255,214,160,0.1))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'13px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',marginBottom:'14px'}}>
          {running?'End Session':'Begin Sacred Breath'}
        </button>

        {!isPaid && !loading && (
          <div onClick={()=>router.push('/pricing')} style={{background:'linear-gradient(135deg,rgba(138,90,255,0.2),rgba(255,214,160,0.08))',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'16px',padding:'16px 20px',marginBottom:'14px',textAlign:'center',cursor:'pointer'}}>
            <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'4px'}}>{star} Unlock All 6 Techniques {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.6)',letterSpacing:'2px'}}>$10/month · 3-day free trial</p>
          </div>
        )}

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'13px',padding:'16px 20px',textAlign:'center'}}>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(155,143,191,0.65)',marginBottom:'8px'}}>{star} Today's Affirmation {star}</p>
          <p style={{fontStyle:'italic',fontSize:'14px',color:'#C8A8FF',lineHeight:1.8,margin:0}}>Each breath fans the flame of your divine courage and unstoppable will.</p>
        </div>

      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(6,5,14,0.95)',borderTop:'1px solid rgba(200,168,255,0.12)',padding:'12px 0',zIndex:100}}>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',maxWidth:'680px',margin:'0 auto'}}>
          {navItems.map(({label,route,emoji}) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 16px',borderRadius:'10px'}}>
              <span style={{fontSize:'20px'}}>{emoji}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:route==='/breathing'?'rgba(200,168,255,0.9)':'rgba(200,168,255,0.4)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}