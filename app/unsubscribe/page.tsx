'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { supabase } from '../../lib/supabase'

function UnsubscribeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const star = '\u2726'
  const [status, setStatus] = useState<'pending'|'done'|'error'>('pending')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [])

  const handleUnsubscribe = async () => {
    if (!email) return
    try {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('email_unsubscribes').upsert({
        email: email,
        user_id: user?.id || null,
      })
      setStatus('done')
    } catch(e) {
      setStatus('error')
    }
  }

  return (
    <main style={{background:'#0D0B1E ',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'560px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'44px',height:'44px',borderRadius:'50%',objectFit:'cover',boxShadow:'0 0 12px rgba(200,168,255,0.4)'}}/>
            <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          </div>
        </nav>

        <div style={{textAlign:'center',marginBottom:'40px',paddingTop:'40px'}}>
          <span style={{fontSize:'48px',display:'block',marginBottom:'16px'}}>🌙</span>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'36px',letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>
            {status === 'done' ? 'Unsubscribed' : 'Unsubscribe'}
          </h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>
            {status === 'done' ? 'You have been removed from our list' : 'Manage your email preferences'}
          </p>
        </div>

        {status === 'pending' && (
          <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'20px',padding:'32px',textAlign:'center'}}>
            <p style={{fontStyle:'italic',fontSize:'15px',color:'rgba(220,210,255,0.7)',lineHeight:1.9,marginBottom:'24px'}}>
              We are sorry to see you go, beloved soul. Are you sure you want to unsubscribe from your daily cosmic reading emails?
            </p>
            {email && (
              <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.5)',marginBottom:'24px',letterSpacing:'1px'}}>
                Email: {email}
              </p>
            )}
            {!email && (
              <div style={{marginBottom:'20px'}}>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif'}}
                />
              </div>
            )}
            <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
              <button onClick={()=>router.push('/dashboard')} style={{padding:'12px 24px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer'}}>
                Keep My Readings {star}
              </button>
              <button onClick={handleUnsubscribe} style={{padding:'12px 24px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>
                Unsubscribe
              </button>
            </div>
          </div>
        )}

        {status === 'done' && (
          <div style={{background:'linear-gradient(135deg,rgba(100,220,130,0.1),rgba(138,90,255,0.1))',border:'1px solid rgba(100,220,130,0.25)',borderRadius:'20px',padding:'40px',textAlign:'center'}}>
            <p style={{fontStyle:'italic',fontSize:'18px',letterSpacing:'3px',color:'rgba(100,220,130,0.8)',marginBottom:'12px'}}>{star} Done {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.55)',lineHeight:1.9,marginBottom:'24px'}}>
              You have been unsubscribed from daily cosmic reading emails. You can resubscribe at any time from your dashboard.
            </p>
            <button onClick={()=>router.push('/')} style={{padding:'12px 32px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer'}}>Return Home</button>
          </div>
        )}

        {status === 'error' && (
          <div style={{background:'rgba(255,80,80,0.08)',border:'1px solid rgba(255,80,80,0.2)',borderRadius:'20px',padding:'32px',textAlign:'center'}}>
            <p style={{fontStyle:'italic',fontSize:'16px',color:'rgba(255,120,120,0.8)',marginBottom:'12px'}}>Something went wrong</p>
            <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.5)',marginBottom:'20px'}}>Please email us directly at support@celestiasoul.com to unsubscribe.</p>
            <button onClick={()=>router.push('/')} style={{padding:'12px 32px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer'}}>Return Home</button>
          </div>
        )}

      </div>
    </main>
  )
}

export default function Unsubscribe() {
  return (
    <Suspense fallback={<div style={{background:'#0D0B1E ',minHeight:'100vh'}}/>}>
      <UnsubscribeContent/>
    </Suspense>
  )
}
