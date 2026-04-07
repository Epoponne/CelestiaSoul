'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const star = '\u2726'

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif',overflowX:'hidden'}}>

      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 32px',borderBottom:'1px solid rgba(200,168,255,0.08)'}}>
        <span style={{fontStyle:'italic',fontSize:'22px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{star} CelestiaSOUL</span>
        <div style={{display:'flex',gap:'16px'}}>
          <button onClick={()=>router.push('/pricing')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.6)',cursor:'pointer',background:'transparent',border:'none',padding:'8px 16px'}}>Pricing</button>
          <button onClick={()=>router.push('/signin')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',padding:'8px 20px'}}>Sign In</button>
        </div>
      </nav>

      <div style={{textAlign:'center',padding:'80px 24px 60px',maxWidth:'720px',margin:'0 auto'}}>
        <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.45)',marginBottom:'20px'}}>{star} SACRED SPIRITUAL WELLNESS {star}</p>
        <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'64px',letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'16px',lineHeight:1.2}}>CelestiaSOUL</h1>
        <p style={{fontStyle:'italic',fontSize:'18px',letterSpacing:'3px',color:'rgba(200,168,255,0.6)',marginBottom:'24px'}}>sacred breath · cosmic alignment · soul awakening</p>
        <p style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'15px',color:'rgba(220,210,255,0.6)',lineHeight:1.9,maxWidth:'520px',margin:'0 auto 40px'}}>
          Your personalized cosmic sanctuary. Receive AI-powered astrology readings, sacred breathwork, healing Solfeggio frequencies and moon rituals — all crafted by the stars, just for you.
        </p>
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginBottom:'16px'}}>
          <button onClick={()=>router.push('/signin')} style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'#E8E0FF',cursor:'pointer',background:'linear-gradient(135deg,rgba(138,90,255,0.5),rgba(100,60,200,0.4))',border:'1px solid rgba(200,168,255,0.45)',borderRadius:'30px',padding:'16px 40px'}}>Begin My Journey {star}</button>
          <button onClick={()=>router.push('/pricing')} style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'rgba(200,168,255,0.7)',cursor:'pointer',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'30px',padding:'16px 40px'}}>View Pricing</button>
        </div>
        <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.3)',letterSpacing:'2px'}}>3-day free trial · No credit card required to start</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'rgba(200,168,255,0.08)',margin:'0 32px',borderRadius:'16px',overflow:'hidden',marginBottom:'80px'}}>
        {[
          {icon:'🌙',title:'AI Astrology',desc:'Personalized daily readings based on your natal birth chart'},
          {icon:'☀️',title:'Sacred Breath',desc:'6 breathwork techniques with healing Solfeggio frequencies'},
          {icon:'🎵',title:'Sound Healing',desc:'7 frequencies from 396 Hz to 963 Hz for deep healing'},
          {icon:'📓',title:'Moon Rituals',desc:'Journal and rituals aligned with each lunar cycle'},
        ].map(({icon,title,desc})=>(
          <div key={title} style={{background:'#06050E',padding:'32px 20px',textAlign:'center'}}>
            <span style={{fontSize:'32px',display:'block',marginBottom:'12px'}}>{icon}</span>
            <div style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'2px',color:'#C8A8FF',marginBottom:'8px'}}>{title}</div>
            <div style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'12px',color:'rgba(200,168,255,0.45)',lineHeight:1.7}}>{desc}</div>
          </div>
        ))}
      </div>

      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 24px 80px'}}>
        <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',textAlign:'center',marginBottom:'40px'}}>{star} WHAT SOULS ARE SAYING {star}</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px'}}>
          {[
            {quote:'The AI readings are incredibly accurate. I look forward to them every morning.',name:'Sarah M.',sign:'Scorpio Rising'},
            {quote:'The breathing exercises with the frequencies have completely transformed my meditation practice.',name:'Luna K.',sign:'Pisces Sun'},
            {quote:'I never felt so connected to the cosmos. CelestiaSOUL is my daily sacred ritual.',name:'Maya R.',sign:'Cancer Moon'},
          ].map(({quote,name,sign})=>(
            <div key={name} style={{background:'rgba(255,255,255,0.022)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'20px'}}>
              <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(220,210,255,0.7)',lineHeight:1.8,marginBottom:'16px'}}>"{quote}"</p>
              <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'#C8A8FF',marginBottom:'2px'}}>{name}</p>
              <p style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.4)'}}>{sign}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.12),rgba(40,20,100,0.2))',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'24px',margin:'0 32px 80px',padding:'60px 40px',textAlign:'center'}}>
        <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'16px'}}>{star} BEGIN YOUR JOURNEY {star}</p>
        <h2 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'16px'}}>Your Soul Is Ready</h2>
        <p style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'14px',color:'rgba(220,210,255,0.6)',lineHeight:1.9,maxWidth:'440px',margin:'0 auto 32px'}}>Join thousands of souls awakening to their cosmic purpose. Start your 3-day free trial today.</p>
        <button onClick={()=>router.push('/signin')} style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'#E8E0FF',cursor:'pointer',background:'linear-gradient(135deg,rgba(138,90,255,0.5),rgba(100,60,200,0.4))',border:'1px solid rgba(200,168,255,0.45)',borderRadius:'30px',padding:'16px 48px',marginBottom:'12px',display:'block',margin:'0 auto 12px'}}>Start Free Trial {star}</button>
        <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.3)',letterSpacing:'2px'}}>$10/month after trial · Cancel anytime</p>
      </div>

      <footer style={{borderTop:'1px solid rgba(200,168,255,0.08)',padding:'32px',textAlign:'center'}}>
        <p style={{fontStyle:'italic',fontSize:'18px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'12px'}}>{star} CelestiaSOUL</p>
        <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.3)',letterSpacing:'2px',marginBottom:'12px'}}>sacred breath · cosmic alignment · soul awakening</p>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',marginBottom:'12px'}}>
          <span onClick={()=>router.push('/privacy')} style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',cursor:'pointer',letterSpacing:'1px',textDecoration:'underline'}}>Privacy Policy</span>
          <span onClick={()=>router.push('/terms')} style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',cursor:'pointer',letterSpacing:'1px',textDecoration:'underline'}}>Terms of Service</span>
          <span style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.35)',letterSpacing:'1px'}}>support@celestiasoul.com</span>
        </div>
        <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.2)',letterSpacing:'2px'}}>© 2026 CelestiaSOUL · All rights reserved</p>
      </footer>

    </main>
  )
}