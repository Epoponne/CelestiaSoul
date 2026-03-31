'use client'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px',textAlign:'center'}}>
      <h1 style={{fontStyle:'italic',fontSize:'48px',color:'#C8A8FF',marginBottom:'16px'}}>Welcome, Soul</h1>
      <p style={{fontSize:'14px',letterSpacing:'3px',color:'rgba(200,168,255,0.6)',marginBottom:'40px'}}>Your cosmic sanctuary</p>
      <div style={{display:'flex',gap:'14px',flexWrap:'wrap',justifyContent:'center'}}>
        <button onClick={()=>router.push('/breathing')} style={{padding:'12px 24px',background:'rgba(138,90,255,0.2)',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',color:'#C8A8FF',cursor:'pointer',fontStyle:'italic',letterSpacing:'2px'}}>༄ Breathe</button>
        <button onClick={()=>router.push('/music')} style={{padding:'12px 24px',background:'rgba(138,90,255,0.2)',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',color:'#C8A8FF',cursor:'pointer',fontStyle:'italic',letterSpacing:'2px'}}>◎ Music</button>
        <button onClick={()=>router.push('/reading')} style={{padding:'12px 24px',background:'rgba(138,90,255,0.2)',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',color:'#C8A8FF',cursor:'pointer',fontStyle:'italic',letterSpacing:'2px'}}>☿ Reading</button>
        <button onClick={()=>router.push('/journal')} style={{padding:'12px 24px',background:'rgba(138,90,255,0.2)',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',color:'#C8A8FF',cursor:'pointer',fontStyle:'italic',letterSpacing:'2px'}}>☽ Journal</button>
      </div>
    </main>
  )
}
