'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Breathing() {
  const router = useRouter()
  const [running, setRunning] = useState(false)

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px',textAlign:'center'}}>
      <h1 style={{fontStyle:'italic',fontSize:'40px',color:'#C8A8FF',marginBottom:'40px'}}>Sacred Breath</h1>
      <div onClick={()=>setRunning(!running)} style={{width:'160px',height:'160px',borderRadius:'50%',background:'radial-gradient(circle,#9B6FFF,#3A1580)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:'20px',color:'#fff',boxShadow:'0 0 30px rgba(138,90,255,0.45)',marginBottom:'32px'}}>
        {running?'breathing':'tap'}
      </div>
      <button onClick={()=>setRunning(!running)} style={{padding:'15px 40px',background:'linear-gradient(135deg,rgba(138,90,255,0.25),rgba(255,214,160,0.1))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'13px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',marginBottom:'24px'}}>
        {running?'End Session':'Begin Sacred Breath'}
      </button>
      <button onClick={()=>router.push('/dashboard')} style={{color:'rgba(200,168,255,0.4)',background:'transparent',border:'none',cursor:'pointer',fontStyle:'italic',letterSpacing:'3px',fontSize:'13px'}}>← Dashboard</button>
    </main>
  )
}