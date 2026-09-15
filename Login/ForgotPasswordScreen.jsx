import React, { useState } from 'react';

const NX_BG = 'linear-gradient(160deg, #FFDDE8 0%, #F5B8CB 30%, #E89BB4 55%, #D4A0C8 78%, #C8A8D8 100%)';

export default function ForgotPasswordScreen({ navigate }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 900);
  };

  return (
    <div style={{ width:'100%',minHeight:'100dvh',background:NX_BG,display:'flex',flexDirection:'column',position:'relative',overflow:'hidden' }}>

      <div style={{ position:'absolute',top:'-80px',right:'-60px',width:'260px',height:'260px',borderRadius:'50%',background:'radial-gradient(circle,rgba(255,255,255,0.4),transparent 70%)',filter:'blur(24px)',pointerEvents:'none' }} />

      {/* Header */}
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'52px 24px 0',zIndex:2 }}>
        <button onClick={()=>navigate('login')} style={{ background:'rgba(255,255,255,0.5)',border:'1px solid rgba(255,255,255,0.7)',borderRadius:'999px',padding:'8px 16px',color:'#6B5B7A',fontSize:'13px',fontWeight:500,cursor:'pointer',fontFamily:'Inter,sans-serif' }}>
          ← Back
        </button>
        <div style={{ display:'flex',alignItems:'center',gap:'6px' }}>
          <span style={{ fontSize:'1.1rem',color:'#1A1A2E' }}>✦</span>
          <span style={{ fontSize:'1rem',fontWeight:700,color:'#1A1A2E',fontFamily:'Inter,sans-serif' }}>nexus</span>
        </div>
      </div>

      {/* Icon */}
      <div style={{ display:'flex',justifyContent:'center',padding:'32px 24px 20px',zIndex:2 }}>
        <div style={{ width:'80px',height:'80px',borderRadius:'24px',background:'rgba(255,255,255,0.7)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.9)',boxShadow:'0 8px 32px rgba(180,100,140,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'36px' }}>
          {sent ? '✉️' : '🔒'}
        </div>
      </div>

      {!sent ? (
        <>
          <div style={{ padding:'0 28px 24px',textAlign:'center',zIndex:2 }}>
            <h1 style={{ fontSize:'1.9rem',fontWeight:800,color:'#1A1A2E',letterSpacing:'-0.03em',lineHeight:1.2,marginBottom:'10px',fontFamily:'Inter,sans-serif' }}>Forgot Password?</h1>
            <p style={{ fontSize:'14px',color:'#6B5B7A',lineHeight:1.65,fontFamily:'Inter,sans-serif' }}>
              No worries. Enter your email and we'll send you a reset link.
            </p>
          </div>

          <div style={{
            margin: '0 20px',
            background: 'rgba(255, 255, 255, 0.32)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: '1.5px solid rgba(255, 255, 255, 0.78)',
            borderRadius: '26px',
            padding: '24px 20px',
            boxShadow: '0 12px 40px rgba(240, 140, 170, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
            zIndex: 2,
          }}>
            <div style={{ position:'relative', marginBottom:'20px' }}>
              <div style={{ position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', color:'#8F8298', display:'flex', alignItems:'center' }}>
                <MailIcon/>
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                style={{
                  width: '100%',
                  height: '52px',
                  padding: '0 16px 0 48px',
                  background: 'rgba(255, 255, 255, 0.48)',
                  border: '1px solid rgba(255, 255, 255, 0.65)',
                  borderRadius: '16px',
                  color: '#141414',
                  fontSize: '15px',
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(10px)',
                }}
                onFocus={e=>{
                  e.target.style.background='rgba(255, 255, 255, 0.75)';
                  e.target.style.borderColor='rgba(255, 255, 255, 0.95)';
                  e.target.style.boxShadow='0 0 0 3px rgba(240, 140, 170, 0.18)';
                }}
                onBlur={e=>{
                  e.target.style.background='rgba(255, 255, 255, 0.48)';
                  e.target.style.borderColor='rgba(255, 255, 255, 0.65)';
                  e.target.style.boxShadow='none';
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleSend}
              disabled={!email||loading}
              style={{
                width: '100%',
                height: '52px',
                background: email ? '#141414' : 'rgba(20, 20, 20, 0.4)',
                border: 'none',
                borderRadius: '16px',
                color: email ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                fontSize: '16px',
                fontWeight: 700,
                cursor: email ? 'pointer' : 'not-allowed',
                fontFamily: 'Inter, -apple-system, sans-serif',
                boxShadow: email ? '0 4px 18px rgba(20, 10, 30, 0.25)' : 'none',
                letterSpacing: '-0.01em',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </>
      ) : (
        <div style={{
          margin: '0 20px',
          background: 'rgba(255, 255, 255, 0.32)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1.5px solid rgba(255, 255, 255, 0.78)',
          borderRadius: '26px',
          padding: '32px 24px',
          boxShadow: '0 12px 40px rgba(240, 140, 170, 0.16)',
          textAlign: 'center',
          zIndex: 2,
        }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(40,168,106,0.12)',border:'1px solid rgba(40,168,106,0.3)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:'24px' }}>✓</div>
          <h2 style={{ fontSize:'1.3rem',fontWeight:700,color:'#141414',marginBottom:'10px',fontFamily:'Inter,sans-serif' }}>Email Sent!</h2>
          <p style={{ fontSize:'14px',color:'#584D60',lineHeight:1.65,marginBottom:'24px',fontFamily:'Inter,sans-serif' }}>
            We've sent a password reset link to <strong style={{ color:'#141414' }}>{email}</strong>. Check your inbox.
          </p>
          <button
            type="button"
            onClick={()=>navigate('reset')}
            style={{
              width: '100%',
              height: '52px',
              background: '#141414',
              border: 'none',
              borderRadius: '16px',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Inter, -apple-system, sans-serif',
              boxShadow: '0 4px 18px rgba(20, 10, 30, 0.25)',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Enter Reset Code →
          </button>
        </div>
      )}

      <p style={{ textAlign:'center',marginTop:'24px',fontSize:'14px',color:'#6B5B7A',fontFamily:'Inter,sans-serif',paddingBottom:'32px',zIndex:2 }}>
        Remember it?{' '}
        <button onClick={()=>navigate('login')} style={{ background:'none',border:'none',color:'#C04878',fontWeight:700,cursor:'pointer',fontFamily:'Inter,sans-serif',fontSize:'14px' }}>Log in</button>
      </p>
    </div>
  );
}

function MailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.8"/></svg>;
}
