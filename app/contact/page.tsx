'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Contact() {
  const router = useRouter()
  const star = '\u2726'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name || !email || !message) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 60px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'38px',height:'38px',borderRadius:'50%',objectFit:'cover'}}/>
            <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          </div>
          <button onClick={()=>router.push('/')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Home</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} WE ARE HERE FOR YOU {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Contact Us</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>We respond to all messages within 48 hours</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px',marginBottom:'32px'}}>
          {[
            {icon:'✉️',title:'Email Us',desc:'support@celestiasoul.com'},
            {icon:'🌙',title:'Response Time',desc:'Within 48 hours'},
            {icon:'⭐',title:'App Support',desc:'Technical help & billing'},
          ].map(({icon,title,desc})=>(
            <div key={title} style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'20px',textAlign:'center'}}>
              <span style={{fontSize:'24px',display:'block',marginBottom:'8px'}}>{icon}</span>
              <div style={{fontStyle:'italic',fontSize:'13px',color:'#C8A8FF',marginBottom:'4px'}}>{title}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',letterSpacing:'1px'}}>{desc}</div>
            </div>
          ))}
        </div>

        {!sent ? (
          <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'20px',padding:'32px'}}>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'24px'}}>{star} SEND US A MESSAGE</p>
            <div style={{marginBottom:'16px'}}>
              <label style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>YOUR NAME</label>
              <input type="text" placeholder="Your full name..." value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif'}}/>
            </div>
            <div style={{marginBottom:'16px'}}>
              <label style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>YOUR EMAIL</label>
              <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif'}}/>
            </div>
            <div style={{marginBottom:'16px'}}>
              <label style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>SUBJECT</label>
              <select value={subject} onChange={e=>setSubject(e.target.value)} style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif'}}>
                <option value="" style={{background:'#06050E'}}>Select a topic...</option>
                <option value="technical" style={{background:'#06050E'}}>Technical Support</option>
                <option value="billing" style={{background:'#06050E'}}>Billing & Subscription</option>
                <option value="reading" style={{background:'#06050E'}}>My Astrology Reading</option>
                <option value="feature" style={{background:'#06050E'}}>Feature Request</option>
                <option value="other" style={{background:'#06050E'}}>Other</option>
              </select>
            </div>
            <div style={{marginBottom:'24px'}}>
              <label style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',display:'block',marginBottom:'8px'}}>YOUR MESSAGE</label>
              <textarea placeholder="How can we help your soul today?..." value={message} onChange={e=>setMessage(e.target.value)} rows={6} style={{width:'100%',background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'10px',padding:'12px 16px',color:'#E8E0FF',fontSize:'14px',outline:'none',fontFamily:'Georgia,serif',resize:'none',lineHeight:1.8}}/>
            </div>
            <button onClick={handleSubmit} disabled={loading} style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.4),rgba(100,60,200,0.3))',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'12px',fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'#E8E0FF',cursor:'pointer'}}>
              {loading ? 'Sending...' : `Send Message ${star}`}
            </button>
          </div>
        ) : (
          <div style={{background:'linear-gradient(135deg,rgba(100,220,130,0.1),rgba(138,90,255,0.1))',border:'1px solid rgba(100,220,130,0.25)',borderRadius:'20px',padding:'48px',textAlign:'center'}}>
            <span style={{fontSize:'48px',display:'block',marginBottom:'16px'}}>🌙</span>
            <h2 style={{fontStyle:'italic',fontWeight:300,fontSize:'28px',letterSpacing:'4px',color:'rgba(100,220,130,0.8)',marginBottom:'12px'}}>Message Received {star}</h2>
            <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.55)',lineHeight:1.9,marginBottom:'24px'}}>Thank you for reaching out, beloved soul. We will respond within 48 hours at {email}.</p>
            <button onClick={()=>router.push('/')} style={{padding:'12px 32px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer'}}>Return Home</button>
          </div>
        )}

        <div style={{textAlign:'center',marginTop:'40px',padding:'24px',borderTop:'1px solid rgba(200,168,255,0.08)'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.3)',letterSpacing:'2px',marginBottom:'12px'}}>© 2026 CelestiaSOUL</p>
          <div style={{display:'flex',gap:'20px',justifyContent:'center'}}>
            <span onClick={()=>router.push('/privacy')} style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',cursor:'pointer',textDecoration:'underline'}}>Privacy Policy</span>
            <span onClick={()=>router.push('/terms')} style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',cursor:'pointer',textDecoration:'underline'}}>Terms of Service</span>
          </div>
        </div>

      </div>
    </main>
  )
}