'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function SignIn() {
  const router = useRouter()
  const star = '\u2726'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      })
      if (error) setMessage(error.message)
      else {
        await fetch('/api/welcome', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ email, name: fullName })
        })
        setMessage(`${star} Account created! Please sign in.`)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/dashboard')
    }
    setLoading(false)
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage('Please enter your email address first!')
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://celestiasoul.com/reset'
    })
    if (error) setMessage(error.message)
    else setMessage(`${star} Password reset email sent! Check your inbox.`)
  }

  return (
    <main style={{background:'#0D0B1E ',minHeight:'100vh',color:'#E8E0FF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:'Georgia,serif'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>
        <p style={{textAlign:'center',fontSize:'11px',letterSpacing:'6px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} CELESTIASOUL {star}</p>
        <h1 style={{textAlign:'center',fontSize:'36px',fontStyle:'italic',fontWeight:300,letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'8px'}}>
          {isSignUp ? 'Welcome, Soul' : 'Welcome Back'}
        </h1>
        <p style={{textAlign:'center',fontSize:'12px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'32px'}}>
          {isSignUp ? `${star} create your sacred account ${star}` : `${star} enter your portal ${star}`}
        </p>
        <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'20px',padding:'32px'}}>
          {isSignUp && (
            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>YOUR NAME</label>
              <input
                type="text"
                placeholder="Your full name..."
                value={fullName}
                onChange={e=>setFullName(e.target.value)}
                style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif'}}
              />
            </div>
          )}
          <div style={{marginBottom:'16px'}}>
            <label style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>SACRED EMAIL</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif'}}
            />
          </div>
          <div style={{marginBottom:'24px'}}>
            <label style={{fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>PASSWORD</label>
            <input
              type="password"
              placeholder="At least 8 characters..."
              value={password}
              onChange={e=>setPassword(e.target.value)}
              style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif'}}
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
            style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.4),rgba(100,60,200,0.3))',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'12px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',marginBottom:'16px',fontFamily:'Georgia,serif'}}
          >
            {loading ? `${star} Opening Portal...` : isSignUp ? 'Begin My Journey' : 'Enter My Sanctuary'}
          </button>
          <p style={{textAlign:'center',fontSize:'13px',color:'rgba(200,168,255,0.45)',marginBottom:'8px'}}>
            {isSignUp ? 'Already have an account? ' : 'No account? '}
            <span onClick={()=>setIsSignUp(!isSignUp)} style={{color:'#C8A8FF',cursor:'pointer'}}>
              {isSignUp ? 'Sign in' : 'Create one'}
            </span>
          </p>
          {!isSignUp && (
            <p onClick={handleForgotPassword} style={{textAlign:'center',fontSize:'12px',color:'rgba(200,168,255,0.35)',cursor:'pointer',letterSpacing:'1px',fontStyle:'italic'}}>
              Forgot your password?
            </p>
          )}
        </div>
        <p onClick={()=>router.push('/')} style={{textAlign:'center',marginTop:'20px',fontSize:'12px',letterSpacing:'3px',color:'rgba(200,168,255,0.35)',cursor:'pointer',fontStyle:'italic'}}>
          Return to CelestiaSOUL
        </p>
      </div>
    </main>
  )
}