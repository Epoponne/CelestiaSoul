'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useRef, useEffect, Suspense } from 'react'

function MusicContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const star = '\u2726'
  const [playing, setPlaying] = useState<number|null>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const audioRef = useRef<HTMLAudioElement|null>(null)

  const tracks = [
    {icon:'🔴',name:'Guilt Release Pulse',hz:'396 Hz',label:'Liberation',file:'guilt-release-pulse-solfeggio-396-hz-theta-7hz-preview.mp3',category:'single'},
    {icon:'🔴',name:'Liberation Healing',hz:'396 Hz',label:'Liberation',file:'396hz-healing-2.mp3',category:'single'},
    {icon:'🟠',name:'Harmonic Transition',hz:'417 Hz',label:'Transformation',file:'harmonic-transition-solfeggio-417hz-preview.mp3',category:'single'},
    {icon:'🟠',name:'Sacred Transformation',hz:'417 Hz',label:'Transformation',file:'417hz-healing-3.mp3',category:'single'},
    {icon:'🟠',name:'Transformation Journey',hz:'417 Hz',label:'Transformation',file:'417hz-meditation-2.mp3',category:'single'},
    {icon:'💛',name:'Dream Weaver Lullaby',hz:'528 Hz',label:'DNA Repair',file:'dream-weaver-s-lullaby-solfeggio-528-nz-alpha-14-hz-preview.mp3',category:'single'},
    {icon:'💛',name:'Love Frequency Flow',hz:'528 Hz',label:'DNA Repair',file:'528hz-meditation-2.mp3',category:'single'},
    {icon:'💛',name:'Miracle Tone Deep',hz:'528 Hz',label:'DNA Repair',file:'528hz-meditation-3.mp3',category:'single'},
    {icon:'💚',name:"Nature's Embrace",hz:'639 Hz',label:'Heart Chakra',file:'nature-s-embrace-solfeggio-639-hz-alpha-12hz-preview.mp3',category:'single'},
    {icon:'🔵',name:'Canyon Spirits Rising',hz:'741 Hz',label:'Intuition',file:'canyon-spirits-rising-solfeggio-741-hz-preview.mp3',category:'single'},
    {icon:'🟣',name:'Clear Inner Vision',hz:'852 Hz',label:'Third Eye',file:'clear-inner-vision-solfeggio-852-hz-beta-25hz-preview.mp3',category:'single'},
    {icon:'⚪',name:'Crown Chakra Music',hz:'963 Hz',label:'Crown Chakra',file:'crown-chakra-music-solfeggio-963-hz-beta-30-hz-preview.mp3',category:'single'},
    {icon:'✨',name:'Liberation & Love',hz:'396 Hz + 528 Hz',label:'Release & Repair',file:'396hz-528hz-combined.mp3',category:'combined'},
    {icon:'✨',name:'Triple Sacred Blend',hz:'396 Hz + 472 Hz + 521 Hz',label:'Deep Healing',file:'396hz-472hz-521hz-combined.mp3',category:'combined'},
    {icon:'✨',name:'Love & Liberation',hz:'528 Hz + 396 Hz',label:'Heart Healing',file:'528hz-396hz-combined-2.mp3',category:'combined'},
  ]

  const categories = [
    {id:'all',label:'All Tracks'},
    {id:'single',label:'Single Hz'},
    {id:'combined',label:'Combined Hz'},
  ]

  const filtered = activeCategory === 'all' ? tracks : tracks.filter(t => t.category === activeCategory)

  const navItems = [
    {label:'Home', route:'/dashboard', emoji:'🏠'},
    {label:'Breathe', route:'/breathing', emoji:'🌬️'},
    {label:'Music', route:'/music', emoji:'🎵'},
    {label:'Reading', route:'/reading', emoji:'🔮'},
    {label:'Journal', route:'/journal', emoji:'📓'},
  ]

  useEffect(() => {
    const fileParam = searchParams.get('file')
    const freqParam = searchParams.get('freq')
    if (fileParam) {
      const found = tracks.findIndex(t => t.file === fileParam)
      if (found !== -1) { playTrack(found); return }
    }
    if (freqParam) {
      const hzNum = freqParam.replace(' Hz', '').trim()
      const found = tracks.findIndex(t => t.hz.startsWith(hzNum))
      if (found !== -1) playTrack(found)
    }
  }, [])

  const playTrack = (i: number) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (playing === i) {
      setPlaying(null)
      return
    }
    const audio = new Audio(`/${tracks[i].file}`)
    audio.loop = true
    audioRef.current = audio
    audio.play().catch(e => console.log(e))
    setPlaying(i)
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause()
    }
  }, [])

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
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} SACRED SOUND {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>Sound Healing</h1>
        </div>

        {playing !== null && (
          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.15),rgba(20,10,60,0.25))',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'20px',padding:'24px',marginBottom:'24px',textAlign:'center'}}>
            <div style={{fontSize:'40px',marginBottom:'12px'}}>{tracks[playing].icon}</div>
            <div style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',color:'#E8E0FF',marginBottom:'4px'}}>{tracks[playing].name}</div>
            <div style={{fontFamily:'sans-serif',fontSize:'11px',letterSpacing:'3px',color:'rgba(255,214,160,0.7)',marginBottom:'4px'}}>{tracks[playing].hz}</div>
            <div style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)',marginBottom:'16px'}}>{tracks[playing].label}</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',marginBottom:'16px'}}>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C8A8FF'}}/>
              <span style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'#C8A8FF'}}>Now Playing · Looping</span>
            </div>
            <button onClick={()=>playTrack(playing)} style={{padding:'10px 28px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer'}}>Stop</button>
          </div>
        )}

        <div style={{display:'flex',gap:'8px',marginBottom:'24px',justifyContent:'center'}}>
          {categories.map(c=>(
            <div key={c.id} onClick={()=>setActiveCategory(c.id)} style={{padding:'8px 18px',borderRadius:'20px',cursor:'pointer',fontFamily:'sans-serif',fontSize:'11px',letterSpacing:'2px',background:activeCategory===c.id?'rgba(138,90,255,0.3)':'rgba(255,255,255,0.03)',border:`1px solid ${activeCategory===c.id?'rgba(200,168,255,0.5)':'rgba(200,168,255,0.1)'}`,color:activeCategory===c.id?'#E8E0FF':'rgba(200,168,255,0.4)'}}>
              {c.label}
            </div>
          ))}
        </div>

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'16px'}}>{star} Sacred Playlist {star}</p>
        <div style={{marginBottom:'22px'}}>
          {filtered.map((t,i)=>{
            const realIdx = tracks.indexOf(t)
            return (
              <div key={t.file} onClick={()=>playTrack(realIdx)} style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 16px',borderRadius:'14px',cursor:'pointer',marginBottom:'8px',background:playing===realIdx?'rgba(138,90,255,0.15)':'rgba(255,255,255,0.025)',border:`1px solid ${playing===realIdx?'rgba(200,168,255,0.35)':'rgba(200,168,255,0.08)'}`,transition:'all 0.3s'}}>
                <span style={{fontSize:'24px'}}>{t.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontStyle:'italic',fontSize:'15px',letterSpacing:'2px',color:'#C8A8FF',marginBottom:'3px'}}>{t.name}</div>
                  <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(255,214,160,0.5)',letterSpacing:'2px'}}>{t.hz} · {t.label}</div>
                </div>
                <div style={{width:'36px',height:'36px',borderRadius:'50%',background:playing===realIdx?'rgba(200,168,255,0.3)':'rgba(138,90,255,0.15)',border:'1px solid rgba(200,168,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',color:'#C8A8FF'}}>
                  {playing===realIdx?'⏸':'▶'}
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(6,5,14,0.95)',borderTop:'1px solid rgba(200,168,255,0.12)',padding:'12px 0',zIndex:100}}>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',maxWidth:'680px',margin:'0 auto'}}>
          {navItems.map(({label,route,emoji}) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 16px',borderRadius:'10px'}}>
              <span style={{fontSize:'20px'}}>{emoji}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:route==='/music'?'rgba(200,168,255,0.9)':'rgba(200,168,255,0.4)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}

export default function Music() {
  return (
    <Suspense fallback={<div style={{background:'#06050E',minHeight:'100vh'}}/>}>
      <MusicContent/>
    </Suspense>
  )
}