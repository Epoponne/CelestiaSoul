'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useSubscription } from '../../lib/useSubscription'

export default function Meditation() {
  const router = useRouter()
  const star = '\u2726'
  const { isPaid, loading: subLoading } = useSubscription()
  const [running, setRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600)
  const [duration, setDuration] = useState(600)
  const [completed, setCompleted] = useState(false)
  const [selectedFreq, setSelectedFreq] = useState(0)
  const intervalRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement|null>(null)

  const durations = [
    {label:'5 min',seconds:300},
    {label:'10 min',seconds:600},
    {label:'15 min',seconds:900},
    {label:'20 min',seconds:1200},
    {label:'30 min',seconds:1800},
    {label:'45 min',seconds:2700},
  ]

  const frequencies = [
    {name:'396 Hz',label:'Liberation',file:'396hz-healing-2.mp3'},
    {name:'417 Hz',label:'Transformation',file:'417hz-meditation-2.mp3'},
    {name:'528 Hz',label:'DNA Repair',file:'528hz-meditation-2.mp3'},
    {name:'639 Hz',label:'Heart Chakra',file:'nature-s-embrace-solfeggio-639-hz-alpha-12hz-preview.mp3'},
    {name:'741 Hz',label:'Intuition',file:'canyon-spirits-rising-solfeggio-741-hz-preview.mp3'},
    {name:'852 Hz',label:'Third Eye',file:'clear-inner-vision-solfeggio-852-hz-beta-25hz-preview.mp3'},
    {name:'963 Hz',label:'Crown',file:'crown-chakra-music-solfeggio-963-hz-beta-30-hz-preview.mp3'},
  ]

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2,'0')}`
  }

  const start = () => {
    if (!isPaid) { router.push('/pricing'); return }
    setCompleted(false)
    setRunning(true)
    const audio = new Audio(`/${frequencies[selectedFreq].file}`)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio
    audio.play().catch(e => console.log(e))
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          setCompleted(true)
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current = null
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stop = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setTimeLeft(duration)
    setCompleted(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
  }

  const setDurationAndReset = (seconds: number) => {
    if (running) return
    setDuration(seconds)
    setTimeLeft(seconds)
    setCompleted(false)
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      if (audioRef.current) audioRef.current.pause()
    }
  }, [])

  const progress = ((duration - timeLeft) / duration) * 100

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
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} SACRED MEDITATION {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Meditation Timer</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>Sacred stillness with healing frequencies</p>
        </div>

        {!isPaid && !subLoading && (
          <div onClick={()=>router.push('/pricing')} style={{background:'linear-gradient(135deg,rgba(138,90,255,0.2),rgba(255,214,160,0.08))',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'16px',padding:'20px',marginBottom:'24px',textAlign:'center',cursor:'pointer'}}>
            <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'4px'}}>{star} Sacred Members Only {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.6)',letterSpacing:'2px'}}>Unlock meditation timer · $10/month · 3-day free trial</p>
          </div>
        )}

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'12px'}}>{star} Choose Duration {star}</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',marginBottom:'24px'}}>
          {durations.map(d=>(
            <div key={d.label} onClick={()=>setDurationAndReset(d.seconds)} style={{background:duration===d.seconds?'rgba(138,90,255,0.2)':'rgba(255,255,255,0.025)',border:`1px solid ${duration===d.seconds?'rgba(200,168,255,0.4)':'rgba(200,168,255,0.08)'}`,borderRadius:'12px',padding:'12px',textAlign:'center',cursor:running?'not-allowed':'pointer',opacity:running?0.5:1}}>
              <span style={{fontStyle:'italic',fontSize:'16px',color:duration===d.seconds?'#C8A8FF':'rgba(200,168,255,0.5)'}}>{d.label}</span>
            </div>
          ))}
        </div>

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'12px'}}>{star} Choose Frequency {star}</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px',marginBottom:'32px'}}>
          {frequencies.map((f,i)=>(
            <div key={f.name} onClick={()=>!running&&setSelectedFreq(i)} style={{background:selectedFreq===i?'rgba(255,214,160,0.15)':'rgba(255,214,160,0.04)',border:`1px solid ${selectedFreq===i?'#FFD6A0':'rgba(255,214,160,0.12)'}`,borderRadius:'12px',padding:'10px 6px',textAlign:'center',cursor:running?'not-allowed':'pointer',opacity:running?0.5:1}}>
              <div style={{fontFamily:'sans-serif',fontSize:'11px',color:'#FFD6A0',marginBottom:'2px'}}>{f.name}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'9px',color:'rgba(255,214,160,0.5)'}}>{f.label}</div>
            </div>
          ))}
        </div>

        {completed && (
          <div style={{background:'linear-gradient(135deg,rgba(100,220,130,0.1),rgba(138,90,255,0.1))',border:'1px solid rgba(100,220,130,0.25)',borderRadius:'20px',padding:'32px',marginBottom:'24px',textAlign:'center'}}>
            <p style={{fontStyle:'italic',fontSize:'24px',letterSpacing:'3px',color:'rgba(100,220,130,0.8)',marginBottom:'8px'}}>{star} Session Complete {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.5)',marginBottom:'20px'}}>Your sacred meditation is complete. Carry this stillness with you.</p>
            <button onClick={()=>{setTimeLeft(duration);setCompleted(false)}} style={{padding:'12px 32px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer'}}>Meditate Again</button>
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'32px'}}>
          <div style={{position:'relative',width:'240px',height:'240px',marginBottom:'20px'}}>
            <svg width="240" height="240" style={{position:'absolute',top:0,left:0,transform:'rotate(-90deg)'}}>
              <circle cx="120" cy="120" r="108" fill="none" stroke="rgba(200,168,255,0.1)" strokeWidth="4"/>
              <circle cx="120" cy="120" r="108" fill="none" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 108}`} strokeDashoffset={`${2 * Math.PI * 108 * (1 - progress / 100)}`} style={{transition:'stroke-dashoffset 1s linear'}}/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8A5AFF"/>
                  <stop offset="100%" stopColor="#FFD6A0"/>
                </linearGradient>
              </defs>
            </svg>
            <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
              <p style={{fontStyle:'italic',fontSize:'48px',color:'#E8E0FF',margin:'0 0 4px',letterSpacing:'2px'}}>{formatTime(timeLeft)}</p>
              <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)'}}>{running?'MEDITATING':'READY'}</p>
            </div>
          </div>

          <p style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'#C8A8FF',marginBottom:'20px'}}>
            {running ? `${frequencies[selectedFreq].name} · ${frequencies[selectedFreq].label}` : `${frequencies[selectedFreq].name} · Ready`}
          </p>

          {!completed && (
            <button onClick={running?stop:start} style={{padding:'16px 48px',background:running?'rgba(255,80,80,0.15)':'linear-gradient(135deg,rgba(138,90,255,0.4),rgba(100,60,200,0.3))',border:`1px solid ${running?'rgba(255,80,80,0.3)':'rgba(200,168,255,0.4)'}`,borderRadius:'30px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer'}}>
              {running ? 'End Session' : `Begin ${star}`}
            </button>
          )}
        </div>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'16px',padding:'20px',textAlign:'center'}}>
          <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.35)',marginBottom:'10px'}}>{star} MEDITATION GUIDANCE {star}</p>
          <p style={{fontStyle:'italic',fontSize:'14px',color:'rgba(220,210,255,0.65)',lineHeight:1.9,margin:0}}>
            Find a comfortable position. Close your eyes. Let the healing frequency guide you inward. Simply observe your breath and allow thoughts to pass like clouds in the cosmic sky.
          </p>
        </div>

      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(6,5,14,0.95)',borderTop:'1px solid rgba(200,168,255,0.12)',padding:'12px 0',zIndex:100}}>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',maxWidth:'680px',margin:'0 auto'}}>
          {navItems.map(({label,route,emoji}) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 16px',borderRadius:'10px'}}>
              <span style={{fontSize:'20px'}}>{emoji}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:'rgba(200,168,255,0.4)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}