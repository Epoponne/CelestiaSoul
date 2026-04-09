'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useSubscription } from '../../lib/useSubscription'
import { supabase } from '../../lib/supabase'

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
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [sessionDone, setSessionDone] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)
  const phaseR = useRef<any>(null)
  const countR = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement|null>(null)

  const allTechniques = [
    {name:'Solar Fire',icon:'sun',i:6,h:0,o:6,h2:0,free:true},
    {name:'4-7-8 Lunar',icon:'moon',i:4,h:7,o:8,h2:0,free:false},
    {name:'Box Sacred',icon:'box',i:4,h:4,o:4,h2:4,free:false},
    {name:'Earth Root',icon:'leaf',i:5,h:2,o:7,h2:0,free:false},
    {name:'Crystal Heart',icon:'gem',i:3,h:3,o:6,h2:3,free:false},
    {name:'Cosmos Deep',icon:'star',i:8,h:8,o:8,h2:0,free:false},
  ]

  const allFreqs = [
    {name:'396 Hz',label:'Liberation',file:'tone-396hz.mp3',free:true},
    {name:'417 Hz',label:'Transformation',file:'tone-417hz.mp3',free:false},
    {name:'528 Hz',label:'DNA Repair',file:'tone-528hz.mp3',free:false},
    {name:'639 Hz',label:'Heart Chakra',file:'tone-639hz.mp3',free:false},
    {name:'741 Hz',label:'Intuition',file:'tone-741hz.mp3',free:false},
    {name:'852 Hz',label:'Third Eye',file:'tone-852hz.mp3',free:false},
    {name:'963 Hz',label:'Crown Chakra',file:'tone-963hz.mp3',free:false},
  ]

  const navItems = [
    {label:'Home', route:'/dashboard', emoji:'🏠'},
    {label:'Breathe', route:'/breathing', emoji:'🌬️'},
    {label:'Music', route:'/music', emoji:'🎵'},
    {label:'Reading', route:'/reading', emoji:'🔮'},
    {label:'Journal', route:'/journal', emoji:'📓'},
  ]

  const iconMap: any = {
    sun: '\u2600\uFE0F',
    moon: '\uD83C\uDF19',
    box: '\uD83D\uDFE5',
    leaf: '\uD83C\uDF3F',
    gem: '\uD83D\uDC8E',
    star: '\uD83C\uDF0C',
  }

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
    setSessionDone(false)
    setStartTime(Date.now())
    const audio = new Audio(`/${allFreqs[freq].file}`)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio
    audio.play().catch(e => console.log('Audio error:', e))
    setMusicPlaying(true)
    runPhase(0,0)
  }

  const sessionComplete = async () => {
    setRunning(false)
    clearTimeout(phaseR.current)
    clearInterval(countR.current)
    setPhase('rest & breathe')
    setCount(star)
    setScale(1)
    setSessionDone(true)
    const duration = Math.round((Date.now() - startTime) / 1000)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('sessions').insert({
        user_id: user.id,
        type: 'breathwork',
        cycles: 3,
        duration_seconds: duration,
        technique: allTechniques[tech].name,
        frequency: allFreqs[freq].name,
      })
    }
  }

  const stopAll = () => {
    setRunning(false)
    clearTimeout(phaseR.current)
    clearInterval(countR.current)
    setPhase('tap to begin')
    setCount(star)
    setScale(1)
    setCycles(0)
    setSessionDone(false)
    if(audioRef.current){
      audioRef.current.pause()
      audioRef.current = null
    }
    setMusicPlaying(false)
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

  useEffect(()=>{if(cycles>=3&&running)sessionComplete()},[cycles])
  useEffect(()=>{ return ()=>{ if(audioRef.current){ audioRef.current.pause() } } },[])

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

        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} SACRED BREATH {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>Breathwork</h1>
        </div>

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'12px'}}>{star} Choose Your Technique {star}</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'9px',marginBottom:'24px'}}>
          {allTechniques.map((tc,i)=>(
            <div key={tc.name} onClick={()=>handleTechClick(i)} style={{background:tech===i?'rgba(138,90,255,0.15)':'rgba(255,255,255,0.03)',border:`1px solid ${tech===i?'rgba(200,168,255,0.45)':'rgba(200,168,255,0.1)'}`,borderRadius:'13px',padding:'13px 8px',textAlign:'center',cursor:'pointer',position:'relative',opacity:(!tc.free && !isPaid)?0.5:1}}>
              {!tc.free && !isPaid && <div style={{position:'absolute',top:'6px',right:'6px',fontSize:'10px'}}>🔒</div>}
              <span style={{fontSize:'20px',display:'block',marginBottom:'5px'}}>{iconMap[tc.icon]}</span>
              <div style={{fontStyle:'italic',fontSize:'12px',color:'#C8A8FF',marginBottom:'3px'}}>{tc.name}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(180,160,220,0.45)'}}>{tc.i}·{tc.h||'-'}·{tc.o}{tc.h2?`·${tc.h2}`:''}</div>
            </div>
          ))}
        </div>

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'12px'}}>{star} Healing Frequency {star}</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px',marginBottom:'28px'}}>
          {allFreqs.map((f,i)=>(
            <div key={f.name} onClick={()=>handleFreqClick(i)} style={{background:freq===i?'rgba(255,214,160,0.18)':'rgba(255,214,160,0.04)',border:`1px solid ${freq===i?'#FFD6A0':'rgba(255,214,160,0.12)'}`,borderRadius:'12px',padding:'10px 8px',textAlign:'center',cursor:'pointer',opacity:(!f.free && !isPaid)?0.4:1,position:'relative'}}>
              {!f.free && !isPaid && <div style={{position:'absolute',top:'4px',right:'4px',fontSize:'9px'}}>🔒</div>}
              <div style={{fontFamily:'sans-serif',fontSize:'11px',color:'#FFD6A0',marginBottom:'2px'}}>{f.name}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'9px',color:'rgba(255,214,160,0.5)'}}>{f.label}</div>
            </div>
          ))}
        </div>

        {musicPlaying && (
          <div style={{background:'rgba(138,90,255,0.1)',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',padding:'12px 16px',marginBottom:'16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <span style={{fontStyle:'italic',fontSize:'13px',color:'#C8A8FF'}}>{star} {allFreqs[freq].name} · {allFreqs[freq].label}</span>
              <span style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.4)',marginLeft:'8px'}}>· Playing</span>
            </div>
            <button onClick={stopAll} style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.5)',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'10px',padding:'4px 10px',cursor:'pointer'}}>Stop All</button>
          </div>
        )}

        {sessionDone && (
          <div style={{background:'linear-gradient(135deg,rgba(100,220,130,0.1),rgba(138,90,255,0.1))',border:'1px solid rgba(100,220,130,0.25)',borderRadius:'16px',padding:'20px',marginBottom:'16px',textAlign:'center'}}>
            <p style={{fontStyle:'italic',fontSize:'18px',letterSpacing:'3px',color:'rgba(100,220,130,0.8)',marginBottom:'8px'}}>{star} Session Complete {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.5)',marginBottom:'16px',letterSpacing:'1px'}}>The frequency continues to heal your soul. Rest in the sound.</p>
            <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
              <button onClick={stopAll} style={{padding:'10px 24px',background:'transparent',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.6)',cursor:'pointer'}}>End & Silence</button>
              <button onClick={()=>{setSessionDone(false);start()}} style={{padding:'10px 24px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer'}}>Begin Again</button>
            </div>
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'28px'}}>
          <div style={{position:'relative',width:'220px',height:'220px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'12px'}}>
            {[100,78,56].map((s,i)=>(
              <div key={i} style={{position:'absolute',width:`${s}%`,height:`${s}%`,borderRadius:'50%',border:'1px solid rgba(200,168,255,0.1)'}}/>
            ))}
            <div onClick={()=>running?stopAll():(!sessionDone&&start())} style={{width:'125px',height:'125px',borderRadius:'50%',background:'radial-gradient(circle at 38% 32%,#9B6FFF,#3A1580)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'0 0 30px rgba(138,90,255,0.45)',transform:`scale(${scale})`,transition:'transform 0.8s ease',position:'relative',zIndex:2}}>
              <p style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(255,255,255,0.85)',fontStyle:'italic',margin:'0 0 2px'}}>{phase}</p>
              <p style={{fontSize:'30px',color:'#fff',fontWeight:300,margin:0}}>{count}</p>
            </div>
          </div>
          <p style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'#C8A8FF',margin:0}}>
            {running?`${allFreqs[freq].name} · Cycle ${cycles}`:sessionDone?`${allFreqs[freq].name} · Healing continues...`:`${allFreqs[freq].name} · Ready`}
          </p>
        </div>

        <div style={{background:'rgba(255,255,255,0.05)',borderRadius:'4px',height:'2px',marginBottom:'18px',overflow:'hidden'}}>
          <div style={{height:'100%',background:'linear-gradient(90deg,#8A5AFF,#A8E8FF,#FFD6A0)',borderRadius:'4px',width:sessionDone?'100%':`${Math.min((cycles/3)*100,100)}%`,transition:'width 1s linear'}}/>
        </div>

        {!sessionDone && (
          <button onClick={()=>running?stopAll():start()} style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.25),rgba(255,214,160,0.1))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'13px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',marginBottom:'14px'}}>
            {running?'End Session':'Begin Sacred Breath'}
          </button>
        )}

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
