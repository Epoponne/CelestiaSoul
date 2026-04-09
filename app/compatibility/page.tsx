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
  const [step, setStep] = useState<'pick1'|'pick2'|'result'>('pick1')

  const signs = [
    {name:'Aries',emoji:'♈',element:'Fire',symbol:'🔥',color:'#FF6B6B',bg:'rgba(255,107,107,0.2)',border:'rgba(255,107,107,0.6)',glow:'rgba(255,107,107,0.3)'},
    {name:'Taurus',emoji:'♉',element:'Earth',symbol:'🌿',color:'#69DB7C',bg:'rgba(105,219,124,0.2)',border:'rgba(105,219,124,0.6)',glow:'rgba(105,219,124,0.3)'},
    {name:'Gemini',emoji:'♊',element:'Air',symbol:'💨',color:'#DDD0FF',bg:'rgba(221,208,255,0.2)',border:'rgba(221,208,255,0.6)',glow:'rgba(221,208,255,0.3)'},
    {name:'Cancer',emoji:'♋',element:'Water',symbol:'🌊',color:'#74C0FC',bg:'rgba(116,192,252,0.2)',border:'rgba(116,192,252,0.6)',glow:'rgba(116,192,252,0.3)'},
    {name:'Leo',emoji:'♌',element:'Fire',symbol:'🔥',color:'#FFD43B',bg:'rgba(255,212,59,0.2)',border:'rgba(255,212,59,0.6)',glow:'rgba(255,212,59,0.3)'},
    {name:'Virgo',emoji:'♍',element:'Earth',symbol:'🌿',color:'#A9E34B',bg:'rgba(169,227,75,0.2)',border:'rgba(169,227,75,0.6)',glow:'rgba(169,227,75,0.3)'},
    {name:'Libra',emoji:'♎',element:'Air',symbol:'💨',color:'#F8A8C8',bg:'rgba(248,168,200,0.2)',border:'rgba(248,168,200,0.6)',glow:'rgba(248,168,200,0.3)'},
    {name:'Scorpio',emoji:'♏',element:'Water',symbol:'🌊',color:'#8B5CF6',bg:'rgba(139,92,246,0.2)',border:'rgba(139,92,246,0.6)',glow:'rgba(139,92,246,0.3)'},
    {name:'Sagittarius',emoji:'♐',element:'Fire',symbol:'🔥',color:'#FF922B',bg:'rgba(255,146,43,0.2)',border:'rgba(255,146,43,0.6)',glow:'rgba(255,146,43,0.3)'},
    {name:'Capricorn',emoji:'♑',element:'Earth',symbol:'🌿',color:'#63E6BE',bg:'rgba(99,230,190,0.2)',border:'rgba(99,230,190,0.6)',glow:'rgba(99,230,190,0.3)'},
    {name:'Aquarius',emoji:'♒',element:'Air',symbol:'💨',color:'#74C0FC',bg:'rgba(116,192,252,0.2)',border:'rgba(116,192,252,0.6)',glow:'rgba(116,192,252,0.3)'},
    {name:'Pisces',emoji:'♓',element:'Water',symbol:'🌊',color:'#9775FA',bg:'rgba(151,117,250,0.2)',border:'rgba(151,117,250,0.6)',glow:'rgba(151,117,250,0.3)'},
  ]

  const checkCompatibility = async () => {
    if (!sign1 || !sign2) return
    if (!isPaid) { router.push('/pricing'); return }
    setLoading(true)
    setStep('result')
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

  const SignGrid = ({selected, onSelect, title, accentColor}: any) => (
    <div>
      <p style={{fontFamily:'sans-serif',fontSize:'11px',letterSpacing:'5px',color:accentColor,marginBottom:'16px',textAlign:'center'}}>{title}</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px'}}>
        {signs.map(s=>(
          <div key={s.name} onClick={()=>onSelect(s.name)} style={{background:selected===s.name?s.bg:'rgba(255,255,255,0.04)',border:`2px solid ${selected===s.name?s.border:'rgba(200,168,255,0.1)'}`,borderRadius:'16px',padding:'14px 8px',textAlign:'center',cursor:'pointer',transition:'all 0.2s',boxShadow:selected===s.name?`0 0 20px ${s.glow}`:'none',transform:selected===s.name?'scale(1.05)':'scale(1)'}}>
            <div style={{fontSize:'28px',marginBottom:'6px',filter:selected===s.name?`drop-shadow(0 0 8px ${s.color})`:'none'}}>{s.emoji}</div>
            <div style={{fontStyle:'italic',fontSize:'12px',color:selected===s.name?s.color:'rgba(200,168,255,0.6)',marginBottom:'2px',fontWeight:selected===s.name?'600':'400'}}>{s.name}</div>
            <div style={{fontFamily:'sans-serif',fontSize:'9px',color:'rgba(200,168,255,0.35)',letterSpacing:'1px'}}>{s.element}</div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <main style={{minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif',position:'relative'}}>
      <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',backgroundImage:'url(/compatibility-bg.jpg)',backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat',zIndex:0}}/>
      <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',background:'rgba(6,5,14,0.82)',zIndex:1}}/>

      <div style={{position:'relative',zIndex:2,maxWidth:'680px',margin:'0 auto',padding:'0 18px 100px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'56px',height:'56px',borderRadius:'50%',objectFit:'cover',boxShadow:'0 0 16px rgba(200,168,255,0.5)',border:'1px solid rgba(200,168,255,0.25)'}}/>
            <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          </div>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'rgba(6,5,14,0.5)'}}>Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.7)',marginBottom:'8px'}}>{star} COSMIC LOVE {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Compatibility</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.6)',letterSpacing:'2px'}}>Discover your cosmic connection</p>
        </div>

        {!isPaid && !subLoading && (
          <div onClick={()=>router.push('/pricing')} style={{background:'rgba(6,5,14,0.8)',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'16px',padding:'20px',marginBottom:'24px',textAlign:'center',cursor:'pointer'}}>
            <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'4px'}}>{star} Sacred Members Only {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.6)',letterSpacing:'2px'}}>Unlock compatibility readings · $10/month · 3-day free trial</p>
          </div>
        )}

        <div style={{display:'flex',gap:'8px',marginBottom:'28px',justifyContent:'center'}}>
          {[
            {id:'pick1',label:`${star} Your Sign`},
            {id:'pick2',label:'💕 Their Sign'},
            {id:'result',label:'✨ Result'},
          ].map(tab=>(
            <div key={tab.id} onClick={()=>setStep(tab.id as any)} style={{padding:'10px 20px',borderRadius:'20px',cursor:'pointer',fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',background:step===tab.id?'rgba(138,90,255,0.35)':'rgba(255,255,255,0.04)',border:`1px solid ${step===tab.id?'rgba(200,168,255,0.5)':'rgba(200,168,255,0.1)'}`,color:step===tab.id?'#E8E0FF':'rgba(200,168,255,0.4)'}}>
              {tab.label}
            </div>
          ))}
        </div>

        {step === 'pick1' && (
          <div style={{background:'rgba(6,5,14,0.65)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'20px',padding:'24px',marginBottom:'20px'}}>
            <SignGrid selected={sign1} onSelect={(s:string)=>{setSign1(s);setStep('pick2')}} title="✦ SELECT YOUR ZODIAC SIGN" accentColor="rgba(200,168,255,0.7)"/>
          </div>
        )}

        {step === 'pick2' && (
          <div style={{background:'rgba(6,5,14,0.65)',border:'1px solid rgba(255,130,180,0.15)',borderRadius:'20px',padding:'24px',marginBottom:'20px'}}>
            {sign1 && (
              <div style={{textAlign:'center',marginBottom:'20px',padding:'12px',background:'rgba(138,90,255,0.1)',borderRadius:'12px',border:'1px solid rgba(200,168,255,0.15)'}}>
                <span style={{fontStyle:'italic',fontSize:'14px',color:'rgba(200,168,255,0.6)'}}>Your sign: </span>
                <span style={{fontStyle:'italic',fontSize:'16px',color:signs.find(s=>s.name===sign1)?.color}}>{signs.find(s=>s.name===sign1)?.emoji} {sign1}</span>
              </div>
            )}
            <SignGrid selected={sign2} onSelect={(s:string)=>{setSign2(s)}} title="💕 SELECT THEIR ZODIAC SIGN" accentColor="rgba(255,130,180,0.7)"/>
            {sign2 && (
              <button onClick={checkCompatibility} style={{width:'100%',marginTop:'20px',padding:'16px',background:'linear-gradient(135deg,rgba(255,130,180,0.25),rgba(138,90,255,0.25))',border:'1px solid rgba(255,130,180,0.35)',borderRadius:'13px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer'}}>
                {star} Check Compatibility {star}
              </button>
            )}
          </div>
        )}

        {step === 'result' && (
          <div>
            {sign1 && sign2 && (
              <div style={{background:'rgba(6,5,14,0.75)',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'24px',marginBottom:'20px',textAlign:'center'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'24px',marginBottom:'8px'}}>
                  <div style={{textAlign:'center'}}>
                    <span style={{fontSize:'48px',display:'block',filter:`drop-shadow(0 0 12px ${signs.find(s=>s.name===sign1)?.color})`}}>{signs.find(s=>s.name===sign1)?.emoji}</span>
                    <span style={{fontStyle:'italic',fontSize:'16px',color:signs.find(s=>s.name===sign1)?.color}}>{sign1}</span>
                    <span style={{display:'block',fontFamily:'sans-serif',fontSize:'9px',color:'rgba(200,168,255,0.4)',letterSpacing:'1px'}}>{signs.find(s=>s.name===sign1)?.element}</span>
                  </div>
                  <div style={{fontSize:'32px'}}>💕</div>
                  <div style={{textAlign:'center'}}>
                    <span style={{fontSize:'48px',display:'block',filter:`drop-shadow(0 0 12px ${signs.find(s=>s.name===sign2)?.color})`}}>{signs.find(s=>s.name===sign2)?.emoji}</span>
                    <span style={{fontStyle:'italic',fontSize:'16px',color:signs.find(s=>s.name===sign2)?.color}}>{sign2}</span>
                    <span style={{display:'block',fontFamily:'sans-serif',fontSize:'9px',color:'rgba(200,168,255,0.4)',letterSpacing:'1px'}}>{signs.find(s=>s.name===sign2)?.element}</span>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div style={{background:'rgba(6,5,14,0.8)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'20px',padding:'48px',textAlign:'center',marginBottom:'24px'}}>
                <div style={{fontSize:'32px',marginBottom:'16px'}}>💕</div>
                <p style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'rgba(200,168,255,0.6)'}}>Reading the stars of love...</p>
              </div>
            )}

            {result && !loading && (
              <div style={{marginBottom:'20px'}}>
                <div style={{background:'rgba(26,16,64,0.85)',border:'1px solid rgba(255,130,180,0.25)',borderRadius:'20px',padding:'28px',marginBottom:'16px',textAlign:'center'}}>
                  <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'6px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>COMPATIBILITY SCORE</p>
                  <p style={{fontStyle:'italic',fontSize:'72px',background:'linear-gradient(135deg,#FFD6A0,#FF82B4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'4px',lineHeight:1}}>{result.score}%</p>
                  <p style={{fontStyle:'italic',fontSize:'22px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'16px'}}>{result.title}</p>
                  <p style={{fontStyle:'italic',fontSize:'14px',color:'rgba(220,210,255,0.7)',lineHeight:1.9}}>{result.overview}</p>
                </div>
                {[
                  {label:'Love & Romance',text:result.love,color:'rgba(255,130,180,0.7)',emoji:'💕'},
                  {label:'Communication',text:result.communication,color:'rgba(168,232,255,0.7)',emoji:'💬'},
                  {label:'Challenges',text:result.challenges,color:'rgba(255,180,80,0.7)',emoji:'⚡'},
                  {label:'Growth Together',text:result.growth,color:'rgba(100,220,130,0.7)',emoji:'🌱'},
                ].map(({label,text,color,emoji})=>(
                  <div key={label} style={{background:'rgba(6,5,14,0.8)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'14px',padding:'18px',marginBottom:'10px',borderLeft:`3px solid ${color}`}}>
                    <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{emoji} {label.toUpperCase()}</p>
                    <p style={{fontStyle:'italic',fontSize:'14px',color:'rgba(220,210,255,0.75)',lineHeight:1.9,margin:0}}>{text}</p>
                  </div>
                ))}
                <button onClick={()=>{setStep('pick1');setResult(null);setSign1('');setSign2('')}} style={{width:'100%',marginTop:'8px',padding:'14px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'14px',letterSpacing:'4px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>
                  {star} Check Another Pairing {star}
                </button>
              </div>
            )}
          </div>
        )}

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
