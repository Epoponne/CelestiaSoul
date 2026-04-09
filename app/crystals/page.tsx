'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Crystals() {
  const router = useRouter()
  const star = '\u2726'
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState('all')

  const crystals = [
    {name:'Amethyst',color:'#9B59B6',bg:'rgba(155,89,182,0.15)',border:'rgba(155,89,182,0.4)',emoji:'💜',element:'Air',chakra:'Crown & Third Eye',intention:'Protection, Intuition, Peace',description:'Amethyst is the stone of spiritual wisdom and divine connection. It opens your third eye and crown chakra, enhancing intuition and psychic abilities. Place it under your pillow for vivid dreams or meditate with it to deepen spiritual practice.',healing:'Calms anxiety and stress, promotes restful sleep, enhances meditation and spiritual growth, protects against negative energy.',affirmation:'"I am connected to divine wisdom. My intuition guides me perfectly."',category:'spiritual'},
    {name:'Rose Quartz',color:'#FF82B4',bg:'rgba(255,130,180,0.15)',border:'rgba(255,130,180,0.4)',emoji:'🌸',element:'Water',chakra:'Heart',intention:'Love, Compassion, Self-Love',description:'Rose Quartz is the ultimate stone of unconditional love. It opens the heart chakra to all forms of love — romantic love, self-love, family love and friendship. It carries a gentle feminine energy of compassion and peace.',healing:'Heals emotional wounds, attracts love, encourages self-forgiveness, brings peace and warmth to relationships.',affirmation:'"I am worthy of infinite love. My heart is open and radiant."',category:'love'},
    {name:'Clear Quartz',color:'#E8E0FF',bg:'rgba(232,224,255,0.15)',border:'rgba(232,224,255,0.4)',emoji:'🔮',element:'All',chakra:'All Chakras',intention:'Clarity, Amplification, Healing',description:'Clear Quartz is the master healer and amplifier of all crystals. It brings clarity of mind and amplifies the energy of all other crystals. Use it to set powerful intentions or to clear mental fog and confusion.',healing:'Amplifies energy and intentions, brings mental clarity, enhances spiritual connection, purifies and balances all chakras.',affirmation:'"My mind is clear. My intentions are powerful and pure."',category:'healing'},
    {name:'Black Tourmaline',color:'#A0A0C0',bg:'rgba(74,74,106,0.2)',border:'rgba(120,120,160,0.4)',emoji:'🖤',element:'Earth',chakra:'Root',intention:'Protection, Grounding, Purification',description:'Black Tourmaline is the most powerful protective crystal in the mineral kingdom. It creates an energetic shield around your aura, deflecting negative energies and psychic attacks. Ground yourself with this powerful stone.',healing:'Protects against negative energy, grounds scattered energy, purifies the aura, reduces anxiety and fear.',affirmation:'"I am protected, grounded and safe in my own sacred energy."',category:'protection'},
    {name:'Citrine',color:'#FFD43B',bg:'rgba(255,212,59,0.15)',border:'rgba(255,212,59,0.4)',emoji:'✨',element:'Fire',chakra:'Solar Plexus',intention:'Abundance, Joy, Confidence',description:'Citrine is the stone of abundance and manifestation. Known as the merchant stone, it attracts wealth, prosperity and success. Its warm golden energy brings joy and confidence to all who work with it.',healing:'Attracts abundance and prosperity, boosts confidence and motivation, brings joy and positivity, energizes the solar plexus.',affirmation:'"I am magnetic to abundance. Prosperity flows to me effortlessly."',category:'abundance'},
    {name:'Lapis Lazuli',color:'#74C0FC',bg:'rgba(31,78,121,0.2)',border:'rgba(74,144,226,0.4)',emoji:'💙',element:'Water',chakra:'Third Eye & Throat',intention:'Truth, Wisdom, Communication',description:'Lapis Lazuli has been revered since ancient times as the stone of truth and enlightenment. It stimulates the desire for knowledge and wisdom, enhancing intellectual ability and the power of truthful communication.',healing:'Enhances intellectual ability, promotes honesty and truth, opens third eye chakra, stimulates wisdom and clarity.',affirmation:'"I speak my truth with confidence. Wisdom flows through me."',category:'spiritual'},
    {name:'Green Aventurine',color:'#69DB7C',bg:'rgba(105,219,124,0.15)',border:'rgba(105,219,124,0.4)',emoji:'💚',element:'Earth',chakra:'Heart',intention:'Luck, Opportunity, Growth',description:'Green Aventurine is the stone of opportunity and good fortune. It is considered the luckiest of all crystals, especially for manifesting prosperity and wealth. It soothes emotional wounds while opening the heart to new possibilities.',healing:'Attracts luck and opportunity, promotes emotional healing, encourages optimism and perseverance, supports heart health.',affirmation:'"I am open to all the beautiful opportunities the universe brings me."',category:'abundance'},
    {name:'Moonstone',color:'#C8E0FF',bg:'rgba(200,224,255,0.15)',border:'rgba(200,224,255,0.4)',emoji:'🌙',element:'Water',chakra:'Crown & Third Eye',intention:'Intuition, New Beginnings, Feminine Energy',description:'Moonstone is the stone of new beginnings and inner growth. It is strongly connected to the moon and intuition. This magical stone helps you embrace your feminine energy, trust your intuition and flow with the cycles of life.',healing:'Enhances intuition and psychic gifts, supports new beginnings, balances emotions, connects to lunar energy.',affirmation:'"I flow with the cycles of life. My intuition is my greatest gift."',category:'spiritual'},
    {name:'Obsidian',color:'#C0C0E0',bg:'rgba(45,45,45,0.3)',border:'rgba(120,120,180,0.4)',emoji:'🌑',element:'Earth',chakra:'Root',intention:'Protection, Shadow Work, Truth',description:'Obsidian is a powerful protective stone that shields against negativity while helping you face your shadow self with courage. It brings hidden truths to the surface and helps you release deeply buried emotional wounds.',healing:'Provides powerful psychic protection, helps with shadow work, releases trauma, grounds and centers scattered energy.',affirmation:'"I face my shadows with courage. I am free from all that no longer serves me."',category:'protection'},
    {name:'Selenite',color:'#F0F0FF',bg:'rgba(240,240,255,0.1)',border:'rgba(240,240,255,0.3)',emoji:'🤍',element:'Air',chakra:'Crown',intention:'Cleansing, Clarity, Divine Connection',description:'Selenite is one of the few crystals that never needs cleansing — it continuously cleanses itself and everything around it. Named after the Greek moon goddess Selene, it carries an angelic energy that elevates your spiritual practice.',healing:'Cleanses and charges other crystals, connects to higher guidance, brings mental clarity, creates peaceful energy.',affirmation:'"I am connected to the divine light. My soul is pure and radiant."',category:'healing'},
    {name:'Carnelian',color:'#FF6B35',bg:'rgba(255,107,53,0.15)',border:'rgba(255,107,53,0.4)',emoji:'🔶',element:'Fire',chakra:'Sacral & Root',intention:'Courage, Creativity, Passion',description:'Carnelian is the stone of courage, creativity and passion. It awakens your sacral chakra, igniting your creative fire and sexual energy. This vibrant stone gives you the courage to take action on your dreams.',healing:'Boosts courage and confidence, ignites creativity and passion, motivates action, increases physical energy.',affirmation:'"I am bold, creative and passionate. I take inspired action every day."',category:'abundance'},
    {name:'Labradorite',color:'#74C0FC',bg:'rgba(116,192,252,0.15)',border:'rgba(116,192,252,0.4)',emoji:'🔵',element:'Water',chakra:'Third Eye',intention:'Magic, Transformation, Mysticism',description:'Labradorite is the stone of magic and transformation. Known as the Aurora Borealis of gemstones for its mystical play of color, it awakens your magical abilities and protects your aura while you do spiritual work.',healing:'Awakens magical and psychic abilities, protects the aura, enhances intuition, supports transformation and change.',affirmation:'"I am a magical being. The universe reveals its mysteries to me."',category:'spiritual'},
  ]

  const categories = [
    {id:'all',label:'All',emoji:'✨'},
    {id:'love',label:'Love',emoji:'💕'},
    {id:'protection',label:'Protection',emoji:'🛡️'},
    {id:'abundance',label:'Abundance',emoji:'💰'},
    {id:'healing',label:'Healing',emoji:'🌿'},
    {id:'spiritual',label:'Spiritual',emoji:'🌙'},
  ]

  const filtered = filter === 'all' ? crystals : crystals.filter(c => c.category === filter)

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
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} SACRED CRYSTALS {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Crystal Healing</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>Discover your sacred healing stones</p>
        </div>

        <div style={{display:'flex',gap:'8px',marginBottom:'24px',flexWrap:'wrap'}}>
          {categories.map(c=>(
            <div key={c.id} onClick={()=>{setFilter(c.id);setSelected(null)}} style={{padding:'8px 16px',borderRadius:'20px',cursor:'pointer',fontFamily:'sans-serif',fontSize:'11px',letterSpacing:'2px',background:filter===c.id?'rgba(138,90,255,0.3)':'rgba(255,255,255,0.03)',border:`1px solid ${filter===c.id?'rgba(200,168,255,0.5)':'rgba(200,168,255,0.1)'}`,color:filter===c.id?'#E8E0FF':'rgba(200,168,255,0.4)'}}>
              {c.emoji} {c.label}
            </div>
          ))}
        </div>

        {selected && (
          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.12),rgba(40,20,100,0.2))',border:`2px solid ${selected.border}`,borderRadius:'20px',padding:'28px',marginBottom:'24px',boxShadow:`0 0 30px ${selected.bg}`}}>
            <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'20px'}}>
              <div style={{width:'70px',height:'70px',borderRadius:'50%',background:selected.bg,border:`2px solid ${selected.color}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'36px',boxShadow:`0 0 20px ${selected.bg}`,flexShrink:0}}>
                {selected.emoji}
              </div>
              <div>
                <h2 style={{fontStyle:'italic',fontSize:'24px',letterSpacing:'3px',color:selected.color,margin:'0 0 4px'}}>{selected.name}</h2>
                <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',margin:0}}>{selected.element} · {selected.chakra}</p>
              </div>
            </div>
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'12px',padding:'14px',marginBottom:'14px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'6px'}}>INTENTION</p>
              <p style={{fontStyle:'italic',fontSize:'13px',color:selected.color}}>{selected.intention}</p>
            </div>
            <p style={{fontStyle:'italic',fontSize:'14px',color:'rgba(220,210,255,0.75)',lineHeight:1.9,marginBottom:'14px'}}>{selected.description}</p>
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'12px',padding:'14px',marginBottom:'14px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'6px'}}>HEALING PROPERTIES</p>
              <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(220,210,255,0.7)',lineHeight:1.8}}>{selected.healing}</p>
            </div>
            <div style={{background:selected.bg,border:`1px solid ${selected.border}`,borderRadius:'12px',padding:'14px',textAlign:'center'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',marginBottom:'8px'}}>CRYSTAL AFFIRMATION</p>
              <p style={{fontStyle:'italic',fontSize:'15px',color:selected.color,lineHeight:1.8}}>{selected.affirmation}</p>
            </div>
            <button onClick={()=>setSelected(null)} style={{width:'100%',marginTop:'16px',padding:'10px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'13px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>
              Close {star}
            </button>
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>
          {filtered.map(c=>(
            <div key={c.name} onClick={()=>setSelected(selected?.name===c.name?null:c)} style={{background:c.bg,border:`1px solid ${selected?.name===c.name?c.color:c.border}`,borderRadius:'16px',padding:'20px 12px',textAlign:'center',cursor:'pointer',transition:'all 0.2s',boxShadow:selected?.name===c.name?`0 0 20px ${c.bg}`:'none',transform:selected?.name===c.name?'scale(1.02)':'scale(1)'}}>
              <div style={{fontSize:'36px',marginBottom:'10px',filter:`drop-shadow(0 0 8px ${c.color})`}}>{c.emoji}</div>
              <div style={{fontStyle:'italic',fontSize:'14px',color:c.color,marginBottom:'4px'}}>{c.name}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'9px',color:'rgba(200,168,255,0.45)',letterSpacing:'1px',marginBottom:'6px'}}>{c.chakra}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'9px',color:'rgba(200,168,255,0.35)',lineHeight:1.5}}>{c.intention}</div>
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
