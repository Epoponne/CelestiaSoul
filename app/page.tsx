'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      })
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('✦ Check your email to confirm your account!')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        setMessage(error.message)
      } else {
        router.push('/dashboard')
      }
    }
    setLoading(false)
  }

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <p style={{textAlign:'center',fontSize:'11px',letterSpacing:'6px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>✦ CELESTIASOUL ✦</p>
        <h1 style={{textAlign:'center',fontSize:'36px',fontStyle:'italic',fontWeight:300,letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'8px'}}>
          {isSignUp ? 'Welcome, Soul' : 'Welcome Back'}
        </h1>
        <p style={{textAlign:'center',fontSize:'12px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'32px'}}>
          {isSignUp ? '✦ create your sacred account ✦' : '✦ enter your portal ✦'}
        </p>
        <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'20px',padding:'32px'}}>
          {isSignUp && (
            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>YOUR NAME</label>
              <input
                type="text"
                placeholder="Your full name..."
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none'}}
              />
            </div>
          )}
          <div style={{marginBottom:'16px'}}>
            <label style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>SACRED EMAIL</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none'}}
            />
          </div>
          <div style={{marginBottom:'24px'}}>
            <label style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>PASSWORD</label>
            <input
              type="password"
              placeholder="At least 8 characters..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none'}}
            />
          </div>
          {message && (
            <div style={{background:'rgba(138,90,255,0.1)',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'10px',padding:'12px',marginBottom:'16px',fontSize:'13px',color:'#C8A8FF',textAlign:'center',letterSpacing:'1px'}}>
              {message}
            </div>
          )}
          <button
            onClick={handleAuth}
            disabled={loading}
            style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.4),rgba(100,60,200,0.3))',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'12px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',marginBottom:'16px'}}
          >
            {l