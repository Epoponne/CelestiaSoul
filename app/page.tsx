'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const star = '\u2726'

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif',overflowX:'hidden',width:'100%'}}>

      <div style={{position:'relative',minHeight:'100vh',display:'flex',flexDirection:'column'}}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.35,zIndex:0}}
        >
          <source src="/hero-bg.mp4" type="video/mp4"/>
        </video>
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'linear-gradient(to bottom,rgba(6,5,14,0.3) 0%,rgba(6,5,14,0.6) 60%,rgba(6,5,14,1) 100%)',zIndex:1}}/>

        <nav style={{position:'relative',zIndex:2,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderBottom:'1px solid rgba(200,168,255,0.08)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'38px',height:'38px',borderRadius:'50%',objectFit:'cover'}}/>
            <span style={{fontStyle:'italic',fontSize:'clamp(14px,4vw,22px)',letterSpacing:'2px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button onClick={()=>router.push('/signin')} style={{fontStyle:'italic',fontSize:'clamp(11px,3vw,14px)',letterSpacing:'2px',color:'#E8E0FF',cursor:'pointer',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',padding:'8px 16px'}}>Sign In</button>
          </div>
        </nav>

        <div style={{position:'relative',zIndex:2,flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'40px 20px 80px',width:'100%',boxSizing:'border-box'}}>
          <img src="/logo.png" alt="CelestiaSOUL" style={{width:'clamp(70px,20vw,120px)',height:'clamp(70px,20vw,120px)',borderRadius:'50%',objectFit:'cover',marginBottom:'20px',boxShadow:'0 0 40px rgba(200,168,255,0.3)'}}/>
          <p style={{fontFamily:'sans-serif',fontSize:'clamp(8px,2vw,10px)',letterSpacing:'4px',color:'rgba(200,168,255,0.7)',marginBottom:'16px'}}>{star} SACRED SPIRITUAL WELLNESS {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'clamp(32px,8vw,72px)',letterSpacing:'2px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'12px',lineHeight:1.1,width:'100%'}}>CelestiaSOUL</h1>
          <p style={{fontStyle:'italic',fontSize:'clamp(12px,3.5vw,20px)',letterSpacing:'1px',color:'rgba(200,168,255,0.8)',marginBottom:'16px'}}>sacred breath · cosmic alignment · soul awakening</p>
          <p style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'clamp(12px,3vw,16px)',color:'rgba(220,210,255,0.7)',lineHeight:1.8,maxWidth:'520px',margin:'0 auto 32px',padding:'0 4px'}}>
            Your personalized cosmic sanctuary. Receive AI-powered astrology readings, sacred breathwork, healing Solfeggio frequencies and moon rituals — all crafted by the stars, just for you.
          </p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap',marginBottom:'16px',width:'100%',padding:'0 16px',boxSizing:'border-box'}}>
            <button onClick={()=>router.push('/signin')} style={{fontStyle:'italic',fontSize:'clamp(13px,3.5vw,16px)',letterSpacing:'2px',color:'#E8E0FF',cursor:'pointer',background:'linear-gradient(135deg,rgba(138,90,255,0.6),rgba(100,60,200,0.5))',border:'1px solid rgba(200,168,255,0.45)',borderRadius:'30px',padding:'12px 28px'}}>Begin My Journey {star}</button>
            <button onClick={()=>router.push('/pricing')} style={{fontStyle:'italic',fontSize:'clamp(13px,3.5vw,16px)',letterSpacing:'2px',color:'rgba(200,168,255,0.7)',cursor:'pointer',background:'rgba(6,5,14,0.5)',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'30px',padding:'12px 28px'}}>View Pricing</button>
          </div>
          <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',letterSpacing:'1px'}}>3-day free trial · No credit card required</p>
        </div>
      </div>

      <div style={{background:'#06050E',padding:'40px 20px',width:'100%',boxSizing:'border-box'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1px',background:'rgba(200,168,255,0.08)',maxWidth:'1000px',margin:'0 auto',borderRadius:'16px',overflow:'hidden',marginBottom:'40px'}}>
          {[
            {icon:'🌙',title:'AI Astrology',desc:'Personalized daily readings based on your natal birth chart'},
            {icon:'☀️',title:'Sacred Breath',desc:'6 breathwork techniques with healing Solfeggio frequencies'},
            {icon:'🎵',title:'Sound Healing',desc:'7 frequencies from 396 Hz to 963 Hz for deep healing'},
            {icon:'📓',title:'Moon Rituals',desc:'Journal and rituals aligned with each lunar cycle'},
          ].map(({icon,title,desc})=>(
            <div key={title} style={{background:'#06050E',padding:'24px 16px',textAlign:'center'}}>
              <span style={{fontSize:'28px',display:'block',marginBottom:'10px'}}>{icon}</span>
              <div style={{fontStyle:'italic',fontSize:'clamp(13px,3.5vw,18px)',letterSpacing:'1px',color:'#C8A8FF',marginBottom:'8px'}}>{title}</div>
              <div style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'clamp(10px,2.5vw,13px)',color:'rgba(200,168,255,0.45)',lineHeight:1.7}}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{maxWidth:'800px',margin:'0 auto 40px',textAlign:'center'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'16px'}}>{star} OUR MISSION {star}</p>
          <h2 style={{fontStyle:'italic',fontWeight:300,fontSize:'clamp(22px,6vw,42px)',letterSpacing:'2px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'20px'}}>Where Science Meets the Sacred</h2>
          <p style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'clamp(12px,3vw,15px)',color:'rgba(220,210,255,0.65)',lineHeight:2,margin:'0 auto 16px'}}>
            CelestiaSOUL was born from a deep belief that every soul deserves personalized cosmic guidance. We combine ancient astrological wisdom with modern AI technology to deliver readings, breathwork, and healing frequencies uniquely tailored to your natal birth chart.
          </p>
          <p style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'clamp(12px,3vw,15px)',color:'rgba(220,210,255,0.65)',lineHeight:2,margin:'0 auto'}}>
            Our mission is simple — to help you align with the cosmos, breathe with intention, and awaken to your highest soul purpose. Every feature is designed with love, backed by ancient wisdom, and powered by sacred technology.
          </p>
        </div>

        <div style={{maxWidth:'900px',margin:'0 auto 40px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',textAlign:'center',marginBottom:'24px'}}>{star} WHAT SOULS ARE SAYING {star}</p>
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            {[
              {quote:'The AI readings are incredibly accurate. I look forward to them every morning. CelestiaSOUL has completely changed my spiritual practice.',name:'Sarah M.',sign:'Scorpio Rising',stars:'★★★★★'},
              {quote:'The breathing exercises combined with the healing frequencies have transformed my meditation. I feel so aligned every day.',name:'Luna K.',sign:'Pisces Sun',stars:'★★★★★'},
              {quote:'I never felt so connected to the cosmos. CelestiaSOUL is my daily sacred ritual. The personalized readings blow my mind every time.',name:'Maya R.',sign:'Cancer Moon',stars:'★★★★★'},
            ].map(({quote,name,sign,stars})=>(
              <div key={name} style={{background:'rgba(255,255,255,0.028)',border:'1px solid rgba(200,168,255,0.12)',borderRadius:'16px',padding:'20px'}}>
                <p style={{fontFamily:'sans-serif',fontSize:'14px',color:'rgba(255,214,160,0.8)',marginBottom:'10px'}}>{stars}</p>
                <p style={{fontStyle:'italic',fontSize:'clamp(12px,3vw,14px)',color:'rgba(220,210,255,0.75)',lineHeight:1.9,marginBottom:'14px'}}>"{quote}"</p>
                <div style={{borderTop:'1px solid rgba(200,168,255,0.08)',paddingTop:'12px'}}>
                  <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'#C8A8FF',marginBottom:'2px'}}>{name}</p>
                  <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)'}}>{sign}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.12),rgba(40,20,100,0.2))',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'24px',maxWidth:'800px',margin:'0 auto 40px',padding:'40px 24px',textAlign:'center'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'16px'}}>{star} BEGIN YOUR JOURNEY {star}</p>
          <h2 style={{fontStyle:'italic',fontWeight:300,fontSize:'clamp(28px,7vw,48px)',letterSpacing:'2px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'16px'}}>Your Soul Is Ready</h2>
          <p style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'clamp(12px,3vw,15px)',color:'rgba(220,210,255,0.6)',lineHeight:1.9,maxWidth:'440px',margin:'0 auto 24px'}}>Join thousands of souls awakening to their cosmic purpose. Start your 3-day free trial today.</p>
          <button onClick={()=>router.push('/signin')} style={{fontStyle:'italic',fontSize:'clamp(14px,4vw,18px)',letterSpacing:'2px',color:'#E8E0FF',cursor:'pointer',background:'linear-gradient(135deg,rgba(138,90,255,0.5),rgba(100,60,200,0.4))',border:'1px solid rgba(200,168,255,0.45)',borderRadius:'30px',padding:'14px 40px',marginBottom:'16px',display:'block',margin:'0 auto 16px'}}>{star} Start Free Trial {star}</button>
          <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.3)',letterSpacing:'1px'}}>$10/month after trial · Cancel anytime</p>
        </div>

        <footer style={{borderTop:'1px solid rgba(200,168,255,0.08)',padding:'32px 20px',textAlign:'center',maxWidth:'800px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',marginBottom:'12px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'32px',height:'32px',borderRadius:'50%',objectFit:'cover'}}/>
            <p style={{fontStyle:'italic',fontSize:'clamp(14px,4vw,20px)',letterSpacing:'2px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>{star} CelestiaSOUL</p>
          </div>
          <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.3)',letterSpacing:'1px',marginBottom:'16px'}}>sacred breath · cosmic alignment · soul awakening</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'16px',flexWrap:'wrap'}}>
            <span onClick={()=>router.push('/privacy')} style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',cursor:'pointer',textDecoration:'underline'}}>Privacy Policy</span>
            <span onClick={()=>router.push('/terms')} style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',cursor:'pointer',textDecoration:'underline'}}>Terms of Service</span>
            <span onClick={()=>router.push('/contact')} style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',cursor:'pointer',textDecoration:'underline'}}>Contact</span>
            <a href="https://www.youtube.com/channel/UCEx67Esh2D7oOZAhdwK0FJA" target="_blank" rel="noopener noreferrer" style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',cursor:'pointer',textDecoration:'underline'}}>YouTube</a>
            <span style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)'}}>support@celestiasoul.com</span>
          </div>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.2)',letterSpacing:'1px'}}>© 2026 CelestiaSOUL · All rights reserved</p>
        </footer>
      </div>

    </main>
  )
}