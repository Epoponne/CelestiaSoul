'use client'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

export default function Music() {
  const router = useRouter()
  const star = '\u2726'
  const [playing, setPlaying] = useState<number|null>(null)
  const audioRef = useRef<HTMLAudioElement|null>(null)

  const tracks = [
    {icon:'🔴',name:'Guilt Release Pulse',hz:'396 Hz · Liberation',file:'guilt-release-pulse-solfeggio-396-hz-theta-7hz-preview.mp3'},
    {icon:'🟠',name:'Harmonic Transition',hz:'417 Hz · Transformation',file:'harmonic-transition-solfeggio-417hz-preview.mp3'},
    {icon:'💛',name:"Nature's Embrace",hz:'528 Hz · DNA Repair',file:'dream-weaver-s-lullaby-solfeggio-528-nz-alpha-14-hz-preview.mp3'},
    {icon:'💚',name:"Canyon Spirits",hz:'639 Hz · Heart Chakra',file:'nature-s-embrace-solfeggio-639-hz-alpha-12hz-preview.mp3'},
    {icon:'🔵',name:'Canyon Spirits Rising',hz:'741 Hz · Intuition',file:'canyon-spirits-rising-solfeggio-741-hz-preview.mp3'},
    {icon:'🟣',name:'Clear Inner Vision',hz:'852 Hz · Third Eye',file:'clear-inner-vision-solfeggio-852-hz-beta-25hz-preview.mp3'},
    {icon:'⚪',name:'Crown Chakra Music',hz:'963 Hz · Crown Chakra',file:'crown-chakra-music-solfeggio-963-hz-beta-30-hz-preview.mp3'},
  ]

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
    audio.play()
    setPlaying(i)
  }

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{star} CelestiaSOUL</span>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} SACRED SOUND {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>CelestiaSOUL</h1>
        </div>

        {playing !== null && (
          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.15),rgba(20,10,60,0.25))',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'20px',padding:'24px',marginBottom:'24px',textAlign:'center'}}>
            <div style={{fontSize:'40px',marginBottom:'12px'}}>{tracks[playing].icon}</div>
            <div style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',color:'#E8E0FF',marginBottom:'4px'}}>{tracks[playing].name}</div>
            <div style={{fontFamily:'sans-serif',fontSize:'11px',letterSpacing:'3px',color:'rgba(255,214,160,0.7)',marginBottom:'16px'}}>{tracks[playing].hz}</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',marginBottom:'16px'}}>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C8A8FF'}}/>
              <span style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'#C8A8FF'}}>Now Playing · Looping</span>
            </div>
            <button onClick={()=>playTrack(playing)} style={{padding:'10px 28px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer'}}>Stop</button>
          </div>
        )}

        <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',textAlign:'center',marginBottom:'16px'}}>{star} Sacred Playlist {star}</p>
        <div style={{marginBottom:'22px'}}>
          {tracks.map((t,i)=>(
            <div key={t.name} onClick={()=>playTrack(i)} style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 16px',borderRadius:'14px',cursor:'pointer',marginBottom:'8px',background:playing===i?'rgba(138,90,255,0.15)':'rgba(255,255,255,0.025)',border:`1px solid ${playing===i?'rgba(200,168,255,0.35)':'rgba(200,168,255,0.08)'}`,transition:'all 0.3s'}}>
              <span style={{fontSize:'24px'}}>{t.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontStyle:'italic',fontSize:'15px',letterSpacing:'2px',color:'#C8A8FF',marginBottom:'3px'}}>{t.name}</div>
                <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(255,214,160,0.5)',letterSpacing:'2px'}}>{t.hz}</div>
              </div>
              <div style={{width:'36px',height:'36px',borderRadius:'50%',background:playing===i?'rgba(200,168,255,0.3)':'rgba(138,90,255,0.15)',border:'1px solid rgba(200,168,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',color:'#C8A8FF'}}>
                {playing===i?'⏸':'▶'}
              </div>
            </div>
          ))}
        </div>

        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',padding:'14px 0 0',borderTop:'1px solid rgba(200,168,255,0.07)'}}>
          {[[star,'Home','/dashboard'],['༄','Breathe','/breathing'],['◎','Music','/music'],['☿','Reading','/reading'],['☽','Journal','/journal']].map(([icon,label,route]) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 12px'}}>
              <span style={{fontSize:'18px',color:route==='/music'?'#C8A8FF':'rgba(200,168,255,0.3)'}}>{icon}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:route==='/music'?'rgba(200,168,255,0.7)':'rgba(200,168,255,0.35)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </main>
    c:\Users\14804\Downloads\Tone-396hz.mp3
    c:\Users\14804\Downloads\Tone-417hz.mp3
    c:\Users\14804\Downloads\Tone-528hz.mp3
    c:\Users\14804\Downloads\Tone-741hz.mp3
    c:\Users\14804\Downloads\Tone-963hz.mp3
    c:\Users\14804\Downloads\Tone-639hz.mp3
    c:\Users\14804\Downloads\tone-852hz.mp3