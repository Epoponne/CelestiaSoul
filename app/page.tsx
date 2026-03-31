'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px',textAlign:'center'}}>
      <p style={{fontSize:'11px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'16px'}}>✦ WHERE THE COSMOS MEETS THE SOUL ✦</p>
      <h1 style={{fontSize:'64px',fontStyle:'italic',fontWeight:300,letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'16px'}}>CelestiaSOUL</h1>
      <p style={{fontSize:'14px',letterSpacing:'3px',color:'rgba(200,168,255,0.6)',marginBottom:'40px'}}>cosmic alignment · sacred breath · soul awakening</p>
      <p style={{fontSize:'14px',lineHeight:2,color:'rgba(220,210,255,0.65)',maxWidth:'440px',margin:'0 auto 40px'}}>Receive your complete astrological soul reading, guided breathwork, healing frequencies and meditation — crafted by the stars, just for you.</p>
      <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
        <button onClick={()=>router.push('/signin')} style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'#E8E0FF',cursor:'pointer',background:'rgba(138,90,255,0.4)',border:'1px solid rgba(200,168,255,0.45)',borderRadius:'30px',padding:'14px 36px'}}>Begin Your Journey</button>
        <button onClick={()=>router.push('/signin')} style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'rgba(200,168,255,0.7)',cursor:'pointer',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'30px',padding:'14px 36px'}}>Explore the Path</button>
      </div>
      <p style={{marginTop:'60px',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.2)'}}>© 2026 CelestiaSOUL · Sacred Breath · Cosmic Alignment</p>
    </main>
  )
}
