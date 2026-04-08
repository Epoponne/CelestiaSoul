'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSubscription } from '../../lib/useSubscription'

export default function Tarot() {
  const router = useRouter()
  const star = '\u2726'
  const { isPaid, loading: subLoading } = useSubscription()
  const [card, setCard] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const cards = [
    {name:'The Fool',number:'0',element:'Air',keywords:'New beginnings, innocence, adventure',upright:'A new journey awaits you. The universe is inviting you to take a leap of faith. Trust in the divine timing of your soul\'s path and embrace the unknown with childlike wonder.',reversed:'You may be acting impulsively or avoiding a necessary leap. Ground yourself before moving forward.',emoji:'🌟'},
    {name:'The Magician',number:'I',element:'Fire',keywords:'Manifestation, willpower, skill',upright:'You have all the tools you need to manifest your desires. Your willpower is at its peak. Channel your energy with focused intention and watch the universe respond to your cosmic power.',reversed:'You may be misusing your gifts or feeling blocked in your manifestation abilities.',emoji:'✨'},
    {name:'The High Priestess',number:'II',element:'Water',keywords:'Intuition, mystery, inner knowing',upright:'Your intuition is your greatest guide right now. The answers you seek lie within. Sit in stillness, trust your inner voice and allow the cosmic wisdom to flow through you.',reversed:'You may be ignoring your intuition or blocking your psychic abilities.',emoji:'🌙'},
    {name:'The Empress',number:'III',element:'Earth',keywords:'Abundance, nurturing, fertility',upright:'You are surrounded by divine abundance. Nature and creativity flow through you. This is a time of growth, nurturing and allowing yourself to receive the universe\'s blessings.',reversed:'Creative blocks or feelings of unworthiness may be limiting your abundance.',emoji:'🌿'},
    {name:'The Emperor',number:'IV',element:'Fire',keywords:'Authority, structure, stability',upright:'It is time to establish order and take charge of your life. Your inner strength and authority are your greatest assets. Build the foundation that will support your highest vision.',reversed:'You may be too rigid or struggling with authority figures in your life.',emoji:'👑'},
    {name:'The Hierophant',number:'V',element:'Earth',keywords:'Tradition, spiritual wisdom, guidance',upright:'Seek wisdom from spiritual teachers or sacred traditions. There is profound knowledge available to you through established systems. Honor the wisdom of those who came before.',reversed:'You may be questioning traditional beliefs or feeling constrained by dogma.',emoji:'🏛️'},
    {name:'The Lovers',number:'VI',element:'Air',keywords:'Love, harmony, choices',upright:'A significant choice about love or values lies before you. Your heart knows the answer. Trust in the sacred connection between souls and choose with love as your guide.',reversed:'Disharmony in relationships or difficulty making an important decision.',emoji:'💕'},
    {name:'The Chariot',number:'VII',element:'Water',keywords:'Victory, determination, control',upright:'Victory is yours through focused determination. You have the power to overcome any obstacle. Harness your willpower and charge forward with unwavering confidence.',reversed:'Aggression, lack of control or feeling pulled in too many directions.',emoji:'⚡'},
    {name:'Strength',number:'VIII',element:'Fire',keywords:'Courage, patience, inner strength',upright:'True strength comes from gentleness and love. You have the inner power to face any challenge with grace. Trust in your courage and know that compassion is your greatest weapon.',reversed:'Self-doubt or using force when gentleness is needed.',emoji:'🦁'},
    {name:'The Hermit',number:'IX',element:'Earth',keywords:'Solitude, introspection, guidance',upright:'A period of solitude and inner reflection will illuminate your path. Withdraw from the noise of the world and listen to the wisdom of your soul. Your inner light will guide others.',reversed:'Isolation, loneliness or refusing the help of others.',emoji:'🕯️'},
    {name:'Wheel of Fortune',number:'X',element:'Fire',keywords:'Change, cycles, destiny',upright:'The wheel of fate is turning in your favor. A major shift is coming that will elevate your life. Embrace the cycles of change and trust that the universe is orchestrating your highest good.',reversed:'Bad luck, resistance to change or feeling like a victim of circumstance.',emoji:'🎡'},
    {name:'Justice',number:'XI',element:'Air',keywords:'Truth, fairness, law',upright:'Truth and fairness prevail. The universe is bringing balance to your situation. Act with integrity in all things and trust that what is right will ultimately be revealed.',reversed:'Dishonesty, unfairness or avoiding accountability for your actions.',emoji:'⚖️'},
    {name:'The Hanged Man',number:'XII',element:'Water',keywords:'Surrender, new perspective, pause',upright:'Surrender to what is and gain a new perspective. This is not the time to force outcomes. Release control and trust that this pause is preparing you for something greater.',reversed:'Resistance to necessary change or feeling stuck and martyred.',emoji:'🌀'},
    {name:'Death',number:'XIII',element:'Water',keywords:'Transformation, endings, rebirth',upright:'A powerful transformation is underway. Something must end so something beautiful can begin. Embrace this sacred rebirth and trust that the universe is clearing space for your highest self.',reversed:'Resistance to change or inability to move on from the past.',emoji:'🦋'},
    {name:'Temperance',number:'XIV',element:'Fire',keywords:'Balance, patience, moderation',upright:'Divine balance and patience are called for now. You are being asked to flow with grace between extremes. Trust in the sacred alchemy that is happening within you.',reversed:'Imbalance, excess or lack of long-term vision.',emoji:'🌈'},
    {name:'The Devil',number:'XV',element:'Earth',keywords:'Bondage, materialism, shadow self',upright:'You are being called to examine what binds you. The chains you feel are often of your own making. Face your shadow with compassion and reclaim your sacred freedom.',reversed:'Releasing limiting beliefs or breaking free from unhealthy patterns.',emoji:'🔓'},
    {name:'The Tower',number:'XVI',element:'Fire',keywords:'Sudden change, upheaval, revelation',upright:'A sudden awakening is shattering old structures that no longer serve you. Though this feels chaotic, the universe is clearing the path to your truth. Trust the divine disruption.',reversed:'Avoiding necessary change or a crisis that has been building slowly.',emoji:'⚡'},
    {name:'The Star',number:'XVII',element:'Air',keywords:'Hope, inspiration, serenity',upright:'Hope and healing are flowing into your life. The universe is pouring its blessings upon you. This is a time of renewal, inspiration and deep trust in the divine plan for your soul.',reversed:'Discouragement or loss of faith in the universe\'s plan.',emoji:'⭐'},
    {name:'The Moon',number:'XVIII',element:'Water',keywords:'Illusion, fear, the subconscious',upright:'Trust your intuition through the confusion. Not everything is as it appears. Look beyond illusions and fear to the deeper truth that your soul already knows.',reversed:'Releasing fear or confusion beginning to clear.',emoji:'🌕'},
    {name:'The Sun',number:'XIX',element:'Fire',keywords:'Joy, success, vitality',upright:'Radiant joy and success are flooding your life. The universe is celebrating you. Step into your full light with confidence and allow your authentic self to shine for all to see.',reversed:'Temporary setbacks or difficulty finding joy in the present moment.',emoji:'☀️'},
    {name:'Judgement',number:'XX',element:'Fire',keywords:'Rebirth, inner calling, absolution',upright:'A powerful spiritual awakening is calling you to rise. Release the past and answer the call of your highest self. You are being reborn into your true divine purpose.',reversed:'Self-doubt, refusing the call or fear of change.',emoji:'🎺'},
    {name:'The World',number:'XXI',element:'Earth',keywords:'Completion, integration, accomplishment',upright:'You have reached a magnificent completion. Celebrate how far you have come on your sacred journey. Integration and wholeness are yours as you prepare for the next beautiful cycle.',reversed:'Incomplete goals or lack of closure.',emoji:'🌍'},
  ]

  const drawCard = async () => {
    if (!isPaid) {
      router.push('/pricing')
      return
    }
    setLoading(true)
    setFlipped(false)
    setCard(null)
    await new Promise(r => setTimeout(r, 1200))
    const randomCard = cards[Math.floor(Math.random() * cards.length)]
    const isReversed = Math.random() > 0.7
    setCard({...randomCard, reversed: isReversed})
    setLoading(false)
    setTimeout(() => setFlipped(true), 100)
  }

  const navItems = [
    {label:'Home', route:'/dashboard', emoji:'🏠'},
    {label:'Breathe', route:'/breathing', emoji:'🌬️'},
    {label:'Music', route:'/music', emoji:'🎵'},
    {label:'Reading', route:'/reading', emoji:'🔮'},
    {label:'Journal', route:'/journal', emoji:'📓'},
  ]

  return (
    <main style={{minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif',position:'relative'}}>
      <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',backgroundImage:'url(/tarot-bg.jpg)',backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:'no-repeat',zIndex:0}}/>
      <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',background:'rgba(6,5,14,0.75)',zIndex:1}}/>

      <div style={{position:'relative',zIndex:2,maxWidth:'680px',margin:'0 auto',padding:'0 18px 100px'}}>

        <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo.png" alt="CelestiaSOUL" style={{width:'56px',height:'56px',borderRadius:'50%',objectFit:'cover',boxShadow:'0 0 16px rgba(200,168,255,0.5)',border:'1px solid rgba(200,168,255,0.25)'}}/>
            <span style={{fontStyle:'italic',fontSize:'20px',letterSpacing:'3px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>CelestiaSOUL</span>
          </div>
          <button onClick={()=>router.push('/dashboard')} style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',cursor:'pointer',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'6px 16px',background:'rgba(6,5,14,0.5)'}}>Dashboard</button>
        </nav>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.7)',marginBottom:'8px',textShadow:'0 0 20px rgba(200,168,255,0.5)'}}>{star} SACRED TAROT {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Daily Tarot Pull</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.6)',letterSpacing:'2px'}}>Draw your card for today's cosmic guidance</p>
        </div>

        {!isPaid && !subLoading && (
          <div onClick={()=>router.push('/pricing')} style={{background:'rgba(6,5,14,0.7)',border:'1px solid rgba(200,168,255,0.25)',borderRadius:'16px',padding:'20px',marginBottom:'24px',textAlign:'center',cursor:'pointer',backdropFilter:'blur(10px)'}}>
            <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#C8A8FF',marginBottom:'4px'}}>{star} Sacred Members Only {star}</p>
            <p style={{fontFamily:'sans-serif',fontSize:'11px',color:'rgba(255,214,160,0.6)',letterSpacing:'2px'}}>Unlock daily tarot readings · $10/month · 3-day free trial</p>
          </div>
        )}

        <div style={{display:'flex',justifyContent:'center',marginBottom:'32px'}}>
          <div style={{width:'200px',height:'340px',position:'relative',cursor:'pointer'}} onClick={drawCard}>
            {!card && !loading && (
              <div style={{width:'100%',height:'100%',background:'rgba(20,10,60,0.8)',border:'2px solid rgba(200,168,255,0.4)',borderRadius:'16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',boxShadow:'0 0 40px rgba(138,90,255,0.5)',backdropFilter:'blur(10px)'}}>
                <div style={{fontSize:'48px',marginBottom:'16px'}}>🔮</div>
                <p style={{fontStyle:'italic',fontSize:'14px',letterSpacing:'3px',color:'#C8A8FF',textAlign:'center',padding:'0 16px'}}>Tap to draw your card</p>
                <p style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.4)',marginTop:'8px',letterSpacing:'2px'}}>for {new Date().toLocaleDateString('en-US',{month:'long',day:'numeric'})}</p>
              </div>
            )}
            {loading && (
              <div style={{width:'100%',height:'100%',background:'rgba(20,10,60,0.8)',border:'2px solid rgba(200,168,255,0.4)',borderRadius:'16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',boxShadow:'0 0 60px rgba(138,90,255,0.7)',backdropFilter:'blur(10px)'}}>
                <div style={{fontSize:'48px',marginBottom:'16px',display:'inline-block',animation:'spin 1s linear infinite'}}>✨</div>
                <p style={{fontStyle:'italic',fontSize:'13px',letterSpacing:'3px',color:'#C8A8FF'}}>The cosmos speaks...</p>
              </div>
            )}
            {card && flipped && (
              <div style={{width:'100%',height:'100%',background:'rgba(20,10,60,0.85)',border:'2px solid rgba(200,168,255,0.5)',borderRadius:'16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',boxShadow:'0 0 50px rgba(138,90,255,0.6)',backdropFilter:'blur(10px)',transform:card.reversed?'rotate(180deg)':'rotate(0deg)'}}>
                <div style={{fontSize:'64px',marginBottom:'12px',transform:card.reversed?'rotate(180deg)':'rotate(0deg)'}}>{card.emoji}</div>
                <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'2px',color:'rgba(200,168,255,0.6)',transform:card.reversed?'rotate(180deg)':'rotate(0deg)',textAlign:'center'}}>{card.number}</p>
                <p style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'2px',color:'#E8E0FF',transform:card.reversed?'rotate(180deg)':'rotate(0deg)',textAlign:'center',padding:'0 12px'}}>{card.name}</p>
                {card.reversed && <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'2px',color:'rgba(255,150,100,0.7)',transform:'rotate(180deg)',marginTop:'4px'}}>REVERSED</p>}
              </div>
            )}
          </div>
        </div>

        {card && flipped && (
          <div>
            <div style={{background:'rgba(6,5,14,0.8)',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'20px',padding:'24px',marginBottom:'16px',backdropFilter:'blur(10px)'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
                <div>
                  <p style={{fontStyle:'italic',fontSize:'24px',letterSpacing:'3px',color:'#E8E0FF',marginBottom:'4px'}}>{card.name}</p>
                  <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)'}}>{card.number} · {card.element} · {card.reversed?'REVERSED':'UPRIGHT'}</p>
                </div>
                <div style={{fontSize:'40px'}}>{card.emoji}</div>
              </div>
              <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'10px',padding:'12px',marginBottom:'16px'}}>
                <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'6px'}}>KEYWORDS</p>
                <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(200,168,255,0.6)'}}>{card.keywords}</p>
              </div>
              <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'10px'}}>{card.reversed?'REVERSED MEANING':'YOUR MESSAGE TODAY'}</p>
              <p style={{fontStyle:'italic',fontSize:'15px',color:'rgba(220,210,255,0.8)',lineHeight:1.9,margin:0}}>{card.reversed?card.reversed:card.upright}</p>
            </div>

            <button onClick={drawCard} style={{width:'100%',padding:'14px',background:'rgba(6,5,14,0.7)',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'14px',letterSpacing:'4px',color:'rgba(200,168,255,0.5)',cursor:'pointer',marginBottom:'16px',backdropFilter:'blur(10px)'}}>
              {star} Draw Another Card {star}
            </button>

            <div style={{background:'rgba(6,5,14,0.7)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'14px',padding:'16px',textAlign:'center',backdropFilter:'blur(10px)'}}>
              <p style={{fontStyle:'italic',fontSize:'11px',letterSpacing:'4px',color:'rgba(200,168,255,0.35)',marginBottom:'8px'}}>{star} Journal This Reading {star}</p>
              <p style={{fontFamily:'sans-serif',fontSize:'12px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>Reflect on your card's message in your soul journal</p>
              <button onClick={()=>router.push('/journal')} style={{padding:'8px 24px',background:'rgba(138,90,255,0.3)',border:'1px solid rgba(200,168,255,0.3)',borderRadius:'20px',fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'#C8A8FF',cursor:'pointer'}}>Open Journal</button>
            </div>
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

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </main>
  )
}