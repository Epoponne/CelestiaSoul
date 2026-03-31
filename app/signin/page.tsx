'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('✦ Check your email!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <h1 style={{textAlign:'center',fontSize:'36px',fontStyle:'italic',fontWeight:300,letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'32px'}}>{isSignUp?'Welcome, Soul':'Welcome Back'}</h1>
        <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'20px',padding:'32px'}}>
          <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',marginBottom:'16px',display:'block'}}/>
          <input type="password" placeholder="Password..." value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',marginBottom:'24px',display:'block'}}/>
          {message&&<div style={{background:'rgba(138,90,255,0.1)',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'10px',padding:'12px',marginBottom:'16px',fontSize:'13px',color:'#C8A8FF',textAlign:'center'}}>{message}</div>}
          <button onClick={handleAuth} disabled={loading} style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.4),rgba(100,60,200,0.3))',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'12px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',marginBottom:'16px'}}>{loading?'Opening Portal...':isSignUp?'Begin My Journey':'Enter My Sanctuary'}</button>
          <<p style={{textAlign:'center',fontSize:'13px',color:'rgba(200,168,255,0.45)',marginBottom:'8px'}}>{isSignUp?'Already have an account? ':'No account? '}<span onClick={()=>setIsSignUp(!isSignUp)} style={{color:'#C8A8FF',cursor:'pointer'}}>{isSignUp?'Sign in':'Create one'}</span></p>
{!isSignUp && (
  <p style={{textAlign:'center',fontSize:'12px',color:'rgba(200,168,255,0.35)',cursor:'pointer',letterSpacing:'1px'}} onClick={async()=>{
    if(!email){alert('Enter your email first');return}
    await supabase.auth.resetPasswordForEmail(email,{redirectTo:'https://celestiasoul.com/reset'})
    alert('✦ Password reset email sent! Check your inbox.')
  }}>Forgot your password?</p>
)}

