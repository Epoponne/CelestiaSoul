'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Geometry() {
  const router = useRouter()
  const star = '\u2726'
  const [selected, setSelected] = useState<any>(null)

  const patterns = [
    {
      name:'Flower of Life',emoji:'⬡',color:'#C8A8FF',bg:'rgba(200,168,255,0.15)',border:'rgba(200,168,255,0.4)',
      meaning:'The Flower of Life is considered the most sacred pattern in existence. It contains the blueprint of all creation within its perfectly overlapping circles. Found in ancient temples across Egypt, China, India and Greece, it represents the interconnectedness of all life and the divine order underlying all of existence.',
      frequency:'528 Hz',chakra:'All Chakras',element:'All Elements',
      meditation:'Gaze softly at the Flower of Life and breathe deeply. Visualize yourself as one of the circles — complete and whole, yet perfectly connected to every other soul in the universe. Feel the divine order flowing through you.',
      affirmation:'"I am one with all of creation. The divine pattern of life flows through me perfectly."'
    },
    {
      name:'Metatron\'s Cube',emoji:'✡',color:'#FFD6A0',bg:'rgba(255,214,160,0.15)',border:'rgba(255,214,160,0.4)',
      meaning:'Metatron\'s Cube contains all five Platonic Solids and is said to be the blueprint of all physical matter. Named after the archangel Metatron who oversees the flow of energy in creation, this sacred pattern is used for protection, spiritual transformation and accessing higher dimensions of consciousness.',
      frequency:'963 Hz',chakra:'Crown Chakra',element:'Ether',
      meditation:'Visualize Metatron\'s Cube spinning slowly around your body like a protective shield of light. With each breath, see it expanding outward, clearing all dense energy from your field and replacing it with pure divine light.',
      affirmation:'"I am divinely protected. Sacred geometry surrounds and shields my soul."'
    },
    {
      name:'Sri Yantra',emoji:'🔯',color:'#FF82B4',bg:'rgba(255,130,180,0.15)',border:'rgba(255,130,180,0.4)',
      meaning:'The Sri Yantra is considered the most powerful and auspicious of all yantras in the Hindu tradition. Its nine interlocking triangles create 43 smaller triangles representing the entire cosmos. It is the geometric form of the goddess Tripura Sundari and is used for manifestation, abundance and union of masculine and feminine energies.',
      frequency:'639 Hz',chakra:'Heart Chakra',element:'Water',
      meditation:'Place your attention at the center point of the Sri Yantra, known as the bindu. This single point represents pure consciousness before creation. Breathe into this point and feel yourself merging with the infinite source of all creation.',
      affirmation:'"I am in perfect union with the divine feminine and masculine. Abundance flows to me naturally."'
    },
    {
      name:'Vesica Piscis',emoji:'☯',color:'#74C0FC',bg:'rgba(116,192,252,0.15)',border:'rgba(116,192,252,0.4)',
      meaning:'The Vesica Piscis is formed by two circles of equal radius overlapping so that the center of each circle lies on the circumference of the other. This ancient symbol represents the intersection of the spiritual and material worlds, the birth of light from darkness and the sacred union of opposites. It is one of the oldest symbols in existence.',
      frequency:'417 Hz',chakra:'Sacral Chakra',element:'Water',
      meditation:'Visualize two glowing spheres of light — one representing your human self and one representing your divine self. Watch them slowly come together until they overlap in perfect harmony at your heart center, creating the luminous Vesica Piscis within you.',
      affirmation:'"I bridge the spiritual and physical worlds with grace. I am both human and divine."'
    },
    {
      name:'Fibonacci Spiral',emoji:'🌀',color:'#69DB7C',bg:'rgba(105,219,124,0.15)',border:'rgba(105,219,124,0.4)',
      meaning:'The Fibonacci Spiral, also known as the Golden Spiral, appears throughout all of nature — in the spiraling of galaxies, the growth of shells, the unfurling of ferns and the arrangement of seeds in sunflowers. It represents the natural flow of growth, evolution and divine proportion. It is nature\'s own sacred geometry.',
      frequency:'528 Hz',chakra:'Heart Chakra',element:'Earth',
      meditation:'Close your eyes and visualize a golden spiral beginning at your heart center and expanding outward in perfect proportion. See it spiraling through your entire body, through your home, your city, the earth, the solar system and into the infinite cosmos.',
      affirmation:'"I grow in perfect harmony with the divine rhythm of nature. My life unfolds beautifully."'
    },
    {
      name:'Merkaba',emoji:'✦',color:'#9B59B6',bg:'rgba(155,89,182,0.15)',border:'rgba(155,89,182,0.4)',
      meaning:'The Merkaba is a divine light vehicle consisting of two interlocked tetrahedrons spinning in opposite directions. In Hebrew, Mer means light, Ka means spirit and Ba means body. The Merkaba represents the union of human and divine, the light body that surrounds and interpenetrates the physical body. It is used for spiritual ascension and interdimensional travel.',
      frequency:'852 Hz',chakra:'Third Eye',element:'Light',
      meditation:'Visualize a brilliant star tetrahedron of light surrounding your entire body. See one tetrahedron pointing upward to the heavens and one pointing downward to the earth. Feel them begin to spin — one clockwise and one counterclockwise — activating your light body and connecting you to the infinite cosmos.',
      affirmation:'"My light body is activated and radiant. I am ascending into my highest divine expression."'
    },
    {
      name:'Seed of Life',emoji:'🌸',color:'#FF6B6B',bg:'rgba(255,107,107,0.15)',border:'rgba(255,107,107,0.4)',
      meaning:'The Seed of Life consists of seven circles — one central circle surrounded by six others of equal size. It represents the seven days of creation in the Genesis pattern and the seven chakras of the human energy body. This sacred pattern is the foundation from which the Flower of Life grows and represents new beginnings, creation and the divine spark of life.',
      frequency:'396 Hz',chakra:'Root Chakra',element:'Earth',
      meditation:'Visualize seven glowing spheres of light arranged in the Seed of Life pattern within your body. The central sphere pulses at your heart. The six surrounding spheres align with your other six chakras. Feel all seven lights pulsing in perfect harmony, creating your own personal Seed of Life.',
      affirmation:'"I carry the seed of infinite creation within me. I am a divine expression of the cosmos."'
    },
    {
      name:'Torus',emoji:'⭕',color:'#FF8C00',bg:'rgba(255,140,0,0.15)',border:'rgba(255,140,0,0.4)',
      meaning:'The Torus is the fundamental shape of energy flow in the universe. From atoms to hearts to stars to galaxies, everything in existence has a toroidal energy field. The torus represents the self-sustaining, self-organizing nature of all life. It shows how energy flows out from a center point, loops around and returns to its source in a continuous cycle of renewal.',
      frequency:'741 Hz',chakra:'Throat Chakra',element:'Fire',
      meditation:'Place your hands over your heart and feel the toroidal energy field of your heart radiating outward. Visualize it as a glowing donut of light flowing up through the top of your head, around your body and back in through the base of your spine in a continuous, self-sustaining loop of divine energy.',
      affirmation:'"My energy flows in perfect divine cycles. I am a self-sustaining field of cosmic love."'
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
          <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>{star} DIVINE PATTERNS {star}</p>
          <h1 style={{fontStyle:'italic',fontWeight:300,fontSize:'40px',letterSpacing:'6px',background:'linear-gradient(135deg,#DDD0FF,#FFE8C8,#C8E8FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'0 0 12px'}}>Sacred Geometry</h1>
          <p style={{fontFamily:'sans-serif',fontSize:'13px',color:'rgba(200,168,255,0.45)',letterSpacing:'2px'}}>The divine patterns underlying all of creation</p>
        </div>

        {selected && (
          <div style={{background:'linear-gradient(135deg,rgba(138,90,255,0.08),rgba(6,5,14,0.95))',border:`2px solid ${selected.border}`,borderRadius:'24px',padding:'28px',marginBottom:'24px',boxShadow:`0 0 40px ${selected.bg}`}}>
            <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'20px'}}>
              <div style={{width:'72px',height:'72px',borderRadius:'50%',background:selected.bg,border:`3px solid ${selected.color}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'36px',boxShadow:`0 0 24px ${selected.bg}`,flexShrink:0}}>
                {selected.emoji}
              </div>
              <div>
                <h2 style={{fontStyle:'italic',fontSize:'24px',letterSpacing:'3px',color:selected.color,margin:'0 0 4px'}}>{selected.name}</h2>
                <div style={{display:'flex',gap:'12px'}}>
                  <span style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.4)',letterSpacing:'1px'}}>{selected.chakra}</span>
                  <span style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(255,214,160,0.5)',letterSpacing:'1px'}}>{selected.frequency}</span>
                </div>
              </div>
            </div>

            <p style={{fontStyle:'italic',fontSize:'14px',color:'rgba(220,210,255,0.75)',lineHeight:1.9,marginBottom:'16px'}}>{selected.meaning}</p>

            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(200,168,255,0.08)',borderRadius:'12px',padding:'16px',marginBottom:'12px'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'3px',color:'rgba(200,168,255,0.4)',marginBottom:'8px'}}>MEDITATION PRACTICE</p>
              <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(220,210,255,0.7)',lineHeight:1.9,margin:0}}>{selected.meditation}</p>
            </div>

            <div style={{background:selected.bg,border:`1px solid ${selected.border}`,borderRadius:'12px',padding:'16px',marginBottom:'16px',textAlign:'center'}}>
              <p style={{fontFamily:'sans-serif',fontSize:'9px',letterSpacing:'3px',color:'rgba(200,168,255,0.5)',marginBottom:'8px'}}>AFFIRMATION</p>
              <p style={{fontStyle:'italic',fontSize:'15px',color:selected.color,lineHeight:1.8,margin:0}}>{selected.affirmation}</p>
            </div>

            <div style={{display:'flex',gap:'8px'}}>
              <button onClick={()=>router.push(`/music?freq=${encodeURIComponent(selected.frequency)}`)} style={{flex:1,padding:'10px',background:'rgba(255,214,160,0.1)',border:'1px solid rgba(255,214,160,0.25)',borderRadius:'12px',fontStyle:'italic',fontSize:'12px',letterSpacing:'2px',color:'rgba(255,214,160,0.7)',cursor:'pointer'}}>Play {selected.frequency}</button>
              <button onClick={()=>setSelected(null)} style={{flex:1,padding:'10px',background:'transparent',border:'1px solid rgba(200,168,255,0.2)',borderRadius:'12px',fontStyle:'italic',fontSize:'12px',letterSpacing:'2px',color:'rgba(200,168,255,0.5)',cursor:'pointer'}}>Close</button>
            </div>
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px'}}>
          {patterns.map(p=>(
            <div key={p.name} onClick={()=>setSelected(selected?.name===p.name?null:p)} style={{background:selected?.name===p.name?p.bg:'rgba(255,255,255,0.025)',border:`1px solid ${selected?.name===p.name?p.border:'rgba(200,168,255,0.08)'}`,borderRadius:'16px',padding:'22px 16px',cursor:'pointer',textAlign:'center',transition:'all 0.2s',boxShadow:selected?.name===p.name?`0 0 20px ${p.bg}`:'none',transform:selected?.name===p.name?'scale(1.02)':'scale(1)'}}>
              <div style={{fontSize:'40px',marginBottom:'12px',filter:`drop-shadow(0 0 8px ${p.color})`}}>{p.emoji}</div>
              <div style={{fontStyle:'italic',fontSize:'16px',color:p.color,marginBottom:'6px'}}>{p.name}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(200,168,255,0.4)',letterSpacing:'1px',marginBottom:'4px'}}>{p.chakra}</div>
              <div style={{fontFamily:'sans-serif',fontSize:'10px',color:'rgba(255,214,160,0.4)',letterSpacing:'1px'}}>{p.frequency}</div>
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