'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSubscription } from '../../lib/useSubscription'

export default function Chakras() {
  const router = useRouter()
  const star = '\u2726'
  const { isPaid, loading: subLoading } = useSubscription()
  const [selected, setSelected] = useState<any>(null)

  const chakras = [
    {
      name:'Root Chakra',sanskrit:'Muladhara',number:1,color:'#FF4444',bg:'rgba(255,68,68,0.15)',border:'rgba(255,68,68,0.4)',emoji:'🔴',location:'Base of spine',element:'Earth',frequency:'396 Hz',keywords:'Safety, Security, Grounding',balanced:'You feel safe, secure and grounded. You have a strong foundation and trust in life.',blocked:'Anxiety, fear, financial stress, feeling disconnected from your body.',affirmation:'"I am safe. I am grounded. I am supported by the earth beneath me."',practices:'Walking barefoot on earth, eating root vegetables, wearing red, working with black tourmaline or hematite.',breathwork:'Solar Fire — 6 count inhale and exhale to ground your energy.',
    },
    {
      name:'Sacral Chakra',sanskrit:'Svadhisthana',number:2,color:'#FF8C00',bg:'rgba(255,140,0,0.15)',border:'rgba(255,140,0,0.4)',emoji:'🟠',location:'Below the navel',element:'Water',frequency:'417 Hz',keywords:'Creativity, Pleasure, Emotion',balanced:'You feel creative, passionate and emotionally fluid. You embrace pleasure and joy.',blocked:'Creative blocks, emotional numbness, guilt, low libido, fear of change.',affirmation:'"I embrace my creativity and passion. I allow pleasure and joy into my life."',practices:'Dancing, swimming, creative expression, wearing orange, working with carnelian.',breathwork:'4-7-8 Lunar — connects with water element to flow emotions.',
    },
    {
      name:'Solar Plexus',sanskrit:'Manipura',number:3,color:'#FFD700',bg:'rgba(255,215,0,0.15)',border:'rgba(255,215,0,0.4)',emoji:'🟡',location:'Above the navel',element:'Fire',frequency:'528 Hz',keywords:'Power, Confidence, Will',balanced:'You feel confident, powerful and in control of your life. You know your worth.',blocked:'Low self-esteem, powerlessness, victim mentality, digestive issues.',affirmation:'"I am powerful. I am confident. I stand in my full divine power."',practices:'Core exercises, sunbathing, wearing yellow, working with citrine or tiger\'s eye.',breathwork:'Cosmos Deep — 8 count breathing to ignite inner fire.',
    },
    {
      name:'Heart Chakra',sanskrit:'Anahata',number:4,color:'#00C851',bg:'rgba(0,200,81,0.15)',border:'rgba(0,200,81,0.4)',emoji:'💚',location:'Center of chest',element:'Air',frequency:'639 Hz',keywords:'Love, Compassion, Connection',balanced:'You give and receive love freely. You have deep compassion for yourself and others.',blocked:'Grief, loneliness, inability to forgive, fear of intimacy, codependency.',affirmation:'"My heart is open. I give and receive love freely and abundantly."',practices:'Heart-opening yoga poses, spending time in nature, wearing green, working with rose quartz.',breathwork:'Crystal Heart — 3-3-6-3 breathing to open the heart.',
    },
    {
      name:'Throat Chakra',sanskrit:'Vishuddha',number:5,color:'#00B4D8',bg:'rgba(0,180,216,0.15)',border:'rgba(0,180,216,0.4)',emoji:'🔵',location:'Throat',element:'Sound',frequency:'741 Hz',keywords:'Truth, Expression, Communication',balanced:'You speak your truth clearly and confidently. You express yourself authentically.',blocked:'Fear of speaking, lying, difficulty expressing feelings, thyroid issues.',affirmation:'"I speak my truth with clarity and confidence. My voice matters."',practices:'Singing, chanting, journaling, wearing blue, working with lapis lazuli or blue kyanite.',breathwork:'Box Sacred — 4-4-4-4 breathing for balanced communication.',
    },
    {
      name:'Third Eye',sanskrit:'Ajna',number:6,color:'#6A0DAD',bg:'rgba(106,13,173,0.15)',border:'rgba(106,13,173,0.4)',emoji:'👁️',location:'Between the eyebrows',element:'Light',frequency:'852 Hz',keywords:'Intuition, Vision, Wisdom',balanced:'You have clear intuition and insight. You trust your inner knowing and see beyond illusions.',blocked:'Confusion, inability to trust intuition, headaches, overthinking.',affirmation:'"My third eye is open. I trust my intuition and inner vision completely."',practices:'Meditation, stargazing, wearing indigo, working with amethyst or labradorite.',breathwork:'Earth Root — 5-2-7 breathing for deep intuitive clarity.',
    },
    {
      name:'Crown Chakra',sanskrit:'Sahasrara',number:7,color:'#9B59B6',bg:'rgba(155,89,182,0.15)',border:'rgba(155,89,182,0.4)',emoji:'👑',location:'Top of the head',element:'Consciousness',frequency:'963 Hz',keywords:'Spirituality, Connection, Enlightenment',balanced:'You feel deeply connected to the divine and universal consciousness. You experience spiritual bliss.',blocked:'Disconnection from spirituality, closed-mindedness, depression, lack of purpose.',affirmation:'"I am one with the divine. I am connected to infinite wisdom and cosmic love."',practices:'Meditation, prayer, silence, wearing violet or white, working with clear quartz or selenite.',breathwork:'4-7-8 Lunar — deep breathing to elevate consciousness.',
    },
  ]

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
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} ENERGY CENTERS {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Chakra Guide</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>Align your sacred energy centers</p>
        </div>

        {!isPaid && !subLoading && (
          <div onClick={()=>router.push('/pricing')} style={{background:'linear-gradient(135deg,rgba(138,90,255,0.2),rgba(255,214,160,0.08))',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'16px',padding:'20px',marginBottom:'24px',textAlign:'center',cursor:'pointer'}}>
            <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'4px'}}>{star} Sacred Members Only {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.6)',letterSpacing:'2px'}}>Unlock chakra alignment guide · $10/month · 3-day free trial</p>
          </div>
        )}

        <div style={{display:'flex',gap:'8px',marginBottom:'24px',justifyContent:'center'}}>
          {chakras.map((c,i)=>(
            <div key={c.name} onClick={()=>setSelected(selected?.name===c.name?null:c)} style={{width:'36px',height:'36px',borderRadius:'50%',background:selected?.name===c.name?c.bg:'rgba(255,255,255,0.05)',border:`2px solid ${selected?.name===c.name?c.color:'rgba(200,168,255,0.15)'}`,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:'16px',boxShadow:selected?.name===c.name?`0 0 12px ${c.color}`:'none',transition:'all 0.2s'}}>
              {c.emoji}
            </div>
          ))}
        </div>

        {selected && (
          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.08),rgba(6,5,14,0.95))',border:`2px solid ${selected.border}`,borderRadius:'24px',padding:'28px',marginBottom:'24px',boxShadow:`0 0 40px ${selected.bg}`}}>
            <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'20px'}}>
              <div style={{width:'72px',height:'72px',borderRadius:'50%',background:selected.bg,border:`3px solid ${selected.color}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'36px',boxShadow:`0 0 24px ${selected.bg}`,flexShrink:0}}>
                {selected.emoji}
              </div>
              <div>
                <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',margin:'0 0 4px'}}>CHAKRA {selected.number}</p>
                <h2 style={{fontStyle:'italic',fontSize:'22px',letterSpacing:'3px',color:selected.color,margin:'0 0 2px'}}>{selected.name}</h2>
                <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.4)',margin:0,letterSpacing:'2px'}}>{selected.sanskrit} · {selected.location}</p>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',marginBottom:'16px'}}>
              {[
                {label:'Element',value:selected.element},
                {label:'Frequency',value:selected.frequency},
                {label:'Keywords',value:selected.keywords.split(',')[0]},
              ].map(({label,value})=>(
                <div key={label} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'10px',padding:'10px',textAlign:'center'}}>
                  <p style={{fontFamily:'sans-serif',fontSize:'8px',letterSpacing:'2px',color:'rgba(200,168,255,0.4)',marginBottom:'4px'}}>{label.toUpperCase()}</p>
                  <p style={{fontStyle:'italic',fontSize:'12px',color:selected.color,margin:0}}>{value}</p>
                </div>
              ))}
            </div>

            <div style={{background:'rgba(100,220,130,0.06)',border:'1px solid rgba(100,220,130,0.2)',borderRadius:'12px',padding:'14px',marginBottom:'12px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'3px',color:'rgba(100,220,130,0.6)',marginBottom:'6px'}}>WHEN BALANCED</p>
              <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(220,255,230,0.75)',lineHeight:1.8,margin:0}}>{selected.balanced}</p>
            </div>

            <div style={{background:'rgba(255,100,100,0.06)',border:'1px solid rgba(255,100,100,0.2)',borderRadius:'12px',padding:'14px',marginBottom:'12px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'3px',color:'rgba(255,100,100,0.6)',marginBottom:'6px'}}>WHEN BLOCKED</p>
              <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(255,220,220,0.7)',lineHeight:1.8,margin:0}}>{selected.blocked}</p>
            </div>

            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'12px',padding:'14px',marginBottom:'12px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'6px'}}>HEALING PRACTICES</p>
              <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(220,210,255,0.7)',lineHeight:1.8,margin:0}}>{selected.practices}</p>
            </div>

            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'12px',padding:'14px',marginBottom:'12px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'6px'}}>RECOMMENDED BREATHWORK</p>
              <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(220,210,255,0.7)',lineHeight:1.8,margin:0}}>{selected.breathwork}</p>
              <button onClick={()=>router.push('/breathing')} style={{marginTop:'10px',padding:'6px 16px',background:'rgba(138,90,255,0.2)',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',fontStyle:'italic',fontSize:'11px',letterSpacing:'2px',color:'#C8A8FF',cursor:'pointer'}}>Begin Breathwork</button>
            </div>

            <div style={{background:selected.bg,border:`1px solid ${selected.border}`,borderRadius:'12px',padding:'16px',textAlign:'center',marginBottom:'12px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',marginBottom:'8px'}}>CHAKRA AFFIRMATION</p>
              <p style={{fontStyle:'italic',fontSize:'15px',color:selected.color,lineHeight:1.8,margin:0}}>{selected.affirmation}</p>
            </div>

            <div style={{display:'flex',gap:'8px'}}>
              <button onClick={()=>router.push(`/music?freq=${encodeURIComponent(selected.frequency)}`)} style={{flex:1,padding:'10px',background:'rgba(255,214,160,0.1)',border:'1px solid rgba(255,214,160,0.25)',borderRadius:'12px',fontStyle:'italic',fontSize:'12px',letterSpacing:'2px',color:'rgba(255,214,160,0.7)',cursor:'pointer'}}>Play {selected.frequency}</button>
              <button onClick={()=>setSelected(null)} style={{flex:1,padding:'10px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'12px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>Close</button>
            </div>
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {chakras.map((c)=>(
            <div key={c.name} onClick={()=>setSelected(selected?.name===c.name?null:c)} style={{background:selected?.name===c.name?c.bg:'rgba(255,255,255,0.025)',border:`1px solid ${selected?.name===c.name?c.border:'rgba(200,168,255,0.08)'}`,borderRadius:'16px',padding:'16px 20px',cursor:'pointer',display:'flex',alignItems:'center',gap:'16px',transition:'all 0.2s',boxShadow:selected?.name===c.name?`0 0 20px ${c.bg}`:'none'}}>
              <div style={{width:'48px',height:'48px',borderRadius:'50%',background:c.bg,border:`2px solid ${c.color}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',flexShrink:0,boxShadow:`0 0 12px ${c.bg}`}}>
                {c.emoji}
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3px'}}>
                  <span style={{fontStyle:'italic',fontSize:'16px',color:c.color}}>{c.name}</span>
                  <span style={{fontFamily:'sans-serif',fontSize:'9px',color:'rgba(200,168,255,0.35)',letterSpacing:'1px'}}>{c.sanskrit}</span>
                </div>
                <div style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(200,168,255,0.45)',letterSpacing:'1px'}}>{c.keywords}</div>
              </div>
              <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(255,214,160,0.5)',textAlign:'right',flexShrink:0}}>
                {c.frequency}<br/>
                <span style={{fontSize:'8px',opacity:0.6}}>{c.element}</span>
              </div>
            </div>
          ))}
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