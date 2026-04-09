'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useSubscription } from '../../lib/useSubscription'

export default function BirthChartWheel() {
  const router = useRouter()
  const star = '\u2726'
  const { isPaid, loading: subLoading } = useSubscription()
  const [chart, setChart] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadChart = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/signin'); return }
      const { data } = await supabase
        .from('birth_charts')
        .select('*')
        .eq('user_id', user.id)
        .single()
      if (data) setChart(data)
      setLoading(false)
    }
    loadChart()
  }, [])

  const signs = [
    {name:'Aries',emoji:'♈',color:'#FF6B6B',element:'Fire',quality:'Cardinal'},
    {name:'Taurus',emoji:'♉',color:'#69DB7C',element:'Earth',quality:'Fixed'},
    {name:'Gemini',emoji:'♊',color:'#DDD0FF',element:'Air',quality:'Mutable'},
    {name:'Cancer',emoji:'♋',color:'#74C0FC',element:'Water',quality:'Cardinal'},
    {name:'Leo',emoji:'♌',color:'#FFD43B',element:'Fire',quality:'Fixed'},
    {name:'Virgo',emoji:'♍',color:'#69DB7C',element:'Earth',quality:'Mutable'},
    {name:'Libra',emoji:'♎',color:'#F8A8C8',element:'Air',quality:'Cardinal'},
    {name:'Scorpio',emoji:'♏',color:'#8B5CF6',element:'Water',quality:'Fixed'},
    {name:'Sagittarius',emoji:'♐',color:'#FF922B',element:'Fire',quality:'Mutable'},
    {name:'Capricorn',emoji:'♑',color:'#63E6BE',element:'Earth',quality:'Cardinal'},
    {name:'Aquarius',emoji:'♒',color:'#74C0FC',element:'Air',quality:'Fixed'},
    {name:'Pisces',emoji:'♓',color:'#9775FA',element:'Water',quality:'Mutable'},
  ]

  const planets = [
    {name:'Sun',emoji:'☀️',placement:chart?.sun_sign,meaning:'Your core identity and life purpose'},
    {name:'Moon',emoji:'🌙',placement:chart?.moon_sign,meaning:'Your emotions and inner world'},
    {name:'Rising',emoji:'⬆️',placement:chart?.rising_sign,meaning:'How the world sees you'},
    {name:'Venus',emoji:'♀',placement:'Pisces',meaning:'Love style and what you value'},
    {name:'Mars',emoji:'♂',placement:'Gemini',meaning:'Drive, energy and action'},
    {name:'Mercury',emoji:'☿',placement:'Scorpio',meaning:'How you think and communicate'},
    {name:'Jupiter',emoji:'♃',placement:'Sagittarius',meaning:'Where you find luck and expansion'},
    {name:'Saturn',emoji:'♄',placement:'Capricorn',meaning:'Life lessons and discipline'},
  ]

  const getSignData = (signName: string) => signs.find(s => s.name === signName)

  const navItems = [
    {label:'Home', route:'/dashboard', emoji:'🏠'},
    {label:'Breathe', route:'/breathing', emoji:'🌬️'},
    {label:'Music', route:'/music', emoji:'🎵'},
    {label:'Reading', route:'/reading', emoji:'🔮'},
    {label:'Journal', route:'/journal', emoji:'📓'},
  ]

  return (
    <main style={{background:'#0D0B1E ',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 18px 100px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'56px',height:'56px',borderRadius:'50%',objectFit:'cover',boxShadow:'0 0 16px rgba(200,168,255,0.5)',border:'1px solid rgba(200,168,255,0.25)'}}/>
            <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          </div>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'transparent'}}>Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} YOUR COSMIC BLUEPRINT {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Birth Chart</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>Your natal blueprint from the stars</p>
        </div>

        {!isPaid && !subLoading && (
          <div onClick={()=>router.push('/pricing')} style={{background:'linear-gradient(135deg,rgba(138,90,255,0.2),rgba(255,214,160,0.08))',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'16px',padding:'20px',marginBottom:'24px',textAlign:'center',cursor:'pointer'}}>
            <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'4px'}}>{star} Sacred Members Only {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.6)',letterSpacing:'2px'}}>Unlock your birth chart wheel · $10/month · 3-day free trial</p>
          </div>
        )}

        {!loading && !chart && (
          <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.1)',borderRadius:'20px',padding:'40px',textAlign:'center',marginBottom:'24px'}}>
            <p style={{fontStyle:'italic',fontSize:'18px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'12px'}}>{star} No Birth Chart Found {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.5)',marginBottom:'20px',lineHeight:1.8}}>Complete your birth chart to unlock your cosmic blueprint!</p>
            <button onClick={()=>router.push('/birthchart')} style={{padding:'12px 32px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'20px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#E8E0FF',cursor:'pointer'}}>Complete My Chart</button>
          </div>
        )}

        {chart && (
          <div>
            <div style={{position:'relative',width:'100%',paddingBottom:'100%',marginBottom:'28px'}}>
              <svg viewBox="0 0 400 400" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}>
                <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(200,168,255,0.1)" strokeWidth="1"/>
                <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(200,168,255,0.08)" strokeWidth="1"/>
                <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(200,168,255,0.06)" strokeWidth="1"/>
                <circle cx="200" cy="200" r="60" fill="rgba(138,90,255,0.05)" stroke="rgba(200,168,255,0.15)" strokeWidth="1"/>
                {signs.map((s, i) => {
                  const angle = (i * 30 - 90) * (Math.PI / 180)
                  const midAngle = ((i * 30 + 15) - 90) * (Math.PI / 180)
                  const tx = 200 + 167 * Math.cos(midAngle)
                  const ty = 200 + 167 * Math.sin(midAngle)
                  const lx1 = 200 + 115 * Math.cos(angle)
                  const ly1 = 200 + 115 * Math.sin(angle)
                  const lx2 = 200 + 185 * Math.cos(angle)
                  const ly2 = 200 + 185 * Math.sin(angle)
                  return (
                    <g key={s.name}>
                      <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke={`${s.color}40`} strokeWidth="0.5"/>
                      <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill={s.color}>{s.emoji}</text>
                    </g>
                  )
                })}
                {[
                  {sign:chart.sun_sign, emoji:'☀️', r:130, color:'#FFD43B'},
                  {sign:chart.moon_sign, emoji:'🌙', r:85, color:'#C8E0FF'},
                  {sign:chart.rising_sign, emoji:'⬆️', r:130, color:'#FF82B4'},
                ].map((p, idx) => {
                  const signIdx = signs.findIndex(s => s.name === p.sign)
                  if (signIdx === -1) return null
                  const angle = ((signIdx * 30 + 15) - 90) * (Math.PI / 180)
                  const px = 200 + p.r * Math.cos(angle)
                  const py = 200 + p.r * Math.sin(angle)
                  return (
                    <g key={idx}>
                      <circle cx={px} cy={py} r="14" fill={`${p.color}25`} stroke={p.color} strokeWidth="1"/>
                      <text x={px} y={py} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={p.color}>{p.emoji}</text>
                    </g>
                  )
                })}
                <text x="200" y="195" textAnchor="middle" fontSize="11" fill="#C8A8FF">Your</text>
                <text x="200" y="210" textAnchor="middle" fontSize="11" fill="#C8A8FF">Chart</text>
              </svg>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px',marginBottom:'22px'}}>
              {[
                {label:'Sun Sign',value:chart.sun_sign,emoji:'☀️',color:'#FFD43B'},
                {label:'Moon Sign',value:chart.moon_sign,emoji:'🌙',color:'#C8E0FF'},
                {label:'Rising Sign',value:chart.rising_sign,emoji:'⬆️',color:'#FF82B4'},
              ].map(({label,value,emoji,color})=>(
                <div key={label} style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${color}40`,borderRadius:'14px',padding:'16px',textAlign:'center'}}>
                  <span style={{fontSize:'24px',display:'block',marginBottom:'6px'}}>{emoji}</span>
                  <div style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'2px',color:'rgba(200,168,255,0.4)',marginBottom:'4px'}}>{label.toUpperCase()}</div>
                  <div style={{fontStyle:'italic',fontSize:'16px',color}}>{value || '—'}</div>
                  {value && getSignData(value) && (
                    <div style={{fontFamily:'sans-serif',fontSize:'9px',color:'rgba(200,168,255,0.35)',marginTop:'4px'}}>{getSignData(value)?.element} · {getSignData(value)?.quality}</div>
                  )}
                </div>
              ))}
            </div>

            <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.38)',marginBottom:'14px'}}>{star} Planetary Placements {star}</p>
            <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'22px'}}>
              {planets.map(p=>{
                const signData = p.placement ? getSignData(p.placement) : null
                return (
                  <div key={p.name} style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'12px',padding:'14px 16px',display:'flex',alignItems:'center',gap:'14px'}}>
                    <span style={{fontSize:'20px',flexShrink:0}}>{p.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'2px'}}>
                        <span style={{fontStyle:'italic',fontSize:'14px',color:'#C8A8FF'}}>{p.name}</span>
                        {p.placement && <span style={{fontStyle:'italic',fontSize:'14px',color:signData?.color||'#E8E0FF'}}>in {p.placement}</span>}
                      </div>
                      <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.4)'}}>{p.meaning}</div>
                    </div>
                    {signData && <span style={{fontSize:'20px',flexShrink:0}}>{signData.emoji}</span>}
                  </div>
                )
              })}
            </div>

            {chart.birth_city && (
              <div style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'14px',padding:'16px',textAlign:'center',marginBottom:'22px'}}>
                <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'4px',color:'rgba(200,168,255,0.35)',marginBottom:'8px'}}>BIRTH LOCATION</p>
                <p style={{fontStyle:'italic',fontSize:'15px',color:'#C8A8FF'}}>{chart.birth_city}{chart.birth_country?`, ${chart.birth_country}`:''}</p>
              </div>
            )}

            <button onClick={()=>router.push('/birthchart')} style={{width:'100%',padding:'13px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>
              Update Birth Chart {star}
            </button>
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