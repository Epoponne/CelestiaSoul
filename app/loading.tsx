export default function Loading() {
  const star = '\u2726'

  return (
    <main style={{background:'#06050E',minHeight:'100vh',color:'#E8E0FF',fontFamily:'Georgia,serif',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{textAlign:'center'}}>

        <div style={{marginBottom:'24px',position:'relative'}}>
          <img src="/logo.png" alt="CelestiaSOUL" style={{width:'90px',height:'90px',borderRadius:'50%',objectFit:'cover',boxShadow:'0 0 40px rgba(200,168,255,0.5)',border:'1px solid rgba(200,168,255,0.3)',animation:'pulse 2s ease-in-out infinite'}}/>
        </div>

        <p style={{fontFamily:'sans-serif',fontSize:'10px',letterSpacing:'8px',color:'rgba(200,168,255,0.4)',marginBottom:'12px'}}>{star} CELESTIASOUL {star}</p>
        <p style={{fontStyle:'italic',fontSize:'16px',letterSpacing:'4px',color:'rgba(200,168,255,0.6)',marginBottom:'32px'}}>Aligning with the cosmos...</p>

        <div style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'32px'}}>
          {[0,1,2].map(i=>(
            <div key={i} style={{width:'8px',height:'8px',borderRadius:'50%',background:'#C8A8FF',animation:`bounce 1.4s ease-in-out ${i*0.2}s infinite`}}/>
          ))}
        </div>

        <p style={{fontStyle:'italic',fontSize:'13px',color:'rgba(200,168,255,0.3)',letterSpacing:'2px'}}>sacred breath · cosmic alignment · soul awakening</p>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(200,168,255,0.5); }
          50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(200,168,255,0.8); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </main>
  )
}