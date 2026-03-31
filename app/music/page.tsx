'use client'
import { useRouter } from 'next/navigation'

export default function Music() {
  const router = useRouter()
  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px',textAlign:'center'}}>
      <h1 style={{fontStyle:'italic',fontSize:'48px',color:'#C8A8FF',marginBottom:'16px'}}>Sacred Sound</h1>
      <p style={{fontSize:'14px',letterSpacing:'3px',color:'rgba(200,168,255,0.6)',marginBottom:'40px'}}>Healing frequencies for your soul</p>
      <button onClick={()=>router.push('/dashboard')} style={{color:'rgba(200,168,255,0.4)',background:'transparent',border:'none',cursor:'pointer',fontStyle:'italic',letterSpacing:'3px',fontSize:'13px'}}>← Dashboard</button>
    </main>
  )
}