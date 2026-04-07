import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CelestiaSOUL',
  description: 'Sacred Breath · Cosmic Alignment · Soul Awakening',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8A5AFF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CelestiaSOUL" />
      </head>
      <body style={{margin:0,padding:0,background:'#06050E',minHeight:'100vh',position:'relative',overflow:'hidden auto'}}>
        <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none',overflow:'hidden'}}>
          <div style={{position:'absolute',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(138,90,255,0.12) 0%,transparent 70%)',top:'-100px',left:'-100px'}}/>
          <div style={{position:'absolute',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(90,138,255,0.08) 0%,transparent 70%)',top:'20%',right:'-100px'}}/>
          <div style={{position:'absolute',width:'700px',height:'700px',borderRadius:'50%',background:'radial-gradient(circle,rgba(200,100,255,0.06) 0%,transparent 70%)',bottom:'-200px',left:'30%'}}/>
          <div style={{position:'absolute',width:'300px',height:'300px',borderRadius:'50%',background:'radial-gradient(circle,rgba(255,214,160,0.06) 0%,transparent 70%)',top:'40%',left:'10%'}}/>
          {[...Array(80)].map((_,i)=>(
            <div key={i} style={{
              position:'absolute',
              width: i % 5 === 0 ? '3px' : i % 3 === 0 ? '2px' : '1px',
              height: i % 5 === 0 ? '3px' : i % 3 === 0 ? '2px' : '1px',
              borderRadius:'50%',
              background: i % 4 === 0 ? '#FFD6A0' : i % 3 === 0 ? '#A8E8FF' : '#DDD0FF',
              opacity: Math.random() * 0.7 + 0.1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}/>
          ))}
          <div style={{position:'absolute',width:'2px',height:'80px',background:'linear-gradient(to bottom,transparent,rgba(200,168,255,0.6),transparent)',top:'15%',left:'70%',transform:'rotate(-30deg)',animation:'meteor 8s linear infinite'}}/>
          <div style={{position:'absolute',width:'2px',height:'60px',background:'linear-gradient(to bottom,transparent,rgba(255,214,160,0.5),transparent)',top:'45%',left:'20%',transform:'rotate(-30deg)',animation:'meteor 12s linear infinite',animationDelay:'4s'}}/>
        </div>
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.3); }
          }
          @keyframes meteor {
            0% { transform: translateX(-100px) translateY(-100px) rotate(-30deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(300px) translateY(300px) rotate(-30deg); opacity: 0; }
          }
          * { box-sizing: border-box; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #06050E; }
          ::-webkit-scrollbar-thumb { background: rgba(200,168,255,0.2); border-radius: 4px; }
        `}</style>
        <div style={{position:'relative',zIndex:1}}>
          {children}
        </div>
      </body>
    </html>
  )
}