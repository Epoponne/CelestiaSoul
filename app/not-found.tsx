'use client'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  const star = '\u2726'

  return (
    <main style={{background:'#0D0B1E ',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px'}}>

      <div style={{textAlign:'center',maxWidth:'560px'}}>

        <div style={{marginBottom:'24px'}}>
          <img src="/logo.png" alt="CelestiaSOUL" style={{width:'80px',height:'80px',borderRadius:'50%',objectFit:'cover',boxShadow:'0 0 30px rgba(200,168,255,0.4)',border:'1px solid rgba(200,168,255,0.25)'}}/>
        </div>

        <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'16px'}}>{star} LOST IN THE COSMOS {star}</p>

        <div style={{fontStyle:'italic',fontWeight:300,fontSize:'120px',letterSpacing:'8px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',lineHeight:1,marginBottom:'16px'}}>404</div>

        <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'32px',letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 16px'}}>Page Not Found</h1>

        <p style={{fontFamily:'sans-serif',fontWeight:300,fontSize:'15px',color:'rgba(220,210,255,0.6)',lineHeight:1.9,marginBottom:'40px'}}>
          The stars could not find this page. Perhaps it has drifted into another galaxy. Let us guide you back to your cosmic sanctuary.
        </p>

        <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'16px',padding:'20px',textAlign:'center',marginBottom:'32px'}}>
          <p style={{fontStyle:'italic',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.35)',marginBottom:'10px'}}>{star} COSMIC GUIDANCE {star}</p>
          <p style={{fontStyle:'italic',fontSize:'15px',color:'rgba(220,210,255,0.7)',lineHeight:1.8,margin:0}}>"When you feel lost, look up. The stars always know the way home."</p>
        </div>

        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'24px'}}>
          <button onClick={()=>router.push('/')} style={{padding:'14px 32px',background:'linear-gradient(135deg,rgba(138,90,255,0.5),rgba(100,60,200,0.4))',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'30px',fontStyle:'italic',fontSize:'15px',letterSpacing:'4px',color:'#E8E0FF',cursor:'pointer'}}>
            Return Home {star}
          </button>
          <button onClick={()=>router.push('/dashboard')} style={{padding:'14px 32px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'30px',fontStyle:'italic',fontSize:'15px',letterSpacing:'4px',color:'rgba(200,168,255,0.6)',cursor:'pointer'}}>
            My Dashboard
          </button>
        </div>

        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap'}}>
          {[
            {label:'Breathwork', route:'/breathing', emoji:'🌬️'},
            {label:'Music', route:'/music', emoji:'🎵'},
            {label:'Reading', route:'/reading', emoji:'🔮'},
            {label:'Journal', route:'/journal', emoji:'📓'},
          ].map(({label,route,emoji})=>(
            <div key={label} onClick={()=>router.push(route)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',cursor:'pointer',padding:'12px 16px',borderRadius:'12px',background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.08)'}}>
              <span style={{fontSize:'22px'}}>{emoji}</span>
              <span style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'2px',color:'rgba(200,168,255,0.4)'}}>{label}</span>
            </div>
          ))}
        </div>

      </div>

    </main>
  )
}