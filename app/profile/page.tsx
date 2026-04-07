'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Profile() {
  const router = useRouter()
  const star = '\u2726'
  const [user, setUser] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [birthChart, setBirthChart] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/signin'); return }
      setUser(user)
      setFullName(user.user_metadata?.full_name || '')
      setEmail(user.email || '')

      const { data: chart } = await supabase
        .from('birth_charts')
        .select('*')
        .eq('user_id', user.id)
        .single()
      if (chart) setBirthChart(chart)

      const { data: sub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single()
      if (sub) setSubscription(sub)
    }
    loadProfile()
  }, [])

  const saveProfile = async () => {
    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    })
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setLoading(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = [
    {label:'Home', route:'/dashboard', emoji:'🏠'},
    {label:'Breathe', route:'/breathing', emoji:'🌬️'},
    {label:'Music', route:'/music', emoji:'🎵'},
    {label:'Reading', route:'/reading', emoji:'🔮'},
    {label:'Journal', route:'/journal', emoji:'📓'},
  ]

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 100px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{star} CelestiaSOUL</span>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} YOUR SACRED PROFILE {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>CelestiaSOUL</h1>
        </div>

        <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.12),rgba(40,20,100,0.2))',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'28px',marginBottom:'22px',textAlign:'center'}}>
          <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'radial-gradient(circle,#C8A8FF,#3A1580)',margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px'}}>
            {fullName ? fullName.charAt(0).toUpperCase() : '✦'}
          </div>
          <div style={{fontStyle:'italic',fontSize:'24px',letterSpacing:'4px',color:'#E8E0FF',marginBottom:'4px'}}>{fullName || 'Soul Seeker'}</div>
          <div style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.5)',letterSpacing:'2px'}}>{email}</div>
          {subscription && (
            <div style={{marginTop:'12px',display:'inline-block',padding:'4px 16px',background:'rgba(100,220,130,0.1)',border:'1px solid rgba(100,220,130,0.3)',borderRadius:'20px',fontFamily:'sans-serif',fontSize:'11px',color:'rgba(100,220,130,0.8)',letterSpacing:'2px'}}>
              {star} {subscription.status === 'active' ? 'Sacred Member' : subscription.status === 'trialing' ? 'Free Trial' : 'Free Plan'}
            </div>
          )}
        </div>

        <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'24px',marginBottom:'22px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'20px'}}>{star} ACCOUNT DETAILS</p>
          <div style={{marginBottom:'16px'}}>
            <label style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>YOUR NAME</label>
            <input
              type="text"
              value={fullName}
              onChange={e=>setFullName(e.target.value)}
              placeholder="Your full name..."
              style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif'}}
            />
          </div>
          <div style={{marginBottom:'20px'}}>
            <label style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>EMAIL</label>
            <input
              type="email"
              value={email}
              disabled
              style={{width:'100%',background:'rgba(138,90,255,0.03)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'10px',padding:'12px 16px',color:'rgba(200,168,255,0.4)',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif',cursor:'not-allowed'}}
            />
            <p style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.3)',marginTop:'4px',letterSpacing:'1px'}}>Email cannot be changed</p>
          </div>
          {saved && (
            <div style={{background:'rgba(100,220,130,0.1)',border:'1px solid rgba(100,220,130,0.25)',borderRadius:'10px',padding:'10px',marginBottom:'14px',textAlign:'center',fontStyle:'italic',fontSize:'13px',color:'rgba(100,220,130,0.8)'}}>
              {star} Profile saved successfully!
            </div>
          )}
          <button onClick={saveProfile} disabled={loading} style={{width:'100%',padding:'13px',background:'linear-gradient(135deg,rgba(138,90,255,0.3),rgba(100,60,200,0.2))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'12px',fontStyle:'italic',fontSize:'15px',letterSpacing:'4px',color:'#E8E0FF',cursor:'pointer'}}>
            {loading ? 'Saving...' : `Save Profile ${star}`}
          </button>
        </div>

        {birthChart && (
          <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'24px',marginBottom:'22px'}}>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'20px'}}>{star} YOUR NATAL CHART</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',marginBottom:'16px'}}>
              {[
                {label:'Sun Sign',value:birthChart.sun_sign},
                {label:'Moon Sign',value:birthChart.moon_sign},
                {label:'Rising Sign',value:birthChart.rising_sign},
              ].map(({label,value})=>(
                <div key={label} style={{background:'rgba(138,90,255,0.08)',border:'1px solid rgba(200,168,255,0.12)',borderRadius:'12px',padding:'14px',textAlign:'center'}}>
                  <div style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'2px',color:'rgba(200,168,255,0.4)',marginBottom:'6px'}}>{label.toUpperCase()}</div>
                  <div style={{fontStyle:'italic',fontSize:'16px',color:'#C8A8FF'}}>{value || '—'}</div>
                </div>
              ))}
            </div>
            {birthChart.birth_city && (
              <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',textAlign:'center',letterSpacing:'1px'}}>
                Born in {birthChart.birth_city}{birthChart.birth_country ? `, ${birthChart.birth_country}` : ''}
              </p>
            )}
            <button onClick={()=>router.push('/birthchart')} style={{width:'100%',marginTop:'14px',padding:'10px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>
              Update Birth Chart
            </button>
          </div>
        )}

        <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'24px',marginBottom:'22px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'20px'}}>{star} SUBSCRIPTION</p>
          {subscription?.status === 'active' || subscription?.status === 'trialing' ? (
            <div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
                <div>
                  <p style={{fontStyle:'italic',fontSize:'16px',color:'#C8A8FF',marginBottom:'4px'}}>Sacred Member</p>
                  <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',letterSpacing:'1px'}}>$10/month · Full access</p>
                </div>
                <div style={{padding:'6px 14px',background:'rgba(100,220,130,0.1)',border:'1px solid rgba(100,220,130,0.3)',borderRadius:'20px',fontFamily:'sans-serif',fontSize:'11px',color:'rgba(100,220,130,0.8)'}}>Active</div>
              </div>
              <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',letterSpacing:'1px'}}>To manage or cancel your subscription, visit your Stripe customer portal.</p>
            </div>
          ) : (
            <div>
              <p style={{fontStyle:'italic',fontSize:'14px',color:'rgba(220,210,255,0.6)',marginBottom:'14px'}}>You are on the free plan. Upgrade to access all features!</p>
              <button onClick={()=>router.push('/pricing')} style={{width:'100%',padding:'13px',background:'linear-gradient(135deg,rgba(138,90,255,0.3),rgba(255,214,160,0.1))',border:'1px solid rgba(200,168,255,0.35)',borderRadius:'12px',fontStyle:'italic',fontSize:'15px',letterSpacing:'4px',color:'#E8E0FF',cursor:'pointer'}}>
                Upgrade to Sacred {star}
              </button>
            </div>
          )}
        </div>

        <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'24px',marginBottom:'22px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'20px'}}>{star} ACCOUNT ACTIONS</p>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <button onClick={()=>router.push('/privacy')} style={{padding:'12px',background:'transparent',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'12px',fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)',cursor:'pointer',textAlign:'left'}}>
              Privacy Policy
            </button>
            <button onClick={()=>router.push('/terms')} style={{padding:'12px',background:'transparent',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'12px',fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)',cursor:'pointer',textAlign:'left'}}>
              Terms of Service
            </button>
            <button onClick={signOut} style={{padding:'12px',background:'rgba(255,80,80,0.08)',border:'1px solid rgba(255,80,80,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'rgba(255,120,120,0.7)',cursor:'pointer',textAlign:'left'}}>
              Sign Out
            </button>
          </div>
        </div>

      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(6,5,14,0.95)',borderTop:'1px solid rgba(200,168,255,0.12)',padding:'12px 0',zIndex:100}}>
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',maxWidth:'680px',margin:'0 auto'}}>
          {navItems.map(({label,route,emoji}) => (
            <div key={label} onClick={() => router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',cursor:'pointer',padding:'4px 16px',borderRadius:'10px'}}>
              <span style={{fontSize:'20px'}}>{emoji}</span>
              <span style={{fontFamily:'sans-serif',fontWeight:200,fontSize:'9px',letterSpacing:'2px',color:'rgba(200,168,255,0.4)',textTransform:'uppercase'}}>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}