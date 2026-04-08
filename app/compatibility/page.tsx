'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSubscription } from '../../lib/useSubscription'

export default function Compatibility() {
  const router = useRouter()
  const star = '\u2726'
  const { isPaid, loading: subLoading } = useSubscription()
  const [sign1, setSign1] = useState('')
  const [sign2, setSign2] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const signs = [
    {name:'Aries',emoji:'♈',dates:'Mar 21 - Apr 19'},
    {name:'Taurus',emoji:'♉',dates:'Apr 20 - May 20'},
    {name:'Gemini',emoji:'♊',dates:'May 21 - Jun 20'},
    {name:'Cancer',emoji:'♋',dates:'Jun 21 - Jul 22'},
    {name:'Leo',emoji:'♌',dates:'Jul 23 - Aug 22'},
    {name:'Virgo',emoji:'♍',dates:'Aug 23 - Sep 22'},
    {name:'Libra',emoji:'♎',dates:'Sep 23 - Oct 22'},
    {name:'Scorpio',emoji:'♏',dates:'Oct 23 - Nov 21'},
    {name:'Sagittarius',emoji:'♐',dates:'Nov 22 - Dec 21'},
    {name:'Capricorn',emoji:'♑',dates:'Dec 22 - Jan 19'},
    {name:'Aquarius',emoji:'♒',dates:'Jan 20 - Feb 18'},
    {name:'Pisces',emoji:'♓',dates:'Feb 19 - Mar 20'},
  ]

  const checkCompatibility = async () => {
    if (!sign1 || !sign2) return
    if (!isPaid) { router.push('/pricing'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/compatibility', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ sign1, sign2 })
      })
      const data = await res.json()
      setResult(data)
    } catch(e) { console.error(e) }
    setLoading(false)
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
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'56px',height:'56px',borderRadius:'50%',objectFit:'cover',boxShadow:'0 0 16px rgba(200,168,255,0.5)',border:'1px solid rgba(200,168,255,0.25)'}}/>
            <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          </div>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} COSMIC LOVE {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Compatibility</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>Discover your cosmic connection</p>
        </div>

        {!isPaid && !subLoading && (
          <div onClick={()=>router.push('/pricing')} style={{background:'linear-gradient(135deg,rgba(138,90,255,0.2),rgba(255,214,160,0.08))',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'16px',padding:'20px',marginBottom:'24px',textAlign:'center',cursor:'pointer'}}>
            <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'4px'}}>{star} Sacred Members Only {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.6)',letterSpacing:'2px'}}>Unlock compatibility readings · $10/month · 3-day free trial</p>
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'24px'}}>
          <div>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>YOUR SIGN</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px'}}>
              {signs.map(s=>(
                <div key={s.name} onClick={()=>setSign1(s.name)} style={{background:sign1===s.name?'rgba(138,90,255,0.25)':'rgba(255,255,255,0.025)',border:`1px solid ${sign1===s.name?'rgba(200,168,255,0.5)':'rgba(200,168,255,0.08)'}`,borderRadius:'10px',padding:'8px 4px',textAlign:'center',cursor:'pointer'}}>
                  <span style={{fontSize:'16px',display:'block'}}>{s.emoji}</span>
                  <span style={{fontFamily:'sans-serif',fontSize:'8px',color:sign1===s.name?'#C8A8FF':'rgba(200,168,255,0.4)',letterSpacing:'1px'}}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>THEIR SIGN</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px'}}>
              {signs.map(s=>(
                <div key={s.name} onClick={()=>setSign2(s.name)} style={{background:sign2===s.name?'rgba(255,130,180,0.2)':'rgba(255,255,255,0.025)',border:`1px solid ${sign2===s.name?'rgba(255,130,180,0.4)':'rgba(200,168,255,0.08)'}`,borderRadius:'10px',padding:'8px 4px',textAlign:'center',cursor:'pointer'}}>
                  <span style={{fontSize:'16px',display:'block'}}>{s.emoji}</span>
                  <span style={{fontFamily:'sans-serif',fontSize:'8px',color:sign2===s.name?'rgba(255,130,180,0.8)':'rgba(200,168,255,0.4)',letterSpacing:'1px'}}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {sign1 && sign2 && (
          <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'16px',padding:'16px',marginBottom:'20px',textAlign:'center'}}>
            <span style={{fontStyle:'italic',fontSize:'18px',color:'#C8A8FF'}}>{signs.find(s=>s.name===sign1)?.emoji} {sign1}</span>
            <span style={{fontStyle:'italic',fontSize:'18px',color:'rgba(200,168,255,0.5)',margin:'0 12px'}}>✦</span>
            <span style={{fontStyle:'italic',fontSize:'18px',color:'rgba(255,130,180,0.8)'}}>{signs.find(s=>s.name===sign2)?.emoji} {sign2}</span>
          </div>
        )}

        {result && !loading && (
          <div style={{marginBottom:'20px'}}>
            <div style={{background:'linear-gradient(135deg,rgba(255,130,180,0.1),rgba(138,90,255,0.1))',border:'1px solid rgba(255,130,180,0.2)',borderRadius:'20px',padding:'28px',marginBottom:'16px',textAlign:'center'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'6px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>COMPATIBILITY SCORE</p>
              <p style={{fontStyle:'italic',fontSize:'64px',color:'#FFD6A0',marginBottom:'8px',lineHeight:1}}>{result.score}%</p>
              <p style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'16px'}}>{result.title}</p>
              <p style={{fontStyle:'italic',fontSize:'14px',color:'rgba(220,210,255,0.7)',lineHeight:1.9}}>{result.overview}</p>
            </div>
            {[
              {label:'Love & Romance',text:result.love,color:'rgba(255,130,180,0.7)'},
              {label:'Communication',text:result.communication,color:'rgba(168,232,255,0.7)'},
              {label:'Challenges',text:result.challenges,color:'rgba(255,180,80,0.7)'},
              {label:'Growth Together',text:result.growth,color:'rgba(100,220,130,0.7)'},
            ].map(({label,text,color})=>(
              <div key={label} style={{background:'rgba(255,255,255,0.022)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'14px',padding:'18px',marginBottom:'10px',borderLeft:`3px solid ${color}`}}>
                <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{label.toUpperCase()}</p>
                <p style={{fontStyle:'italic',fontSize:'14px',color:'rgba(220,210,255,0.75)',lineHeight:1.9,margin:0}}>{text}</p>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'20px',padding:'48px',textAlign:'center',marginBottom:'24px'}}>
            <div style={{fontSize:'32px',marginBottom:'16px'}}>💕</div>
            <p style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'rgba(200,168,255,0.6)'}}>Reading the stars of love...</p>
          </div>
        )}

        <button onClick={checkCompatibility} disabled={loading || !sign1 || !sign2} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,rgba(255,130,180,0.2),rgba(138,90,255,0.2))',border:'1px solid rgba(255,130,180,0.3)',borderRadius:'13px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer',opacity:(!sign1||!sign2)?0.5:1}}>
          {loading ? 'Reading...' : `${star} Check Compatibility ${star}`}
        </button>

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