'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function BirthChart() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    birthDate: '',
    birthTime: '',
    birthCity: '',
    birthCountry: '',
  })

  const update = (field: string, value: string) => {
    setForm(prev => ({...prev, [field]: value}))
  }

  const getSunSign = (date: string) => {
    const d = new Date(date)
    const month = d.getMonth() + 1
    const day = d.getDate()
    if ((month===3&&day>=21)||(month===4&&day<=19)) return 'Aries'
    if ((month===4&&day>=20)||(month===5&&day<=20)) return 'Taurus'
    if ((month===5&&day>=21)||(month===6&&day<=20)) return 'Gemini'
    if ((month===6&&day>=21)||(month===7&&day<=22)) return 'Cancer'
    if ((month===7&&day>=23)||(month===8&&day<=22)) return 'Leo'
    if ((month===8&&day>=23)||(month===9&&day<=22)) return 'Virgo'
    if ((month===9&&day>=23)||(month===10&&day<=22)) return 'Libra'
    if ((month===10&&day>=23)||(month===11&&day<=21)) return 'Scorpio'
    if ((month===11&&day>=22)||(month===12&&day<=21)) return 'Sagittarius'
    if ((month===12&&day>=22)||(month===1&&day<=19)) return 'Capricorn'
    if ((month===1&&day>=20)||(month===2&&day<=18)) return 'Aquarius'
    return 'Pisces'
  }

  const save = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/signin'); return }
    const sunSign = getSunSign(form.birthDate)
    await supabase.from('birth_charts').upsert({
      user_id: user.id,
      birth_date: form.birthDate,
      birth_time: form.birthTime,
      birth_city: form.birthCity,
      birth_country: form.birthCountry,
      sun_sign: sunSign,
    })
    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: form.fullName,
      email: user.email,
    })
    setLoading(false)
    router.push('/reading')
  }

  const inputStyle = {
    width:'100%',
    background:'rgba(138,90,255,0.07)',
    border:'1px solid rgba(200,168,255,0.15)',
    borderRadius:'10px',
    padding:'12px 16px',
    color:'#E8E0FF',
    fontSize:'14px',
    outline:'none',
    fontFamily:'Georgia,serif',
    fontStyle:'italic' as const,
    marginBottom:'16px',
    display:'block' as const,
  }

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'480px'}}>

        <p style={{textAlign:'center',fontSize:'11px',letterSpacing:'6px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>✦ CELESTIASOUL ✦</p>
        <h1 style={{textAlign:'center',fontSize:'32px',fontStyle:'italic',fontWeight:300,letterSpacing:'4px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:'8px'}}>Your Soul Blueprint</h1>
        <p style={{textAlign:'center',fontSize:'12px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'32px'}}>✦ step {step} of 2 ✦</p>

        <div style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(200,168,255,0.15)',borderRadius:'20px',padding:'32px'}}>

          {step === 1 && (
            <div>
              <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'20px'}}>✦ TELL US YOUR NAME ✦</p>
              <input
                type="text"
                placeholder="Your full name..."
                value={form.fullName}
                onChange={e=>update('fullName',e.target.value)}
                style={inputStyle}
              />
              <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'12px',marginTop:'8px'}}>✦ DATE OF BIRTH ✦</p>
              <input
                type="date"
                value={form.birthDate}
                onChange={e=>update('birthDate',e.target.value)}
                style={{...inputStyle,colorScheme:'dark'}}
              />
              <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'12px',marginTop:'8px'}}>✦ TIME OF BIRTH ✦</p>
              <input
                type="time"
                value={form.birthTime}
                onChange={e=>update('birthTime',e.target.value)}
                style={{...inputStyle,colorScheme:'dark'}}
              />
              <p style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.3)',marginBottom:'20px',letterSpacing:'1px'}}>Don't know your birth time? Enter 12:00</p>
              <button
                onClick={()=>setStep(2)}
                disabled={!form.fullName||!form.birthDate}
                style={{width:'100%',padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.4),rgba(100,60,200,0.3))',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'12px',fontStyle:'italic',fontSize:'16px',letterSpacing:'5px',color:'#E8E0FF',cursor:'pointer'}}
              >
                Continue ✦
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.4)',marginBottom:'20px'}}>✦ PLACE OF BIRTH ✦</p>
              <input
                type="text"
                placeholder="City of birth..."
                value={form.birthCity}
                onChange={e=>update('birthCity',e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Country of birth..."
                value={form.birthCountry}
                onChange={e=>update('birthCountry',e.target.value)}
                style={inputStyle}
              />

              <div style={{background:'rgba(138,90,255,0.07)',border:'1px solid rgba(200,168,255,0.12)',borderRadius:'12px',padding:'16px',marginBottom:'20px'}}>
                <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',marginBottom:'10px'}}>✦ Your Soul Blueprint ✦</p>
                <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.6)',lineHeight:1.8,margin:0}}>
                  ☉ Sun Sign: <span style={{color:'#C8A8FF'}}>{form.birthDate ? getSunSign(form.birthDate) : '...'}</span><br/>
                  🗓 Born: <span style={{color:'#C8A8FF'}}>{form.birthDate || '...'}</span><br/>
                  🕐 Time: <span style={{color:'#C8A8FF'}}>{form.birthTime || '...'}</span><br/>
                  📍 Place: <span style={{color:'#C8A8FF'}}>{form.birthCity||'...'}{form.birthCountry?`, ${form.birthCountry}`:''}</span>
                </p>
              </div>

              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(1)} style={{flex:1,padding:'15px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>← Back</button>
                <button
                  onClick={save}
                  disabled={loading||!form.birthCity}
                  style={{flex:2,padding:'15px',background:'linear-gradient(135deg,rgba(138,90,255,0.4),rgba(100,60,200,0.3))',border:'1px solid rgba(200,168,255,0.4)',borderRadius:'12px',fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'#E8E0FF',cursor:'pointer'}}
                >
                  {loading?'Reading the stars...':'Reveal My Chart ✦'}
                </button>
              </div>
            </div>
          )}
        </div>

        <p onClick={()=>router.push('/dashboard')} style={{textAlign:'center',marginTop:'20px',fontSize:'12px',letterSpacing:'3px',color:'rgba(200,168,255,0.35)',cursor:'pointer',fontStyle:'italic'}}>
          ← Skip for now
        </p>
      </div>
    </main>
  )
}
